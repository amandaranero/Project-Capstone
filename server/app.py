from flask import Flask, make_response, request, session, render_template
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, User, Event, UserImage, EventImage, Comment, Message, Like
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import boto3
import botocore
import os
import uuid



app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
)
CORS(app)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = b'\xd41\xac\x18\x17\xf7\xf2\x9bqr6=\x8d\x16\xbc\x1c'
app.json.compact = False


migrate = Migrate(app, db)
db.init_app(app)
api = Api(app)

BUCKET_NAME = os.environ.get('AWS_BUCKET_NAME')
S3_LOCATION = os.environ.get('AWS_DOMAIN')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

s3 = boto3.client('s3',
                    aws_access_key_id=os.environ.get('AWS_ACCESS_KEY'),
                    aws_secret_access_key= os.environ.get('AWS_SECRET_ACCESS_KEY')
                     )


def allowed_file(filename):
    return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


def upload_file_to_s3(file):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case the our s3 upload fails
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}


class Logout(Resource):
    def delete(self):
        if session.get('user_id'):
            session['user_id'] = None

            return make_response({
                'message': 'No User logged in'
                }, 204)

        elif session.get('agency_id'):
            session['agency_id'] = None

            return make_response({
                'message': 'No User logged in'
                }, 204)

api.add_resource(Logout, '/logout')

class Profile(Resource):
    def get(self):

        user = User.query.filter_by(id=session['user_id']).first()
        image = UserImage.query.filter_by(user_id = session['user_id']).first()
        followers = [follow.to_dict() for follow in user.following]
        # following = [follow.to_dict() for follow in user.followers]
        user_events = Event.query.filter_by(user_id = session['user_id']).all()
        event_name = [events.name for events in user_events]
        event_id = [events.id for events in user_events]
        print(event_id)

        try:
            profile = {
                    'name': user.name,
                    'bio':  user.bio,
                    'username': user.username,
                    'userimage': image.url,
            }

            return make_response(
                profile, 200
            )

        except:
            return make_response(
                {'error':'did not work'}, 400
            )



api.add_resource(Profile, '/profile')

class Users(Resource):
    def get(self):
        users = [users.to_dict() for users in User.query.all()]
        
        return make_response(
            users, 200
        )

        if not users:
            return make_response({
                'error': 'users not found'
            },400)

    def post(self):
        data = request.get_json()
        email = data['email']
        user = User.query.filter_by(email=email).first()

        if user:
            session['user_id'] = user.id
        else:
            try: 
                new_user = User(
                    name = data['name'],
                    email = data['email'],
                    username = data['username'],
                    sub = data['sub']
                )

                db.session.add(new_user)
                db.session.commit()


                photo = UserImage(
                    url = "https://cdn.create.vista.com/api/media/small/579502666/stock-vector-light-blue-outline-user-avatar",
                    user_id = new_user.id
                )

                db.session.add(photo)
                db.session.commit()
                

                return make_response(
                    new_user.to_dict(),200
                )

            except:
                return make_response(
                    {'error': 'did not post user'}, 401
                )

api.add_resource(Users, '/users')


class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        
        if not user:
            return make_response(
               { "error": "no user found"}
            )
        else:
            return make_response(
                user.to_dict(), 200
            )

    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        photo = db.session.query(UserImage).filter(UserImage.user_id == id).first()
        data = request.form
        imagedata = request.files['image']
        
        if not user:
            return make_response({
                'error': 'user not found'
            }, 404)
        try:
            for attr in data:
                setattr(user, attr, data[attr])

            db.session.add(user)
            db.session.commit()

            imagedata.filename = get_unique_filename(imagedata.filename)
            image = upload_file_to_s3(imagedata)

            print(image)
            
            for attr in image:
                setattr(photo, attr, image[attr])

            db.session.add(photo)
            db.session.commit()

            return make_response(
                user.to_dict(),
                200
            )

        except:
            return({
                'errors':'nope'}, 401
            )

api.add_resource(UserById, "/users/<int:id>")

class UserEvents(Resource):
    def get(self):
        user_events = Event.query.filter_by(user_id = session['user_id']).all()
        events = [events.to_dict() for events in user_events]

        
        return make_response(
            events, 200
        )

api.add_resource(UserEvents, '/userevents')

class Events(Resource):

    def get(self):
        events = [events.to_dict() for events in Event.query.all()]

        return make_response(
            events,
            200
        )

        if not events:
            return make_response({
                'error': 'no events found'
            }, 400)

    def post(self):
        data = request.form
        imagedata = request.files['image']

        try:
            new_event = Event(
                name = data['name'],
                description = data['description'],
                date = data['date'],
                time = data['time'],
                event_type = data['event_type'],
                user_id = session['user_id']
            )

            db.session.add(new_event)
            db.session.commit()

            imagedata.filename = get_unique_filename(imagedata.filename)
            image = upload_file_to_s3(imagedata)

            photo = EventImage(
                url = image['url'],
                event_id = new_event.id
            )

            
            db.session.add(photo)
            db.session.commit()

            return make_response(
                new_event.to_dict(),
                200
            )

        except:
            user_id = session['user_id']
            return make_response(
                {'errors': 'nope'},
                401
            )



api.add_resource(Events, '/events')

class EventsById(Resource):
    def get(self, id):
        event = Event.query.filter_by(id=id).first()

        if not event:
            return make_response({
                'error': 'that event does not exist'
            }, 400)

        return make_response(
            event.to_dict(), 200
        )

api.add_resource(EventsById, '/events/<int:id>')

class Comments(Resource):
    
    def post(self):
        data = request.get_json()

        try:
            new_comment = Comment(
                content = data['content'],
                user_id = session['user_id'],
                event_id = data['event_id']
            )


            db.session.add(new_comment)
            db.session.commit()

            return make_response(
                new_comment.to_dict(),
                200
        )

        except:
            return make_response(
                {'error': 'could not post comment'},
                401
            )

api.add_resource(Comments, '/comments')

class CommentsById(Resource):
    def get(self, id):
        comments = Comment.query.filter_by(event_id=id).all()
        
        content = [comment.content for comment in comments]

        return make_response(
            content, 200
        )

api.add_resource(CommentsById, '/comments/<int:id>')

class Following(Resource):
    def get(self):
        user = User.query.filter_by(id=session['user_id']).first()

        following = [follow.to_dict() for follow in user.followers]

        if not following:
            return make_response(
                {'error':'You are not following anyone'}, 
                400
            )

        return make_response(
            following, 200
        )


    def post(self):
        data = request.get_json()
        following = User.query.filter_by(id=data).first()
        # followers_id = follower
        user = User.query.filter_by(id=session['user_id']).first()
        

        if not following:
            return make_response({
                'error':'follower does not exist'
            }, 400)

        user.followers.append(following)
        db.session.commit()


        return make_response(
            following.to_dict(only=('username', 'id')), 201
        )

api.add_resource(Following, '/following')

class Followed(Resource):
    def get(self):
        user = User.query.filter_by(id=session['user_id']).first()

        followers = [follow.username for follow in user.following]

        if not followers:
            return make_response(
                {'error': 'you have no followers'}
            )
            
        return make_response(
            followers, 200
        )

api.add_resource(Followed, '/followers')

class Messages(Resource):
    def post(self):
        data = request.get_json()

        new_message=Message(
            content= data['content'],
            reciever_id= data['reciever_id'],
            sender_id= session['user_id']
        )

        db.session.add(new_message)
        db.session.commit()

        recmess = new_message.message_reciever.to_dict()
        sendmess = new_message.message_sender.to_dict()
        content = new_message.content

        reciever_username = recmess['username']
        sender_username = sendmess['username']

        sent_message=[(
            content,
            reciever_username,
            sender_username
        )]

        return make_response(
            sent_message, 201
        )


api.add_resource(Messages, '/messages')

class MessagesById(Resource):
    def get(self,id):
       messages_sender = Message.query.filter_by(sender_id=session['user_id']).all()
       message_sender_id = [messages.id for messages in messages_sender]

       message_reciever = Message.query.filter_by(reciever_id = id).all()
       message_reciever_id = [messages.id for messages in message_reciever]

       one_and_two = set(message_sender_id) & set(message_reciever_id)
       one_and_two_list = list(one_and_two)

       result = db.session.query(Message).filter(Message.id.in_(one_and_two))
       message_content = [message.content for message in result]

       return make_response(
        message_content, 200
       )

api.add_resource(MessagesById, '/messages/<int:id>')

class Likes(Resource):
    def get(self):
        users = Like.query.filter_by(user_id = session['user_id']).all()
        users_events_id = [user.event_id for user in users]

        return make_response(
            users_events_id, 200
        )

    def post(self):
        data = request.get_json()
        id = data['event_id']

        likes = Like.query.filter_by(event_id = id).all()
        user = [like.user_id for like in likes]
        
        if session['user_id'] in user:
            likes_by_user = Like.query.filter_by(user_id=session['user_id'],event_id = id).first()

            db.session.delete(likes_by_user)
            db.session.commit()

        else:
            add_like = Like(
            user_id = session['user_id'],
            event_id = data['event_id']
        )

            db.session.add(add_like)
            db.session.commit()

        likes = Like.query.filter_by(event_id = id).all()
        total = str(len(likes))

        return make_response(
            total, 201
        )


api.add_resource(Likes, '/likes')

class LikesById(Resource):
    def get(self, id):
        likes = Like.query.filter_by(event_id = id).all()
        total = str(len(likes))
        user_id_likes = [like.user_id for like in likes]
        
        return make_response(
            user_id_likes, 200
        )

api.add_resource(LikesById, '/likes/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
from flask import Flask, make_response, request, session, render_template
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, User, Event, UserImage, EventImage, Comment, Message, Like
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy_serializer import SerializerMixin
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


api.add_resource(Logout, '/logout')

class Profile(Resource):
    def get(self):
        print(session.get('user_id'))
        print("cat")

        user = User.query.filter_by(id=session['user_id']).first()
        image = UserImage.query.filter_by(user_id = session['user_id']).first()
        userevents = Event.query.filter_by(user_id = session['user_id']).all()
        events = [events.to_dict() for events in userevents]


        try:
            profile = {
                    'name': user.name,
                    'bio':  user.bio,
                    'username': user.username,
                    'userimage': image.url,
                    'events':events,
                    'id': session['user_id']
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

            user = User.query.filter_by(id=session['user_id']).first()

            return make_response(
                user.to_dict(),
                200
            )
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
                
                session['user_id'] = new_user.id
                session['user_id'] = user.id

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
        # try:
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

    # except:
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
            print(image['url'])

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


api.add_resource(UserEvents, '/userevents')

class UserEventsById(Resource):
    def delete(self, id):
        event_delete = Event.query.filter_by(id=id).first()
        db.session.delete(event_delete)
        db.session.commit()

        user_events = Event.query.filter_by(user_id = session['user_id']).all()
        events = [events.to_dict() for events in user_events]

        return make_response(
            events, 200
        )

    def patch(self, id):
        event = Event.query.filter_by(id=id).first()
        photo = db.session.query(EventImage).filter(EventImage.event_id==id).first()
        print(photo)
        data=request.form
        imagedata = request.files['image']
        
        
        if not event:
            return make_response(
                {'error':'event not found'}, 404
            )
        for attr in data:
            setattr(event, attr, data[attr])


        db.session.add(event)
        db.session.commit()

        imagedata.filename = get_unique_filename(imagedata.filename)
        image = upload_file_to_s3(imagedata)
        print(image)

        for attr in image:
            setattr(photo, attr, image[attr])


        db.session.add(photo)
        db.session.commit()


        user_events = Event.query.filter_by(user_id = session['user_id']).all()
        events = [events.to_dict() for events in user_events]

        print(user_events)
        print(events)

        return make_response(
            events,
            200
        )
        


api.add_resource(UserEventsById, '/userevents/<int:id>')

class Events(Resource):

    def get(self):
        events = [events for events in Event.query.all()]
        events_t = Event.query.filter_by(event_type = "public").all()
        events_type = [event.to_dict() for event in events_t]

        return make_response(
            events_type,
            200
        )

        if not events_type:
            return make_response({
                'error': 'no events found'
            }, 400)


api.add_resource(Events, '/events')

class EventsById(Resource):
    def get(self, id):
        event = Event.query.filter_by(id=id).first()
        userid = event.user_id
        eventimage = EventImage.query.filter_by(event_id=id).first()
        eventimageurl = eventimage.url
        user = User.query.filter_by(id = userid).first()
        userimage = UserImage.query.filter_by(user_id=userid).first()
        userimageurl = userimage.url
        username = user.username
        event_name = event.name
        description= event.description
        date = event.date
        time = event.time

        event_object = {
            # 'event': event.to_dict(),
            'userid': userid,
            'username': username,
            'eventimage': eventimageurl,
            'userimage': userimageurl,
            'event_name': event_name,
            'description':description,
            'date': date,
            'time': time
        }


        if not event:
            return make_response({
                'error': 'that event does not exist'
            }, 400)

        return make_response(
            event_object, 200
        )


api.add_resource(EventsById, '/events/<int:id>')

class ProfileEvents(Resource):
    def get(self, id):
        event = Event.query.filter_by(user_id=id).all()

        events = [e.to_dict() for e in event]

        return make_response(
            events, 200
        )

api.add_resource(ProfileEvents, '/profilevents/<int:id>')

class Comments(Resource):
    
    def post(self):
        data = request.get_json()

        try:
            new_comment = Comment(
                content = data['content'],
                user_id = session['user_id'],
                event_id = data['event_id']
            )

            userimage = UserImage.query.filter_by(user_id=session['user_id']).first()
            imageurl = userimage.url
            user = User.query.filter_by(id=session['user_id']).first()
            username = user.username

            db.session.add(new_comment)
            db.session.commit()


            comment_response = {
                'content': data['content'],
                'image': imageurl,
                'id': new_comment.id,
                'username': username
            }


            return make_response(
                comment_response,
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
        comment = Comment.query.filter_by(event_id=id).all()
        userimage = UserImage.query.filter_by(user_id=session['user_id']).first()
        imageurl = userimage.url
        imagedict = {'image': imageurl}

        comments = []
        
        for c in comment:
            comment = c.to_dict(only=('content', 'id'))
            user = User.query.filter_by(id = c.user_id).first()
            user_name = {'username': user.username}
            combined_comment = comment | imagedict
            total_comment = user_name | combined_comment
            comments.append(total_comment)

       
        return make_response(
            comments, 200
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
            following.to_dict(), 201
        )

api.add_resource(Following, '/following')

class FollowingById(Resource):
    def delete(self, id):
        user = User.query.filter_by(id=session['user_id']).first()
        following = User.query.filter_by(id=id).first()
        user.followers.remove(following)
        db.session.commit()

        followings = [follow.to_dict() for follow in user.followers]

        return make_response(
            followings, 201
        )

        if not following:
            return make_response(
                {'error':'you are not following that user'}
            )

    def get(self, id):
        user = User.query.filter_by(id=id).first()

        followings = [follow.to_dict() for follow in user.followers]

        return make_response(
            followings, 201
        )
        
        
api.add_resource(FollowingById, '/following/<int:id>')

class FollowingEvents(Resource):
    def get(self):
        user = User.query.filter_by(id=session['user_id']).first()
        
        
        # the ids of who the user is following
        following_id = [follow.id for follow in user.followers]

        events = []

        for id in following_id:
            event = Event.query.filter_by(user_id=id).first()
            if event:
                ev = event.to_dict()
                image = event.eventimages
                imageurl = [i.url for i in image]
                im = {'image': imageurl}
                combined = ev | im
                user = User.query.filter_by(id=id).first()
                username = user.username
                user_name = {'username': username}
                userphoto = user.userimages
                url = [u.url for u in userphoto]
                user_image = {'userimage': url}
                combined_user = user_name | user_image
                
                combined_event = combined | combined_user
            
                events.append(combined_event)

        return make_response(
            events, 200
        )


api.add_resource(FollowingEvents, '/followingevents')


class Followers(Resource):
    def get(self):
        user = User.query.filter_by(id=session['user_id']).first()

        followers = [follow.to_dict() for follow in user.following]

            
        return make_response(
            followers, 200
        )

api.add_resource(Followers, '/followers')

class FollowersById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        
        followers = [follow.to_dict() for follow in user.following]
        

        
        return make_response(
            followers, 200
        )

api.add_resource(FollowersById, '/followers/<int:id>')

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



        return make_response(
            new_message.to_dict(only=('content', 'reciever_id', 'sender_id')), 201
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

        messages = []
        
        for message in result:
            mess = message.to_dict(only=('reciever_id', 'sender_id' ,'content'))
            messages.append(mess)


        return make_response(
            messages, 200
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

class LikeEvents(Resource):
    def get(self):
        user_likes = Like.query.filter_by(user_id=session['user_id']).all()
        event_ids = [like.event_id for like in user_likes]


        events = []

        for id in event_ids:
            event = Event.query.filter_by(id=id).first().to_dict()
            events.append(event)
        
        print(events)

        return make_response(
            events, 200
        )


api.add_resource(LikeEvents, '/likevents')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
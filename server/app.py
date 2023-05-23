from flask import Flask, make_response, request, session, render_template
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, User, Event, UserImage, EventImage, Comment
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
            print(image)

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


class Follow(Resource):
    def get(self):
        user = User.query.filter_by(id=session['user_id']).first()

        following = [follow.username for follow in user.followers]

        print(following)

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
        print(following)
        db.session.commit()


        return make_response(
            following.to_dict(only=('username', 'id')), 201
        )

api.add_resource(Follow, '/follow')

class Followed(Resource):
    def get(self):
        user = User.query.filter_by(id=session['user_id']).first()

        followers = [follow.username for follow in user.following]

        print(followers)

        return make_response(
            followers, 200
        )

api.add_resource(Followed, '/followers')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
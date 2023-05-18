from flask import Flask, make_response, request, session, render_template
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, User, Event, UserImage, EventImage
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


class Users(Resource):
    def post(self):
        data = request.form
        imagedata = request.files['image']
        print(data)
        

        try:
            new_user = User(
               username = data['username'],
               name = data['name'] ,
               bio = data['bio']
            )
            print(new_user)

            db.session.add(new_user)
            db.session.commit()
            imagedata.filename = get_unique_filename(imagedata.filename)
            image = upload_file_to_s3(imagedata)

            photo = UserImage(
                url =image['url'],
                user_id = new_user.id
            )

            db.session.add(photo)
            db.session.commit()

            return make_response(
                new_user.to_dict(),
                200
            )

        except:
            print({
                'errors':'nope'}, 401
            )

api.add_resource(Users, '/users')

class Event(Resource):
    def post(self):

        data = request.form
        imagedata = request.files['image']
        user_id = User.query.first()
        # print(imagedata)

        try:
            new_event = Event(
                name = data['name'],
                description = data['description'],
                date = data['date'],
                time = data['time'],
                event_type = data['event_type'],
                user_id = 'user_id.id'
            )

            print(new_event)

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
            return make_response(
                {'errors': 'nope'},
                401
            )



api.add_resource(Event, '/events')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
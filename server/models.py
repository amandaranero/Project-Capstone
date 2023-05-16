from flask_sqlalchemy import flask_sqlalchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, primary_key = True)
    name = db.Column(db.String, nullable = True)
    bio = db.Column(db.String, nullable = False)
    profpic = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    posts = db.relationship('Post', backref= 'user', cascade = 'all, delete, delete-orphan')

    # think will need messages
    # and followers.. should be relationship for both


class Post(db.Model, SerializerMixin):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = True)
    description = db.Column(db.String, nullable = False)
    image = db.Column(db.String)
    date = (db.DateTime)
    private = db.Column(db.Boolean, default = False)
    genre = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey(users.id))
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())\

    # will need likes and comments





    
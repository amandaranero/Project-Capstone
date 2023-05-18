from flask_sqlalchemy import SQLAlchemy
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
    username = db.Column(db.String, nullable = False)
    name = db.Column(db.String, nullable = False)
    bio = db.Column(db.String, nullable = False)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    events = db.relationship('Event', backref= 'event', cascade = 'all, delete, delete-orphan')
    userimages = db.relationship('UserImage', backref= 'user', cascade = 'all, delete, delete-orphan')

    serialize_rules = ('-created_at','-updated_at' , '-events', '-userimages.user')

    # think will need messages
    # and followers.. should be relationship for both

class UserImage(db.Model, SerializerMixin):
    __tablename__="userimages"

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())


    serialize_rules = ('-created_at','-updated_at' )


class Event(db.Model, SerializerMixin):
    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = True)
    description = db.Column(db.String, nullable = False)
    date = (db.String)
    time = (db.String)
    event_type = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    # will need likes and comments
    
    eventimages = db.relationship('EventImage', backref= 'event', cascade = 'all, delete, delete-orphan')

    serialize_rules = ('-created_at','-updated_at', '-eventimages.event', '-users' )
    

class EventImage(db.Model, SerializerMixin):
    __tablename__="eventimages"

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    serialize_rules = ('-created_at','-updated_at' )




    
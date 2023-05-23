from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

# follower joint and secondary table

follow = db.Table(
    'follow',
    db.Column('following_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('follower_id', db.Integer, db.ForeignKey('users.id'))
)


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key = True)
    sub = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    username = db.Column(db.String)
    name = db.Column(db.String, nullable = False)
    bio = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    events = db.relationship('Event', backref= 'event', cascade = 'all, delete, delete-orphan')
    userimages = db.relationship('UserImage', backref= 'user', cascade = 'all, delete, delete-orphan')
    comments = db.relationship('Comment', backref='user', cascade='all, delete, delete-orphan')
    messages_sent = db.relationship('Message', backref='message_sender', lazy=True, foreign_keys = '[messages.c.sender_id]', cascade='all, delete, delete-orphan')
    messages_recieved = db.relationship('Message', backref='message_reciever', lazy=True, foreign_keys = '[messages.c.reciever_id]', cascade='all, delete, delete-orphan')


    # followers relationships

    followers = db.relationship('User', 
                                secondary = follow, 
                                primaryjoin = (follow.c.following_id == id),
                                secondaryjoin = (follow.c.follower_id == id),
                                backref = 'following'
                                )

    serialize_rules = ('-created_at','-updated_at' , '-events', '-userimages.user', '-comments', '-following', '-follow', '-followers', '-messages_sent')


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
    name = db.Column(db.String)
    description = db.Column(db.String)
    date = db.Column(db.String)
    time = db.Column(db.String)
    event_type = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    # will need likes and comments
    
    eventimages = db.relationship('EventImage', backref= 'event', cascade = 'all, delete, delete-orphan')
    comments = db.relationship('Comment', backref='event', cascade='all, delete, delete-orphan')

    serialize_rules = ('-created_at','-updated_at', '-eventimages.event', '-users', '-comments')


class EventImage(db.Model, SerializerMixin):
    __tablename__="eventimages"

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    serialize_rules = ('-created_at','-updated_at' )

class Comment(db.Model, SerializerMixin):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    serialize_rules = ('-updated_at' )

class Message(db.Model, SerializerMixin):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    reciever_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    message_read = db.Column(db.Boolean, default = False)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())








    
from faker import Faker
from app import app
from models import db, User, UserImage, Event, EventImage, Comment, follow, Message, Like
from random import choice as rc, randint
from app import app
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

fake = Faker()

def make_user():
    User.query.delete()
    

    users = []

    for _ in range(10):
        user = User(
            username = fake.name(),
            email = fake.email(),
            name = fake.name(),
            bio = fake.text()
        )
        users.append(user)


    db.session.add_all(users)
    db.session.commit()

def make_userimages():
    UserImage.query.delete()
    # users = db.session.query(User.id).all()

    users = [1,2,3,4,5,6,7,8,9,10]
    images=[]

    for i in range(10):
        image = UserImage(
            url = "https://cdn.create.vista.com/api/media/small/579502666/stock-vector-light-blue-outline-user-avatar",
            user_id = (users)[i]
        )

        images.append(image)

        db.session.add_all(images)
        db.session.commit()

def make_event():
    Event.query.delete()
    users = db.session.query(User.id).all()

    events = []

    for _ in range(10):
        event = Event(
            name = fake.name(),
            description = fake.text(),
            date = fake.email(),
            time = fake.name(),
            event_type = 'public',
            user_id = rc(users)[0],
        )

        events.append(event)

        db.session.add_all(events)
        db.session.commit()


def make_eventimages():
    EventImage.query.delete()
    # events = db.session.query(Event.id).all()

    events = [1,2,3,4,5,6,7,8,9,10]
    images=[]

    urls = ["https://img.freepik.com/free-photo/young-adult-having-fun-white-party_23-2149575168.jpg","https://img.freepik.com/free-photo/young-adult-having-fun-white-party_23-2149575168.jpg","https://www.zarla.com/images/zarla-balloon-logos-4125x2768-2022112.jpeg?crop=21:16,smart&width=420&dpr=2", "https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F1128664372%2Fphoto%2Fyoung-friends-stacking-hands-outdoor-happy-millennial-people-having-fun-joining-and.jpg%3Fs%3D612x612%26w%3D0%26k%3D20%26c%3DIe-IcamewA4dtXxXn4VERnXFb6-Y_VslZvSjr8So1aI%3D&tbnid=M6HEHBV5zmctoM&vet=12ahUKEwi3k6yblKX_AhWxElkFHZSPA6kQMygBegUIARDdAQ..i&imgrefurl=https%3A%2F%2Fwww.istockphoto.com%2Fphoto%2Fyoung-friends-stacking-hands-outdoor-happy-millennial-people-having-fun-joining-and-gm1128664372-297886003&docid=ZcGUeekGb2R22M&w=612&h=336&q=event%20stock%20images&hl=en&ved=2ahUKEwi3k6yblKX_AhWxElkFHZSPA6kQMygBegUIARDdAQ","https://images.pexels.com/photos/7149165/pexels-photo-7149165.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", "https://gochippewacounty.com/wp-content/uploads/2023/02/comedy.jpg", "https://www.shutterstock.com/image-photo/portrait-party-men-woman-wig-260nw-1188150616.jpg", "https://media.istockphoto.com/id/1168237251/photo/pretty-woman-in-party-hat-carrying-cake-with-fire-candles-celebrating-birthday.jpg?s=612x612&w=0&k=20&c=ne5U7bS4z4Yql2oCYcMEfaXmE2cAgeytBSgSMdAfU_w=" , "https://www.zarla.com/images/zarla-balloon-logos-4125x2768-2022112.jpeg?crop=21:16,smart&width=420&dpr=2"]

    for i in range(10):
        image = EventImage(
            url = "https://www.zarla.com/images/zarla-balloon-logos-4125x2768-2022112.jpeg?crop=21:16,smart&width=420&dpr=2",
            event_id = (events)[i]
        )

        images.append(image)

        db.session.add_all(images)
        db.session.commit()

def make_comment():
    Comment.query.delete()

    # users = db.session.query(User.id).all()
    # events = db.session.query(Event.id).all()

    # comments = []

    # for _ in range(10):
    #     comment = Comment(
    #         content = fake.text(),
    #         user_id = rc(users)[0],
    #         event_id = rc(events)[0]
    #     )
        
    #     comments.append(comment)

    #     db.session.add_all(comments)
    db.session.commit()


def make_message():
    Message.query.delete()
    db.session.commit()
    # users = db.session.query(User.id).all()
    

    # messages = []

    # for _ in range(10):
    #     message = Message(
    #         content = fake.text(),
    #         sender_id = rc(users)[0],
    #         reciever_id = rc(users)[0],
    #         message_read = False
    #     )

    #     messages.append(message)

    #     db.session.add_all(messages)
    #     db.session.commit()


def make_likes():
    Like.query.delete()
    db.session.commit()

def delete_following():
    table = db.session.query(follow).delete()



if __name__ == '__main__':
    with app.app_context():
        make_user()
        make_userimages()
        make_event()
        make_eventimages()
        make_comment()
        make_likes()
        make_message()
from faker import Faker
from app import app
from models import db, User, UserImage, Event, EventImage
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
            name = fake.name(),
            bio = fake.text()
        )

        users.append(user)

    db.session.add_all(users)
    db.session.commit()

def make_userimages():
    UserImage.query.delete()
    users = db.session.query(User.id).all()

    images = []

    pic = ["https://images.dog.ceo/breeds/deerhound-scottish/n02092002_6915.jpg",
    'https://cdn.akc.org/content/hero/puppy_pictures_header.jpg', "https://images.dog.ceo/breeds/setter-irish/n02100877_2142.jpg","https://images.dog.ceo/breeds/hound-basset/n02088238_13683.jpg", "https://images.dog.ceo/breeds/corgi-cardigan/n02113186_1447.jpg",  "https://images.dog.ceo/breeds/airedale/n02096051_183.jpg", "https://images.dog.ceo/breeds/poodle-toy/n02113624_7964.jpg", "https://images.dog.ceo/breeds/terrier-silky/n02097658_6351.jpg", "https://images.dog.ceo/breeds/greyhound-italian/n02091032_4653.jpg"]

    for _ in range(10):
        image = UserImage(
            url = rc(pic),
            user_id = rc(users)[0]
        )

        images.append(image)

        db.session.add_all(images)
        db.session.commit()

def make_event():
    Event.query.delete()

    events = []

    for _ in range(10):
        event = Event(
            name = fake.name(),
            description = fake.text(),
            date = fake.future_date(),
            time = fake.time(),
            event_type = 'public'
        )

        events.append(event)

        db.session.add_all(events)
        db.session.commit()


def make_eventimages():
    EventImage.query.delete()
    events = db.session.query(Event.id).all()

    images = []
    numbers = [1,2,3,4,5,6,7,8,9,10]

    pic = ["https://images.dog.ceo/breeds/deerhound-scottish/n02092002_6915.jpg",
    'https://cdn.akc.org/content/hero/puppy_pictures_header.jpg', "https://images.dog.ceo/breeds/setter-irish/n02100877_2142.jpg","https://images.dog.ceo/breeds/hound-basset/n02088238_13683.jpg", "https://images.dog.ceo/breeds/corgi-cardigan/n02113186_1447.jpg",  "https://images.dog.ceo/breeds/airedale/n02096051_183.jpg", "https://images.dog.ceo/breeds/poodle-toy/n02113624_7964.jpg", "https://images.dog.ceo/breeds/terrier-silky/n02097658_6351.jpg", "https://images.dog.ceo/breeds/greyhound-italian/n02091032_4653.jpg"]

    for _ in range(10):
        image = EventImage(
            url = rc(pic),
            event_id = rc(numbers)
        )

        images.append(image)

        db.session.add_all(images)
        db.session.commit()



if __name__ == '__main__':
    with app.app_context():
        make_user()
        make_userimages()
        make_event()
        make_eventimages()
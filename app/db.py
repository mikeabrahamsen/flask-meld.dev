from flask_sqlalchemy import SQLAlchemy
from flask_seeder import generator

db = SQLAlchemy()


def seed_database(User):
    for index in range(250):
        db.session.add(
            User(name=generate_name())
        )
    db.session.commit()


def generate_name():
    return f"{generator.Name().generate()} {generator.Name().generate()}"

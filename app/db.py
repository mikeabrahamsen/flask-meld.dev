from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_database():
    db.init_app(app)
    db.create_all()

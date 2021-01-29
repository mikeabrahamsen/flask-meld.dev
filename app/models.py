from app import db
from dataclasses import dataclass


@dataclass
class User(db.Model):
    name: str

    id = db.Column(db.Integer, primary_key=True)
    name: str = db.Column(db.String(45), nullable=False)

    def __init__(self, name=None):
        self.name = name

    def __str__(self):
        return f"ID={self.id}, Name={self.name}"

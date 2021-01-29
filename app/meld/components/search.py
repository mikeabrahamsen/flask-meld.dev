from flask_meld import Component
from app.models import User


class Search(Component):
    search = ""

    @property
    def users(self):
        users = User.query.filter(User.name.contains(self.search)).all()
        return users

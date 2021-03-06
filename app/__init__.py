from flask import Flask, render_template
from config import config
from flask_meld import Meld
from .db import db, seed_database
from app import models

# extensions
meld = Meld()


def create_app(config_name="development"):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    db.init_app(app)

    meld.init_app(app)

    with app.app_context():
        db.create_all()
        seed_database(models.User)

    @app.route("/")
    def index():
        data = render_template("search-example-markup.html")

        return render_template("index.html", data=data)

    @app.route("/doc")
    def docs():
        return render_template("documentation.html")

    return app

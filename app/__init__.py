from flask import Flask, render_template
from flask_migrate import Migrate
from config import config
from flask_meld import Meld
from .db import db

# extensions
migrate = Migrate()
meld = Meld()


def create_app(config_name='development'):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    db.init_app(app)
    migrate.init_app(app, db)
    meld.init_app(app)

    @app.route('/')
    def index():
        return render_template("index.html")

    return app

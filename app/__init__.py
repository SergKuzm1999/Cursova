from flask import Flask
from app.models import db
from app.api.routes import routes
from app.config import Config
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    CORS(app)  # Дозволяє запити з іншого порту
    app.register_blueprint(routes)
    return app
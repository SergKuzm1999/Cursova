from flask import Flask
from app.models import db
from app.config import Config
from flask_cors import CORS
from flask_mail import Mail
from flask_migrate import Migrate
from flask_login import LoginManager

mail = Mail()
migrate = Migrate()
login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    login_manager.init_app(app)
    login_manager.login_view = "login"

    db.init_app(app)
    migrate.init_app(app, db)
    mail.init_app(app)
    CORS(app, supports_credentials=True)
    from app.api.user import users
    app.register_blueprint(users)
    return app
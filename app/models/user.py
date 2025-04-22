from app.models import db
from datetime import datetime
from flask_login import UserMixin
from werkzeug.security import check_password_hash

class User(UserMixin, db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False) 
    first_name = db.Column(db.String(100), nullable=True)
    last_name = db.Column(db.String(100), nullable=True)
    region = db.Column(db.String(100), nullable=True)
    city = db.Column(db.String(100), nullable=True)
    number_delivery = db.Column(db.String(100), nullable=True)
    date = db.Column(db.DateTime, default=lambda: datetime.now().replace(microsecond=0), nullable=False)
    code_forgot_password = db.Column(db.Integer, nullable=True)
    phone = db.Column(db.String(20), unique=True, nullable=True)
    role = db.Column(db.String(100), nullable=False)
    is_Confirmed = db.Column(db.Boolean, default=False, nullable=True)
    code_confirm_email = db.Column(db.Integer, nullable=True)
    
    orders = db.relationship('Order', backref='user', lazy=True)

    

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def get_id(self):
        return str(self.id)
    
    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
        }
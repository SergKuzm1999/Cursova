from app.models import db
from datetime import datetime
from sqlalchemy import Boolean

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False) 
    first_name = db.Column(db.String(100), nullable=True)
    last_name = db.Column(db.String(100), nullable=True)
    region = db.Column(db.String(100), nullable=True)
    city = db.Column(db.String(100), nullable=True)
    number_delivery = db.Column(db.Integer, nullable=True)
    date = db.Column(db.DateTime, default=datetime.now, nullable=False)
    code_forgot_password = db.Column(db.String(100), nullable=True)
    phone = db.Column(db.String(20), unique=True, nullable=True)
    role = db.Column(db.String(100), nullable=False)
    isConfirmed = db.Column(db.Boolean, default=False, nullable=False)
    orders = db.relationship('Order', backref='user', lazy=True)
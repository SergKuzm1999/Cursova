from app.models import db
from datetime import datetime

class Order(db.Model):
    __tablename__ = 'order'
    
    id = db.Column(db.Integer, primary_key=True)
    full_price = db.Column(db.Numeric(10, 2), nullable=False)
    status = db.Column(db.String(100), nullable=False)
    date = db.Column(db.DateTime, default=datetime.now)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    orders_products = db.relationship('OrderProduct', backref='order', lazy=True)
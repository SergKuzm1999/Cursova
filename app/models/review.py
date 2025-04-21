from app.models import db
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'review'
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(255), nullable=False)
    text = db.Column(db.String(255), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    date = db.Column(db.String(255), default=datetime.now)

    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)

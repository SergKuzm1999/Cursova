from app.models import db

class Category(db.Model):
    __tablename__ = 'category' 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    ua_name = db.Column(db.String(255), nullable=False)
    subcategories = db.relationship('SubCategory', backref='category', lazy=True)
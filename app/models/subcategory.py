from app.models import db

class SubCategory(db.Model):
    __tablename__ = 'subcategory'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    ua_name = db.Column(db.String(255), nullable=False)
    gender = db.Column(db.String(255), nullable=True)

    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)


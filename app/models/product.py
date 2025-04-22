from app.models import db
from datetime import datetime

class Product(db.Model):
    __tablename__ = 'product'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(1250), nullable=False)
    sizes = db.Column(db.JSON, nullable=True)
    color = db.Column(db.String(255), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(255), nullable=False)
    date = db.Column(db.DateTime, default=lambda: datetime.now().replace(microsecond=0), nullable=False)
    new_price = db.Column(db.Numeric(10, 2), nullable=True, default=0)
    article = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    
    subcategory_id = db.Column(db.Integer, db.ForeignKey('subcategory.id'), nullable=False)
    brand_id = db.Column(db.Integer, db.ForeignKey('brand.id'), nullable=False)

    products_similar = db.relationship(
        'ProductsSimilar',
        secondary='product_similar_association',
        back_populates='products',
        lazy=True,
        overlaps="similar_to_products"
    )
    subcategory = db.relationship('SubCategory', backref=db.backref('product', lazy=False))
    brand = db.relationship('Brand', backref=db.backref('product', lazy=False))
    images = db.relationship('ProductImage', backref='product', lazy=False)
    reviews = db.relationship('Review', backref='product', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'new_price': self.new_price,
            'article': self.article,
            'sizes': self.sizes,  
            'images': [image.to_dict() for image in self.images], 
            'date': self.date,
            'brand':self.brand.name,
            'reviews':self.reviews
        }
from app.models import db

class OrderProduct(db.Model):
    __tablename__ = 'order_product' 
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    product = db.relationship('Product', backref=db.backref('order_product', lazy=True))
    count = db.Column(db.Integer, nullable=False)
    size = db.Column(db.String(255), nullable=True)
    size_info = db.Column(db.String(255), nullable=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)

from app.models import db

class ProductsSimilar(db.Model):
    __tablename__ = 'product_similar'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)

    products = db.relationship('Product', secondary='product_similar_association', backref='product_similar', lazy=True)

# Асоціативна таблиця для зв'язку "багато до багатьох"
class ProductSimilarAssociation(db.Model):
    __tablename__ = 'product_similar_association'
    
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), primary_key=True)
    similar_id = db.Column(db.Integer, db.ForeignKey('product_similar.id'), primary_key=True)
from app.models import db

class ProductImage(db.Model):
    __tablename__ = 'product_image'
    id = db.Column(db.Integer, primary_key=True)
    path = db.Column(db.String(255), nullable=False)
    
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'path': self.path,
        }
from app.models import db

class Brand(db.Model):
    __tablename__ = 'brand'  
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)

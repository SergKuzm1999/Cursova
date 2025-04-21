from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from app.models.product import Product
from app.models.subcategory import SubCategory
from app.models.product_image import ProductImage
from app.models.category import Category
from app.models.order_product import OrderProduct
from app.models.order import Order
from app.models.brand import Brand
from app.models.product_similar import ProductsSimilar
from app.models.review import Review
from app.models.user import User

from flask import Blueprint, request, jsonify, current_app
from app.models import db, Product

products = Blueprint('products', __name__)  

@products.route('/all', methods=['GET'])
async def get_all_products():
    products = await db.session.execute(
        db.select(Product).order_by(Product.id.desc())
    )
    products_list = [
        {
            "Id": p.id,
            "Name": p.name,
            "Description": p.description,
            "Gender": p.gender,
            "Color": p.color,
            "Sizes": p.sizes,
            "Price": p.price,
            "Article": p.article,
            "NewPrice": p.new_price,
            "Brand": p.brand,
            "Subcategory": p.subcategory,
            "Images": p.images,
            "Reviews": p.reviews,
        }
        for p in products
    ]
    
    if products_list:
        grouped_products = {}
        for product in products_list:
            grouped_products.setdefault(product['Id'], []).append(product)
        
        return jsonify(grouped_products)
    else:
        return jsonify({"error": "Не знайдено продуктів"}), 400

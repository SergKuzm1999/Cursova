from flask import Blueprint, request, jsonify, current_app
from app.models import db, Brand


brands = Blueprint('brands', __name__)  

@brands.route('/GetBrands', methods=['GET'])
def get_brands():
    brands_ = Brand.query.all()

    brands_list = []

    for brand in brands_:
        brands_list.append({
            'id': brand.id,
            'name': brand.name
        })

    if brands_list:
        return jsonify(brands=brands_list), 200
    else:
        return jsonify({"message": "Брендів не знайдено"}), 404

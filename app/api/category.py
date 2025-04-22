from flask import Blueprint, request, jsonify, current_app
from app.models import db, Category, SubCategory


categories = Blueprint('categories', __name__)  

@categories.route('/GetCategories', methods=['GET'])
def get_categories():
    categories_ = Category.query.all()

    categories_list = []
    for category in categories_:
        categories_list.append({
            'id': category.id,
            'name': category.name,
            'ua_name': category.ua_name,
            'subcategories': [
                {
                    'id': sub.id,
                    'name': sub.name,
                    'ua_name': sub.ua_name
                } for sub in category.subcategories
            ]
        })

    if categories_list:
        return jsonify(categories=categories_list), 200
    else:
        return jsonify({"message": "Категорій не знайдено"}), 404


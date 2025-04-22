from flask import Blueprint, request, jsonify, current_app
from app.models import db, Category, SubCategory


categories = Blueprint('categories', __name__)  

@categories.route('/', methods=['GET'])
def get_categories():
    # # Отримуємо категорії з їх підкатегоріями, групуючи за Id
    # categories = await db.session.execute(
    #     db.select(Category).group_by(Category.id)
    # )
    
    categories_list = []
    for category in categories.scalars():
        categories_list.append({
            'id': category.id,
            'name': category.name,
            'ua_name': category.ua_name,
            'subcategories': [
                {'id': subcategory.id, 'name': subcategory.name} 
                for subcategory in category.subcategories
            ]
        })
    
    if categories_list:
        return jsonify(categories_list), 200
    else:
        return jsonify({"message": "Категорій не знайдено"}), 400


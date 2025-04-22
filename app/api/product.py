from flask import Blueprint, request, jsonify, current_app
from app.models import db, Product, Review
from datetime import datetime, timedelta

products = Blueprint('products', __name__)  
product_data = [
]

@products.route('/All', methods=['GET'])
async def get_all_products():
    products_by_all = Product.query.all()
    if not products_by_all:
        return jsonify({'error': 'Немає нових продуктів'}), 400
    product_dicts = []
    for p in products_by_all:
        product_dicts.append({
            'id': p.id,
            'name': p.name,
            'gender': p.gender,
            'sizes': p.sizes,
            'subcategory': p.subcategory.name,
            'brand': p.brand.name,
            'price': p.price,
            'new_price': p.new_price,
            'images': [img.path for img in p.images[:2]] if p.images else [],
            'date': p.date.strftime('%d.%m.%Y')
        })
    
        return jsonify({
            'products': product_dicts
        }), 200
    
@products.route('/News/<int:pagination>', methods=['GET'])
def get_products_news(pagination):
    gender = request.args.get('gender')
    if not gender:
        return jsonify({'error': 'Gender parameter is required'}), 400

    # Дата фільтрації (останні 3 днів)
    date_threshold = datetime.today() - timedelta(days=7)

    # Запити до БД
    products_by_gender = Product.query.filter(
        Product.gender == gender,
        Product.date >= date_threshold
    ).all()

    products_by_all = Product.query.filter(
        Product.gender == 'all',
        Product.date >= date_threshold
    ).all()

    # Об'єднання двох списків
    combined_products = products_by_gender + products_by_all

    if not combined_products:
        return jsonify({'error': 'Немає нових продуктів'}), 400

    # Перетворення у словники
    product_dicts = []
    for p in combined_products:
        product_dicts.append({
            'id': p.id,
            'name': p.name,
            'gender': p.gender,
            'sizes': p.sizes,
            'subcategory': p.subcategory.name,
            'brand': p.brand.name,
            'price': p.price,
            'new_price': p.new_price,
            'images': [img.path for img in p.images[:2]] if p.images else [],
            'date': p.date.strftime('%d.%m.%Y')
        })

    # Сортування та "пагінація"
    
    product_dicts = sorted(product_dicts, key=lambda x: x['id'], reverse=True)[:8 * pagination]

    return jsonify({
        'products': product_dicts,
        'productsCount': len(combined_products)
    }), 200

@products.route('/Discounts/<int:pagination>', methods=['GET'])
def get_products_discounts(pagination):
    gender = request.args.get('gender')
    if not gender:
        return jsonify({'error': 'Gender parameter is required'}), 400
    products_by_gender = Product.query.filter(
        Product.gender == gender,
        Product.new_price > 0
    ).all()

    products_by_all = Product.query.filter(
        Product.gender == 'all',
        Product.new_price > 0
    ).all()

    # Об'єднання двох списків
    combined_products = products_by_gender + products_by_all

    if not combined_products:
        return jsonify({'error': 'Немає нових продуктів'}), 400

    # Перетворення у словники
    product_dicts = []
    for p in combined_products:
        product_dicts.append({
            'id': p.id,
            'name': p.name,
            'gender': p.gender,
            'sizes': p.sizes,
            'subcategory': p.subcategory.name,
            'brand': p.brand.name,
            'price': p.price,
            'new_price': p.new_price,
            'images': [img.path for img in p.images[:2]] if p.images else [],
            'date': p.date.strftime('%d.%m.%Y')
        })

    # Сортування та "пагінація"
    
    product_dicts = sorted(product_dicts, key=lambda x: x['id'], reverse=True)[:8 * pagination]

    return jsonify({
        'products': product_dicts,
        'productsCount': len(combined_products)
    }), 200

@products.route('/ById/<int:id>', methods=['GET'])
def get_product_by_id(id):
    products = Product.query.filter_by(id=id).all()
    product_dicts = []
    for p in products:
        product_dicts.append({
            'id': p.id,
            'name': p.name,
            'description': p.description,
            'gender': p.gender,
            'sizes': p.sizes,
            'subcategory': p.subcategory.name,
            'brand': p.brand.name,
            'price': p.price,
            'new_price': p.new_price,
            'images': [img.path for img in p.images[:2]] if p.images else [],
            'date': p.date.strftime('%d.%m.%Y'),
            'reviews': [
            {
                'id': r.id,
                'user_name': r.user_name,
                'rating': r.rating,
                'text': r.text,
                'date':r.date
            }
            for r in p.reviews
        ]
        })
    if not products:
        return jsonify({'error': 'Немає нових продуктів'}), 400
    return jsonify(product_dicts[0]), 200

@products.route('/NewReview', methods=['POST'])
def set_review():
    data = request.get_json()
    new_review = Review(
        user_name = data.get('user_name'),
        text = data.get('text'),
        rating = data.get('rating'),
        product_id = data.get('product_id'),
        user_id = data.get('user_id')
    )
    db.session.add(new_review)
    db.session.commit()
    return jsonify({'message': 'Відгук успішно добавлено!'}), 201

@products.route('/GetReview', methods=['GET'])
def get_reviews():
    
    return jsonify({'message': 'Відгук успішно добавлено!'}), 201


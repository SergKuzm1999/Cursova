from flask import Blueprint, request, jsonify, current_app
from app.models import db, Product, Review, SubCategory, Category
from datetime import datetime, timedelta
from sqlalchemy import func

products = Blueprint('products', __name__)  
product_data = [
]
def get_actual_price(product):
    return float(product.new_price) if product.new_price and float(product.new_price) > 0 else float(product.price)

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
    
    product_dicts = sorted(product_dicts, 
                           key=lambda x: float(x['new_price']) if x['new_price'] is not None else float(x['price']),
                           reverse=True
                           )[:8 * pagination]

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

@products.route('/ByParams')
def get_products_by_params():
    pagination = int(request.args.get('pagination', 1))
    gender = request.args.get('gender')
    category = request.args.get('category')
    brand = request.args.get('brand')
    color = request.args.get('color')
    size = request.args.get('size')
    name = request.args.get('name')
    sort = request.args.get('sort')
    min_price = request.args.get('minprice')
    max_price = request.args.get('maxprice')

    filtered_products = Product.query.all()
    
    if gender:
        filtered_products = [
        product for product in filtered_products
        if (product.gender == gender or product.gender == 'all')
    ]
    if category:
        filtered_products = [
            product for product in filtered_products
            if (product.subcategory.name == category or product.subcategory.category.name == category)
        ]
    if brand:
        filtered_products = [
            product for product in filtered_products
            if (product.brand.name == brand)
        ]
    if color:
        filtered_products = [
            product for product in filtered_products
            if (product.color == color)
        ]
    if size:
        filtered_products = [
            product for product in filtered_products
            if product.sizes and size in product.sizes
        ]
    if name:
        filtered_products = [
            product for product in filtered_products
            if (product.name == name)
        ]   
    if min_price:
        filtered_products = [
            product for product in filtered_products
            if get_actual_price(product) >= float(min_price)
        ]
    if max_price:
        filtered_products = [
            product for product in filtered_products
            if get_actual_price(product) <= float(max_price)
        ]
    if sort:
        if (sort == 'MIN_PRICE'):
            filtered_products = sorted(
                filtered_products,
                key=lambda product: float(product.new_price if product.new_price else product.price)
            )
        if (sort == 'MAX_PRICE'):
            filtered_products = sorted(
                filtered_products,
                key=lambda product: float(product.new_price if product.new_price else product.price),
                reverse=True
            )
        if (sort == 'NEW'):
            filtered_products = sorted(
                filtered_products,
                key=lambda product: product.date
            )
        if (sort == 'OLD'):
            filtered_products = sorted(
                filtered_products,
                key=lambda product: product.date,
                reverse=True
            )

    product_dicts = []
    for p in filtered_products:
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
            'date': p.date.strftime('%d.%m.%Y %H:%M:%S')
        })

    
    product_dicts = product_dicts[:8 * pagination]

    return jsonify({
        'products': product_dicts,
        'productsCount': len(filtered_products)
    }), 200

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

@products.route('/GetCountProduct_Category/', methods=['GET'])
def get_count():
    count = 0
    isCategory = request.args.get('isCategory')
    subcategory = request.args.get('subcategory')
    gender = request.args.get('gender')
   
    if isCategory == 'true':
        if subcategory:
            count = 0
            count += Product.query.join(SubCategory).join(Category).filter(Product.gender == 'all').filter(func.lower(Category.ua_name) == func.lower(subcategory)).count()
            count += Product.query.join(SubCategory).join(Category).filter(Product.gender == gender).filter(func.lower(Category.ua_name) == func.lower(subcategory)).count()
    if isCategory == 'false':
        print('a')
        if subcategory:
            count = 0
            count += Product.query.join(SubCategory).filter(Product.gender == 'all').filter(func.lower(SubCategory.ua_name) == func.lower(subcategory)).count()
            count += Product.query.join(SubCategory).filter(Product.gender == gender).filter(func.lower(SubCategory.ua_name) == func.lower(subcategory)).count()
    
    return jsonify(count)


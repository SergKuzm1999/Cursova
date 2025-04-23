from flask import Blueprint, request, jsonify, current_app
from app.models import db, Order, OrderProduct


orders = Blueprint('orders', __name__)  

@orders.route('/NewOrder', methods=['POST'])
def create_order():
    data = request.get_json()

    new_order = Order(
        full_price = data.get('full_price'),
        status = 'Чекає опрацювання!',
        user_id = data.get('userId')
    )
    db.session.add(new_order)
    db.session.commit()

    products = data.get('cartProducts', [])
    for p in products:
        order_product = OrderProduct(
            product_id=p.get('id'),
            count=p.get('count'),
            size=p.get('size'),
            size_info=p.get('size_info'),
            order_id=new_order.id
        )
        db.session.add(order_product)
        db.session.commit()
    
    return jsonify({"message": "Замовлення додано!"}), 200

@orders.route('/GetUserOrders/<int:user_id>/<int:pagination>', methods=['GET'])
def get_user_orders(user_id,pagination):
    orders = Order.query.filter_by(user_id=user_id).order_by(Order.date.desc()).all()

    orders_dicts = []
    print('pagination',pagination)
    for order in orders:
        products_list = []
        for op in order.orders_products:
            products_list.append({
                'product_id': op.product_id,
                'product_name': op.product.name if op.product else None,
                'count': op.count,
                'size': op.size,
                'size_info': op.size_info,
                'price': float(op.product.price) if op.product else None,
                'new_price': float(op.product.new_price) if op.product else None,
                'image': op.product.images[0].path if op.product and op.product.images else None,
                'order_id': op.order_id
            })

        orders_dicts.append({
            'id': order.id,
            'full_price': order.full_price,
            'status': order.status,
            'date': order.date.strftime('%d.%m.%Y %H:%M:%S'),
            'user_id': order.user_id,
            'orders_products': products_list  
        })

    orders_dicts = orders_dicts[:4 * pagination]

    return jsonify({'orders': orders_dicts})

@orders.route('/GetOrdersUserCount/<int:user_id>', methods=['GET'])
def get_orders_user_count(user_id):
    count = Order.query.filter_by(user_id=user_id).count()

    return jsonify({'countOrders': count}), 200
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


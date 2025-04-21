from flask import Blueprint, request, jsonify
from app.models import db, User
from werkzeug.security import generate_password_hash, check_password_hash

users = Blueprint('users', __name__)  # Творимо Blueprint

@users.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{'id': user.id,  'email': user.email} for user in users])

@users.route('/Account/Register', methods=['POST'])
def create_user():
    data = request.get_json()
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Користувач з таким email вже існує'}), 400

    hashed_password = generate_password_hash(data['password'])
    new_user = User(
        first_name=data.get('first_name'),
        last_name=data.get('last_name'),
        region=data.get('region'),
        city=data.get('city'),
        number_delivery=data.get('number_delivery', 0),
        email=data['email'],
        password=hashed_password,
        phone=data.get('phone'),
        role='User' 
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Користувача створено успішно'}), 201

@users.route('/Account/signin', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Невірний email або пароль'}), 401

    return jsonify({
        'message': f'Вітаємо, {user.first_name}!',
        'user': {
            'id': user.id,
            'email': user.email,
            'role': user.role
        }
    }), 200
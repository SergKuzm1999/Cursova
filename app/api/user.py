from flask import Blueprint, request, jsonify, current_app
from app.models import db, User
from werkzeug.security import generate_password_hash
import random, string
import jwt
import datetime
from flask import current_app

users = Blueprint('users', __name__)  

def generate_code(length=6):
    return ''.join(random.choices(string.digits, k=length))

def generate_token(user):
    payload = {
        "id": user.id,
        "email": user.email,
        "exp": datetime.datetime.now() + datetime.timedelta(days=1)
    }
    token = jwt.encode(payload, current_app.config["SECRET_KEY"], algorithm="HS256")
    return token

@users.route('/Account/Users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{'id': user.id,  'email': user.email} for user in users])

@users.route('/Account/Register', methods=['POST'])
def create_user():
    from flask_mail import Message
    from app import mail
    data = request.get_json()
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Користувач з таким email вже існує'}), 400

    hashed_password = generate_password_hash(data['password'])
    code = generate_code()
    new_user = User(
        first_name=data.get('first_name'),
        last_name=data.get('last_name'),
        region=data.get('region'),
        city=data.get('city'),
        number_delivery=data.get('number_delivery', 0),
        email=data['email'],
        password=hashed_password,
        phone=data.get('phone'),
        role='User' ,
        code_confirm_email = code
    )
    db.session.add(new_user)
    db.session.commit()
    msg = Message(
        subject='Верифікація для сайту Clothes4U',
        sender='sergiy.kuzmich1999@gmail.com', 
        recipients=[data['email']],
        body=f'Ваш верифікаційний код: {code}'
    )
    mail.send(msg)
    return jsonify({'message': 'Користувача створено успішно'}), 201

@users.route('/Account/Login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        token = generate_token(user)
        return jsonify(token=token)
    return jsonify({"error": "Invalid credentials"}), 401

@users.route('/Account/Logout', methods=['POST'])
def logout():
    return jsonify({"message": "Logged out successfully!"}), 200


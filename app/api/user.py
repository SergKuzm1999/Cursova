from flask import Blueprint, request, jsonify, current_app
from app.models import db, User
from werkzeug.security import generate_password_hash
import random, string
import jwt
import datetime

users = Blueprint('users', __name__)  

def generate_code(length=6):
    return ''.join(random.choices(string.digits, k=length))

def generate_token(user):
    payload = {
        "id": user.id,
        "email": user.email,
        "exp": datetime.datetime.now() + datetime.timedelta(days=1),
        "role": user.role
    }
    token = jwt.encode(payload, current_app.config["SECRET_KEY"], algorithm="HS256")
    return token


    users = User.query.all()
    return jsonify([{'id': user.id,  'email': user.email} for user in users])

@users.route('/Register', methods=['POST'])
def create_user():
    from flask_mail import Message
    from app import mail
    data = request.get_json()
    
    if User.query.filter_by(email=data['email']).first():
        errors = 'Такий емейл вже зареєстровано!'
        return jsonify(errors), 400

    hashed_password = generate_password_hash(data['password'])
    code = generate_code()
    new_user = User(
        first_name=data.get('first_name'),
        last_name=data.get('last_name'),
        region=data.get('region'),
        city=data.get('city'),
        number_delivery=data.get('number_delivery'),
        email=data['email'],
        password=hashed_password,
        phone=data.get('phone'),
        role='User',
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

@users.route('/Login', methods=['POST'])
def login():
    data = request.get_json()
       
    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        token = generate_token(user)
        return jsonify(token=token)
    
    errors = 'Не правильний пароль або емейл!'
    return jsonify(errors), 400

@users.route('/Logout', methods=['POST'])
def logout():
    return jsonify({"message": "Logged out successfully!"}), 200

@users.route('/GetUserInfoById/<int:id>', methods=['GET'])
def getUser_ById(id):
    user = User.query.filter_by(id=id).first()
    if(user):
       if user:
        return jsonify({
            'id': user.id,  
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'phone': user.phone,
            'region': user.region,
            'city': user.city,
            'number_delivery': user.number_delivery
        })
       print("Користувача не знайдено")
    return jsonify({"message": "Користувача не знайдено!"}), 400

@users.route('/GetUsers', methods=['GET'])
def get_Users():
    users = User.query.all()
    
    if(users):
        users_dists = [
            {
                'id': p.id,
                'first_name': p.first_name,
                'last_name': p.last_name,
                'role': p.role,
                'email': p.email,
                'date': p.date,
                'is_Confirmed': p.is_Confirmed,
                'code_confirm_email': p.code_confirm_email
          }
           for p in users
        ]
      
          
    if(users_dists):
        return jsonify(users_dists), 200
    return jsonify({"Message":"Користувачів не знайдено!"}), 400
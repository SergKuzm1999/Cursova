from app import create_app
from app.models import db, User
from sqlalchemy_utils import database_exists, create_database
from werkzeug.security import generate_password_hash

app = create_app()

if __name__ == '__main__':
    with app.app_context():
        db_uri = app.config['SQLALCHEMY_DATABASE_URI']
       
        # Якщо база даних не існує — створити
        if not database_exists(db_uri):
            print("📂 Базу даних не знайдено. Створюємо...")
            create_database(db_uri)
            print("✅ Базу даних створено!")

        
        print("📦 Таблиці створено успішно")

       
       # Додати користувача, якщо ще не існує
        if not User.query.filter_by(email='sergiy.kuzmich1999@gmail.com').first():
            hashed_password = generate_password_hash('Qweasd246458!')
            user = User(
                first_name='Admin', 
                email='sergiy.kuzmich1999@gmail.com', 
                password=hashed_password, 
                role='Admin',
                is_Confirmed=True
                )
            db.session.add(user)
            db.session.commit()
            print(f"👤 Користувача {user.first_name} додано!")
        else:
            print("ℹ️ Користувач ADMIN вже існує.")
    # Запускаємо додаток
    app.run(debug=True)
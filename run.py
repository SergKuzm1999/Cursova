from app import create_app
from app.models import db, User
from sqlalchemy_utils import database_exists, create_database

app = create_app()

if __name__ == '__main__':
    with app.app_context():
        db_uri = app.config['SQLALCHEMY_DATABASE_URI']

        # Якщо база даних не існує — створити
        if not database_exists(db_uri):
            print("📂 Базу даних не знайдено. Створюємо...")
            create_database(db_uri)
            print("✅ Базу даних створено!")

        # Створити таблиці
        db.create_all()
        print("📦 Таблиці створено успішно")

       
       # Додати користувача, якщо ще не існує
        if not User.query.filter_by(email='john@example.com').first():
            user = User(name='John Doe', email='john@example.com')
            db.session.add(user)
            db.session.commit()
            print(f"👤 Користувача {user.name} додано!")
        else:
            print("ℹ️ Користувач з таким email вже існує.")
    # Запускаємо додаток
    app.run(debug=True)
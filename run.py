from app import create_app
from app.models import db, User
from sqlalchemy_utils import database_exists, create_database
from flask_migrate import Migrate, upgrade

app = create_app()
migrate = Migrate(app, db)
if __name__ == '__main__':
    with app.app_context():
        db_uri = app.config['SQLALCHEMY_DATABASE_URI']
       
        # Якщо база даних не існує — створити
        if not database_exists(db_uri):
            print("📂 Базу даних не знайдено. Створюємо...")
            create_database(db_uri)
            print("✅ Базу даних створено!")

        upgrade()
        print("📦 Таблиці створено успішно")

       
       # Додати користувача, якщо ще не існує
        if not User.query.filter_by(email='sergiy.kuzmich1999@gmail.com').first():
            user = User(
                first_name='Admin', 
                email='sergiy.kuzmich1999@gmail.com', 
                password='Qweasd246458!', 
                role='Admin'
                )
            db.session.add(user)
            db.session.commit()
            print(f"👤 Користувача {user.first_name} додано!")
        else:
            print("ℹ️ Користувач з таким email вже існує.")
    # Запускаємо додаток
    app.run(debug=True)
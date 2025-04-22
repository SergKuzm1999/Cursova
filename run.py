from app import create_app
from sqlalchemy_utils import database_exists, create_database
from app.models.seed import sead_db  

app = create_app()

if __name__ == '__main__':
    with app.app_context():
        db_uri = app.config['SQLALCHEMY_DATABASE_URI']
       
        if not database_exists(db_uri):
            print("📂 Базу даних не знайдено. Створюємо...")
            create_database(db_uri)
            print("✅ Базу даних створено!")

        sead_db()
       
    app.run(debug=True)
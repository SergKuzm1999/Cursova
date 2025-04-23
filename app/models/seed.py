from app import db
from app.models import Category, SubCategory, User, Product, Brand, ProductImage
from werkzeug.security import generate_password_hash

def sead_db():
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
        print(f"Користувача {user.first_name} додано!")
    else:
        print("Користувач ADMIN вже існує.")

    brands = [
        Brand(name="Nike"),
        Brand(name="Adidas"),
        Brand(name="Puma"),
        Brand(name="NewBalance"),
        Brand(name="Gard")
    ]
    if Brand.query.count() == 0:
        db.session.add_all(brands)
        db.session.commit()
        print("Бренди додано в базу даних.")
    
    categories = [
        Category(name="clothes", ua_name="ОДЯГ"),
        Category(name="accessories", ua_name="АКСЕСУАРИ"),
        Category(name="bags-backpacks", ua_name="РЮКЗАКИ, СУМКИ"),
        Category(name="shoes", ua_name="ВЗУТТЯ")
    ]

    if Category.query.count() == 0:
        db.session.add_all(categories)
        db.session.commit()
        print("Категорії додано в базу даних.")
    
    subcategories = [
        SubCategory(name="outerwear", gender="man", ua_name="Верхній Одяг", category_id=Category.query.filter_by(name="clothes").first().id),
        SubCategory(name="t-shirts", gender="man", ua_name="Футболки, Поло", category_id=Category.query.filter_by(name="clothes").first().id),
        SubCategory(name="sport-trousers", gender="man", ua_name="Спортивні Штани", category_id=Category.query.filter_by(name="clothes").first().id),
        SubCategory(name="shorts", gender="man", ua_name="Шорти", category_id=Category.query.filter_by(name="clothes").first().id),
        SubCategory(name="jeens", gender="man", ua_name="Джинси", category_id=Category.query.filter_by(name="clothes").first().id),
        SubCategory(name="jeens-shorts", gender="man", ua_name="Джинсові Шорти", category_id=Category.query.filter_by(name="clothes").first().id),
        SubCategory(name="sweatshirts", gender="man", ua_name="Світшоти", category_id=Category.query.filter_by(name="clothes").first().id),
        SubCategory(name="jogger", gender="man", ua_name="Карго, Джогери, Чиноси", category_id=Category.query.filter_by(name="clothes").first().id),
        SubCategory(name="kits", gender="man", ua_name="Комплекти", category_id=Category.query.filter_by(name="clothes").first().id),
        SubCategory(name="sport-costumes", gender="man", ua_name="Спортивні Костюми", category_id=Category.query.filter_by(name="clothes").first().id),
        SubCategory(name="vests", gender="man", ua_name="Жилетки", category_id=Category.query.filter_by(name="clothes").first().id),
        SubCategory(name="hoodie", gender="all", ua_name="Худі", category_id=Category.query.filter_by(name="clothes").first().id),
        SubCategory(name="shirts", gender="all", ua_name="Сорочки", category_id=Category.query.filter_by(name="clothes").first().id),
        SubCategory(name="underwear", gender="all", ua_name="Нижня Білизна", category_id=Category.query.filter_by(name="clothes").first().id),
        SubCategory(name="sweaters", gender="woman", ua_name="Кофти, Светри", category_id=Category.query.filter_by(name="clothes").first().id),
        SubCategory(name="trouers", gender="woman", ua_name="Штани", category_id=Category.query.filter_by(name="clothes").first().id),
        SubCategory(name="dresses", gender="woman", ua_name="Сукні", category_id=Category.query.filter_by(name="clothes").first().id),
        SubCategory(name="costumes", gender="woman", ua_name="Костюми", category_id=Category.query.filter_by(name="clothes").first().id),
        SubCategory(name="bananki", gender="all", ua_name="Сумки на пояс", category_id=Category.query.filter_by(name="bags-backpacks").first().id),
        SubCategory(name="backpacks", gender="all", ua_name="Рюкзаки", category_id=Category.query.filter_by(name="bags-backpacks").first().id),
        SubCategory(name="womens-bags", gender="woman", ua_name="Сумки Жіночі", category_id=Category.query.filter_by(name="bags-backpacks").first().id),
        SubCategory(name="bags-on-the-shoulder", gender="all", ua_name="Сумки через плече", category_id=Category.query.filter_by(name="bags-backpacks").first().id),
        SubCategory(name="sport-bags", gender="all", ua_name="Спортивні Сумки", category_id=Category.query.filter_by(name="bags-backpacks").first().id),
        SubCategory(name="baseball-caps", gender="all", ua_name="Кепки", category_id=Category.query.filter_by(name="accessories").first().id),
        SubCategory(name="panama", gender="man", ua_name="Панами", category_id=Category.query.filter_by(name="accessories").first().id),
        SubCategory(name="wallets", gender="man", ua_name="Гаманці", category_id=Category.query.filter_by(name="accessories").first().id),
        SubCategory(name="belts", gender="man", ua_name="Ремені", category_id=Category.query.filter_by(name="accessories").first().id),
        SubCategory(name="watch", gender="all", ua_name="Годинники", category_id=Category.query.filter_by(name="accessories").first().id),
        SubCategory(name="socks", gender="all", ua_name="Шкарпетки", category_id=Category.query.filter_by(name="accessories").first().id),
        SubCategory(name="kedi", gender="all", ua_name="Кеди", category_id=Category.query.filter_by(name="shoes").first().id),
        SubCategory(name="slippers", gender="all", ua_name="Тапочки", category_id=Category.query.filter_by(name="shoes").first().id),
        SubCategory(name="sneakers", gender="all", ua_name="Кросівки", category_id=Category.query.filter_by(name="shoes").first().id),
        SubCategory(name="chereviki", gender="all", ua_name="Черевики", category_id=Category.query.filter_by(name="shoes").first().id),
        SubCategory(name="hats", gender="all", ua_name="Шапки", category_id=Category.query.filter_by(name="accessories").first().id)
    ]
    
   
    if SubCategory.query.count() == 0:
        db.session.add_all(subcategories)
        db.session.commit()
        print("Підкатегорії додано в базу даних.")

    products = [
        Product(
            name="Вітровка Nike M NK RPL MILER JKT",
            description="Вітрівка Nike M Nk Rpl Miler Jkt відтворює класичний дизайн Windrunner та стане чудовим вибором для Ваших пробіжок. Виготовлена з якісного матеріалу, який має водовідштовхувальне покриття, що дозволить Вам займатись бігом у вологу погоду.",
            price=4570,
            gender='man',
            color='black',
            quantity=12,
            article='p1',
            sizes=["S", "M", "L", "XL"],
            subcategory_id=SubCategory.query.filter_by(name='outerwear').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        ),
         Product(
            name="Вітровка Nike M NK TCH WVN WR FZ JKT",
            description="Колекція Windrunner стала справжньою легендою ще в 1978 році, коли Nike вперше представила бігові куртки, які поєднували стиль і функціональність.",
            price=6970,
            new_price=5999,
            gender='man',
            color='green',
            quantity=12,
            article='p2',
            sizes=["S", "M", "L"],
            subcategory_id=SubCategory.query.filter_by(name='outerwear').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        ),
        Product(
            name="Вітровка Nike M NK WVN LND WR HD JKT",
            description="Колекція Windrunner стала обличчям одягу Nike у 1978 році. Товари колекції спочатку створювались як бігові куртки, які з часом перетворилися на повсякденний одяг.",
            price=5200,
            new_price=4599,
            gender='man',
            color='black',
            quantity=12,
            article='p3',
            sizes=["S", "M", "L"],
            subcategory_id=SubCategory.query.filter_by(name='outerwear').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        ),
         Product(
            name="Футболка Nike M NSW TEE M90 NK AIR SP25 2 172086",
            description="Склад:100% бавовна.Колір:Чорний.Сезон:Весна-Літо 2025, Літо.",
            price=2200,
            gender='man',
            color='black',
            quantity=14,
            article='p4',
            sizes=["S", "M", "L"],
            subcategory_id=SubCategory.query.filter_by(name='t-shirts').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        ),
        Product(
            name="Футболка New Balance Sport Essentials Gradient Logo T-Shirt",
            description="Склад:100% бавовна.Колір:Чорний.Сезон:Весна-Літо 2025, Літо.",
            price=1209,
            gender='man',
            color='black',
            quantity=5,
            article='p5',
            sizes=["S", "M", "L"],
            subcategory_id=SubCategory.query.filter_by(name='t-shirts').first().id,
            brand_id=Brand.query.filter_by(name="NewBalance").first().id,
        ),
        Product(
            name="Футболка Puma GRAPHICS Moto Relaxed Tee",
            description="Склад:100% бавовна.Колір:Чорний.Сезон:Весна-Літо 2025, Літо.",
            price=1209,
            gender='man',
            color='white',
            quantity=5,
            article='p6',
            sizes=["S", "M", "L"],
            subcategory_id=SubCategory.query.filter_by(name='t-shirts').first().id,
            brand_id=Brand.query.filter_by(name="Puma").first().id,
        ),
         Product(
            name="Футболка Adidas Originals JUVE ICON JSY",
            description="У 2015 році Adidas став титульним спонсором Ювентуса — клубу, який впродовж десятиліть писав історію світового футболу.",
            price=3700,
            new_price=2999,
            gender='all',
            color='blue',
            quantity=5,
            article='p7',
            sizes=["S", "M", "L"],
            subcategory_id=SubCategory.query.filter_by(name='t-shirts').first().id,
            brand_id=Brand.query.filter_by(name="Adidas").first().id,
        ),
         Product(
            name="Футболка Nike W NSW NK CHLL KNT MD CRP",
            description="Футболка Nike W Nsw Nk Chll Knt Md Crp – це справжній маст-хев для створення легких і стильних літніх образів.",
            price=1250,
            gender='woman',
            color='white',
            quantity=5,
            article='p8',
            sizes=["S", "M", "L"],
            subcategory_id=SubCategory.query.filter_by(name='t-shirts').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        ),
         Product(
            name="Футболка Adidas Originals 3 S BABY TEE ",
            description="Колекція Adidas Originals створена для тих, хто не боїться виділятися, хто впевнено крокує вулицями мегаполіса та цінує бездоганний стиль у кожній деталі.",
            price=1250,
            gender='woman',
            color='black',
            quantity=5,
            article='p9',
            sizes=["S", "M", "L"],
            subcategory_id=SubCategory.query.filter_by(name='t-shirts').first().id,
            brand_id=Brand.query.filter_by(name="Adidas").first().id,
        ),
         Product(
            name="Вітровка Puma DARE TO Oversized Zip-Off Woven Jacket",
            description="Колекція Adidas Originals створена для тих, хто не боїться виділятися, хто впевнено крокує вулицями мегаполіса та цінує бездоганний стиль у кожній деталі.",
            price=3999,
            new_price=2999,
            gender='woman',
            color='white',
            quantity=5,
            article='p10',
            sizes=["S", "M", "L"],
            subcategory_id=SubCategory.query.filter_by(name='outerwear').first().id,
            brand_id=Brand.query.filter_by(name="Puma").first().id,
        ),
         Product(
            name="Вітровка Adidas Originals RUCHED BOMBER",
            description="Колекція Adidas Originals створена для тих, хто не боїться виділятися, хто впевнено крокує вулицями мегаполіса та цінує бездоганний стиль у кожній деталі.",
            price=3999,
            new_price=2999,
            gender='woman',
            color='gray',
            quantity=5,
            article='p11',
            sizes=["S", "M", "L"],
            subcategory_id=SubCategory.query.filter_by(name='outerwear').first().id,
            brand_id=Brand.query.filter_by(name="Adidas").first().id,
        ),
        Product(
            name="Вітровка Nike M NK RPL MILER JKT",
            description="Вітрівка Nike M Nk Rpl Miler Jkt відтворює класичний дизайн Windrunner та стане чудовим вибором для Ваших пробіжок. Виготовлена з якісного матеріалу, який має водовідштовхувальне покриття, що дозволить Вам займатись бігом у вологу погоду.",
            price=4570,
            gender='man',
            color='black',
            quantity=12,
            article='p12',
            sizes=["S", "M", "L", "XL"],
            subcategory_id=SubCategory.query.filter_by(name='outerwear').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        ),
         Product(
            name="Вітровка Nike M NK TCH WVN WR FZ JKT",
            description="Колекція Windrunner стала справжньою легендою ще в 1978 році, коли Nike вперше представила бігові куртки, які поєднували стиль і функціональність.",
            price=6970,
            new_price=5999,
            gender='man',
            color='green',
            quantity=12,
            article='p13',
            sizes=["S", "M", "L"],
            subcategory_id=SubCategory.query.filter_by(name='outerwear').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        ),
        Product(
            name="Вітровка Nike M NK WVN LND WR HD JKT",
            description="Колекція Windrunner стала обличчям одягу Nike у 1978 році. Товари колекції спочатку створювались як бігові куртки, які з часом перетворилися на повсякденний одяг.",
            price=5200,
            new_price=4599,
            gender='man',
            color='black',
            quantity=12,
            article='p14',
            sizes=["S", "M", "L"],
            subcategory_id=SubCategory.query.filter_by(name='outerwear').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        ),
         Product(
            name="Футболка Nike M NSW TEE M90 NK AIR SP25 2 172086",
            description="Склад:100% бавовна.Колір:Чорний.Сезон:Весна-Літо 2025, Літо.",
            price=2200,
            gender='man',
            color='black',
            quantity=14,
            article='p15',
            sizes=["S", "M", "L"],
            subcategory_id=SubCategory.query.filter_by(name='t-shirts').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        ),
        Product(
            name="Футболка New Balance Sport Essentials Gradient Logo T-Shirt",
            description="Склад:100% бавовна.Колір:Чорний.Сезон:Весна-Літо 2025, Літо.",
            price=1209,
            gender='man',
            color='black',
            quantity=5,
            article='p16',
            sizes=["S", "M", "L"],
            subcategory_id=SubCategory.query.filter_by(name='t-shirts').first().id,
            brand_id=Brand.query.filter_by(name="NewBalance").first().id,
        ),
        Product(
            name="Футболка Puma GRAPHICS Moto Relaxed Tee",
            description="Склад:100% бавовна.Колір:Чорний.Сезон:Весна-Літо 2025, Літо.",
            price=1209,
            gender='man',
            color='white',
            quantity=5,
            article='p17',
            sizes=["S", "M", "L"],
            subcategory_id=SubCategory.query.filter_by(name='t-shirts').first().id,
            brand_id=Brand.query.filter_by(name="Puma").first().id,
        ),
         Product(
            name="Футболка Adidas Originals JUVE ICON JSY",
            description="У 2015 році Adidas став титульним спонсором Ювентуса — клубу, який впродовж десятиліть писав історію світового футболу.",
            price=3700,
            new_price=2999,
            gender='all',
            color='blue',
            quantity=5,
            article='p18',
            sizes=["S", "M", "L"],
            subcategory_id=SubCategory.query.filter_by(name='t-shirts').first().id,
            brand_id=Brand.query.filter_by(name="Adidas").first().id,
        ),
         Product(
            name="Футболка Nike W NSW NK CHLL KNT MD CRP",
            description="Футболка Nike W Nsw Nk Chll Knt Md Crp – це справжній маст-хев для створення легких і стильних літніх образів.",
            price=1250,
            gender='woman',
            color='white',
            quantity=5,
            article='p19',
            sizes=["S", "M", "L"],
            subcategory_id=SubCategory.query.filter_by(name='t-shirts').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        ),
         Product(
            name="Футболка Adidas Originals 3 S BABY TEE ",
            description="Колекція Adidas Originals створена для тих, хто не боїться виділятися, хто впевнено крокує вулицями мегаполіса та цінує бездоганний стиль у кожній деталі.",
            price=1250,
            gender='woman',
            color='black',
            quantity=5,
            article='p20',
            sizes=["S", "M", "L"],
            subcategory_id=SubCategory.query.filter_by(name='t-shirts').first().id,
            brand_id=Brand.query.filter_by(name="Adidas").first().id,
        ),
         Product(
            name="Вітровка Puma DARE TO Oversized Zip-Off Woven Jacket",
            description="Колекція Adidas Originals створена для тих, хто не боїться виділятися, хто впевнено крокує вулицями мегаполіса та цінує бездоганний стиль у кожній деталі.",
            price=3999,
            new_price=2999,
            gender='woman',
            color='white',
            quantity=5,
            article='p21',
            sizes=["S", "M", "L"],
            subcategory_id=SubCategory.query.filter_by(name='outerwear').first().id,
            brand_id=Brand.query.filter_by(name="Puma").first().id,
        ),
         Product(
            name="Вітровка Adidas Originals RUCHED BOMBER",
            description="Колекція Adidas Originals створена для тих, хто не боїться виділятися, хто впевнено крокує вулицями мегаполіса та цінує бездоганний стиль у кожній деталі.",
            price=3999,
            new_price=2999,
            gender='woman',
            color='gray',
            quantity=5,
            article='p22',
            sizes=["S", "M", "L"],
            subcategory_id=SubCategory.query.filter_by(name='outerwear').first().id,
            brand_id=Brand.query.filter_by(name="Adidas").first().id,
        ),

         Product(
            name="Кросівки Nike AIR MAX 90 DRIFT",
            description="Кросівки Nike Air Max 90 Drift — це переосмислення легендарного стилю 90-х у сучасному виконанні.",
            price=3999,
            gender='man',
            color='green',
            quantity=5,
            article='p23',
            sizes=["41", "42", "43", "44"],
            subcategory_id=SubCategory.query.filter_by(name='sneakers').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        ),
        Product(
            name="Кросівки Nike AIR MAX PLUS",
            description="Кросівки Nike Air Max Plus — це вибуховий мікс стилю, комфорту та натхнення, яке йде від самої природи. Їхній унікальний дизайн із хвилястими лініями, що нагадують океанські бризи та гнучкі силуети пальм.",
            price=9999,
            gender='man',
            color='black',
            quantity=5,
            article='p24',
            sizes=["40", "41", "43", "44"],
            subcategory_id=SubCategory.query.filter_by(name='sneakers').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        ),
        Product(
            name="Кросівки New Balance model 1000 Cordura",
            description="Кросівки New Balance model 1000 Cordura – це поєднання сміливого ретро-дизайну та передових технологій, натхненне футуристичним стилем архівних моделей.",
            price=9999,
            new_price=8999,
            gender='man',
            color='black',
            quantity=5,
            article='p25',
            sizes=["40", "41", "42", "43", "44"],
            subcategory_id=SubCategory.query.filter_by(name='sneakers').first().id,
            brand_id=Brand.query.filter_by(name="NewBalance").first().id,
        ),
         Product(
            name="Кросівки Adidas TERREX TRAILMAKER",
            description="Колекція Adidas Terrex створена для любителів активного відпочинку на природі та гарантує комфорт у будь-яких умовах.",
            price=9999,
            new_price=8999,
            gender='all',
            color='gray',
            quantity=5,
            article='p26',
            sizes=["37", "38", "39", "40", "41", "42", "43", "44"],
            subcategory_id=SubCategory.query.filter_by(name='sneakers').first().id,
            brand_id=Brand.query.filter_by(name="Adidas").first().id,
        ),
         Product(
            name="Кросівки Nike AIR MAX 90 DRIFT",
            description="Кросівки Nike Air Max 90 Drift — це переосмислення легендарного стилю 90-х у сучасному виконанні.",
            price=3999,
            gender='man',
            color='green',
            quantity=5,
            article='p27',
            sizes=["41", "42", "43", "44"],
            subcategory_id=SubCategory.query.filter_by(name='sneakers').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        ),
        Product(
            name="Кросівки Nike AIR MAX PLUS",
            description="Кросівки Nike Air Max Plus — це вибуховий мікс стилю, комфорту та натхнення, яке йде від самої природи. Їхній унікальний дизайн із хвилястими лініями, що нагадують океанські бризи та гнучкі силуети пальм.",
            price=9999,
            gender='man',
            color='black',
            quantity=5,
            article='p28',
            sizes=["40", "41", "43", "44"],
            subcategory_id=SubCategory.query.filter_by(name='sneakers').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        ),
        Product(
            name="Кросівки New Balance model 1000 Cordura",
            description="Кросівки New Balance model 1000 Cordura – це поєднання сміливого ретро-дизайну та передових технологій, натхненне футуристичним стилем архівних моделей.",
            price=9999,
            new_price=8999,
            gender='man',
            color='black',
            quantity=5,
            article='p29',
            sizes=["40", "41", "42", "43", "44"],
            subcategory_id=SubCategory.query.filter_by(name='sneakers').first().id,
            brand_id=Brand.query.filter_by(name="NewBalance").first().id,
        ),
         Product(
            name="Кросівки Adidas TERREX TRAILMAKER",
            description="Колекція Adidas Terrex створена для любителів активного відпочинку на природі та гарантує комфорт у будь-яких умовах.",
            price=9999,
            new_price=8999,
            gender='all',
            color='gray',
            quantity=5,
            article='p30',
            sizes=["37", "38", "39", "40", "41", "42", "43", "44"],
            subcategory_id=SubCategory.query.filter_by(name='sneakers').first().id,
            brand_id=Brand.query.filter_by(name="Adidas").first().id,
        ),
         Product(
            name="Кросівки Nike AIR MAX 90 DRIFT",
            description="Кросівки Nike Air Max 90 Drift — це переосмислення легендарного стилю 90-х у сучасному виконанні.",
            price=3999,
            gender='man',
            color='green',
            quantity=5,
            article='p31',
            sizes=["41", "42", "43", "44"],
            subcategory_id=SubCategory.query.filter_by(name='sneakers').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        ),
        Product(
            name="Кросівки Nike AIR MAX PLUS",
            description="Кросівки Nike Air Max Plus — це вибуховий мікс стилю, комфорту та натхнення, яке йде від самої природи. Їхній унікальний дизайн із хвилястими лініями, що нагадують океанські бризи та гнучкі силуети пальм.",
            price=9999,
            gender='man',
            color='black',
            quantity=5,
            article='p32',
            sizes=["40", "41", "43", "44"],
            subcategory_id=SubCategory.query.filter_by(name='sneakers').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        ),
        Product(
            name="Кросівки New Balance model 1000 Cordura",
            description="Кросівки New Balance model 1000 Cordura – це поєднання сміливого ретро-дизайну та передових технологій, натхненне футуристичним стилем архівних моделей.",
            price=9999,
            new_price=8999,
            gender='man',
            color='black',
            quantity=5,
            article='p33',
            sizes=["40", "41", "42", "43", "44"],
            subcategory_id=SubCategory.query.filter_by(name='sneakers').first().id,
            brand_id=Brand.query.filter_by(name="NewBalance").first().id,
        ),
         Product(
            name="Кросівки Adidas TERREX TRAILMAKER",
            description="Колекція Adidas Terrex створена для любителів активного відпочинку на природі та гарантує комфорт у будь-яких умовах.",
            price=9999,
            new_price=8999,
            gender='all',
            color='gray',
            quantity=5,
            article='p34',
            sizes=["37", "38", "39", "40", "41", "42", "43", "44"],
            subcategory_id=SubCategory.query.filter_by(name='sneakers').first().id,
            brand_id=Brand.query.filter_by(name="Adidas").first().id,
        ),
         Product(
            name="Рюкзак Nike Brasilia 9.5",
            description="Рюкзак Nike Brasilia 9.5 оснащений всім необхідним, щоб Ви мали змогу розкласти необхідне спорядження окремо для зручного та швидкого пошуку.",
            price=2999,
            gender='all',
            color='black',
            quantity=5,
            article='p35',
            subcategory_id=SubCategory.query.filter_by(name='backpacks').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        ),
       
    ]

    if Product.query.count() == 0:
        db.session.add_all(products)
        db.session.commit()
        print("Товари додано в базу даних.")

    images = [
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/64fb13c792f91-68e7b68.jpeg",
            product_id = products[0].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/64fb13cdf4118-68e7b68.jpeg",
            product_id = products[0].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/64fb13db731c5-68e7b68.jpeg",
            product_id = products[0].id
        ),

         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67cee0ced9bb6-68e7b68.jpeg",
            product_id = products[1].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67cee0cddda34-68e7b68.jpeg",
            product_id = products[1].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67cee0d07bfac-68e7b68.jpeg",
            product_id = products[1].id
        ),

         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/663b33f2e1a0a-68e7b68.jpeg",
            product_id = products[2].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/663b33f309e1e-68e7b68.jpeg",
            product_id = products[2].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/663b33f2919b8-68e7b68.jpeg",
            product_id = products[2].id
        ),

         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67cebea2266f6-68e7b68.jpeg",
            product_id = products[3].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67cebea1cf212-68e7b68.jpeg",
            product_id = products[3].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67cebe9fb7ef7-68e7b68.jpeg",
            product_id = products[3].id
        ),

         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67c8624b8125b-68e7b68.jpeg",
            product_id = products[4].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67c8624a3879c-68e7b68.jpeg",
            product_id = products[4].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67c862467c6e4-68e7b68.jpeg",
            product_id = products[4].id
        ),

         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67d000f715f57-68e7b68.jpeg",
            product_id = products[5].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67d000fc260e9-68e7b68.jpeg",
            product_id = products[5].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67d000f61032f-68e7b68.jpeg",
            product_id = products[5].id
        ),

         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67dbe4af334ed-68e7b68.jpeg",
            product_id = products[6].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67dbe4af28820-68e7b68.jpeg",
            product_id = products[6].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67dbe4b031207-68e7b68.jpeg",
            product_id = products[6].id
        ),

         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67812cab5cc0d-68e7b68.jpeg",
            product_id = products[7].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67812caaaee0d-68e7b68.jpeg",
            product_id = products[7].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67812c91d23ac-68e7b68.jpeg",
            product_id = products[7].id
        ),

         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b83e39e9a01-68e7b68.jpeg",
            product_id = products[8].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b83e381f16d-68e7b68.jpeg",
            product_id = products[8].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b83e38267e8-68e7b68.jpeg",
            product_id = products[8].id
        ),

        
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67cfe40cbb0ab-68e7b68.jpeg",
            product_id = products[9].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67cfe3f9258d6-68e7b68.jpeg",
            product_id = products[9].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67cfe3f8168e4-68e7b68.jpeg",
            product_id = products[9].id
        ),

        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67caaf00ad3b6-68e7b68.jpeg",
            product_id = products[10].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67caaf018105f-68e7b68.jpeg",
            product_id = products[10].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67caaf0025ec1-68e7b68.jpeg",
            product_id = products[10].id
        ),

        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/64fb13c792f91-68e7b68.jpeg",
            product_id = products[11].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/64fb13cdf4118-68e7b68.jpeg",
            product_id = products[11].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/64fb13db731c5-68e7b68.jpeg",
            product_id = products[11].id
        ),

         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67cee0ced9bb6-68e7b68.jpeg",
            product_id = products[12].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67cee0cddda34-68e7b68.jpeg",
            product_id = products[12].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67cee0d07bfac-68e7b68.jpeg",
            product_id = products[12].id
        ),

         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/663b33f2e1a0a-68e7b68.jpeg",
            product_id = products[13].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/663b33f309e1e-68e7b68.jpeg",
            product_id = products[13].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/663b33f2919b8-68e7b68.jpeg",
            product_id = products[13].id
        ),

         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67cebea2266f6-68e7b68.jpeg",
            product_id = products[14].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67cebea1cf212-68e7b68.jpeg",
            product_id = products[14].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67cebe9fb7ef7-68e7b68.jpeg",
            product_id = products[14].id
        ),

         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67c8624b8125b-68e7b68.jpeg",
            product_id = products[15].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67c8624a3879c-68e7b68.jpeg",
            product_id = products[15].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67c862467c6e4-68e7b68.jpeg",
            product_id = products[15].id
        ),

         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67d000f715f57-68e7b68.jpeg",
            product_id = products[16].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67d000fc260e9-68e7b68.jpeg",
            product_id = products[16].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67d000f61032f-68e7b68.jpeg",
            product_id = products[16].id
        ),

         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67dbe4af334ed-68e7b68.jpeg",
            product_id = products[17].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67dbe4af28820-68e7b68.jpeg",
            product_id = products[17].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67dbe4b031207-68e7b68.jpeg",
            product_id = products[17].id
        ),

         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67812cab5cc0d-68e7b68.jpeg",
            product_id = products[18].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67812caaaee0d-68e7b68.jpeg",
            product_id = products[18].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67812c91d23ac-68e7b68.jpeg",
            product_id = products[18].id
        ),

         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b83e39e9a01-68e7b68.jpeg",
            product_id = products[19].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b83e381f16d-68e7b68.jpeg",
            product_id = products[19].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b83e38267e8-68e7b68.jpeg",
            product_id = products[19].id
        ),

        
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67cfe40cbb0ab-68e7b68.jpeg",
            product_id = products[20].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67cfe3f9258d6-68e7b68.jpeg",
            product_id = products[20].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67cfe3f8168e4-68e7b68.jpeg",
            product_id = products[20].id
        ),

        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67caaf00ad3b6-68e7b68.jpeg",
            product_id = products[21].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67caaf018105f-68e7b68.jpeg",
            product_id = products[21].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67caaf0025ec1-68e7b68.jpeg",
            product_id = products[21].id
        ),

         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67a0d87c7ec03-68e7b68.jpeg",
            product_id = products[22].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67a0d87cd178d-68e7b68.jpeg",
            product_id = products[22].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67a0d8838307f-68e7b68.jpeg",
            product_id = products[22].id
        ),

         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b884ad63626-68e7b68.jpeg",
            product_id = products[23].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b884ae9c59c-68e7b68.jpeg",
            product_id = products[23].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b884af03853-68e7b68.jpeg",
            product_id = products[23].id
        ),

         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b480928cb3a-68e7b68.jpeg",
            product_id = products[24].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b480a372ae6-68e7b68.jpeg",
            product_id = products[24].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b48098b521b-68e7b68.jpeg",
            product_id = products[24].id
        ),

         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b73a5d89828-68e7b68.jpeg",
            product_id = products[25].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b73a603418f-68e7b68.jpeg",
            product_id = products[25].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b73a5bad375-68e7b68.jpeg",
            product_id = products[25].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67a0d87c7ec03-68e7b68.jpeg",
            product_id = products[26].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67a0d87cd178d-68e7b68.jpeg",
            product_id = products[26].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67a0d8838307f-68e7b68.jpeg",
            product_id = products[26].id
        ),

         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b884ad63626-68e7b68.jpeg",
            product_id = products[27].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b884ae9c59c-68e7b68.jpeg",
            product_id = products[27].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b884af03853-68e7b68.jpeg",
            product_id = products[27].id
        ),

         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b480928cb3a-68e7b68.jpeg",
            product_id = products[28].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b480a372ae6-68e7b68.jpeg",
            product_id = products[28].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b48098b521b-68e7b68.jpeg",
            product_id = products[28].id
        ),

         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b73a5d89828-68e7b68.jpeg",
            product_id = products[29].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b73a603418f-68e7b68.jpeg",
            product_id = products[29].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b73a5bad375-68e7b68.jpeg",
            product_id = products[29].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67a0d87c7ec03-68e7b68.jpeg",
            product_id = products[30].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67a0d87cd178d-68e7b68.jpeg",
            product_id = products[30].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67a0d8838307f-68e7b68.jpeg",
            product_id = products[30].id
        ),

         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b884ad63626-68e7b68.jpeg",
            product_id = products[31].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b884ae9c59c-68e7b68.jpeg",
            product_id = products[31].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b884af03853-68e7b68.jpeg",
            product_id = products[31].id
        ),

         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b480928cb3a-68e7b68.jpeg",
            product_id = products[32].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b480a372ae6-68e7b68.jpeg",
            product_id = products[32].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b48098b521b-68e7b68.jpeg",
            product_id = products[32].id
        ),

         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b73a5d89828-68e7b68.jpeg",
            product_id = products[33].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b73a603418f-68e7b68.jpeg",
            product_id = products[33].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67b73a5bad375-68e7b68.jpeg",
            product_id = products[33].id
        ),

         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67f8dc80c487f-68e7b68.jpeg",
            product_id = products[34].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/6628ed65b4c20-68e7b68.jpeg",
            product_id = products[34].id
        ),
         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/6628ed666576c-68e7b68.jpeg",
            product_id = products[34].id
        ),
    ]

    if ProductImage.query.count() == 0:
        db.session.add_all(images)
        db.session.commit()
        print("Фото товарів додано в базу даних.")
        
    
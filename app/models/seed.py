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
            name="Вітровка Nike M NK TCH WVN WR FZ JKT",
            description="Вітрівка Nike M Nk Rpl Miler Jkt відтворює класичний дизайн Windrunner та стане чудовим вибором для Ваших пробіжок. Виготовлена з якісного матеріалу, який має водовідштовхувальне покриття, що дозволить Вам займатись бігом у вологу погоду.",
            price=6970,
            gender='man',
            color='green',
            quantity=12,
            article='p1',
            sizes=["S", "M", "L", "XL"],
            subcategory_id=SubCategory.query.filter_by(name='outerwear').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        ),
        Product(
            name="Вітровка Nike M NK RPL MILER JKT",
            description="Вітрівка Nike M Nk Rpl Miler Jkt відтворює класичний дизайн Windrunner та стане чудовим вибором для Ваших пробіжок.",
            price=4570,
            gender='man',
            color='black',
            quantity=99,
            article='p2',
            sizes=["S", "M", "L", "XL"],
            subcategory_id=SubCategory.query.filter_by(name='outerwear').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        ),
        Product(
            name="Вітровка New Balance Woven Track Jacket",
            description="Вітрівка New Balance Woven Track Jacket — це ідеальне поєднання ретро-естетики та сучасного комфорту. Натхненна баскетбольними традиціями бренду.",
            price=5390,
            new_price=4570,
            gender='man',
            color='gray',
            quantity=99,
            article='p3',
            sizes=["S", "M", "L", "XL"],
            subcategory_id=SubCategory.query.filter_by(name='outerwear').first().id,
            brand_id=Brand.query.filter_by(name="NewBalance").first().id,
        ),
        Product(
            name="Вітровка Puma SPORT Windbreaker",
            description="Вітрівка Puma Sport Windbreaker стане Вашим незамінним супутником у динамічному ритмі життя, поєднуючи стиль та комфорт.",
            price=3600,
            new_price=2999,
            gender='man',
            color='black',
            quantity=99,
            article='p4',
            sizes=["S", "M", "L", "XL"],
            subcategory_id=SubCategory.query.filter_by(name='outerwear').first().id,
            brand_id=Brand.query.filter_by(name="Puma").first().id,
        ),
        Product(
            name="Поло Adidas Originals ESS POLO TEE",
            description="Поло New Balance Cotton Pique Polo – це бездоганне поєднання стилю та універсальності, яке стане незамінною частиною Вашого гардероба.",
            price=2599,
            new_price=1999,
            gender='man',
            color='black',
            quantity=99,
            article='p5',
            sizes=["S", "M", "L", "XL"],
            subcategory_id=SubCategory.query.filter_by(name='t-shirts').first().id,
            brand_id=Brand.query.filter_by(name="Adidas").first().id,
        ),
        Product(
            name="Поло New Balance Cotton Pique Polo 170951",
            description="Колекція Adidas Originals створена для тих, хто не боїться виділятися, хто впевнено крокує вулицями мегаполіса та цінує бездоганний стиль у кожній деталі.",
            price=2599,
            gender='man',
            color='black',
            quantity=99,
            article='p6',
            sizes=["S", "M", "L", "XL"],
            subcategory_id=SubCategory.query.filter_by(name='t-shirts').first().id,
            brand_id=Brand.query.filter_by(name="Adidas").first().id,
        ),
        Product(
            name="Поло Puma BMW MMS POLO",
            description="Колекція Puma BMW M Motorsport — це справжнє втілення швидкості, стилю та інновацій.",
            price=2599,
            gender='man',
            color='black',
            quantity=99,
            article='p7',
            sizes=["S", "M", "L", "XL"],
            subcategory_id=SubCategory.query.filter_by(name='t-shirts').first().id,
            brand_id=Brand.query.filter_by(name="Puma").first().id,
        ),
        Product(
            name="Поло Adidas Originals ESS POLO TEE",
            description="Колекція Adidas Originals створена для тих, хто не боїться виділятися.",
            price=1999,
            gender='man',
            color='white',
            quantity=99,
            article='p8',
            sizes=["S", "M", "L", "XL"],
            subcategory_id=SubCategory.query.filter_by(name='t-shirts').first().id,
            brand_id=Brand.query.filter_by(name="Adidas").first().id,
        ),
        Product(
            name="Шорти Nike M NK DF CHALLENGER 9UL SHORT",
            description="Шорти Nike M Nk Df Challenger 9ul Short стануть комфортним завершенням Ваших спортивних образів для бігу.",
            price=2050,
            new_price=1879,
            gender='man',
            color='black',
            quantity=99,
            article='p9',
            sizes=["S", "M", "L", "XL", "XXL"],
            subcategory_id=SubCategory.query.filter_by(name='shorts').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        ),
        Product(
            name="Шорти Puma M CLOUDSPUN BRANDED 5 SHORT",
            description="Шорти Puma M Cloudspun Branded 5 Short створені для того, щоб Ви були зосередженими та готовими до нових звершень під час тренувань.",
            price=2999,
            new_price=2439,
            gender='man',
            color='black',
            quantity=99,
            article='p10',
            sizes=["S", "M", "L", "XL", "XXL"],
            subcategory_id=SubCategory.query.filter_by(name='shorts').first().id,
            brand_id=Brand.query.filter_by(name="Puma").first().id,
        ),
        Product(
            name="Кросівки Nike Air Max Plus",
            description="Склад:100% текстиль; Пiдошва: 80% гума, 20% пластик; Колір:Чорний; Сезон:Весна-Літо 2025, Демисезон.",
            price=11999,
            new_price=10568,
            gender='man',
            color='black',
            quantity=99,
            article='p11',
            sizes=["39", "40", "41", "42", "43"],
            subcategory_id=SubCategory.query.filter_by(name='sneakers').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        ),
        Product(
            name="Кросівки Nike AIR MAX 90 DRIFT",
            description="Склад:100% текстиль; Пiдошва: 80% гума, 20% пластик; Колір:Чорний; Сезон:Весна-Літо 2025, Демисезон.",
            price=8280,
            gender='man',
            color='green',
            quantity=99,
            article='p12',
            sizes=["39", "40", "41", "42", "43", "44"],
            subcategory_id=SubCategory.query.filter_by(name='sneakers').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        ),
        Product(
            name="Кросівки Nike Air Max Plus",
            description="Кросівки Nike Air Max Plus стануть стильним акцентом Вашого повсякденного образу, додаючи відчуття свободи та натхнення пляжної атмосфери.",
            price=8280,
            gender='woman',
            color='white',
            quantity=99,
            article='p13',
            sizes=["36", "37", "38", "39", "40"],
            subcategory_id=SubCategory.query.filter_by(name='sneakers').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        ),
        Product(
            name="Кросівки Puma Inverse Premium Wns",
            description="Склад:Верх: 70,78% текстиль, 29,22% шкіра / Підошва: гума; Колір:Сірий;Сезон:Весна-Літо 2025, Літо, Демисезон;",
            price=6390,
            new_price=5999,
            gender='woman',
            color='white',
            quantity=99,
            article='p14',
            sizes=["36", "37", "38", "39", "40"],
            subcategory_id=SubCategory.query.filter_by(name='sneakers').first().id,
            brand_id=Brand.query.filter_by(name="Puma").first().id,
        ),
        Product(
            name="Вітровка Nike W NSW ESSNTL UV WVN JKT HD",
            description="Вітрівка Nike W Nsw Essntl Uv Wvn Jkt Hd – це поєднання стилю, комфорту та функціональності, яке стане незамінним у Вашому гардеробі.",
            price=3780,
            gender='woman',
            color='black',
            quantity=99,
            article='p15',
            sizes=["XS", "S", "M", "L"],
            subcategory_id=SubCategory.query.filter_by(name='outerwear').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        ),
        Product(
            name="Вітровка Adidas RUN IT JACKET",
            description="Вітрівка це поєднання стилю, комфорту та функціональності, яке стане незамінним у Вашому гардеробі.",
            price=3390,
            gender='woman',
            color='black',
            quantity=99,
            article='p16',
            sizes=["XS", "S", "M", "L"],
            subcategory_id=SubCategory.query.filter_by(name='outerwear').first().id,
            brand_id=Brand.query.filter_by(name="Adidas").first().id,
        ),
        Product(
            name="Вітровка Puma Relaxed Windbreaker",
            description="Вітрівка Puma Relaxed Windbreaker стане Вашим надійним партнером у будь-якій ситуації – чи то активний день у місті або несподівана пригода.",
            price=2659,
            gender='woman',
            color='black',
            quantity=99,
            article='p17',
            sizes=["XS", "S", "M", "L"],
            subcategory_id=SubCategory.query.filter_by(name='outerwear').first().id,
            brand_id=Brand.query.filter_by(name="Puma").first().id,
        ),
        Product(
            name="Кросівки Nike WMNS INITIATOR TRK3",
            description="Кросівки Nike Wmns Initiator Trk3 зачаровують оригінальним дизайном в стилі ретро з сучасними елементами та подарують відчуття легкості кожному Вашому кроку під час пробіжок.",
            price=4599,
            gender='all',
            color='white',
            quantity=99,
            article='p18',
            sizes=["36", "37", "38", "39", "40", "41", "42", "43", "44"],
            subcategory_id=SubCategory.query.filter_by(name='sneakers').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        ),
        Product(
            name="Кросівки Nike W CORTEZ TXT",
            description="Моделі Nike Cortez були розроблені в 1972 році співзасновником Nike Біллом Бауерманом. Вони швидко стали найпопулярнішим вибором для бігу та перетворились на впізнавану ікону.",
            price=4599,
            new_price=3999,
            gender='woman',
            color='black',
            quantity=99,
            article='p19',
            sizes=["40", "41", "42", "43", "44"],
            subcategory_id=SubCategory.query.filter_by(name='sneakers').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        ),
         Product(
            name="Кепка Puma FERRARI RACE PRO BB Cap",
            description="Колекція Puma Ferrari поєднує в собі елегантність і швидкість, відображаючи дух легендарної марки.",
            price=1999,
            gender='man',
            color='black',
            quantity=99,
            article='p20',
            sizes=[],
            subcategory_id=SubCategory.query.filter_by(name='baseball-caps').first().id,
            brand_id=Brand.query.filter_by(name="Puma").first().id,
        ),
         Product(
            name="Кепка Nike U NK DFADV FLY CAP U AB RFLTV",
            description="Кепка Nike U Nk Dfadv Fly Cap U Ab Rfltv зробить будь-які Ваші тренування на свіжому повітрі максимально комфортними.",
            price=1690,
            gender='all',
            color='black',
            quantity=99,
            article='p21',
            sizes=[],
            subcategory_id=SubCategory.query.filter_by(name='baseball-caps').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        )
    ]

    if Product.query.count() == 0:
        db.session.add_all(products)
        db.session.commit()
        print("Товари додано в базу даних.")

    images = [
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67cee0ced9bb6-68e7b68.jpeg",
            product_id = products[0].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67cee0cb78153-68e7b68.jpeg",
            product_id = products[0].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67cee0d3b8201-68e7b68.jpeg",
            product_id = products[0].id
        ),

        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/64fb13c792f91-68e7b68.jpeg",
            product_id = products[1].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/64fb13cdf4118-68e7b68.jpeg",
            product_id = products[1].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/64fb13c76f811-68e7b68.jpeg",
            product_id = products[1].id
        ),
        
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/679ccfc07e370-68e7b68.jpeg",
            product_id = products[2].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/679ccfc1742bf-68e7b68.jpeg",
            product_id = products[2].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/679ccfb8d5cc7-68e7b68.jpeg",
            product_id = products[2].id
        ),

        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67c5b7b892d29-68e7b68.jpeg",
            product_id = products[3].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67c5b7b9bc775-68e7b68.jpeg",
            product_id = products[3].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67c5b7b9482ed-68e7b68.jpeg",
            product_id = products[3].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67c5b7bbba680-68e7b68.jpeg",
            product_id = products[3].id
        ),

        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67c5b7b892d29-68e7b68.jpeg",
            product_id = products[3].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67c5b7b9bc775-68e7b68.jpeg",
            product_id = products[3].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67c5b7b9482ed-68e7b68.jpeg",
            product_id = products[3].id
        ),

         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/679cbe9ab110d-68e7b68.jpeg",
            product_id = products[4].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/679cbea07b992-68e7b68.jpeg",
            product_id = products[4].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/679cbe8c8c648-68e7b68.jpeg",
            product_id = products[4].id
        ),
       
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67caaefbbb0a5-68e7b68.jpeg",
            product_id = products[5].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67caaf02e9a03-68e7b68.jpeg",
            product_id = products[5].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67caaefa41a0b-68e7b68.jpeg",
            product_id = products[5].id
        ),

        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67bdae12207e7-68e7b68.jpeg",
            product_id = products[6].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67bdae0f8b4a4-68e7b68.jpeg",
            product_id = products[6].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67bdae0e79fe2-68e7b68.jpeg",
            product_id = products[6].id
        ),

        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67e56ca482153-68e7b68.jpeg",
            product_id = products[7].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67e56ca7f3307-68e7b68.jpeg",
            product_id = products[7].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67e56c9cc592e-68e7b68.jpeg",
            product_id = products[7].id
        ),

        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67f63bb7b63a0-68e7b68.jpeg",
            product_id = products[8].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67724a760fadd-68e7b68.jpeg",
            product_id = products[8].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67724a70647a8-68e7b68.jpeg",
            product_id = products[8].id
        ),

        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/6787bba1962a6-68e7b68.jpeg",
            product_id = products[9].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/6787bb9d88096-68e7b68.jpeg",
            product_id = products[9].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/6787bbb5335c3-68e7b68.jpeg",
            product_id = products[9].id
        ),

        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/65fada610da95-68e7b68.jpeg",
            product_id = products[10].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/65fada6092503-68e7b68.jpeg",
            product_id = products[10].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/65fada6118542-68e7b68.jpeg",
            product_id = products[10].id
        ),

        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67a0d87c7ec03-68e7b68.jpeg",
            product_id = products[11].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67a0d87cd178d-68e7b68.jpeg",
            product_id = products[11].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67a0d8838307f-68e7b68.jpeg",
            product_id = products[11].id
        ),

        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/678a5c404584d-68e7b68.jpeg",
            product_id = products[12].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/678a5c3a286f3-68e7b68.jpeg",
            product_id = products[12].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/678a5c3f523d9-68e7b68.jpeg",
            product_id = products[12].id
        ),

        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67e3d6e1ed1c6-68e7b68.jpeg",
            product_id = products[13].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67e3d6ec28656-68e7b68.jpeg",
            product_id = products[13].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67e3d6dfc04a5-68e7b68.jpeg",
            product_id = products[13].id
        ),

        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67aca152ccd04-68e7b68.jpeg",
            product_id = products[14].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67aca144bb8e3-68e7b68.jpeg",
            product_id = products[14].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67aca15779e12-68e7b68.jpeg",
            product_id = products[14].id
        ),

        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67e52ad76ea48-68e7b68.jpeg",
            product_id = products[15].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67e52ad9d4d88-68e7b68.jpeg",
            product_id = products[15].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67e52acf29081-68e7b68.jpeg",
            product_id = products[15].id
        ),

        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67c5be643451d-68e7b68.jpeg",
            product_id = products[16].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67c5be640c3af-68e7b68.jpeg",
            product_id = products[16].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/67c5be601aea7-68e7b68.jpeg",
            product_id = products[16].id
        ),

        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/677ce1be1c4ae-68e7b68.jpeg",
            product_id = products[17].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/677ce1bd669c8-68e7b68.jpeg",
            product_id = products[17].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/677ce1c060b20-68e7b68.jpeg",
            product_id = products[17].id
        ),

        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/677ba4a32cf1a-68e7b68.jpeg",
            product_id = products[18].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/677ba4a130a01-68e7b68.jpeg",
            product_id = products[18].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/677ba4a04c4ca-68e7b68.jpeg",
            product_id = products[18].id
        ),
    
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/679a24150db8a-68e7b68.jpeg",
            product_id = products[19].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/679a2418ccec0-68e7b68.jpeg",
            product_id = products[19].id
        ),

         ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/660d3d3262fc7-68e7b68.jpeg",
            product_id = products[20].id
        ),
        ProductImage(
            path = "https://megasport.ua/api/s3/images/megasport-dev/products/3555570144/660d3d330f63d-68e7b68.jpeg",
            product_id = products[20].id
        ),
    
    ]

    if ProductImage.query.count() == 0:
        db.session.add_all(images)
        db.session.commit()
        print("Фото товарів додано в базу даних.")
        
    
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
            name="Рюкзак CITY| банани 4/19",
            description="Універсальний рюкзак, Який розміром трохи менше нашого рюкзака BACKPACK-2. Компактний, але в той же час місткий. Однаково стильно буде виглядати як на чоловічих, так і на жіночих плечах. Велике основне відділення з кишенею для ноутбука (діагональ до 14). Зовнішній кишеню на блискавки. Зовні розташовані два еластичних бічних кишені з сітки. Дно рюкзака ущільнено. М'які регульовані лямки і спинка Оснащені високоякісної вентильованого сіткою 3D Air Mesh.",
            price=420,
            gender='all',
            color='yellow',
            quantity=12,
            article="R2",
            subcategory_id=SubCategory.query.filter_by(name='backpacks').first().id,
            brand_id=Brand.query.filter_by(name="Adidas").first().id,
        ),
        Product(
            name="Рюкзак CITY| чорна хвиля 4/19",
            description="Універсальний рюкзак, Який розміром трохи менше нашого рюкзака BACKPACK-2. Компактний, але в той же час місткий. Однаково стильно буде виглядати як на чоловічих, так і на жіночих плечах. Велике основне відділення з кишенею для ноутбука (діагональ до 14). Зовнішній кишеню на блискавки. Зовні розташовані два еластичних бічних кишені з сітки. Дно рюкзака ущільнено. М'які регульовані лямки і спинка Оснащені високоякісної вентильованого сіткою 3D Air Mesh.",
            price=420,
            gender='all',
            color='black',
            quantity=10,
            article="R2",
            subcategory_id=SubCategory.query.filter_by(name='backpacks').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        ),
         Product(
            name="Рюкзак BACKPACK-2 |  4/19",
            description="Унікальна модель рюкзака, який поєднує в собі неймовірну місткість і в той же час акуратність завдяки оптимальній кількості деталей. Виготовлений з дуже міцного поліестеру з водовідштовхувальними властивостями. Усередині основного відділення на замку знаходиться кишеню для ноутбука (діагоналлю до 15.6) на липучці. Ще один великий кишеню на блискавки зовні. З боків рюкзака розташовані два еластичних кишені з сітки. М'які регульовані лямки. Нашивка і пуллер з натуральної шкіри. Універсальний рюкзак ідеально підходить для повсякденного використання, а також, завдяки великому обсягу, для подорожей.",
            price = 440,
            gender='all',
            color='blue',
            quantity=10,
            article="R3",
            subcategory_id=SubCategory.query.filter_by(name='backpacks').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        ),
        Product(
            name="Рюкзак CORE | градієнт 3/19",
            description="Зручна модель рюкзака типу роллтоп стане в нагоді і в місті, і за його межами. Унікальна застібка основного кишені затягується ззаду, завдяки цьому стропа щільно прилягає до рюкзака і не стукає при ходьбі і бігу!. Анатомічні, м'які ручки прошиті спеціальної 3D сіткою Air Mesh, що дозволить зручно носити рюкзак",
            price = 650,
            gender='all',
            color='blue',
            quantity=10,
            article="R4",
            subcategory_id=SubCategory.query.filter_by(name='backpacks').first().id,
            brand_id=Brand.query.filter_by(name="Puma").first().id,
        ),
         Product(
            name="Сумка MINI REFLECTIVE 3 | 3/19",
            description="Сумка виконана з якісної поліестерової тканини, яка не боїться вологи і перепадів температур. Основне відділення на блискавці має 3 внутрішніх кишені різних розмірів для дрібниць. Ще один кишеню на блискавки знаходиться на лицьовій стороні. Підкладка: 100% поліестер. Ремінь - якісна стропа шириною 3 см. Довжина ременя регулюється, максимальна - 140 см. На лицьовій стороні рефлективний логотип. Пуллер із пластику максимально зручні у використанні. Аксесуар, завдяки якому найнеобхідніші речі завжди будуть з Вами, просто незамінний в повсякденному житті. Сумка відмінно підійде для портмоне, планшета, телефону або блокнота формату А5, а також різної дрібниці.",
            price = 230,
            gender='all',
            color='black',
            quantity=10,
            article="R5",
            subcategory_id=SubCategory.query.filter_by(name='bags-on-the-shoulder').first().id,
            brand_id=Brand.query.filter_by(name="Puma").first().id,
        ),
        Product(
            name="Сумка MESSENGER | 3/19",
            description="Сумка через плече COPYLEATHER зроблена спеціально під зошит стандартних розмірів! Мессенджер став незамінним в повсякденному застосуванні, ідеально підійде для студентів і просто будь-якого активній людині. Основна частина сумочки виконана з якісної поліестерової тканини, яка не боїться вологи і перепадів температур, низ вироби з еко-шкіри щільної і надміцної, також цей матеріал ми використовуємо для ущільнення дна рюкзаків. Основне відділення на блискавці має 2 внутрішніх кишені. На лицьовій стороні кишеню на блискавки. Підкладка: 100% поліестер. Ремінь - якісна стропа шириною 3 см. Довжина ременя регулюється, максимальна 140 см. Пуллер із пластику допоможуть зручно відкривати замки сумочки.",
            price = 230,
            gender='all',
            color='black',
            quantity=10,
            article="R6",
            subcategory_id=SubCategory.query.filter_by(name='bags-on-the-shoulder').first().id,
            brand_id=Brand.query.filter_by(name="Puma").first().id,
        ),
        Product(
            name="Сумка на пояс | 4/19",
            description="Поясна сумка виконана з якісної поліестерової тканини, яка не боїться вологи і перепадів температур. Має 4 кишені на блискавці: три зовнішніх і один внутрішній. Підкладка: 100% поліестер. Ремінь - якісна стропа шириною 4 см, дозволяє зафіксувати сумку в потрібному положенні. Довжина ременя регулюється, максимальний обхват 120 см. Незамінний в повсякденному житті аксесуар підійде кожному і стане не тільки красивим, але і практичним доповненням до Вашого образу.",
            price = 220,
            gender='all',
            color='black',
            quantity=10,
            article="R7",
            subcategory_id=SubCategory.query.filter_by(name='bananki').first().id,
            brand_id=Brand.query.filter_by(name="Puma").first().id,
        ),
        Product(
            name="Сумка на пояс | 3/19",
            description="Поясна сумка STINGER ущільнена з обох сторін піноматеріалом, тому добре тримає форму, також вона виконана з якісної еко-шкіри, яка не боїться вологи і перепадів температур. Два відділення на блискавці, а також правильна форма дозволять відмінно розподілити всі необхідні речі всередині. Підкладка: 100% поліестер. Ремінь - широка, дуже міцна стропа, яка фіксується за допомогою якісного фастекса.",
            price = 255,
            gender='all',
            color='orange',
            quantity=10,
            article="R8",
            subcategory_id=SubCategory.query.filter_by(name='bananki').first().id,
            brand_id=Brand.query.filter_by(name="Puma").first().id,
        ),
        Product(
            name="Membrana PROTECT | 3/19",
            description="Куртка з маскою PROTECT JACKET вже стала однією з візитних карток нашого бренду, вона знайшла своє застосування у багатьох субкультур.Унікальний, глибокий капюшон-маска зігріє ваше обличчя в осінні вітру або просто сховає від очей сторонніх.Утеплювач - holosoft (це дихаючий утеплювач нового покоління, який за своєю структурою більш щільний, ніж всі інші утеплювачі, а все волокна його з'єднані між собою, що не дасть йому збиватися після прання.Зручний, практичний крій куртки і основна тканина мембрана з характеристиками 5000х5000 зроблять куртку справжнім щитом від вітру, дощу і снігу в місті і за його межами.Виріб розраховане на осінь або ранню зиму.",
            price = 1056,
            gender='man',
            color='blue',
            quantity=10,
            article="R9",
            sizes=["S", "M", "L"],
            subcategory_id=SubCategory.query.filter_by(name='outerwear').first().id,
            brand_id=Brand.query.filter_by(name="Nike").first().id,
        ),
         Product(
            name="Куртка Демісезоннa | 3/19",
            description = "Демісезоннa куртка з міцної водовідштовхувальним тканини, але в той же час тканина дихає і не парить. Анатомічний, продуманий крій дозволить відчувати себе комфортно. Усередині прошитий до верхньої тканини утеплювач нового покоління holosoft 100, це дозволить носити річ від + 15 ° C до -0 ° C, в комфортному режимі. Саме ці якості настільки важливі для перехідного періоду, коли потрібно щоб куртка не парила і зігрівала.",
            price = 656,
            gender='man',
            color='black',
            quantity=10,
            article="R10",
            sizes=["S", "M", "L", "XL"],
            subcategory_id=SubCategory.query.filter_by(name='outerwear').first().id,
            brand_id=Brand.query.filter_by(name="Puma").first().id,
        ),
         Product(
            name="Зимові черевики | Койот 4/19",
            description = "",
            price = 1656,
            gender='man',
            color='orange',
            quantity=10,
            article="R11",
            sizes=["41", "42", "43", "44"],
            subcategory_id=SubCategory.query.filter_by(name='chereviki').first().id,
            brand_id=Brand.query.filter_by(name="Gard").first().id,
        ),
         Product(
            name="Кросівки| замша 3/18",
            description = "Верх: Натуральна замша. Підкладка: Натуральна шкіра + текстильний матеріал. Підошва: Поліуретан (ПУ)",
            price = 890,
            gender='man',
            color='black',
            quantity=10,
            article="R12",
            sizes=["41", "42", "43", "44"],
            subcategory_id=SubCategory.query.filter_by(name='sneakers').first().id,
            brand_id=Brand.query.filter_by(name="Gard").first().id,
        ),
        Product(
            name="Кеди| 3/19",
            description = "Матеріал - еко-шкіра. Якісна поліуретанова підошва. Дані кеди найкраще поєднувати з штанами чінос або джинсами трохи звуженого крою.",
            price = 580,
            new_price = 450,
            gender='man',
            color='black',
            quantity=10,
            article="R13",
            sizes=["41", "42", "43", "44"],
            subcategory_id=SubCategory.query.filter_by(name='sneakers').first().id,
            brand_id=Brand.query.filter_by(name="Gard").first().id,
        ),
        Product(
            name="Зимова шапка | 4/18",
            description = "Розмір: універсальний.Склад: 50% вовна, 50% акрил.Сезон: зима.Сірий колір.Шапка виконана з м'якого трикотажу. Деталі: щільна в'язка, широкий відворот, шкіряна нашивка з логотипом бренду.",
            price = 220,
            gender='woman',
            color='grey',
            quantity=10,
            article="R13",
            sizes=["41", "42", "43", "44"],
            subcategory_id=SubCategory.query.filter_by(name='hats').first().id,
            brand_id=Brand.query.filter_by(name="Gard").first().id,
        ),
    ]

    if Product.query.count() == 0:
        db.session.add_all(products)
        db.session.commit()
        print("Товари додано в базу даних.")

    images = [
        ProductImage(
            path = "https://gard.com.ua/image/cache/catalog/shop/products/6b635465-e8d8-11e9-95fd-9e1680149fdf-930x1240.jpg",
            product_id = products[0].id
        ),
         ProductImage(
            path = "https://gard.com.ua/image/cache/catalog/shop/products/6b63545e-e8d8-11e9-95fd-9e1680149fdf-930x1240.jpg",
            product_id = products[1].id
        ),
         ProductImage(
            path = "https://gard.com.ua/image/cache/catalog/shop/products/6b635459-e8d8-11e9-95fd-9e1680149fdf-930x1240.jpg",
            product_id = products[2].id
        ),
         ProductImage(
            path = "https://gard.com.ua/image/cache/catalog/shop/products/c57ca2be-e741-11e9-95fd-9e1680149fdf-930x1240.jpg",
            product_id = products[3].id
        ),
         ProductImage(
            path = "https://gard.com.ua/image/cache/catalog/shop/products/e1b6d26b-ea8b-11e9-95fd-9e1680149fdf-930x1240.jpg",
            product_id = products[4].id
        ),
         ProductImage(
            path = "https://gard.com.ua/image/cache/catalog/shop/products/075ba0e6-e5be-11e9-95fd-9e1680149fdf-930x1240.jpg",
            product_id = products[5].id
        ),
         ProductImage(
            path = "https://gard.com.ua/image/cache/catalog/shop/products/e1b6d26d-ea8b-11e9-95fd-9e1680149fdf-930x1240.jpg",
            product_id = products[4].id
        ),
         ProductImage(
            path = "https://gard.com.ua/image/cache/catalog/shop/products/53b72068-e353-11e9-95fd-9e1680149fdf-930x1240.jpg",
            product_id = products[5].id
        ),
         ProductImage(
            path = "https://gard.com.ua/image/cache/catalog/shop/products/3a1309ad-ea63-11e9-95fd-9e1680149fdf-930x1240.jpg",
            product_id = products[6].id
        ),
         ProductImage(
            path = "https://gard.com.ua/image/cache/catalog/shop/products/cf9a106e-e280-11e9-95fd-9e1680149fdf-930x1240.jpg",
            product_id = products[7].id
        ),
         ProductImage(
            path = "https://gard.com.ua/image/cache/catalog/shop/products/cf9a106c-e280-11e9-95fd-9e1680149fdf-930x1240.jpg",
            product_id = products[8].id
        ),
         ProductImage(
            path = "https://gard.com.ua/image/cache/catalog/shop/products/6def0457-e443-11e9-95fd-9e1680149fdf-930x1240.jpg",
            product_id = products[8].id
        ),
         ProductImage(
            path = "https://gard.com.ua/image/cache/catalog/shop/products/739d38b7-d32a-11e9-af8a-9e1680149fdf-930x1240.jpg",
            product_id = products[9].id
        ),
         ProductImage(
            path = "https://gard.com.ua/image/cache/catalog/shop/products/739d38b6-d32a-11e9-af8a-9e1680149fdf-930x1240.jpg",
            product_id = products[9].id
        ),
         ProductImage(
            path = "https://gard.com.ua/image/cache/catalog/shop/products/739d38b9-d32a-11e9-af8a-9e1680149fdf-930x1240.jpg",
            product_id = products[9].id
        ),
         ProductImage(
            path = "https://gard.com.ua/image/cache/catalog/shop/products/739d38b8-d32a-11e9-af8a-9e1680149fdf-930x1240.jpg",
            product_id = products[9].id
        ),
         ProductImage(
            path = "https://gard.com.ua/image/cache/catalog/shop/products/c3f8afbd-d6a8-11e8-ab13-ee24cb1b971f-930x1240.jpg",
            product_id = products[10].id
        ),
         ProductImage(
            path = "https://gard.com.ua/image/cache/catalog/shop/products/c3f8afb9-d6a8-11e8-ab13-ee24cb1b971f-930x1240.jpg",
            product_id = products[10].id
        ),
         ProductImage(
            path = "https://gard.com.ua/image/cache/catalog/shop/products/6b635446-e8d8-11e9-95fd-9e1680149fdf-930x1240.jpg",
            product_id = products[11].id
        ),
         ProductImage(
            path = "https://gard.com.ua/image/cache/catalog/shop/products/e1b6d273-ea8b-11e9-95fd-9e1680149fdf-930x1240.jpg",
            product_id = products[11].id
        ),
         ProductImage(
            path = "https://gard.com.ua/image/cache/catalog/shop/products/6e02da8a-d3a0-11e8-ab13-ee24cb1b971f-930x1240.jpg",
            product_id = products[12].id
        ),
         ProductImage(
            path = "https://gard.com.ua/image/cache/catalog/shop/products/abfa2206-cd57-11e9-af8a-9e1680149fdf-930x1240.jpg",
            product_id = products[13].id
        ),
         ProductImage(
            path = "https://gard.com.ua/image/cache/catalog/shop/products/abfa2205-cd57-11e9-af8a-9e1680149fdf-930x1240.jpg",
            product_id = products[13].id
        )
    ]

    if ProductImage.query.count() == 0:
        db.session.add_all(images)
        db.session.commit()
        print("Фото товарів додано в базу даних.")
        
    
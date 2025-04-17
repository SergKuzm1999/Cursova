import React, { Component } from 'react';
import '../PersonalDataPage/PersonalData.css';
import {Helmet} from "react-helmet";

class PublicOffer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount(){
        document.title = 'Публічна Оферта - Clothes4U';
      }
    render() {
        return (
            <div className='container personal-data-page'>
                <Helmet>
                    <title>Публічна Оферта - Clothes4U.com.ua</title>
                    <meta name="keywords" content={`женщин, мужчин, парням, девушкам, жінок, чоловіків, для, дівчат, хлопців, clothes4u, купить, цены, цена, скидки, Украине, интернет, магазин, купити, в, Україні, ціни`}/>
                    <meta name="Description" content="Купити одяг, взуття, аксесуари та рюкзаки по величезних знижках. Інтернет-магазин Clothes4U. Оплата після огляду. Доставка по Україні за 24 години." />
                </Helmet>
                <h1>договір публічної оферти</h1>
                <div className='row'>
                    <h4>ЗАГАЛЬНІ ПОЛОЖЕННЯ</h4>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>1.1</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                            Договір оферти, є офіційною пропозицією «Clothes4U», далі за текстом - «Продавець», укласти Договір купівлі-продажу товарів дистанційним способом, а саме через Інтернет-магазин, далі по тексту - «Договір», і розміщує Публічну оферту (пропозицію) на офіційному інтернет-сайті Продавця «www.clothes4u.com.ua (далі - «Інтернет-сайт»).
                        </p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>1.2</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                            Моментом повного і безумовного прийняття Покупцем пропозиції від Продавця (акцептом) укласти електронний договір купівлі-продажу товарів, вважається факт оплати Покупцем замовлення, на умовах цього Договору, у строки та за цінами, вказаними на Інтернет-сайті Продавця.                        </p>
                    </div>
                </div>
                <div className='row'>
                    <h4>ПОНЯТТЯ І ВИЗНАЧЕННЯ</h4>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>2.1</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                            Згідно цієї оферти, якщо контекст не вимагає іншого, наведені нижче терміни мають таке значення:
                        </p>
                        <ul>
                            <li>
                                <p>
                                    «Товар» — моделі, аксесуари, комплектуючі та супровідні предмети;
                                </p>
                            </li>
                            <li>
                                <p>
                                    «Інтернет-магазин» — відповідно до Закону України «Про електронну комерцію», засіб для презентації або реалізації товару, роботи або послуги шляхом здійснення електронної угоди.
                                </p>
                            </li>
                            <li>
                                <p>
                                    «Продавець» — компанія, яка реалізує товари, представлені на Інтернет-сайті.
                                </p>
                            </li>
                            <li>
                                <p>
                                    «Покупець» — фізична особа, що уклала з Продавцем Договір на умовах, викладених нижче.
                                </p>
                            </li>
                            <li>
                                <p>
                                    «Замовлення» — вибір окремих позицій з переліку товарів, визначених Покупцем при розміщенні замовлення і здійсненні оплати.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='row'>
                    <h4>ПРЕДМЕТ ДОГОВОРУ</h4>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>3.1</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                            Продавець зобов'язується передати у власність Покупця Товар, а Покупець зобов'язується оплатити і прийняти Товар на умовах даного Договору.                        </p>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>Цей Договір регулює купівлю-продаж товарів в Інтернет-магазині, в тому числі:</p>
                    </div>
                    </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <ul>
                            <li>
                                <p>
                                добровільний вибір Покупцем товарів в Інтернет-магазині.
                                </p>
                            </li>
                            <li>
                                <p>
                                самостійне оформлення Покупцем замовлення в Інтернет-магазині.                               
                                </p>
                            </li>
                            <li>
                                <p>
                                обробка та доставка замовлення Покупцеві у власність на умовах цього Договору.                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='row'>
                    <h4>ПОРЯДОК ОФОРМЛЕННЯ ЗАМОВЛЕННЯ</h4>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>4.1</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                        Покупець має право оформити замовлення на будь-який товар, представлений на сайті Інтернет-магазину і який є в наявності.                        </p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>4.2</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                        Кожна позиція може бути представлена в замовленні в будь-якій кількості
                        </p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>4.3</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                        При відсутності товару на складі, Менеджер компанії зобов'язаний поставити Покупця до відома (телефоном або через електронну пошту).
                        </p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>4.4</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                        При відсутності товару Покупець має право замінити його товаром аналогічної моделі, відмовитися від даного товару, анулювати замовлення.                        </p>
                    </div>
                </div>
                <div className='row'>
                    <h4>ПОРЯДОК ОПЛАТИ ЗАМОВЛЕННЯ</h4>
                </div>
                <div className='row'>
                    <h4>НАКЛАДЕНИМ ПЛАТЕЖЕМ</h4>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>5.1</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                        Оплата здійснюється за фактом отримання товару у відділеннях транспортних компаній за готівковий розрахунок в національній валюті.   
                        </p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>5.2</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                        При ненадходженні грошових коштів, Інтернет-магазин залишає за собою право анулювати замовлення.
                        </p>
                    </div>
                </div>
                <div className='row'>
                    <h4>УМОВИ ДОСТАВКИ ЗАМОВЛЕННЯ</h4>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>6.1</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                        Доставка товарів, придбаних в Інтернет-магазині, здійснюється до відділень Нової Пошти, де і відбувається видача замовлень.                 
                        </p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>6.2</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                        Разом із замовленням Покупцеві видаються документи згідно із законодавством України.
                        </p>
                    </div>
                </div>
                <div className='row'>
                    <h4>ПРАВА ТА ОБОВ'ЯЗКИ СТОРІН:</h4>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>7.1</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                            Продавець має право:
                        </p>
                        <ul>
                            <li>
                                <p>
                                    в односторонньому порядку припинити надання послуг за цим договором у разі порушення Покупцем умов цього Договору.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>7.2</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                        Покупець зобов'язаний:
                        </p>
                        <ul>
                            <li>
                                <p>
                                своєчасно оплатити та отримати замовлення на умовах цього Договору.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>7.3</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                        Покупець має право:
                        </p>
                        <ul>
                            <li>
                                <p>
                                оформити замовлення в Інтернет-магазині;
                                </p>
                            </li>
                            <li>
                                <p>
                                оформити електронний договір;
                                </p>
                            </li>
                            <li>
                                <p>
                                вимагати від Продавця виконання умов цього Договору.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='row'>
                    <h4>ВІДПОВІДАЛЬНІСТЬ СТОРІН</h4>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>8.1</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                        Сторони несуть відповідальність за невиконання або неналежне виконання умов цього Договору в порядку, передбаченому цим Договором та чинним законодавством України                        </p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>8.2</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                        Продавець не несе відповідальності:
                        </p>
                        <ul>
                            <li>
                                <p>
                                за змінений виробником зовнішній вигляд Товару;
                                </p>
                            </li>
                            <li>
                                <p>
                                за незначну невідповідність колірної гами товару, що може відрізнятися від оригіналу товару виключно через різну колірну передачу моніторів персональних комп'ютерів окремих моделей і мобільних пристроїв;
                                </p>
                            </li>
                            <li>
                                <p>
                                за зміст і правдивість інформації, наданої Покупцем при оформленні замовлення;
                                </p>
                            </li>
                            <li>
                                <p>
                                за затримку і перебої в наданні Послуг (обробки замовлення і доставки товару), які відбуваються з причин, що знаходяться поза сферою контролю Продавця;
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>8.3</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                        В разі настання обставин непереборної сили, сторони звільняються від виконання умов цього Договору. Під обставинами непереборної сили для цілей цього Договору розуміються події, що мають надзвичайний, непередбачуваний характер, які виключають або об'єктивно заважають виконанню цього Договору. Настання яких Сторони не могли передбачити і запобігти.   
                        </p>
                    </div>
               </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>8.4</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                        Сторони прикладуть максимум зусиль для вирішення будь-яких розбіжностей виключно шляхом переговорів
                        </p>
                    </div>
               </div>
                <div className='row'>
                    <h4>ВІДПОВІДАЛЬНІСТЬ СТОРІН</h4>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>9.1</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                        Інтернет-магазин залишає за собою право в односторонньому порядку вносити зміни до цього Договору, за умови попередньої публікації його на сайті www.clothes4u.com.ua.
                        </p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>9.2</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                        Інтернет-магазин створений для організації дистанційного способу продажу товарів через Інтернет.
                        </p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>9.3</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                        Покупець несе відповідальність за достовірність інформації, зазначеної при оформленні замовлення. При здійсненні акцепту (оформленні замовлення і подальшої оплати товару) Покупець надає Продавцю свою беззастережну згоду на збір, обробку, зберігання, використання своїх персональних даних, згідно ЗУ «Про захист персональних даних».                        
                        </p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>9.4</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                        Оплата Покупцем оформленого в Інтернет-магазині замовлення, означає повну згоду Покупця з умовами договору купівлі-продажу (публічної оферти).                        </p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>9.5</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                        Фактичною датою електронної угоди між сторонами є дата прийняття умов, відповідно до статті 11 Закону України «Про електронну комерцію».
                        </p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>9.6</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                        Перегляд товарів і процес оформлення замовлення для Покупця є безкоштовним.
                        </p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>9.7</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                        Інформація, що надається Покупцем, є конфіденційною. Інтернет-магазин використовує інформацію про Покупця виключно в цілях обробки замовлення, відправлення повідомлень Покупцеві, доставки товару, здійснення взаєморозрахунків та інших дій, пов'язаних з виконанням замовлення.
                        </p>
                    </div>
                </div>
                <div className='row'>
                    <h4>ПОРЯДОК ПОВЕРНЕННЯ ТОВАРУ НАЛЕЖНОЇ ЯКОСТІ</h4>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>10.1</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                        Повернення товару в Інтернет-магазин проводиться згідно з чинним законодавством України.
                         </p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>10.2</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                        Повернення товару належної якості в Інтернет-магазин проводиться за рахунок Покупця.
                         </p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>10.3</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                        При поверненні Покупцем товару належної якості, Інтернет-магазин повертає йому сплачену за товар грошову суму за фактом повернення товару за вирахуванням компенсації витрат Інтернет-магазину пов'язаних з доставкою товару Покупцеві.                         </p>
                    </div>
                </div>
                <div className='row'>
                    <h4>ТЕРМІН ДІЇ ДОГОВОРУ</h4>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>11.1</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                        Електронний договір вважається укладеним з моменту одержання особою, яка направила пропозицію укласти такий договір, відповіді про прийняття цієї пропозиції в порядку, визначеному частиною шостою статті 11 Закону України «Про електронну комерцію».                         </p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>11.2</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                        До закінчення терміну дії, цей Договір може бути розірваний за взаємною згодою сторін до початку процесу фактичної доставки товару, шляхом повернення грошових коштів.
                        </p>                   
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-1 col-md-1 col-sm-1 col-2'>
                        <span>11.3</span>
                    </div>
                    <div className='col col-lg-11 col-md-11 col-sm-11 col-10'>
                        <p>
                        Сторони мають право розірвати цей Договір в односторонньому порядку, в разі невиконання однією із сторін умов цього Договору, та у випадках передбачених чинним законодавством України.
                        </p>                   
                    </div>
                </div>
            </div>
        );
    }
}

export default PublicOffer;
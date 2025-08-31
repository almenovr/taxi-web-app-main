const axios = require('axios');

async function createDemoData() {
  try {
    console.log('🎬 Создание демо-данных...');

    const baseURL = 'http://localhost:1337';

    // Данные для входа (замените на свои)
    const loginData = {
      email: 'almenov.r.r.i.1.16@gmail.com', // Замените на ваш email
      password: 'Ralmenov98' // Замените на ваш пароль
    };

    let authToken = null;

    try {
      const loginResponse = await axios.post(`${baseURL}/admin/login`, loginData);
      authToken = loginResponse.data.data.token;
      console.log('✅ Аутентификация успешна');
    } catch (loginError) {
      console.log('❌ Ошибка аутентификации. Проверьте email и пароль в скрипте');
      console.log('💡 Измените данные в loginData в файле create-demo-data.js');
      return;
    }

    const headers = {
      Authorization: `Bearer ${authToken}`
    };

    // Создаем демо-автомобили
    console.log('🚗 Создание демо-автомобилей...');

    const carsData = [
      {
        className: "Эконом",
        listCars: "Hyundai Solaris, Kia Rio, Volkswagen Polo",
        price: 2500,
        description: "<p>Комфортный автомобиль эконом-класса для повседневных поездок. Оснащен кондиционером и аудиосистемой.</p>",
        isBusiness: false,
        pricePerKm: 25
      },
      {
        className: "Комфорт",
        listCars: "Toyota Camry, Kia Optima, Hyundai Sonata",
        price: 3500,
        description: "<p>Комфортный автомобиль бизнес-класса с повышенным уровнем комфорта. Идеален для деловых поездок.</p>",
        isBusiness: false,
        pricePerKm: 35
      },
      {
        className: "Бизнес",
        listCars: "Mercedes E-Class, BMW 5-Series, Audi A6",
        price: 5500,
        description: "<p>Премиальный автомобиль бизнес-класса с максимальным комфортом и дополнительными услугами.</p>",
        isBusiness: true,
        pricePerKm: 55
      }
    ];

    const createdCars = [];

    for (const carData of carsData) {
      try {
        const response = await axios.post(`${baseURL}/api/cars`, { data: carData }, { headers });
        createdCars.push(response.data.data);
        console.log(`✅ Создан автомобиль: ${carData.className}`);
      } catch (error) {
        console.log(`⚠️ Ошибка создания автомобиля ${carData.className}:`, error.response?.data?.message);
      }
    }

    // Создаем демо-направления
    console.log('🗺️ Создание демо-направлений...');

    const destinationsData = [
      {
        title: "Симферополь - Ялта",
        cityOrigin: "Симферополь",
        cityWhen: "Ялта",
        description: "<p>Популярный маршрут из столицы Крыма в курортную Ялту. Путь проходит через живописные горы и долины.</p><p>Время в пути: около 2 часов. Расстояние: 85 км.</p>",
        siteTitle: "Такси Симферополь - Ялта | Комфортные поездки",
        siteDescription: "Заказать такси из Симферополя в Ялту. Быстрая подача, фиксированные цены, профессиональные водители.",
        mapLink: "https://yandex.ru/map-widget/v1/?um=constructor%3A123456789&source=constructor",
        cars: createdCars.map(car => car.id), // Ссылаемся на ID созданных автомобилей
        faqs: [
          {
            faqTitle: "Как долго занимает поездка?",
            faqDescription: "Поездка занимает около 2 часов в зависимости от дорожных условий."
          },
          {
            faqTitle: "Какие автомобили доступны?",
            faqDescription: "У нас есть автомобили эконом, комфорт и бизнес-класса."
          },
          {
            faqTitle: "Можно ли остановиться по пути?",
            faqDescription: "Да, вы можете попросить водителя сделать остановку в удобном месте."
          }
        ],
        textBlock: [
          {
            body: "<h3>Достопримечательности по пути</h3><p>Во время поездки вы сможете насладиться видами на:</p><ul><li>Чатыр-Даг - священную гору крымских татар</li><li>Ай-Петри - горный массив с панорамными видами</li><li>Ливадийский дворец - историческую резиденцию</li></ul>"
          }
        ]
      },
      {
        title: "Симферополь - Алушта",
        cityOrigin: "Симферополь",
        cityWhen: "Алушта",
        description: "<p>Удобный маршрут до курортной Алушты. Проходит через живописные места Южного берега Крыма.</p><p>Время в пути: около 1.5 часов. Расстояние: 55 км.</p>",
        siteTitle: "Такси Симферополь - Алушта | Надежные перевозки",
        siteDescription: "Заказать такси из Симферополя в Алушту. Комфортные автомобили, опытные водители, выгодные цены.",
        mapLink: "https://yandex.ru/map-widget/v1/?um=constructor%3A987654321&source=constructor",
        cars: createdCars.map(car => car.id), // Ссылаемся на ID созданных автомобилей
        faqs: [
          {
            faqTitle: "Есть ли остановки по пути?",
            faqDescription: "Да, мы можем сделать остановку в живописных местах."
          },
          {
            faqTitle: "Какие способы оплаты?",
            faqDescription: "Принимаем наличные, банковские карты и переводы."
          }
        ],
        textBlock: [
          {
            body: "<h3>Что посмотреть в Алуште</h3><p>Алушта предлагает множество достопримечательностей:</p><ul><li>Крепость Алустон - древняя генуэзская крепость</li><li>Воронцовский дворец - архитектурный шедевр</li><li>Морской порт - отправная точка морских прогулок</li></ul>"
          }
        ]
      }
    ];

    for (const destinationData of destinationsData) {
      try {
        const response = await axios.post(`${baseURL}/api/destinations`, { data: destinationData }, { headers });
        console.log(`✅ Создано направление: ${destinationData.title}`);
      } catch (error) {
        console.log(`⚠️ Ошибка создания направления ${destinationData.title}:`, error.response?.data?.message);
      }
    }

    // Создаем глобальные настройки
    console.log('🌍 Создание глобальных настроек...');

    const globalData = {
      siteName: "Такси Сервис Крыма",
      siteDescription: "Надежные и комфортные перевозки по Крыму. Быстрая подача автомобилей, профессиональные водители, выгодные цены.",
      sliderTitle: "Заказ такси по Крыму",
      sliderText: "Быстрая подача автомобиля, фиксированные цены, профессиональные водители. Путешествуйте с комфортом!",
      blockTitle: "Почему выбирают нас",
      blockText: "<p>Мы предоставляем качественные услуги такси по всему Крыму уже более 5 лет.</p>",
      blockTitleTwo: "Наши преимущества",
      blockTextTwo: "<p>Фиксированные цены, круглосуточная поддержка, современный автопарк.</p>",
      blockTitleThree: "Популярные направления",
      blockTextThree: "<p>Самые востребованные маршруты по Крыму с подробным описанием.</p>",
      blockTitleFour: "Отзывы клиентов",
      blockTextFour: "<p>Что говорят наши клиенты о качестве услуг.</p>",
      blockTitleFive: "Контакты",
      blockTextFive: "<p>Свяжитесь с нами для заказа такси или получения дополнительной информации.</p>"
    };

    try {
      const response = await axios.post(`${baseURL}/api/global`, { data: globalData }, { headers });
      console.log('✅ Глобальные настройки созданы');
    } catch (error) {
      console.log('⚠️ Ошибка создания глобальных настроек:', error.response?.data?.message);
    }

    console.log('🎉 Демо-данные созданы успешно!');
    console.log('📱 Теперь можно просматривать сайт с контентом');

  } catch (error) {
    console.error('❌ Ошибка создания демо-данных:', error.response?.data || error.message);
  }
}

createDemoData();
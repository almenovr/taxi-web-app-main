const axios = require('axios');

async function quickSetup() {
  try {
    console.log('🚀 Быстрая настройка контента...');

    const baseURL = 'http://localhost:1337';

    // Создаем тестовые автомобили
    console.log('🚗 Создание автомобилей...');

    const cars = [
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

    for (const car of cars) {
      try {
        const response = await axios.post(`${baseURL}/api/cars`, { data: car });
        createdCars.push(response.data.data.id);
        console.log(`✅ Создан автомобиль: ${car.className}`);
      } catch (error) {
        console.log(`⚠️ Ошибка создания автомобиля ${car.className}:`, error.response?.data?.message || error.message);
      }
    }

    // Создаем тестовое направление
    console.log('🗺️ Создание направления...');

    const destination = {
      title: "Симферополь - Ялта",
      cityOrigin: "Симферополь",
      cityWhen: "Ялта",
      description: "<p>Популярный маршрут из столицы Крыма в курортную Ялту. Путь проходит через живописные горы и долины.</p><p>Время в пути: около 2 часов. Расстояние: 85 км.</p>",
      siteTitle: "Такси Симферополь - Ялта | Комфортные поездки",
      siteDescription: "Заказать такси из Симферополя в Ялту. Быстрая подача, фиксированные цены, профессиональные водители.",
      cars: createdCars,
      faqs: [
        {
          faqTitle: "Как долго занимает поездка?",
          faqDescription: "Поездка занимает около 2 часов в зависимости от дорожных условий."
        },
        {
          faqTitle: "Какие автомобили доступны?",
          faqDescription: "У нас есть автомобили эконом, комфорт и бизнес-класса."
        }
      ],
      textBlock: [
        {
          body: "<h3>Достопримечательности по пути</h3><p>Во время поездки вы сможете насладиться видами на:</p><ul><li>Чатыр-Даг - священную гору крымских татар</li><li>Ай-Петри - горный массив с панорамными видами</li><li>Ливадийский дворец - историческую резиденцию</li></ul>"
        }
      ]
    };

    try {
      const destResponse = await axios.post(`${baseURL}/api/destinations`, { data: destination });
      console.log(`✅ Создано направление: ${destination.title}`);
      console.log(`🔗 Slug: ${destResponse.data.data.slug}`);
    } catch (error) {
      console.log(`⚠️ Ошибка создания направления:`, error.response?.data?.message || error.message);
    }

    console.log('🎉 Настройка завершена!');
    console.log('📱 Проверьте результат:');
    console.log('   - Админка: http://localhost:1337/admin');
    console.log('   - Сайт: http://localhost:3000');
    console.log('   - Страница направления: http://localhost:3000/simferopol-yalta');

  } catch (error) {
    console.error('❌ Ошибка быстрой настройки:', error.message);
    console.log('💡 Убедитесь, что permissions настроены в админке');
  }
}

quickSetup();
const axios = require('axios');

async function createGlobalContent() {
  try {
    console.log('🌍 Создание глобального контента...');

    const baseURL = 'http://localhost:1337';

    // Создать глобальные настройки
    const globalData = {
      siteName: 'Такси Сервис',
      siteDescription: 'Быстрый и надежный заказ такси по Крыму',
      sliderTitle: 'Заказ такси по лучшим ценам',
      sliderText: 'Профессиональные водители, комфортные автомобили, фиксированные цены',
      blockText: 'Почему выбирают нас?',
      blockTitle: 'Преимущества нашего сервиса',
      blockTextTwo: 'Популярные направления',
      blockTitleTwo: 'Куда мы возим',
      blockTextThree: 'Отзывы клиентов',
      blockTitleThree: 'Что говорят наши пассажиры',
      blockTextFour: 'Дополнительные услуги',
      blockTitleFour: 'Мы предлагаем',
      blockTextFive: 'Контакты',
      blockTitleFive: 'Свяжитесь с нами',
      publishedAt: new Date().toISOString()
    };

    const globalResponse = await axios.post(`${baseURL}/api/global`, {
      data: globalData
    });

    console.log('✅ Глобальные настройки созданы:', globalResponse.data.data.id);

    // Создать тестовые направления
    const destinations = [
      {
        title: 'Симферополь - Ялта',
        slug: 'simferopol-yalta',
        cityOrigin: 'Симферополь',
        cityWhen: 'Ялта',
        description: 'Популярный маршрут из Симферополя в Ялту через живописные горы Крыма',
        siteTitle: 'Такси Симферополь - Ялта | Заказать трансфер',
        siteDescription: 'Заказ такси из Симферополя в Ялту. Комфортная поездка, фиксированная цена, профессиональные водители.',
        publishedAt: new Date().toISOString()
      },
      {
        title: 'Симферополь - Алушта',
        slug: 'simferopol-alushta',
        cityOrigin: 'Симферополь',
        cityWhen: 'Алушта',
        description: 'Удобный трансфер из Симферополя в Алушту с остановками в живописных местах',
        siteTitle: 'Такси Симферополь - Алушта | Трансфер в Алушту',
        siteDescription: 'Заказать такси из Симферополя в Алушту. Надежный транспорт, комфортные условия поездки.',
        publishedAt: new Date().toISOString()
      },
      {
        title: 'Симферополь - Севастополь',
        slug: 'simferopol-sevastopol',
        cityOrigin: 'Симферополь',
        cityWhen: 'Севастополь',
        description: 'Быстрый и безопасный маршрут из Симферополя в Севастополь',
        siteTitle: 'Такси Симферополь - Севастополь | Трансфер в Севастополь',
        siteDescription: 'Заказ такси Симферополь - Севастополь. Профессиональные водители, современные автомобили.',
        publishedAt: new Date().toISOString()
      }
    ];

    for (const dest of destinations) {
      const destResponse = await axios.post(`${baseURL}/api/destinations`, {
        data: dest
      });
      console.log(`✅ Создано направление: ${dest.title}`);

      // Создать автомобили для каждого направления
      const cars = [
        {
          className: 'Эконом',
          listCars: 'Hyundai Solaris, Kia Rio, Volkswagen Polo',
          price: dest.cityWhen === 'Ялта' ? 2500 : dest.cityWhen === 'Алушта' ? 1800 : 1500,
          description: 'Комфортный автомобиль эконом-класса с кондиционером',
          isBusiness: false,
          pricePerKm: 25
        },
        {
          className: 'Комфорт',
          listCars: 'Toyota Camry, Kia Optima, Hyundai Sonata',
          price: dest.cityWhen === 'Ялта' ? 3500 : dest.cityWhen === 'Алушта' ? 2500 : 2200,
          description: 'Бизнес-класс автомобиль с повышенным комфортом',
          isBusiness: true,
          pricePerKm: 35
        }
      ];

      for (const car of cars) {
        await axios.post(`${baseURL}/api/cars`, {
          data: {
            ...car,
            destination: destResponse.data.data.id
          }
        });
      }
      console.log(`   📍 Созданы автомобили для ${dest.title}`);
    }

    console.log('🎉 Все данные успешно созданы!');
    console.log('📱 Теперь можно открыть: http://localhost:3000');

  } catch (error) {
    console.error('❌ Ошибка создания данных:', error.response?.data || error.message);
    console.log('💡 Убедитесь, что публичные разрешения настроены в админке');
  }
}

createGlobalContent();
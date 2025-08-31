const axios = require('axios');

async function createContentWithAuth() {
  try {
    console.log('🔐 Попытка аутентификации...');

    const baseURL = 'http://localhost:1337';

    // Сначала попробуем войти как администратор
    // По умолчанию логин: admin@admin.com, пароль: admin (или создайте пользователя)
    const loginData = {
      email: 'almenov.r.r.i.1.16@gmail.com  ',
      password: 'Ralmenov98'
    };

    let authToken = null;

    try {
      const loginResponse = await axios.post(`${baseURL}/admin/login`, loginData);
      authToken = loginResponse.data.data.token;
      console.log('✅ Аутентификация успешна');
    } catch (loginError) {
      console.log('⚠️ Автоматическая аутентификация не удалась');
      console.log('💡 Создайте пользователя в админке и настройте права');
      return;
    }

    // Создаем заголовки с токеном
    const headers = {
      Authorization: `Bearer ${authToken}`
    };

    console.log('🌍 Создание глобального контента...');

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
    }, { headers });

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
      }
    ];

    for (const dest of destinations) {
      const destResponse = await axios.post(`${baseURL}/api/destinations`, {
        data: dest
      }, { headers });

      console.log(`✅ Создано направление: ${dest.title}`);

      // Создать автомобили для каждого направления
      const cars = [
        {
          className: 'Эконом',
          listCars: 'Hyundai Solaris, Kia Rio, Volkswagen Polo',
          price: dest.cityWhen === 'Ялта' ? 2500 : 1800,
          description: 'Комфортный автомобиль эконом-класса с кондиционером',
          isBusiness: false,
          pricePerKm: 25
        },
        {
          className: 'Комфорт',
          listCars: 'Toyota Camry, Kia Optima, Hyundai Sonata',
          price: dest.cityWhen === 'Ялта' ? 3500 : 2500,
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
        }, { headers });
      }
      console.log(`   📍 Созданы автомобили для ${dest.title}`);
    }

    console.log('🎉 Все данные успешно созданы!');
    console.log('📱 Теперь можно открыть: http://localhost:3000');

  } catch (error) {
    console.error('❌ Ошибка создания данных:', error.response?.data || error.message);
    console.log('💡 Убедитесь, что пользователь admin существует в админке');
    console.log('   По умолчанию: admin@admin.com / admin');
  }
}

createContentWithAuth();
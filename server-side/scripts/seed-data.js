const axios = require('axios');

async function seedData() {
  try {
    console.log('🌱 Создание тестовых данных...');

    const baseURL = 'http://localhost:1337';

    // Создать тестовое направление
    const destinationData = {
      title: 'Симферополь - Ялта',
      slug: 'simferopol-yalta',
      cityOrigin: 'Симферополь',
      cityWhen: 'Ялта',
      description: 'Популярный маршрут из Симферополя в Ялту',
      siteTitle: 'Такси Симферополь - Ялта',
      siteDescription: 'Заказ такси из Симферополя в Ялту по лучшим ценам',
      mapLink: 'https://yandex.ru/map-widget/v1/?um=constructor%3Acb98237bacdbcc430408827bec889c5219a2110da3c013cd3afc65cf67a5f861',
      publishedAt: new Date().toISOString()
    };

    const destinationResponse = await axios.post(`${baseURL}/api/destinations`, {
      data: destinationData
    });

    console.log('✅ Создано направление:', destinationResponse.data.data.id);

    // Создать автомобиль для этого направления
    const carData = {
      className: 'Эконом',
      carImg: null, // Можно добавить позже через админку
      listCars: 'Hyundai Solaris, Kia Rio',
      price: 2500,
      description: 'Комфортный автомобиль эконом-класса',
      isBusiness: false,
      pricePerKm: 25
    };

    await axios.post(`${baseURL}/api/cars`, {
      data: {
        ...carData,
        destination: destinationResponse.data.data.id
      }
    });

    console.log('✅ Создан автомобиль');

    // Создать FAQ
    const faqData = {
      faqTitle: 'Как долго длится поездка?',
      faqDescription: 'Поездка занимает примерно 1.5-2 часа в зависимости от дорожных условий.'
    };

    await axios.post(`${baseURL}/api/faqs`, {
      data: {
        ...faqData,
        destination: destinationResponse.data.data.id
      }
    });

    console.log('✅ Создан FAQ');

    console.log('🎉 Тестовые данные успешно созданы!');
    console.log('📱 Теперь можно открыть: http://localhost:3000/simferopol-yalta');

  } catch (error) {
    console.error('❌ Ошибка создания данных:', error.response?.data || error.message);
    console.log('💡 Сначала настройте публичный доступ в админке: http://localhost:1337/admin');
  }
}

seedData();
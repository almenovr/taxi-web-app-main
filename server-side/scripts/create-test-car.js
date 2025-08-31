const axios = require('axios');

async function createTestCar() {
  try {
    console.log('🚗 Создание тестового автомобиля...');

    const baseURL = 'http://localhost:1337';

    // Создаем автомобиль без аутентификации (если API открыт)
    const carData = {
      className: "Эконом",
      listCars: "Hyundai Solaris, Kia Rio, Volkswagen Polo",
      price: 2500,
      description: "<p>Комфортный автомобиль эконом-класса для повседневных поездок. Оснащен кондиционером и аудиосистемой.</p>",
      isBusiness: false,
      pricePerKm: 25
    };

    const response = await axios.post(`${baseURL}/api/cars`, { data: carData });
    console.log('✅ Автомобиль создан:', response.data.data.id);

    // Теперь создаем направление и связываем с автомобилем
    const destinationData = {
      title: "Симферополь - Ялта (Тест)",
      cityOrigin: "Симферополь",
      cityWhen: "Ялта",
      description: "<p>Тестовое направление с автомобилем</p>",
      siteTitle: "Тестовое направление",
      siteDescription: "Тестовое описание",
      cars: [response.data.data.id] // Ссылка на созданный автомобиль
    };

    const destResponse = await axios.post(`${baseURL}/api/destinations`, { data: destinationData });
    console.log('✅ Направление создано:', destResponse.data.data.slug);

  } catch (error) {
    console.error('❌ Ошибка:', error.response?.data || error.message);
  }
}

createTestCar();
const axios = require('axios');

async function configurePermissions() {
  try {
    console.log('🔧 Настройка публичных разрешений...');

    // Получить токен администратора (если есть)
    // Или создать публичную роль с разрешениями

    const baseURL = 'http://localhost:1337';

    // Попробуем получить публичную роль
    const rolesResponse = await axios.get(`${baseURL}/api/users-permissions/roles`);
    const publicRole = rolesResponse.data.roles.find(role => role.type === 'public');

    if (publicRole) {
      console.log('✅ Найдена публичная роль:', publicRole.id);

      // Обновить разрешения для публичной роли
      const permissions = {
        'api::global.global': {
          find: { enabled: true }
        },
        'api::destination.destination': {
          find: { enabled: true },
          findOne: { enabled: true }
        },
        'api::car.car': {
          find: { enabled: true },
          findOne: { enabled: true }
        },
        'plugin::upload.file': {
          find: { enabled: true },
          findOne: { enabled: true }
        }
      };

      await axios.put(`${baseURL}/api/users-permissions/roles/${publicRole.id}`, {
        permissions
      });

      console.log('✅ Публичные разрешения настроены!');
    } else {
      console.log('⚠️ Публичная роль не найдена');
    }

  } catch (error) {
    console.error('❌ Ошибка настройки разрешений:', error.message);

    // Альтернативный подход - создать простой API endpoint для тестирования
    console.log('💡 Попробуйте открыть админку и настроить разрешения вручную:');
    console.log('   http://localhost:1337/admin');
  }
}

configurePermissions();
const axios = require('axios');

async function setupContentTypes() {
  try {
    console.log('🔧 Настройка типов контента...');

    const baseURL = 'http://localhost:1337';

    // Сначала попробуем войти как администратор
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
      console.log('⚠️ Автоматическая аутентификация не удалась');
      console.log('💡 Создайте пользователя в админке и настройте права');
      return;
    }

    const headers = {
      Authorization: `Bearer ${authToken}`
    };

    // Создаем Collection Type для автомобилей
    console.log('🚗 Создание типа контента Car...');
    const carTypeData = {
      contentType: {
        kind: 'collectionType',
        collectionName: 'cars',
        displayName: 'Car',
        description: 'Автомобили для такси',
        pluralName: 'cars',
        singularName: 'car',
        attributes: {
          className: {
            type: 'string',
            required: true
          },
          listCars: {
            type: 'string',
            required: true
          },
          price: {
            type: 'integer',
            required: true
          },
          description: {
            type: 'richtext',
            required: true
          },
          isBusiness: {
            type: 'boolean',
            default: false
          },
          pricePerKm: {
            type: 'decimal',
            required: true
          },
          carImg: {
            type: 'media',
            multiple: false,
            required: false,
            allowedTypes: ['images']
          },
          destinations: {
            type: 'relation',
            relation: 'manyToMany',
            target: 'api::destination.destination',
            inversedBy: 'cars'
          }
        },
        options: {
          draftAndPublish: true
        },
        pluginOptions: {}
      }
    };

    try {
      await axios.post(`${baseURL}/content-type-builder/content-types`, carTypeData, { headers });
      console.log('✅ Тип контента Car создан');
    } catch (error) {
      console.log('⚠️ Тип контента Car уже существует или ошибка:', error.response?.data?.message);
    }

    // Создаем компонент faqs
    console.log('❓ Создание компонента faqs...');
    const faqsData = {
      component: {
        category: 'shared',
        displayName: 'FAQs',
        icon: 'question-circle',
        attributes: {
          faqTitle: {
            type: 'string',
            required: true
          },
          faqDescription: {
            type: 'text',
            required: true
          }
        }
      }
    };

    try {
      await axios.post(`${baseURL}/content-type-builder/components`, faqsData, { headers });
      console.log('✅ Компонент faqs создан');
    } catch (error) {
      console.log('⚠️ Компонент faqs уже существует или ошибка:', error.response?.data?.message);
    }

    // Создаем компонент rich-text
    console.log('📝 Создание компонента rich-text...');
    const richTextData = {
      component: {
        category: 'shared',
        displayName: 'Rich Text Block',
        icon: 'align-left',
        attributes: {
          body: {
            type: 'richtext',
            required: true
          }
        }
      }
    };

    try {
      await axios.post(`${baseURL}/content-type-builder/components`, richTextData, { headers });
      console.log('✅ Компонент rich-text создан');
    } catch (error) {
      console.log('⚠️ Компонент rich-text уже существует или ошибка:', error.response?.data?.message);
    }

    // Создаем Collection Type для направлений
    console.log('🗺️ Создание типа контента Destination...');
    const destinationTypeData = {
      contentType: {
        kind: 'collectionType',
        collectionName: 'destinations',
        displayName: 'Destination',
        description: 'Направления для такси',
        pluralName: 'destinations',
        singularName: 'destination',
        attributes: {
          title: {
            type: 'string',
            required: true
          },
          slug: {
            type: 'uid',
            targetField: 'title',
            required: true
          },
          cityOrigin: {
            type: 'string',
            required: true
          },
          cityWhen: {
            type: 'string',
            required: true
          },
          description: {
            type: 'richtext',
            required: true
          },
          siteTitle: {
            type: 'string'
          },
          siteDescription: {
            type: 'text'
          },
          displayImage: {
            type: 'media',
            multiple: false,
            required: false,
            allowedTypes: ['images']
          },
          mapLink: {
            type: 'text'
          },
          cars: {
            type: 'relation',
            relation: 'manyToMany',
            target: 'api::car.car',
            mappedBy: 'destinations'
          },
          faqs: {
            type: 'component',
            repeatable: true,
            component: 'shared.faqs'
          },
          textBlock: {
            type: 'component',
            repeatable: true,
            component: 'shared.rich-text'
          }
        },
        options: {
          draftAndPublish: true
        },
        pluginOptions: {}
      }
    };

    try {
      await axios.post(`${baseURL}/content-type-builder/content-types`, destinationTypeData, { headers });
      console.log('✅ Тип контента Destination создан');
    } catch (error) {
      console.log('⚠️ Тип контента Destination уже существует или ошибка:', error.response?.data?.message);
    }

    // Создаем Single Type для глобальных настроек
    console.log('🌍 Создание типа контента Global...');
    const globalTypeData = {
      contentType: {
        kind: 'singleType',
        collectionName: 'globals',
        displayName: 'Global',
        description: 'Глобальные настройки сайта',
        singularName: 'global',
        pluralName: 'globals',
        attributes: {
          siteName: {
            type: 'string'
          },
          siteDescription: {
            type: 'text'
          },
          sliderTitle: {
            type: 'string'
          },
          sliderText: {
            type: 'text'
          },
          blockTitle: {
            type: 'string'
          },
          blockText: {
            type: 'richtext'
          },
          blockTitleTwo: {
            type: 'string'
          },
          blockTextTwo: {
            type: 'richtext'
          },
          blockTitleThree: {
            type: 'string'
          },
          blockTextThree: {
            type: 'richtext'
          },
          blockTitleFour: {
            type: 'string'
          },
          blockTextFour: {
            type: 'richtext'
          },
          blockTitleFive: {
            type: 'string'
          },
          blockTextFive: {
            type: 'richtext'
          },
          destinations: {
            type: 'relation',
            relation: 'oneToMany',
            target: 'api::destination.destination',
            mappedBy: 'global'
          }
        },
        options: {
          draftAndPublish: true
        },
        pluginOptions: {}
      }
    };

    try {
      await axios.post(`${baseURL}/content-type-builder/content-types`, globalTypeData, { headers });
      console.log('✅ Тип контента Global создан');
    } catch (error) {
      console.log('⚠️ Тип контента Global уже существует или ошибка:', error.response?.data?.message);
    }

    console.log('🎉 Все типы контента настроены!');
    console.log('📱 Теперь можно создавать контент в админке');

  } catch (error) {
    console.error('❌ Ошибка настройки типов контента:', error.response?.data || error.message);
  }
}

setupContentTypes();
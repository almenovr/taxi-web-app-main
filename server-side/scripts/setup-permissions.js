'use strict';

/**
 * Setup script to configure public permissions for the taxi app
 */

const fs = require('fs');
const path = require('path');

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    try {
      // Wait for Strapi to be fully loaded
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('🚀 Setting up public permissions...');

      // Configure public permissions for Global
      const publicRole = await strapi
        .plugin('users-permissions')
        .service('role')
        .findOne({ type: 'public' });

      if (publicRole) {
        // Update permissions for Global
        await strapi
          .plugin('users-permissions')
          .service('role')
          .updateRole(publicRole.id, {
            permissions: {
              'api::global.global': {
                find: { enabled: true },
              },
              'api::destination.destination': {
                find: { enabled: true },
                findOne: { enabled: true },
              },
              'plugin::upload.file': {
                find: { enabled: true },
                findOne: { enabled: true },
              },
            }
          });

        console.log('✅ Public permissions configured successfully!');
      } else {
        console.log('⚠️ Public role not found');
      }

    } catch (error) {
      console.error('❌ Error setting up permissions:', error);
    }
  },
};
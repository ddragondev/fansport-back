'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post.post', ({ strapi }) => ({
  async get(ctx) {
    const userId = ctx.state.user.id; // Asumiendo que el usuario está autenticado y su ID está en el estado
  
    console.log('User ID:', userId); // Log del ID de usuario
  
    try {
      return ctx.send('Feed'); // Respuesta de ejemplo
    } catch (error) {
      console.log('Error:', error); // Log de error
      ctx.throw(500, error);
    }
  }
  

}));

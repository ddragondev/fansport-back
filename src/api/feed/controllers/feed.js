'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post.post', ({ strapi }) => ({
  async getFeed(ctx) {
    const userId = ctx.state.user.id; // Asumiendo que el usuario está autenticado y su ID está en el estado
  
    console.log('User ID:', userId); // Log del ID de usuario
  
    try {
      // Obtener los usuarios a los que sigue el usuario actual
      const followingUsers = await strapi.db.query('api::follow.follow').findMany({
        where: { follower: userId },
        populate: ['following'],
      });
  
  
      const followingIds = followingUsers.map(follow => follow.following.id);
  
      if (followingIds.length === 0) {
        return ctx.send([]);
      }
  
      // Obtener los posts de los usuarios a los que sigue el usuario actual
      const posts = await strapi.db.query('api::post.post').findMany({
        where: { user: { $in: followingIds } },  // Usar "user" en lugar de "author"
        populate: ['user','user.profile_picture','image','likes','comments'], // Populate the user field to include user data
        orderBy: [{ createdAt: 'desc' }], // Ordenar los posts por fecha de cre
      });
  
  
      return ctx.send(posts);
    } catch (error) {
      console.log('Error:', error); // Log de error
      ctx.throw(500, error);
    }
  }
  
  

}));

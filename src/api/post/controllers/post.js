'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post.post', ({ strapi }) => ({
  async likePost(ctx) {
    const postId = ctx.params.id;
    const userId = ctx.state.user.id; // Asumiendo que el usuario está autenticado y su ID está en el estado

    try {
      const post = await strapi.entityService.findOne('api::post.post', postId, {
        populate: { likes: true }
      });

      if (!post) {
        return ctx.notFound('Post not found');
      }

      const userLikeIndex = post.likes.findIndex(like => like.id === userId);

      if (userLikeIndex !== -1) {
        // Si el usuario ya ha dado "like", quitar el "like"
        post.likes.splice(userLikeIndex, 1);
        const updatedPost = await strapi.entityService.update('api::post.post', postId, {
          data: { likes: post.likes }
        });

        ctx.send(updatedPost);
      } else {
        // Si el usuario no ha dado "like", agregar el "like"
        post.likes.push(userId);
        const updatedPost = await strapi.entityService.update('api::post.post', postId, {
          data: { likes: post.likes }
        });

        ctx.send(updatedPost);
      }
    } catch (error) {
      ctx.throw(500, error);
    }
  },
}));

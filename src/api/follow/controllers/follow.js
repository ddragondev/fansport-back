'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::follow.follow', ({ strapi }) => ({
  async follow(ctx) {
    const { followerId, followingId } = ctx.request.body;

    // Verifica que no se sigan a sí mismos
    if (followerId === followingId) {
      return ctx.badRequest('Cannot follow yourself');
    }

    // Verifica si ya existe la relación de seguimiento
    const existingFollow = await strapi.db.query('api::follow.follow').findOne({
      where: { follower: followerId, following: followingId },
    });

    if (existingFollow) {
      return ctx.badRequest('Already following this user');
    }

    // Crea la relación de seguimiento
    const follow = await strapi.entityService.create('api::follow.follow', {
      data: {
        follower: followerId,
        following: followingId,
      },
    });

    return ctx.send(follow);
  },

  async unfollow(ctx) {
    const { followerId, followingId } = ctx.request.body;

    // Elimina la relación de seguimiento
    const follow = await strapi.db.query('api::follow.follow').findOne({
      where: { follower: followerId, following: followingId },
    });

    if (!follow) {
      return ctx.badRequest('You are not following this user');
    }

    await strapi.entityService.delete('api::follow.follow', follow.id);

    return ctx.send({ message: 'Unfollowed successfully' });
  },

  async getFollowers(ctx) {
    const { userId } = ctx.params;

    const followers = await strapi.db.query('api::follow.follow').findMany({
      where: { following: userId },
      populate: ['follower'],
    });

    return ctx.send(followers);
  },

  async getFollowing(ctx) {
    const { userId } = ctx.params;

    const following = await strapi.db.query('api::follow.follow').findMany({
      where: { follower: userId },
      populate: ['following'],
    });

    return ctx.send(following);
  },
}));
'use strict';

const { sanitize } = require('@strapi/utils');

module.exports = {
  async me(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
    }

    const data = await strapi.entityService.findOne(
      'plugin::users-permissions.user',
      user.id,
      {
        populate: {
          followers: { populate: { follower: true } },
          following: { populate: { following: true } },
        },
      }
    );

    ctx.body = sanitize.contentAPI.output(data, strapi.getModel('plugin::users-permissions.user'));
  },
};
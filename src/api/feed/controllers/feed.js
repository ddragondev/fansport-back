'use strict';

module.exports = {
  async getFeed(ctx) {
    const userId = ctx.state.user.id;

    // Obtener los usuarios seguidos por el usuario actual
    const user = await strapi.query('plugin::users-permissions.user').findOne({
      where: { id: userId },
      populate: ['following'],
    });

    // {
    //   id: 2,
    //   username: 'Dvegamed@gmail.com',
    //   email: 'dvegamed@gmail.com',
    //   provider: 'local',
    //   password: '$2a$10$e8QeqLOQS/2/TvwexMaKV..Pa9pOFC.RNjbszu40zZOs.HiGGMBMm',
    //   resetPasswordToken: null,
    //   confirmationToken: null,
    //   confirmed: true,
    //   blocked: false,
    //   createdAt: '2024-05-11T17:15:01.349Z',
    //   updatedAt: '2024-05-17T22:18:12.370Z',
    //   name: 'Diego',
    //   lastName: 'Vega',
    //   rut: '184694565',
    //   birthdate: '25/05/1993',
    //   bio: null,
    //   is_private: false,
    //   following: {
    //     id: 3,
    //     username: 'sakura',
    //     email: 'sakua@sakura.cl',
    //     provider: 'local',
    //     password: '$2a$10$awqQR16Nlp5WZjUs9NsHoObqiOMf86afdrsSnfQSmyAyMaY.ZhKeS',
    //     resetPasswordToken: null,
    //     confirmationToken: null,
    //     confirmed: true,
    //     blocked: false,
    //     createdAt: '2024-05-17T22:17:31.748Z',
    //     updatedAt: '2024-05-17T22:17:31.748Z',
    //     name: 'Sakura',
    //     lastName: '__',
    //     rut: null,
    //     birthdate: null,
    //     bio: null,
    //     is_private: false
    //   }
    // }

    console.log(user.following)
    const followingIds = Object.entries(user.following).map((user) => console.log(user));
    

    const posts = await strapi.query('api::post.post').findMany({
      where: {
        user: {
          id: { $in: followingIds },
        },
      },
      populate: ['user', 'image', 'likes', 'comments'],
      // sort: { createdAt: 'desc' },
    });

    return posts;
   

  },
};

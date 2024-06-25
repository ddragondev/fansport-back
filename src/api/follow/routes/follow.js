module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/follows/follow',
            handler: 'follow.follow',
            config: {
              policies: [],
              middlewares: [],
            },
          },
          {
            method: 'POST',
            path: '/follows/unfollow',
            handler: 'follow.unfollow',
            config: {
              policies: [],
              middlewares: [],
            },
          },
          {
            method: 'GET',
            path: '/follows/followers/:userId',
            handler: 'follow.getFollowers',
            config: {
              policies: [],
              middlewares: [],
            },
          },
          {
            method: 'GET',
            path: '/follows/following/:userId',
            handler: 'follow.getFollowing',
            config: {
              policies: [],
              middlewares: [],
            },
          },
    ],
  };
  
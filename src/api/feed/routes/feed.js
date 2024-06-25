module.exports = {
  routes: [
    // {
    //  method: 'GET',
    //  path: '/feed',
    //  handler: 'feed.exampleAction',
    //  config: {
    //    policies: [],
    //    middlewares: [],
    //  },
    // },
    {
      method: 'GET',
      path: '/feed',
      handler: 'feed.getFeed',
      config: {
     
      },

    },
  ],
};

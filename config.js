const config = {
  port: process.env.PORT || 8080,
  mongodb: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27017/local',
    linksCollection: process.env.MONGO_LINKS_COLLECTION || 'links',
    counterCollection: process.env.MONGO_COUNTER_COLLECTION || 'counter',
  },
};
export default config;

/* eslint new-cap: [2, {"capIsNewExceptions": ["Router"]}] */
import { Router } from 'express';
import bodyParser from 'body-parser';

const api = (model) => {
  const router = Router();
  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({ extended: true }));

  // POST [START]
  router.post('/', async (req, res, next) => {
    let url = req.body.url;

    if (url === undefined) {
      res.send('No url supplied in body');
    } else {
      if (url.slice(0, 7) !== 'http://' && url.slice(0, 8) !== 'https://') {
        url = `http://${url}`;
      }
      const fullUrl = url;

      try {
        const shortenedUrl = await model.shortenUrlAsync(fullUrl);
        res.send(shortenedUrl);
      } catch (err) {
        res.send(`Error creating shortened url from ${fullUrl}`);
      }
    }
  });
  // POST [END]

  return router;
};

export default api;

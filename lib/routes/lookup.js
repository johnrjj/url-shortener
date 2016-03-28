/* eslint new-cap: [2, {"capIsNewExceptions": ["Router"]}] */
import { Router } from 'express';

const lookup = (model) => {
  const router = Router();
  router.get('/:shortUrl', async (req, res, next) => {
    const shortUrl = req.params.shortUrl;

    try {
      const actualUrl = await model.getActualUrlFromEncodedUrlAsync(shortUrl);
      res.redirect(actualUrl);
    } catch (err) {
      console.log(err);
      if (err.code === '404') {
        res.send('Not a valid shortened link');
      } else {
        next(err);
      }
    }
  });

  return router;
};

export default lookup;

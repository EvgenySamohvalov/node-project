const express = require('express');
const redis = require("redis");
const { redisUrl } = require("../config");
const router = express.Router();

const client = redis.createClient({ url: redisUrl });

(async () => {
    await client.connect();
})()

router.get('/:bookId',
  async (req, res) => {
    const bookId = req.params.bookId;
    try {
        const viewsCount = await client.get(`books.views.${bookId}`);
        return res.json(viewsCount);
    } catch (e) {
        return res.json(0);
    }
  }
);

router.post('/:bookId/incr',
  async (req, res) => {
    const bookId = req.params.bookId;
    try {
      const viewsCount = await client.incr(`books.views.${bookId}`);
      return res.json(viewsCount);
    } catch (e) {
      return res.json(0);
    }
  }
);

module.exports = router;

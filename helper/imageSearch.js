const ImageSearch = require('google-images');

const searchImages = query =>
  new Promise((res, rej) => {
    const images = new ImageSearch(process.env.CSE_ID, process.env.CSE_API_KEY);
    images
      .search(query, { safe: 'high' })
      .then(imgs => res(imgs))
      .catch(err => rej(err));
  });

module.exports = searchImages;

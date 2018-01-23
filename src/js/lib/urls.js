const hnPWA = 'https://hnpwa.com/api/v0';
const extension = '.json';

export default {
  '/': (page) => `${hnPWA}/news${extension}?page=${page}`,
  '/news': (page) => `${hnPWA}/newest${extension}?page=${page}`,
  '/show': (page) => `${hnPWA}/show${extension}?page=${page}`,
  '/ask': (page) => `${hnPWA}/ask${extension}?page=${page}`,
  '/jobs': (page) => `${hnPWA}/jobs${extension}?page=${page}`,
  '/item': (page, id) => `${hnPWA}/item/${id}${extension}`
};

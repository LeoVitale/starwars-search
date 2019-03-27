import axios from 'axios';

export const getId = text => text.replace(/[^0-9]/g, '');
export const getImage = id =>
  `${process.env.PUBLIC_URL}/assets/images/characters/${id}.jpg`;

const arrayToObject = (array, key) =>
  array.reduce((obj, item) => {
    obj[item[key]] = item;
    return obj;
  }, {});

function getItem(url) {
  return axios.get(url).then(response => response.data);
}

export const getItems = urls => {
  return axios
    .all(urls.map(url => getItem(url)))
    .then(axios.spread((...urls) => arrayToObject(urls, 'url')))
    .catch(error => error);
};

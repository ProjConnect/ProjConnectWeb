import apiHandler from './api';

// eslint-disable-next-line import/prefer-default-export
export const logout = () => {
  apiHandler
    .get('/logout')
    .then(() => {
      window.location.assign('/');
    })
    .catch((error) => {
      console.log(error);
    });
};

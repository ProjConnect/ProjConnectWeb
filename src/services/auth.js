import apiHandler from './api';

export const logged = () => localStorage.getItem('status') === 'logged';

export const login = () => {
  // saves logged status on localStorage
  localStorage.setItem('status', 'logged');
};

export const logout = () => {
  apiHandler
    .get('/logout')
    .then(() => {
      localStorage.clear();
      window.location.assign('/');
    })
    // eslint-disable-next-line no-unused-vars
    .catch((error) => {
      // console.log(error);
    });
};

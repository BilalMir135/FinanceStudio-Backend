module.exports = {
  handleError: err => {
    return { message: 'Failed', err };
  },
  handleSuccess: doc => {
    return { message: 'Success', doc };
  },
};

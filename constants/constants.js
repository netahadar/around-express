const NOTFOUND_ERROR_CODE = 404;
const INVALIDDATA_ERROR_CODE = 400;
const DEFAULT_ERROR_CODE = 500;
const createNotFoundError = () => {
  const error = new Error('No available data to display');
  error.name = 'Not Found';
  error.statusCode = 404;
  throw error;
};

module.exports = {
  NOTFOUND_ERROR_CODE,
  INVALIDDATA_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  createNotFoundError,
};

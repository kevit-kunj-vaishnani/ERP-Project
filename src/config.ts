const {PORT, LOG_LEVEL, MONGODB_URL} = process.env; // destructuring

export const server = {
  port: PORT || 3000,
  logLevel: LOG_LEVEL || 'info',
  url: MONGODB_URL || 'mongodb://127.0.0.1:27017/mongodb://127.0.0.1:27017/ERP_College_Model'
};

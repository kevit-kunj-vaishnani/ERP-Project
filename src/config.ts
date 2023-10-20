const {PORT, LOG_LEVEL, MONGODB_URL, DB__NAME} = process.env; // destructuring

export const server = {
  port: PORT || 3000,
  logLevel: LOG_LEVEL || 'info'
};

export const mongoConn = {
  url: MONGODB_URL || 'mongodb://127.0.0.1:27017/mongodb://127.0.0.1:27017/',
  db_name: DB__NAME || 'ERP_College_Model'
};

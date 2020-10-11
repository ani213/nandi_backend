const {createLogger, format, transports}=require('winston');
const volunteerLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  // defaultMeta: { service: 'your-service-name' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      // new winston.transports.Console(),
      new transports.File({ filename: './logger/volunteer_error.log', level: 'error' }),
      // new transports.File({ filename: './logger/combined.log' })
    ]
  });
  exports.volunteerLogger=volunteerLogger;
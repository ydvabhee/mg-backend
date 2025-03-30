import winston from 'winston';

export const getLogger = () => {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
  
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logs/server.log', level: 'info' }),
    ],
  });
  return logger
}

 
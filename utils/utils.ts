import winston from 'winston';
import { createLogger, transports, format } from 'winston';

const logger = createLogger({
  level: 'info', // Default log level
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
  ),
  transports: [
    new transports.Console(), // Log to the console
    new transports.File({ filename: 'combined.log' }) // Log to a file
  ],
});

// You can also dynamically add a console transport if not in production
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(format.colorize({ all: true }), format.simple()),
    level: 'debug' // Show debug messages in development
  }));
}

export default logger;
const require = createRequire(import.meta.url);
import { createRequire } from "module";
import { createLogger, transports, format } from 'winston';
import axios from 'axios';

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

export const helloWorld = async(req:any, res:any) => {
    try {
        res.json("hello world...");
    } catch (error) {
        //console.error("Error fetching data:", error);
        console.log("error: " + error);
        logger.info("error: " + error);
    }

}
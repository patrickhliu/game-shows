import axios from 'axios';
import logger from '../utils/utils.ts';

export const helloWorld = async(req:any, res:any) => {
    try {
        res.json("hello world...");
    } catch (error) {
        //console.error("Error fetching data:", error);
        console.log("error: " + error);
        logger.info("error: " + error);
    }

}
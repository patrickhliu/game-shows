import axios from 'axios';
import logger from '../utils/utils.ts';
import Jeopardy from '../models/Jeopardy.ts';
import { Sequelize, DataTypes, Model } from 'sequelize';
import * as _ from 'lodash-es';

export const helloWorld = async(req:any, res:any) => {
    //console.log('test...');
    //res.status(200).json("pat123...");
    //return;

    try {
        let dbResults:any = await Jeopardy.findAll({
            //limit:10,
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('air_year')), 'air_year']
            ],
            order: [
                ['air_year', 'DESC']
            ],
        });

        //console.log(dbResults);

        const years = _.map(dbResults, 'air_year');

        let output = {
            years: years
        };

        res.status(200).json(output);
    } catch (error) {
        //console.error("Error fetching data:", error);
        console.log("error: " + error);
        logger.info("error: " + error);
    }
}
import axios from 'axios';
import logger from '../utils/utils.ts';
import Jeopardy from '../models/Jeopardy.ts';
import { Sequelize, DataTypes, Model } from 'sequelize';
import * as _ from 'lodash-es';

export const helloWorld = async(req:any, res:any) => {
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

    const years = _.map(dbResults, 'air_year');

    let output = {
        years: years
    };

    return new Response(JSON.stringify(output), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
    } catch (error) {
        //console.error("Error fetching data:", error);
        console.log("error: " + error);
        logger.info("error: " + error);
    }

}
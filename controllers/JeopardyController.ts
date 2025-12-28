import axios from 'axios';
import { logger, getFormattedDate } from '../utils/utils.ts';
import Jeopardy from '../models/Jeopardy.ts';
import { Sequelize, DataTypes, Model } from 'sequelize';
import * as _ from 'lodash-es';

export const getYears = async(req:any, res:any) => {
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

        res.status(200).json(output);
    } catch (error) {
        //console.error("Error fetching data:", error);
        console.log("error: " + error);
        logger.info("error: " + error);
    }
}

export const getEpisodes = async(req:any, res:any) => {
    let dbResults:any = await Jeopardy.findAll({
        //limit:10,
        where: {
            air_year: req.params.year
        },
        attributes: [
            [Sequelize.fn('DISTINCT', Sequelize.col('air_date')), 'air_date'],
            'show_no',
        ],
        order: [
            ['air_date', 'ASC']
        ],
    });

    let dbResultsFormatted:Object[] = [];

    _.forEach(dbResults, function(obj, key) {
        let d = new Date(obj.air_date);
        let f = new Date(d.setUTCHours(12));
        //console.log(f.toUTCString());

        let a = {
            show_no: obj.show_no,
            air_date: getFormattedDate(f)
        };

        dbResultsFormatted.push(a);
    });

    let output = {
        episodes: dbResultsFormatted,
    };

    res.status(200).json(output);
}

export const getQuestions = async(req:any, res:any) => {
    let dbResults:any = await Jeopardy.findAll({
        //limit:10,
        attributes: ['category', 'value', 'question', 'answer', 'round'],
        where: {
            show_no: req.params.show_no,
            round: 'Jeopardy!',
        },
        order: [
            ['category', 'ASC'], ['value', 'ASC']
        ],
    });

    let dbResults2:any = await Jeopardy.findAll({
        //limit:10,
        attributes: ['category', 'value', 'question', 'answer', 'round'],
        where: {
            show_no: req.params.show_no,
            round: 'Double Jeopardy!',
        },
        order: [
            ['category', 'ASC'], ['value', 'ASC']
        ],
    });

    let dbResults3:any = await Jeopardy.findAll({
        //limit:10,
        attributes: ['category', 'value', 'question', 'answer', 'round', 'show_no', 'air_date'],
        where: {
            show_no: req.params.show_no,
            round: 'Final Jeopardy!',
        },
        order: [
            ['value', 'ASC']
        ],
    });

    let output = {
        //air_date: getFormattedDate(f),
        show_no: dbResults3[0].show_no,
        round_one: dbResults,
        round_two: dbResults2,
        final: dbResults3,
    };

    res.status(200).json(output);
}
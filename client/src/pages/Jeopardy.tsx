import { useState, useEffect } from 'react';
import axios from 'axios';
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
import type { SingleQuestion, Episode } from '../interfaces/jeopardy.ts';
import DropDown from '../components/jeopardy/DropDown.tsx';
import Grid from '../components/jeopardy/Grid.tsx';
import QuestionModal from '../components/jeopardy/QuestionModal.tsx';

function Jeopardy() {
    const [loading, setLoading] = useState(false);
    const [years, setYears] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    const [showDate, setShowDate] = useState("");
    const [showNo, setShowNo] = useState("");
    const [currentRound, setCurrentRound] = useState(1);
    const [questions, setQuestions] = useState(Array<SingleQuestion>);
    const [gridArr, setGridArr] = useState<number[]>([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]);
    const [gridNumbers, setGridNumbers] = useState<number[]>([]);
    const [colorGridNumbers, setColorGridNumbers] = useState<number[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const [question, setQuestion] = useState<SingleQuestion>({category:"", question:"", answer:"", value:0, round:"", map:""});

    useEffect(() => {
        getYears();

        /* setInterval(() => {
            console.log("loading is ", loading);
        }, 1000) */
    }, []);

    useEffect(() => {
        if(loading) {
            // todo: why is returning true?
            //console.log('loading 1...');
            //return;
        }
        setLoading(true);

        setGridArr([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]);
        setGridNumbers([]);
        setColorGridNumbers([]);

        const fetchData = async () => {
          try {
                if(!showNo) return;

                const response = await axios('/jeopardy/questions/' + showNo);

                if(currentRound == 1) {
                    setQuestions(response.data.round_one);
                } else if(currentRound == 2) {
                    setQuestions(response.data.round_two);
                } else if(currentRound == 3) {
                    setQuestions(response.data.final);
                }

                do {
                    let rand = Math.floor(Math.random() * 30);
                    let num = gridArr.splice(rand, 1);
                    if(num.length == 0) continue;

                    setGridNumbers(gridNumbers => gridNumbers.concat(num));
                    await new Promise(r => setTimeout(r, 50));
                } while (gridArr.length > 0)

                if(gridArr.length == 0) setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
    }, [showNo, currentRound]);

    async function getYears() {
        if(loading) return;
        setLoading(true);

        try {
            const response = await axios('/jeopardy/years');
            setYears(years.concat(response.data.years));
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    async function getEpisodesByYear(y:string) {
        setLoading(true);

        try {
            const response = await axios('/jeopardy/episodes/' + y);
            setEpisodes(response.data.episodes);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const openModal = (q:any) => {
        setIsOpen(true);
        setQuestion(q);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const changeShowNo = (e:Episode) => {
        if(loading) return;
        setShowNo(e.show_no);
        setShowDate(e.air_date);
    }

    const changeRound = (num:number) => {
        if(loading) return;
        setCurrentRound(num);
    }

    const changeColorGridNumbers = (index:number) => {
        setColorGridNumbers(colorGridNumbers.concat([index]));
    }

  return (
    <>
        <QuestionModal isOpen={isOpen} question={ question } closeModal={ closeModal }></QuestionModal>
        <div className="text-center my-4">
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className={ currentRound == 1 ? "btn btn-warning" : "btn btn-primary" } style={{ border:"2px solid #111"}} onClick={ () => { changeRound(1); }}>Jeopardy!</button>
                <button type="button" className={ currentRound == 2 ? "btn btn-warning" : "btn btn-primary" } style={{ border:"2px solid #111"}} onClick={ () => { changeRound(2); }}>Double Jeopardy!</button>
                <button type="button" className={ currentRound == 3 ? "btn btn-warning" : "btn btn-primary" } style={{ border:"2px solid #111"}} onClick={ () => { changeRound(3); }}>Final Jeopardy!</button>
            </div>
        </div>
        { showNo && <p className="text-center"><span style={{ marginRight:"30px"}}>Aired: { showDate }</span> Show No: { showNo }</p> }
        <div className="jeopardy-menu col-md-8 offset-md-2 mb-3">
            { years.map((y, i) => (
                <DropDown key={ i } label={ y } episodes={ episodes } sendToParent={ (x:string) => getEpisodesByYear(x) } sendShowNo={ (e:Episode) => changeShowNo(e) }></DropDown>
            ))}
        </div>
        <Grid questions={ questions } currentRound={ currentRound } gridArr={ gridArr } gridNumbers={ gridNumbers } colorGridNumbers={ colorGridNumbers } changeColorGridNumbers={ changeColorGridNumbers } showQuestion={ (q:any) => openModal(q) }></Grid>
    </>
  )
}

export default Jeopardy
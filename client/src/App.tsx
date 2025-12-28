import { useState, useEffect } from 'react';
import axios from 'axios';
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
//import type { SingleQuestion } from './interfaces/SingleQuestion.ts';
import DropDown from './components/jeopardy/DropDown.tsx';
import './App.css';
import './assets/jeopardy.scss';

function App() {
    const [loading, setLoading] = useState(false);
    const [years, setYears] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    const [showNo, setShowNo] = useState("");
    /* const [currentRound, setCurrentRound] = useState(1);
    const [questions1, setQuestions1] = useState(Array<SingleQuestion>);
    const [questions2, setQuestions2] = useState(Array<SingleQuestion>);
    const [questionsF, setQuestionsF] = useState(Array<SingleQuestion>);
    const [questions, setQuestions] = useState(Array<SingleQuestion>);
    const [gridArr, setGridArr] = useState<number[]>([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]);
    const [gridNumbers, setGridNumbers] = useState<number[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const [question, setQuestion] = useState<SingleQuestion>({category:"", question:"", answer:"", value:0, round:"", map:""}); */

    useEffect(() => {
        getYears();
    }, []);

    useEffect(() => {
        console.log('update show no', showNo);
    }, [showNo, ]);

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

    /* const openModal = (q:any) => {
        setIsOpen(true);
        setQuestion(q);
    }

    const closeModal = () => {
        setIsOpen(false);
    } */

    const changeShowNo = (no:string) => {
        if(loading) return;
        setShowNo(no);
    }

    /* const changeRound = (num:number) => {
        if(loading) return;
        setCurrentRound(num);
    } */

  return (
    <>
        <div className="jeopardy">
            { years.map((y, i) => (
                <DropDown key={ i } label={ y } episodes={ episodes } sendToParent={ (x:string) => getEpisodesByYear(x) } sendShowNo={ (x:string) => changeShowNo(x) }></DropDown>
            ))}
        </div>
    </>
  )
}

export default App

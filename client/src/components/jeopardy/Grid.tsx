import React from 'react';
import type { SingleQuestion, QuestionList } from '../../interfaces/jeopardy.ts';
import { Row, Col } from 'react-bootstrap';

const Grid: React.FC<QuestionList> = (props) => {
  return (
    <div className={ props.currentRound != 3 ? "jeopardy-grid col-md-10 offset-md-1" : "jeopardy-grid col-md-2 offset-md-5" }>
        <Row md={ 12 }>
            {
                props.questions.map((o:SingleQuestion, index:number) => {
                    if(index % 5 != 0) return;

                    return (
                        <Col key={ index } md={ props.currentRound != 3 ? 2 : 12 }>
                            <div className="text-center category"><b>{ o.category }</b></div>
                        </Col>
                    );
                })
            }
        </Row>
        <Row md={ 12 }>
            {
                props.questions.map((o:SingleQuestion, index:number) => {
                    if((props.currentRound == 1 && o.round == "Jeopardy!" && o.value == 100) || (props.currentRound == 2 && o.round == "Double Jeopardy!" && o.value == 200)) {
                        return (
                            <Col key={ index } md={ 2 }>
                                <div className="text-center question pointer" onClick={ () => { props.showQuestion(o); props.changeColorGridNumbers(index); }}>
                                    { props.gridNumbers.indexOf(index) !== -1 && props.colorGridNumbers.indexOf(index) === -1 && <b>${ o.value }</b>}
                                    { props.gridNumbers.indexOf(index) !== -1 && props.colorGridNumbers.indexOf(index) !== -1 && <b style={{ color:"grey" }}>${ o.value }</b>}
                                </div>
                            </Col>
                        );
                    } else if (props.currentRound == 3 && o.round == "Final Jeopardy!") {
                        return (
                            <Col key={ index } md={ 12 }>
                                <div className="text-center question pointer" onClick={ () => { props.showQuestion(o); props.changeColorGridNumbers(index); }}>
                                    { props.colorGridNumbers.indexOf(index) === -1 && <b>${ o.value }</b>}
                                    { props.colorGridNumbers.indexOf(index) !== -1 && <b style={{ color:"grey" }}>${ o.value }</b>}
                                </div>
                            </Col>
                        );
                    }
                })
            }
        </Row>
        { (props.currentRound == 1 || props.currentRound == 2) &&
            <Row>
            {
                props.questions.map((o:SingleQuestion, index:number) => {
                    if((props.currentRound == 1 && o.round == "Jeopardy!" && o.value == 200) || (props.currentRound == 2 && o.round == "Double Jeopardy!" && o.value == 400)) {
                        return (
                            <Col key={ index } md={ 2 }>
                                <div className="text-center question pointer" onClick={ () => { props.showQuestion(o); props.changeColorGridNumbers(index); }}>
                                    { props.gridNumbers.indexOf(index) !== -1 && props.colorGridNumbers.indexOf(index) === -1 && <b>${ o.value }</b>}
                                    { props.gridNumbers.indexOf(index) !== -1 && props.colorGridNumbers.indexOf(index) !== -1 && <b style={{ color:"grey" }}>${ o.value }</b>}
                                </div>
                            </Col>
                        );
                    }
                })
            }
            </Row>
        }
        { (props.currentRound == 1 || props.currentRound == 2) &&
            <Row>
            {
                props.questions.map((o:SingleQuestion, index:number) => {
                    if((props.currentRound == 1 && o.round == "Jeopardy!" && o.value == 300) || (props.currentRound == 2 && o.round == "Double Jeopardy!" && o.value == 600)) {
                        return (
                            <Col key={ index } md={ 2 }>
                                <div className="text-center question pointer" onClick={ () => { props.showQuestion(o); props.changeColorGridNumbers(index); }}>
                                    { props.gridNumbers.indexOf(index) !== -1 && props.colorGridNumbers.indexOf(index) === -1 && <b>${ o.value }</b>}
                                    { props.gridNumbers.indexOf(index) !== -1 && props.colorGridNumbers.indexOf(index) !== -1 && <b style={{ color:"grey" }}>${ o.value }</b>}
                                </div>
                            </Col>
                        );
                    }
                })
            }
            </Row>
        }
        { (props.currentRound == 1 || props.currentRound == 2) &&
            <Row>
            {
                props.questions.map((o:SingleQuestion, index:number) => {
                    if((props.currentRound == 1 && o.round == "Jeopardy!" && o.value == 400) || (props.currentRound == 2 && o.round == "Double Jeopardy!" && o.value == 800)) {
                        return (
                            <Col key={ index } md={ 2 }>
                                <div className="text-center question pointer" onClick={ () => { props.showQuestion(o); props.changeColorGridNumbers(index); }}>
                                    { props.gridNumbers.indexOf(index) !== -1 && props.colorGridNumbers.indexOf(index) === -1 && <b>${ o.value }</b>}
                                    { props.gridNumbers.indexOf(index) !== -1 && props.colorGridNumbers.indexOf(index) !== -1 && <b style={{ color:"grey" }}>${ o.value }</b>}
                                </div>
                            </Col>
                        );
                    }
                })
            }
            </Row>
        }
        { (props.currentRound == 1 || props.currentRound == 2) &&
            <Row>
            {
                props.questions.map((o:SingleQuestion, index:number) => {
                    if((props.currentRound == 1 && o.round == "Jeopardy!" && o.value == 500) || (props.currentRound == 2 && o.round == "Double Jeopardy!" && o.value == 1000)) {
                        return (
                            <Col key={ index } md={ 2 }>
                                <div className="text-center question pointer" onClick={ () => { props.showQuestion(o); props.changeColorGridNumbers(index); }}>
                                    { props.gridNumbers.indexOf(index) !== -1 && props.colorGridNumbers.indexOf(index) === -1 && <b>${ o.value }</b>}
                                    { props.gridNumbers.indexOf(index) !== -1 && props.colorGridNumbers.indexOf(index) !== -1 && <b style={{ color:"grey" }}>${ o.value }</b>}
                                </div>
                            </Col>
                        );
                    }
                })
            }
            </Row>
        }
    </div>
  )
}

export default Grid;
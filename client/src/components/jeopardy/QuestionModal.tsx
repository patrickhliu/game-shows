import React, { useState, } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Args {
    isOpen: boolean,
    question: any,
    closeModal: any,
}

const QuestionModal:React.FC<Args> = ({ isOpen, question, closeModal }) => {
    const [showAnswer, setShowAnswer] = useState(false);

    function toggleAnswer() {
        setShowAnswer(true);
    }

    return (
    <>
        <Modal centered show={ isOpen } keyboard={ true } backdrop="static" animation={ true } style={{ visibility:"visible", }}>
            <Modal.Header>
                <Modal.Title>{ question.category } - ${ question.value }</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p style={{ fontSize:"16px"}}>{ question.question }</p>

                { showAnswer && <i style={{ fontSize:"16px"}}>{ question.answer }</i> }
            </Modal.Body>

            <Modal.Footer>
                <Button variant={ showAnswer ? "secondary" : "primary" } onClick={ () => { toggleAnswer() } }>Show Answer</Button>
                <Button onClick={ closeModal }>Close</Button>
            </Modal.Footer>
        </Modal>
    </>
    );
}

export default QuestionModal;
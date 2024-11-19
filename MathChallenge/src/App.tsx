import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Expressions from './Components/Expressions';
import About from './About'; // Assuming you have this component
//import Home from './Components/Home'; // Assuming you have this component

function App() {
    const [gameStarted, setGameStarted] = useState(false);
    const [expressionSequence, setExpressionSequence] = useState([]);
    const [level, setLevel] = useState(1);
    const [speed, setSpeed] = useState(2000);

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateAdditionExpression() {
        const num1 = getRandomNumber(1, 20);
        const num2 = getRandomNumber(1, 20);
        return { expression: `${num1} + ${num2}`, result: num1 + num2 };
    }

    function generateSubtractionExpression() {
        const num1 = getRandomNumber(1, 20);
        const num2 = getRandomNumber(1, num1);
        return { expression: `${num1} - ${num2}`, result: num1 - num2 };
    }

    function generateMultiplicationExpression() {
        const num1 = getRandomNumber(1, 10);
        const num2 = getRandomNumber(1, 10);
        return { expression: `${num1} * ${num2}`, result: num1 * num2 };
    }

    function generateDivisionExpression() {
        const num1 = getRandomNumber(1, 10);
        const num2 = getRandomNumber(1, 10);
        const product = num1 * num2;
        return { expression: `${product} / ${num1}`, result: num2 };
    }

    function generateUniqueExpressions(count) {
        const operations = [
            generateAdditionExpression,
            generateSubtractionExpression,
            generateMultiplicationExpression,
            generateDivisionExpression
        ];

        const uniqueExpressions = new Set();
        const uniqueResults = new Set();

        while (uniqueExpressions.size < count) {
            const randomOperation = operations[getRandomNumber(0, operations.length - 1)];
            const { expression, result } = randomOperation();

            if (!uniqueResults.has(result)) {
                uniqueExpressions.add(expression);
                uniqueResults.add(result);
            }
        }

        return Array.from(uniqueExpressions);
    }

    const startGame = () => {
        const newExpressions = generateUniqueExpressions(5);
        setLevel(1)
        setSpeed(2000)
        setExpressionSequence(newExpressions);
        setGameStarted(true);
    };

    const advance = () => {
        const newExpressions = generateUniqueExpressions(5);
        setExpressionSequence(newExpressions);
        setLevel(level + 1);
        if (speed > 800) setSpeed(speed - 200)
    };

    return (
        <Router>
            <div className="App">
                <div id="header">
                    <nav>
                        <ul>
                            <li>
                                <Link onClick={() => setGameStarted(false) } to="/">Home</Link> 
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="main-content">
                    <Routes>
                        <Route path="/" element={
                            !gameStarted ? (
                                <div>
                                    <h3>Math Memory Challenge</h3> 
                                    <br/> 
                                    <button id="startBtn" onClick={startGame}>Play</button>
                                </div>
                            ) : (
                                    <Expressions speed= {speed} level={level} expSequence={expressionSequence} advance={advance} reset={startGame} />
                            )
                        } />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </div>

                <div id="footer">
                  <small> <p>Math Memory Challenge @ 2024</p> </small> 
                </div>
            </div>
        </Router>
    );
}

export default App;
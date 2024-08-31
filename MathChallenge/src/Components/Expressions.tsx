import React, { useEffect, useState } from 'react';
import '../App.css';
import PlayerInput from './PlayerInput';

interface ExpressionsProps {
    expSequence: string[];
    //setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
    advance: () => void;
    reset: () => void;
    level: number;
    speed: number;
}

const Expressions: React.FC<ExpressionsProps> = ({speed, level, expSequence,   advance, reset }) => {
    const [currentExpression, setCurrentExpression] = useState<string | null>(null);
    const [playerView, setPlayerView] = useState(false);
    const [showLevel, setShowLevel] = useState(true);
    const [answers, setAnswers] = useState<number[]>([]);

    useEffect(() => {
        //alert(level)
        setShowLevel(true);

        const calculateAnswers = () => {
            // Calculate answers from the expression sequence
            return expSequence.map(exp => eval(exp)); // Evaluate the expression to get the answer
        };

        const displayLevelAndSequence = async () => {
            // Show the level for 1 second
            await new Promise(resolve => setTimeout(resolve, 1000));
            setShowLevel(false); // Hide the level number

            // Display the expression sequence
            for (const exp of expSequence) {
                setCurrentExpression(exp);
                await new Promise(resolve => setTimeout(resolve, speed));
                setCurrentExpression(null);
                await new Promise(resolve => setTimeout(resolve, 10));
            }

            setPlayerView(true);
            //setCurrentStep(0);
        };

        setAnswers(calculateAnswers());
        

        if (expSequence.length > 0) {
            setPlayerView(false);
            displayLevelAndSequence();
        }

    }, [expSequence]);

    //useEffect(() => {
    //    // Reset the showLevel state whenever the level changes
    //    setShowLevel(true);
    //}, [level]);

    return (
        <>
            {showLevel ? (
                <div className="level-container">
                    <p>Level {level}</p>
                </div>
            ) : (
                !playerView ? (
                    <div className="exp-container">
                        <p>{currentExpression}</p>
                    </div>
                    ) : (
                    <PlayerInput sequence={answers.map(String)} advance={advance} reset={reset} level={level } />
                )
            )}
        </>
    );
};

export default Expressions;
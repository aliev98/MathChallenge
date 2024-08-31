import React, { useState, useEffect, useCallback } from 'react';
import '../App.css';
import TimeBar from './TimeBar';
import OverScreen from '../OverScreen';

interface PlayerInputProps {
    sequence: string[];
    advance: () => void;
    reset: () => void;
    level: number;
}

const PlayerInput: React.FC<PlayerInputProps> = ({ sequence, advance, reset, level }) => {
    const [playerInput, setPlayerInput] = useState<string[]>([]);
    const [shuffledSequence, setShuffledSequence] = useState<string[]>([]);
    const [over, setIsOver] = useState(false);
    const [cause, setCause] = useState<string | null>(null);

    function shuffleArray(array: string[]): string[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    useEffect(() => {
        setShuffledSequence(shuffleArray([...sequence]));
        console.log(sequence)
    }, [sequence]);

    useEffect(() => {
        if (playerInput.length === sequence.length) {
            if (playerInput.every((value, index) => value === sequence[index])) {
                advance();
                setPlayerInput([]);
            } else {
                setCause("Wrong answer");
                setIsOver(true);
                setPlayerInput([]);
            }
        }

    }, [playerInput, sequence, advance]);

    const handleTimeUp = useCallback(() => {
        setCause("Time");
        setIsOver(true); // Set the game to "over" when time is up
    }, []);

    return (
        <div className="inputContainer">
            {!over ? (
                <>
                    <h5>Enter answers in correct order</h5>
                    <TimeBar onTimeUp={handleTimeUp} />
                    <div className="buttonContainer">
                        {shuffledSequence.map((ans, index) => (
                            <button
                                key={index}
                                disabled={playerInput.includes(ans)}
                                onClick={() => setPlayerInput(prev => [...prev, ans])}
                            >
                                {ans}
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <OverScreen cause={cause} level={level} restart={reset} />
            )}
        </div>
    );
};

export default PlayerInput;
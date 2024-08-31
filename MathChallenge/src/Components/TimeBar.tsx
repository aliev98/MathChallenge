import { useEffect, useRef } from 'react';
import '../App.css';

function TimeBar({ onTimeUp }) {
    const totalTime = 10; // Total time in seconds
    const timeLeftRef = useRef(totalTime);
    const intervalRef = useRef<number | null>(null);
    const timeBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Function to update the time bar's width
        const updateBar = () => {
            const timeBarWidth = ((totalTime - timeLeftRef.current) / totalTime) * 100;
            if (timeBarRef.current) {
                timeBarRef.current.style.width = `${timeBarWidth}%`;
            }
        };

        // Start the timer and update the time bar's width
        const startTimer = () => {
            intervalRef.current = window.setInterval(() => {
                if (timeLeftRef.current > 0) {
                    timeLeftRef.current -= 1;
                    updateBar();
                } else {
                    clearInterval(intervalRef.current!);
                    onTimeUp();
                }
            }, 1000);
        };

        if (timeBarRef.current) {
            timeBarRef.current.style.width = '0%';
        }

        updateBar();
        startTimer();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [onTimeUp]);

    return (
        <div className="timebar-container">
            <div ref={timeBarRef} className="timebar"> </div>
        </div>
    );
}

export default TimeBar;

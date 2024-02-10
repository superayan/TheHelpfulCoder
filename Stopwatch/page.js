'use client'

import React from 'react';
import styles from "./page.module.css";


const Stopwatch = () => {
    const [time, setTime] = React.useState(0);
    const [isRunning, setIsRunning] = React.useState(false);
    const intervalRef = React.useRef(null);

    React.useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 100);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning]);

    const handleReset = () => {
        setTime(0);
        setIsRunning(false);
    }

    return (
        
        <div>
            <p className={styles.time}>{(time/10).toFixed(1)}</p>
            <div className={styles.buttonWrapper}>
                <button 
                    className={`${styles.buttons} ${!isRunning ? styles.startButton : ''}`} 
                    onClick={() => setIsRunning(!isRunning)}
                >
                    {isRunning ? "Pause" : "Start"}
                </button>
                <button className={`${styles.buttons} ${styles.resetButton}`} onClick={handleReset}>Reset</button>
            </div>
        </div>
    );
};

export default Stopwatch;
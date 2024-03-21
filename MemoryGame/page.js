'use client'

import React from 'react';
import styles from "./page.module.css";

const getRandomizedRoute = () => {
    const randomList = [];
    for (let i = 0; i < 5; i++) {
        const random0or1 = Math.floor(Math.random() * 2);
        if (random0or1 === 0) {
            randomList.push('left');
        } else {
            randomList.push('right');
        }
    }

    return randomList;
};

const correctRoute = getRandomizedRoute();

const MemoryGame = () => {
    const [currentPath, setCurrentPath] = React.useState([...Array(5)].fill(null));
    const [timer, setTimer] = React.useState(0);
    const intervalRef = React.useRef(null);

    React.useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
        }, 100);

        return () => {
            clearInterval(intervalRef.current);
        }
    }, []);

    React.useEffect(() => {
        const allFilled = currentPath.every((cp) => cp !== null);
        if(allFilled && intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }, [currentPath])

    const onButtonClick = (side, idx) => {
        const correctSide = correctRoute[idx];

        if (correctSide === side) {
            // move to the next level
            setCurrentPath((prevPath) => prevPath.map((val, i) => {
                if (i === idx) {
                    return side;
                }
                return val;
            }))
        } else {
            // reset
            setCurrentPath([...Array(5)].fill(null));
        }
    }

    const nextClickableTile = currentPath.findIndex((cp) => cp === null);
    return (
        <div className={styles.wrapper}>
            <p className={styles.timer}>{(timer/10).toFixed(1)}</p>
            <div className={styles.levelsWrapper}>
                {
                    correctRoute.map((val, idx) => {
                        const isClickable = idx === nextClickableTile;

                        const isCorrectSelection = val = currentPath[idx];
                        const isLeftCorrect = isCorrectSelection && val === 'left';
                        const isRightCorrect = isCorrectSelection && val === 'right';

                        return (
                            <React.Fragment key={`${idx}-${isClickable}-${isCorrectSelection}`}>
                                <div
                                    className={`${styles.possibleRoute} ${isClickable ? styles.clickableRoute : ''} ${isLeftCorrect ? styles.correctRoute : ''}`}
                                    onClick={isClickable ? () => onButtonClick('left', idx) : undefined}
                                />
                                <div
                                    className={`${styles.possibleRoute} ${isClickable ? styles.clickableRoute : ''} ${isRightCorrect ? styles.correctRoute : ''}`}
                                    onClick={isClickable ? () => onButtonClick('right', idx) : undefined}
                                />
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </div>
    )

};

export default MemoryGame;
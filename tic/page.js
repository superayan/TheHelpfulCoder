'use client'

import React from 'react';
import styles from "./page.module.css";

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


const TicTacToe = () => {
    const [board, setBoard] = React.useState(new Array(9).fill(null));
    const [turn, setTurn] = React.useState('X');

    const onEmptyTileClick = (index) => {
        setBoard((prev) => prev.map((value, idx) => idx === index ? turn : value));
        setTurn((prev) => prev === 'X' ? 'O' : 'X');
    };

    React.useEffect(() => {
        let foundWinner = false;
        for (const patterns of winningPatterns) {
            const [index1, index2, index3] = patterns;
            const value1 = board[index1];
            const value2 = board[index2];
            const value3 = board[index3];

            if (value1 !== null && value1 === value2 && value1 === value3) {
                alert(`${value1} has won the game`);
                foundWinner = true;
                break;
            }

        }

        if (!foundWinner && board.every((value) => value !== null )) {
            alert('game is a tie');
        }
    }, [board]);
    return (
        <div className={styles.wrapper}>
            <grid className={styles.board}>
                {
                    board.map((elm, index) => (
                        <div 
                            key={index}
                            className={`${styles.tile} ${elm === null ? styles.tileEmpty : ''}`}
                            onClick={() => elm === null && onEmptyTileClick(index)}
                        >
                            {
                                elm !== null && (
                                    <p>{elm}</p>
                                )
                            }
                        </div>
                    ))
                }
            </grid>
            <button className={styles.resetButton} onClick={() => {
                setBoard(new Array(9).fill(null));
                setTurn('X');
            }}>Reset</button>
        </div>
    )
};


export default TicTacToe;
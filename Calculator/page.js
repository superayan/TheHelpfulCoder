'use client'

import React from 'react';
import styles from "./page.module.css";

// Eq types = 'add', 'subtract', 'multiply', 'divide'

// Guarentee: Users will only enter numbers
// Our output value will be an integer, using the Math.round function
// Even though input is number, some browsers treat them like text
//


export const Calculator = () => {
    const [result, setResult] = React.useState('');
    const [tempNumber, setTempNumber] = React.useState('');
    const [action, setAction] = React.useState(null);

    const handleEqualButtonPress = () => {
        const parsedTempNumber = parseInt(tempNumber, 10);
        const isTempValidNumber = !Number.isNaN(parsedTempNumber);

        // If valid action, update result
        if (isTempValidNumber && action !== null) {
            const parseNewNumber = parseInt(result,10);
            let newNumber = Number.isNaN(parseNewNumber) ? 0 :  parseNewNumber;
           
            switch (action) {
                case 'add':
                    newNumber += parsedTempNumber;
                    break;
                case 'subtract':
                    newNumber -= parsedTempNumber;
                    break;
                case 'multiply':
                    newNumber *= parsedTempNumber;
                    break;
                case 'divide':
                    newNumber /= parsedTempNumber;
                    break;
            }
    
            setResult(Math.round(newNumber));
        }

        setTempNumber('');
        setAction(null);
    }

    return (
        <div className={styles.wrapper}>
            <input 
                type='number'
                maxLength={10}
                className={styles.numberInput}
                value={action === null ? result : tempNumber}
                onChange={e => action === null ? setResult(e.target.value) : setTempNumber(e.target.value)}
                placeholder='0'
            />
            <div className={styles.actionButtons}>
                <button 
                    className={`${styles.actionButton} ${action === 'add' ? styles.actionButtonSelected : ''}`}
                    onClick={() => setAction('add')}
                >
                    ➕
                </button>
                <button 
                    className={`${styles.actionButton} ${action === 'subtract' ? styles.actionButtonSelected : ''}`}
                    onClick={() => setAction('subtract')}
                >
                    ➖
                </button>
                <button 
                    className={`${styles.actionButton} ${action === 'multiply' ? styles.actionButtonSelected : ''}`}
                    onClick={() => setAction('multiply')}
                >
                    ✖️
                </button>
                <button 
                    className={`${styles.actionButton} ${action === 'divide' ? styles.actionButtonSelected : ''}`}
                    onClick={() => setAction('divide')}
                >
                    ➗
                </button>
                <button 
                    className={`${styles.actionButton} ${styles.performButton}`}
                    onClick={handleEqualButtonPress}
                >
                    🟰
                </button>
                <button 
                    className={`${styles.actionButton} ${styles.performButton}`}
                    onClick={() => {
                        setResult('');
                        setTempNumber('');
                    }}
                >
                    C
                </button>
            </div>
        </div>
    )
};


export default Calculator;
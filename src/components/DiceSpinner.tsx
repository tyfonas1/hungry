"use client";

import React, { useState } from "react";
import styles from "./DiceSpinner.module.css";

const DiceSpinner = () => {
    const [rolling, setRolling] = useState(false);
    const [result, setResult] = useState<string | null>(null);


    const rollDice = async () => {
        // Start the rolling animation
        setRolling(true);

        // Simulate rolling the dice by waiting a little
        setTimeout(() => {
            // Generate a random number from 1 to 6
            const randomNumber = Math.floor(Math.random() * 6) + 1;
            setResult(randomNumber.toString());
            setRolling(false);  // Stop the rolling animation
        }, 1000);  // 1 second delay for the rolling effect
    };

    return (
        <div className={styles.container}>
            <div className={`${styles.dice} ${rolling ? styles.rolling : ""}`}>
                {result ? result : "?"}
            </div>
            <button className={styles.button} onClick={rollDice} disabled={rolling}>
                {rolling ? "Rolling..." : "Roll the Dice"}
            </button>
        </div>
    );
};

export default DiceSpinner;

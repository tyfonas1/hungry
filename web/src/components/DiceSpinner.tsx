"use client";

import React, { useState } from "react";
import styles from "./DiceSpinner.module.css";
import axios from "@/lib/axios";

const DiceSpinner = () => {
    const [rolling, setRolling] = useState(false);
    const [result, setResult] = useState<string | null>(null);


    const rollDice = async () => {
        setRolling(true); // Start rolling animation
        setResult(null); // Clear the previous result

        try {
            // Call the API to roll the dice
            const response = await axios.get<{ result: number }>("roll");
            const randomNumber = response.data.result; // Get the result from the response

            // Simulate rolling animation before displaying the result
            setTimeout(() => {
                setResult(randomNumber.toString()); // Set the result
                setRolling(false); // Stop rolling animation
            }, 2000);
        } catch (error) {
            console.error("Error fetching dice roll:", error);
            setRolling(false); // Stop rolling even if the API fails
        }
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

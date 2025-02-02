import React from "react";
import DiceSpinner from "../components/DiceSpinner";

export default function Home() {
    return (
        <div>
            <h1 style={{ textAlign: "center", marginTop: "20px" }}>Dice Spinner</h1>
            <DiceSpinner />
        </div>
    );
}

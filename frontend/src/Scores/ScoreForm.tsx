import React, { useState } from "react";
import { IScores } from "../types";
import { useFormStatus } from "react-dom";
import styles from './styles.module.css'

export default function ScoreForm() {
    const [inputs, setInputs] = useState({} as IScores);
    const [error, setError] = useState<Error>({} as Error);
    const [status, setStatus] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const SubmitButton = () => {
        const { pending } = useFormStatus();
        return (<>
            <button type="submit" disabled={pending} className={styles.submitButton}>{pending ? "Submitting..." : "Submit"}</button>
        </>)
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError({} as Error);
        setStatus("");
        try {
            const response = await fetch(`http://localhost:3000/api/scores/`, {
                method: "POST",
                "headers": {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: inputs._id, score: parseInt(inputs.score) })
            });

            if (!response.ok) {
                throw new Error(`Invalid input data`);
            }

            const { status } = await response.json();

            setStatus(status);
        } catch (error) {
            const err = error as Error;
            console.error("Error details:", err);
            setError(err);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.scoreForm}>
            <div className={styles.scoreFormContent}>
                <h1>Submit your score</h1>
                <label>Enter your player ID:</label>
                <input
                    type="text"
                    name="_id"
                    value={inputs._id || ""}
                    onChange={handleChange}
                    required
                />
                <label>Enter your score:</label>
                <input
                    type="number"
                    name="score"
                    value={inputs.score || ""}
                    min={0}
                    onChange={handleChange}
                    required
                />
                <SubmitButton />
                {error && <p>{error.message}</p>}
                {status === "success" && <p>Player score added!</p>}
            </div>
        </form>
    )
}
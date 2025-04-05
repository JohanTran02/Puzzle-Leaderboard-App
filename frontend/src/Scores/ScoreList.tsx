import { useState, useEffect } from "react";
import { IScores } from "../types";
import Score from "./Score";

export default function ScoreList() {
    const [scores, setScores] = useState<IScores[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error>({} as Error);
    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/scores/?top=10`, {
                    method: "GET",
                    "headers": {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error: Status ${response.status}`);
                }

                const { data } = await response.json();

                setScores(data);
                setLoading(false);

            } catch (error) {
                const err = error as Error;
                console.error("Error details:", err);
                setError(err);
            }
        }

        fetchScores();
    }, [])
    return (
        <>
            {
                !error.message ?
                    <>
                        <h1>Ranking</h1>
                        <ol>
                            {
                                !loading && scores.length > 0 ?
                                    <>
                                        {
                                            scores.map((score) => <Score key={score._id} score={score} />)
                                        }
                                    </>
                                    : <><div>loading</div></>
                            }
                        </ol>
                    </>
                    : <div>{error.message}</div>
            }

        </>
    )
}
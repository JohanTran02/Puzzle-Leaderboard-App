import { useState } from "react"
import styles from './styles.module.css'


export default function SearchPlayerInput() {
    const [input, setInput] = useState<string>("")
    const [playerRank, setPlayerRank] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error>({} as Error);

    const fetchPlayer = async (player_id: string) => {
        setError({} as Error);
        try {
            const response = await fetch(`http://localhost:3000/api/scores/${player_id}/rank`, {
                method: "GET",
                "headers": {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Invalid input data`);
            }

            const { data: { rank } } = await response.json();

            setPlayerRank(rank);
            setLoading(false);

        } catch (error) {
            const err = error as Error;
            console.error("Error details:", err);
            setError(err);
        }
    }

    return (
        <div className={styles.searchPlayerButton}>
            <input
                type="text"
                value={input}
                name="inputSearch"
                onChange={e => setInput(e.target.value)}
                placeholder="Search a player..."
            />
            <button onClick={() => fetchPlayer(input)}>Search</button>
            {!error.message ? <>{
                !loading && playerRank && <div>Player rank: {playerRank}</div>
            }</> : <div>{error.message}</div>}
        </div>
    )
}
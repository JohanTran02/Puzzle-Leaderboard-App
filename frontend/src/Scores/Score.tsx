import { IScores } from "../types";
import styles from './styles.module.css'

export default function Score({ score }: { score: IScores }) {
    return (
        <li className={styles.scoreItem}>
            <p>Player ID: {score._id}</p>
            <p>Score: {score.score}</p>
        </li>
    )
}
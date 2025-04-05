import SearchPlayerInput from './Player/SearchPlayerInput';
import ScoreForm from './Scores/ScoreForm';
import ScoreList from './Scores/ScoreList';
import styles from './Scores/styles.module.css'

function App() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.scoreList}>
          <ScoreList />
          <SearchPlayerInput />
        </div>
        <ScoreForm />
      </div>
    </>
  )
}

export default App
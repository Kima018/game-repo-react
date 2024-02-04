import '../style/WinModal.css'
export default function WinModal({score,handleRestart,time}){
    return <div className='win-modal'>
        <div>
            <h2>NICE,You won!!!</h2>
            <h3>HIGH SCORE IS {score}</h3>
            <h3>Time {time}</h3>
            <button onClick={handleRestart}>Play again</button>
        </div>

    </div>
}
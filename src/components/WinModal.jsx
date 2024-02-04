import '../style/WinModal.css'
export default function WinModal({currScore,highScore,handleRestart,time}) {

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const remainingSeconds = timeInSeconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
    let score = <h3>HIGH SCORE IS {highScore}</h3>

    if (currScore< highScore){
        score = <h3>NEW HIGH SCORE IS YOUYRS {highScore}, CONGRATULATIONS! </h3>
    }

    return <div className='win-modal'>
        <div>
            <h2>NICE,You won!!!</h2>
            {score}
            <h3>Time {formatTime(time)} sec</h3>
            <button onClick={handleRestart}>Play again</button>
        </div>

    </div>
}
import '../style/WinModal.css'
export default function WinModal({score}){
    return <div className='win-modal'>
        <div>
            <h2>NICE,You won!!!</h2>
            <h3>HIGH SCORE > {score}</h3>
        </div>

    </div>
}
import {data} from "../data";
import Card from "./Card";
import '../style/GameBoard.css'
import '../style/Header.css'
import {useEffect, useState} from "react";
import WinModal from "./WinModal";

function shuffle(array) {
    const length = array.length;
    for (let i = length; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * i);
        const currentIndex = i - 1;
        const temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array;
}

let initialGameStats = {
    openCards: [],
    matchedCards: [],
    seconds: 0,
    isGameActive: false,
    moves: 0,
    bestScore: 0
}
const checkStoredData = () => {
    const tempData = JSON.parse(localStorage.getItem('Data'))
    if (tempData) {
        initialGameStats = tempData
    } else {
        localStorage.setItem('Data', JSON.stringify(initialGameStats))
    }
}
checkStoredData()


export default function GameBoard() {
    const [cards, setCards] = useState(shuffle.bind(null, data.concat(data)))
    const [gameStats, setGameStats] = useState(initialGameStats)
    const [hasWinner, setHasWinner] = useState(false)

    const handleRestartGame = () => {
        checkStoredData()
        setGameStats(initialGameStats)
        setCards(shuffle.bind(null, data.concat(data)))
        setHasWinner(false)
    }

    const handleCardClick = (index) => {
        if (gameStats.openCards.length < 2) {
            setGameStats((prevState) => ({
                ...prevState,
                openCards: [index, ...prevState.openCards],
                moves: prevState.moves + 1
            }));
        }
        if (!gameStats.isGameActive) {
            setGameStats((prevState) => ({
                ...prevState, isGameActive: true
            }))
        }
    }

    const checkCardMatch = () => {
        const [firstCard, secondCard] = gameStats.openCards
        if (cards[firstCard].name === cards[secondCard].name) {
            setTimeout(() => {
                setGameStats(prevState => ({
                    ...prevState, matchedCards: [firstCard, secondCard, ...prevState.matchedCards]
                }))
            }, 500)
        }
    }
    const setBestScore = (currMoves) => {
        if (gameStats.moves / 2 < gameStats.bestScore || gameStats.bestScore === 0) {
            setGameStats(prevState => ({
                ...prevState,
                bestScore: prevState.moves / 2
            }))
            let tempData = {...initialGameStats, bestScore: gameStats.moves / 2}
            localStorage.setItem('Data', JSON.stringify(tempData))
        }
    }
    useEffect(() => {
        if (gameStats.openCards.length === 2) {
            checkCardMatch()
            setTimeout(() => {
                setGameStats((prevState) => ({
                    ...prevState, openCards: []
                }))
            }, 800)
        }
    }, [gameStats.openCards.length])

    useEffect(() => {
        if (gameStats.matchedCards.length === cards.length) {
            setBestScore()
            setTimeout(() => {
                setHasWinner(true)
                setGameStats(prevState => ({...prevState, isGameActive: false}))
            }, 500)
        }
    }, [gameStats.matchedCards.length])


    const checkIsPicked = (index) => {
        return Boolean(gameStats.openCards.includes(index))
    }
    const checkIsMatched = (index) => {
        return Boolean(gameStats.matchedCards.includes(index))
    }


    useEffect(() => {
        let interval
        if (gameStats.isGameActive) {
            interval = setInterval(() => {
                setGameStats((prevState) => ({
                    ...prevState, seconds: prevState.seconds + 1
                }))
            }, 1000)

        }
        return () => {
            clearInterval(interval)
        }
    }, [gameStats.isGameActive])

    return <div className='container'>
        <header className='header'>
            <button onClick={() => handleRestartGame()}>restart</button>
            <p>{gameStats.seconds}</p>
        </header>
        <div className='game-board'>
            {cards.map((item, index) => {
                return <Card
                    key={index}
                    index={index}
                    cardLogo={item.img}
                    onClick={handleCardClick}
                    isPicked={checkIsPicked(index)}
                    isMatched={checkIsMatched(index)}
                />
            })}
        </div>
        {hasWinner ? <WinModal score={gameStats.bestScore} handleRestart={handleRestartGame} time={gameStats.seconds
        }/> : undefined}
    </div>
}

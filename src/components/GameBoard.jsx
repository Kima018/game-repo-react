import {data} from "../data";
import Card from "./Card";
import '../style/GameBoard.css'
import '../style/Header.css'
import {useEffect, useState} from "react";

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

export default function GameBoard() {

    const [cards, setCards] = useState(shuffle.bind(null, data.concat(data)))
    const [gameStats, setGameStats] = useState({
        openCards: [], matchedCards: [], seconds: 0, isGameActive: false,
    })
    const handleRestartGame = () => {
        setGameStats({openCards: [], matchedCards: [], seconds: 0, isGameActive: false})
        setCards(shuffle.bind(null, data.concat(data)))
    }
    const handleCardClick = (index) => {
        if (gameStats.openCards.length < 2) {
            setGameStats((prevState) => ({
                ...prevState, openCards: [index, ...prevState.openCards]
            }));
        }
        if (!gameStats.isGameActive) {
            setGameStats((prevStats) => ({
                ...prevStats, isGameActive: true
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
            setTimeout(() => {
                console.log('winneeer')
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
                setGameStats((prevStats) => ({
                    ...prevStats, seconds: prevStats.seconds + 1
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
    </div>

}

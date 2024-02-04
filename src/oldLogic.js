import {data} from "../data";
import Card from "./Card";
import '../style/GameBoard.css'
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
    const [openCards, setOpenCards] = useState([])
    const [matchedCards, setMatchedCards] = useState([])

    const [gameStats,setGameStats] = useState({
        openCards:[],
        matchedCards:[],
    })

    const handleCardClick2 = (index) => {
        if (gameStats.openCards.length < 2) {
            setGameStats((prevState) =>({
                ...prevState,
                openCards:[index,...prevState.openCards]
            }));
        }
    }
    const checkCardMatch2 = () => {
        const [firstCard, secondCard] = gameStats.openCards
        if (cards[firstCard].name === cards[secondCard].name) {
            setTimeout(() => {
                setGameStats(prevState =>({
                    ...prevState,
                    matchedCards: [firstCard,secondCard,...prevState.matchedCards]
                }))
            }, 500)
        }
    }

    const handleCardClick = (index) => {
        if (openCards.length < 2) {
            setOpenCards((prev) => [...prev, index]);
        }
    }


    const checkCardMatch = () => {
        const [firstCard, secondCard] = openCards
        if (cards[firstCard].name === cards[secondCard].name) {
            setTimeout(() => {
                setMatchedCards(prevState => [firstCard, secondCard,...prevState])
            }, 500)
        }
    }

    useEffect(() => {
        if (openCards.length === 2) {
            checkCardMatch()
            setTimeout(() => {
                setOpenCards([])
            }, 1000)
        }
    }, [openCards.length])

    useEffect(() => {
        if (matchedCards.length === cards.length) {
            setTimeout(() => {
                console.log('winneeer')
            }, 500)
        }
    }, [matchedCards.length])

    const checkIsPicked = (index) => {
        return Boolean(openCards.includes(index))
    }
    const checkIsMatched = (index) => {
        return Boolean(matchedCards.includes(index))
    }


    return <div className='container'>
        <div className='game-board'>
            {cards.map((item, index) => {
                return <Card
                    key={index}
                    index={index}
                    cardLogo={item.img}
                    onClick={handleCardClick2}
                    isPicked={checkIsPicked(index)}
                    isMatched={checkIsMatched(index)}
                />
            })}
        </div>
    </div>

}

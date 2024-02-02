import './App.css';
import {data} from "./data";
import {useState} from "react";
import GameBoard from "./components/GameBoard";


const NEW_DATA = [...data, ...data]
NEW_DATA.sort(() => Math.random() - 0.5)

function App() {
    const [isClicked,setIsClicked]=useState(false)

    return (
        <>
            <GameBoard/>
        </>

    );
}

export default App;

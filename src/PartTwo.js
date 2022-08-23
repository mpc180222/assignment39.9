import React, {useEffect, useState, useRef} from "react";
import axios from "axios";

const PartTwo = () => {

    const timerId = useRef();
    const [card, setCard] = useState(null);
    const [deck, setDeck] = useState(null);
    const [timerRunning, setTimerRunning] = useState(false);
    
   useEffect(function fetchDeckWhenMounted(){
        async function getDeck(){
            const deckRes = await axios.get("http://deckofcardsapi.com/api/deck/new/");
            setDeck(deckRes.data.deck_id)
        }
        getDeck()
        
   }, [])


   function startTimer(){
   
    timerId.current = setInterval(() => {
        setTimerRunning(true);
        fetchCard();
    },1000)}

    function stopTimer(){
        clearInterval(timerId.current);
        setTimerRunning(false);

    }

        async function fetchCard(){
            const cardRes = await axios.get(`http://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`);
            if(cardRes.data.cards[0]) setCard(cardRes.data.cards[0]);
            else{
                alert("Error - no cards remaining in the deck")
            }  
        }
    return(
        <div>
        {card ? <h1>{card.value} of {card.suit}</h1> : null}
        {!deck && <h2>Loading...</h2>}
        {deck && !timerRunning && <button onClick={startTimer} >Start Drawing</button>}  
        {deck && timerRunning && <button onClick={stopTimer} >Stop Drawing</button>}            
        </div>
       
    )
}
export default PartTwo;
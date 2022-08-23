import React, {useEffect, useState, useRef} from "react";
import axios from "axios";

const CardDrawer = () => {

    const [card, setCard] = useState(null);
    const [deck, setDeck] = useState(null);
    
   useEffect(function fetchDeckWhenMounted(){
        async function getDeck(){
            const deckRes = await axios.get("http://deckofcardsapi.com/api/deck/new/");
            setDeck(deckRes.data.deck_id)
        }
        getDeck()
        
   }, [])

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
        {deck ? <button onClick = {fetchCard}>Draw a card</button> : <h2>Loading...</h2> }  

            
        </div>
    )

}


export default CardDrawer;

 // useEffect( () => {
    //     async function fetchCard(){
    //         const cardRes = await axios.get(`http://deckofcardsapi.com/api/deck/${DECK_ID}/draw/?count=2`);
    //         setCard(cardRes.data[0]);
    //     }
    //     fetchCard();
    // }
    // ,[card])

     // const deckPromise = axios.get("http://deckofcardsapi.com/api/deck/new/");

    // const DECK_ID = deckPromise.then((response) => {
    //     return response.data.deck_id
    // })
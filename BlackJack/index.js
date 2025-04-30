// 2. Use getRandomCard() to set the values of firstCard and secondCard
let firstCard = getRandomCard();
let secondCard = getRandomCard();
let cards = [firstCard, secondCard];
let sum = firstCard + secondCard;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let dealersumEl = document.getElementById("dealersum-el");
let dealercardsEl = document.getElementById("dealercards-el");
let dealerfirstCard = getRandomCard();
let dealerCards = [dealerfirstCard];
let dealerSum = dealerfirstCard;
let flag = true;

function getRandomCard(){
    return Math.floor(Math.random()*11)+1;
}

function startGame() {
    document.getElementById("startbtn").style.display="none";
    document.getElementById("newbtn").style.display="block";
    document.getElementById("standbtn").style.display="block";
    renderGame();
}

function renderGame() {
    cardsEl.textContent = "Cards: ";
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " ";
    }
    dealercardsEl.textContent = "Dealer Cards: "
    for (let i = 0; i < dealerCards.length; i++) {
        dealercardsEl.textContent += dealerCards[i] + " ";
    }    
    sumEl.textContent = "Sum: " + sum
    dealersumEl.textContent = "Dealer Sum: " + dealerSum
    if (sum <= 20) {
        message = "Do you want to draw a new card?";
        messageEl.textContent = message;
    } 
    else if (sum === 21) {
        document.getElementById("startbtn").style.display="none";
        document.getElementById("newbtn").style.display="none";
        document.getElementById("againbtn").style.display="block";
        document.getElementById("standbtn").style.display="none";
        stand();
    }
    else {
        message = "Bust!"
        document.getElementById("startbtn").style.display="none";
        document.getElementById("newbtn").style.display="none";
        document.getElementById("againbtn").style.display="block";
        document.getElementById("standbtn").style.display="none";
        messageEl.textContent = message;
    }
}

function newCard() {
    let card = getRandomCard();
    sum += card;
    cards.push(card);
    renderGame();
}

function playAgain(){
    reset();
    document.getElementById("againbtn").style.display="none";
    startGame();
}

function reset(){
    firstCard = getRandomCard();
    secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    dealerfirstCard = getRandomCard();
    dealerCards = [dealerfirstCard];
    dealerSum = dealerfirstCard;
}

function stand(){
    document.getElementById("standbtn").style.display="none";
    document.getElementById("newbtn").style.display="none";
    while (playerHigher()){
        if (dealerSum > 21){
            messageEl.textContent = "You Win";
            break;
        }
        else if (dealerSum < 17){
            let newCard = getRandomCard();
            dealerSum += newCard;
            dealersumEl.textContent = "Dealer Sum: " + dealerSum
            dealerCards.push(newCard);
            dealercardsEl.textContent = "Dealer Cards: "
            for (let i = 0; i < dealerCards.length; i++) {
                dealercardsEl.textContent += dealerCards[i] + " ";
            }
        }
        else{
            messageEl.textContent = "Dealer cannot take a card anymore. You Win";
            break;
        }
    }
    document.getElementById("againbtn").style.display="block";
}

function playerHigher(){
    if (dealerSum > sum && dealerSum <= 21){
        messageEl.textContent = "Dealer has a higher number. You Lose";
        return false;
    }
    else if (dealerSum === sum && dealerSum >= 17 ){
        messageEl.textContent = "You Tied";
        return false;        
    }
    else{
        return true;
    }
}
const cardBox = document.getElementById("gameCardBox");
const restartBtn = document.getElementById('restartBtn');
const moveCount = document.getElementById("moveCount");
const popup = document.getElementById("popupMessage")
const popupText = document.getElementById("popText")

let cardsArr = ["./images/q-heart.png", "./images/k-heart.png", "./images/q-ass.png", "./images/k-ass.png", "./images/a-ass.png", "./images/a-heart.png", "./images/a-spead.png", "./images/a-diemond.png"];
let cards = []
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function gameStart(){
    const totalCard = shuffle([...cardsArr, ...cardsArr]);
    cardBox.innerHTML = "";
    cards = [];
    firstCard = secondCard = null;
    lockBoard = false;
    moves = 0;
    moveCount.innerText = moves;
    popup.classList.remove('show');

    totalCard.forEach((cardItem)=>{
        const card = document.createElement("li");
        card.classList.add("card");

        const innerCard = document.createElement("div");
        innerCard.classList.add("inner-card");

        const frontCard = document.createElement("div");
        const frontImg = document.createElement("img");
        frontCard.classList.add("front-card");
        // frontCard.innerText =  "?";
        frontImg.setAttribute("src","./images/card-bg.jpg");
        frontCard.appendChild(frontImg);
        
        const backCard = document.createElement("div");
        const backImg = document.createElement("img");
        backCard.classList.add("back-card");
        backImg.setAttribute("src",`${cardItem}`);
        backCard.appendChild(backImg)
        // backCard.innerText =`${cardItem}`;
        
        innerCard.appendChild(frontCard);
        innerCard.appendChild(backCard);
        card.appendChild(innerCard);
        card.dataset.cardItem = cardItem;
        card.addEventListener("click", flipCard)
        
        cardBox.appendChild(card);
        cards.push(card);
    });
}
function flipCard(){
    if (lockBoard || this.classList.contains('flipped') || this.classList.contains('matched')) return;
    
    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    };
    secondCard = this;
    moves++;
    moveCount.innerText = moves;
    checkMatch()
}

function checkMatch() {
    if (firstCard.dataset.cardItem === secondCard.dataset.cardItem) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        cardReset();
        setTimeout(gameComplete , 1000)
    } else {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        cardReset();
    }, 1000);
    }
}
function gameComplete(){
    const matchedCards = document.querySelectorAll(".card.matched")
    if(matchedCards.length === cards.length){
        popup.classList.add("show");
        if(moves <= "16"){
            popupText.innerText = "Genius Play!🎉";
        }else if(moves <= "18"){
            popupText.innerText = "Good Play!👍";
        }else{
            popupText.innerText = "Well Done";
        }
    }
}

function cardReset() {
      [firstCard, secondCard] = [null, null];
      lockBoard = false;
    }

restartBtn.addEventListener('click', gameStart);


gameStart()

const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points")
    },
    cardSprite: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },

    fieldCards: {
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
    playerSides: {
        player1: "player-cards",
        player1BOX: document.querySelector("#player-cards"),
        computer: "computer-cards",
        computerBOX: document.querySelector("#computer-cards"),
    },
    actions: {
        button: document.getElementById("next-duel"),

    },



};

const playerSides = {
    player1: "player-cards",
    computer: "computer-cards",
}

const pathImages = "./src/assets/icons/";

const cardData = [
    {
        id: 0,
        name: "blue Eyes White Dragon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        winOf: [1],
        loseOf: [2],
    },
    {
        id: 1,
        name: "Drak magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        winOf: [2],
        loseOf: [0],
    },

    {
        id: 2,
        name: "Exodia",
        type: "scissor",
        img: `${pathImages}exodia.png`,
        winOf: [0],
        loseOf: [1],
    },

];

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function createCardImage(IdCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", IdCard);
    cardImage.classList.add("card");


    if (fieldSide === playerSides.player1) {
        cardImage.addEventListener("mouseover", () => {
            drawSelectCard(IdCard);
        });

        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"));
        });
    }


    return cardImage;

}

async function setCardsField(cardId) {

    await removeAllCardsImages();

    let computerCardID = await getRandomCardId();

    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";

    state.cardSprite.avatar.src = "";
    state.cardSprite.name.innerText = "";
    state.cardSprite.type.innerText = "";

    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardID].img;

    let duelResults = await checkDuelResults(cardId, computerCardID);

    await updateScore();
    await drawButton(duelResults);
}

async function drawButton(text) {
    state.actions.button.innerText = Text;
    state.actions.button.style.display = "block";
}

async function updateScore() {
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

async function checkDuelResults(playerCardId, computerCardID) {
    let duelResults = "Draw"
    let playerCard = cardData[playerCardId];

    if (playerCard.winOf.includes(computerCardID)) {
        duelResults = "Win"
        await playAudio(duelResults);
        state.score.playerScore++;

    }

    if (playerCard.loseOf.includes(computerCardID)) {
        duelResults = "Lose";
        await playAudio(duelResults);
        state.score.computerScore++;
    }

    return duelResults;
}

async function removeAllCardsImages() {
    let { computerBOX, player1BOX } = state.playerSides;
    let imgElements = computerBOX.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

    imgElements = player1BOX.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
}
async function drawSelectCard(index) {
    state.cardSprite.avatar.src = cardData[index].img;
    state.cardSprite.name.innerText = cardData[index].name;
    state.cardSprite.type.innerText = "attibute : " + cardData[index].type;
}

async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);

    }
}

async function resetDuel() {
    state.cardSprite.avatar.src = "";
    state.actions.button.style.display = "none";

    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    init();
}

async function playAudio(status){
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
    audio.play();

    
}




function init() {
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);

   
}

init();


"use strict";
//Variables
//The number you have to guess
var randomNumber;
//Gamemaster pharases
var gpPhrases = [
    "Lets make a guess!",
    "Thats correct!",
    "Thats too high!",
    "Thats too low!",
];
// thinkbubble content
var bubblePhrases = [
    "...",
    "Hmm...",
    "💭💭💭",
    "⚙⚙⚙",
    "🤖🤖🤖",
    "Beep boop!",
    "Loading...",
    "Computing...",
    "💾💾💾",
    "0100100 011011"
];
// the slider and its value
var slider = document.createElement("input");
var sliderValue = document.createElement("p");
//submit button
var submitBtn = document.createElement("button");
//number of guesses the players has made
var amountOfGuesses = 0;
function drawGame() {
    console.log(playerAnswerMade);
    chosenBots.splice(1, 0, "Player");
    drawSlider();
    drawBubbles();
    setRandomNumber();
    drawActiveBots();
    drawAnswers();
    document.getElementById('answer1').style.backgroundImage = "url(\"../assets/imgs/thinkBubble.png\")";
    updateAnswers('answer1', bubblePhrases[Math.floor(Math.random() * (0 + bubblePhrases.length) + 0)]);
    gameRound();
    //   hideAnswerBubbles();
}
function drawSlider() {
    // Slider
    slider.type = 'range';
    slider.min = '0';
    slider.max = '100';
    slider.id = 'rangeSlider';
    slider.disabled = true;
    //submit btn
    submitBtn.textContent = "Guess";
    submitBtn.classList.add('guessBtn');
    submitBtn.disabled = true;
    //Value from slider
    //   sliderValue.innerText = slider.value;
    //   sliderValue.id = "sliderValue";
    // target bubble instead
    // Adds the elements to the wrapper
    inputWrapper.appendChild(slider);
    inputWrapper.appendChild(sliderValue);
    inputWrapper.appendChild(submitBtn);
    //updates the value when you move the slider
    slider.oninput = function () {
        document.getElementById('answer2').innerText = slider.value;
    };
}
function drawAnswers() {
    for (var index = 0; index < chosenBots.length; index++) {
        var answer = document.createElement("div");
        answer.id = "answer" + (index + 1);
        answer.classList.add("answerBubble");
        document.getElementById("answerWrapper").appendChild(answer);
        var answerText = document.createElement("p");
        document.getElementById("answer" + (index + 1)).style.visibility = "hidden";
        document.getElementById("answer" + (index + 1)).appendChild(answerText);
    }
    // set slider value to bubble
    document.getElementById('answer2').innerText = slider.value;
}
function updateAnswers(id, value) {
    document.getElementById(id).innerText = value;
    document.getElementById(id).style.visibility = "visible";
}
//Gets called before every new answer
function hideAnswerBubbles() {
    if (chosenBots.length > 2) {
        document.getElementById("answer1").style.visibility = "hidden";
        document.getElementById("answer2").style.visibility = "hidden";
        document.getElementById("answer3").style.visibility = "hidden";
    }
    else {
        document.getElementById("answer1").style.visibility = "hidden";
        document.getElementById("answer2").style.visibility = "hidden";
    }
}
function drawActiveBots() {
    for (var i = 0; i < chosenBots.length; i++) {
        var element = document.createElement("div");
        element.id = chosenBots[i];
        document.getElementById("botWrapper").appendChild(element);
        element.style.backgroundImage = "url(\"../assets/imgs/player" + chosenBots[i] + ".png\")";
    }
}
// vars
var firstAnswerMade = false;
var playerAnswerMade = false;
var thirdAnswerMade = false;
var botGuessValue;
var botOneAnswer;
var botTwoAnswer;
var guessValue;
var answerTime;
// the logic for how the rounds works----
function gameRound() {
    //sets a random number between 2000-4000 to use as timeout time.
    answerTime = Math.floor(Math.random() * (6000 - 3000 + 1000) + 3000);
    //if stat for whos turn it is 
    if (!firstAnswerMade && !playerAnswerMade && !thirdAnswerMade) {
        slider.disabled = true;
        submitBtn.disabled = true;
        submitBtn.style;
        setTimeout(function () {
            var getRandomNumb = Math.floor(Math.random() * (0 + bubblePhrases.length) + 0);
            document.getElementById('answer1').style.backgroundImage = "url(\"../assets/imgs/thinkBubble.png\")";
            updateAnswers('answer1', bubblePhrases[getRandomNumb]);
        }, 1500);
        setTimeout(function () {
            document.getElementById('answer1').style.backgroundImage = "url(\"../assets/imgs/bubbleTR.png\")";
            botAnswer(0);
            compareAnswer(botGuessValue, randomNumber);
            firstAnswerMade = true;
            botOneAnswer = botGuessValue;
            hideAnswerBubbles();
            // console.log('Answer from bot 1');
            updateAnswers('answer1', String(botOneAnswer));
            gameRound();
        }, answerTime);
    }
    else if (firstAnswerMade && !playerAnswerMade && !thirdAnswerMade) {
        slider.disabled = false;
        submitBtn.disabled = false;
        playerAnswerMade = true;
        playerGuess();
    }
    else if (chosenBots.length > 2 && firstAnswerMade && playerAnswerMade && !thirdAnswerMade) {
        slider.disabled = true;
        submitBtn.disabled = true;
        setTimeout(function () {
            var getRandomNumb = Math.floor(Math.random() * (0 + bubblePhrases.length) + 0);
            document.getElementById('answer3').style.backgroundImage = "url(\"../assets/imgs/thinkBubble.png\")";
            updateAnswers('answer3', bubblePhrases[getRandomNumb]);
        }, 1500);
        setTimeout(function () {
            document.getElementById('answer3').style.backgroundImage = "url(\"../assets/imgs/bubbleTR.png\")";
            botAnswer(2);
            thirdAnswerMade = true;
            botTwoAnswer = botGuessValue;
            hideAnswerBubbles();
            updateAnswers('answer3', String(botTwoAnswer));
            gameRound();
        }, answerTime);
        // console.log('Asnwer from bot 2')
    }
    else {
        firstAnswerMade = false;
        playerAnswerMade = false;
        thirdAnswerMade = false;
        gameRound();
    }
}
// Answers from bots
function botAnswer(index) {
    var IQRange = checkWhichBot(index);
    //   console.log("IQRange: " + IQRange);
    botGuessValue = Math.floor(Math.random() * (randomNumber - IQRange + (randomNumber + IQRange)) + 0);
    while (botGuessValue > 100 || botGuessValue < 0) {
        botGuessValue = Math.floor(Math.random() * (randomNumber - IQRange + (randomNumber + IQRange)) + 0);
    }
}
function checkWhichBot(index) {
    if (chosenBots[index] === "Bolt") {
        return 25;
    }
    else if (chosenBots[index] === "Gadget") {
        return 50;
    }
    else if (chosenBots[index] === "Clank") {
        return 75;
    }
}
//compares the answers that both bots and player gives
function compareAnswer(answer, randomNumber) {
    if (answer === randomNumber) {
        // IF GUESS IS CORRECT
        document.getElementById(bubbleID[0]).style.visibility = "hidden";
        document.getElementById(bubbleID[2]).style.visibility = "hidden";
        document.getElementById(bubbleID[3]).style.visibility = "hidden";
        document.getElementById(bubbleID[1]).style.visibility = "visible";
        setElementContent(bubbleTextID[1], gpPhrases[1]);
        amountOfGuesses++;
    }
    else if (answer > randomNumber) {
        //IF GUESST IS HIGHER THAN RANDOMNUMB
        document.getElementById(bubbleID[0]).style.visibility = "hidden";
        document.getElementById(bubbleID[1]).style.visibility = "hidden";
        document.getElementById(bubbleID[3]).style.visibility = "hidden";
        document.getElementById(bubbleID[2]).style.visibility = "visible";
        setElementContent(bubbleTextID[2], gpPhrases[2]);
        amountOfGuesses++;
    }
    else if (answer < randomNumber) {
        // IF GUESS IS LOWER THAN RANDOMNUMB
        document.getElementById(bubbleID[0]).style.visibility = "hidden";
        document.getElementById(bubbleID[1]).style.visibility = "hidden";
        document.getElementById(bubbleID[2]).style.visibility = "hidden";
        document.getElementById(bubbleID[3]).style.visibility = "visible";
        setElementContent(bubbleTextID[3], gpPhrases[3]);
        amountOfGuesses++;
    }
}
function drawBubbles() {
    document.getElementById(bubbleID[0]).style.visibility = "visible";
    setElementContent(bubbleTextID[0], gpPhrases[0]);
}
//sets the random number that the players and bots tries to guess
function setRandomNumber() {
    randomNumber = Math.floor(Math.random() * (0 + 100) + 0);
    console.log("number:" + randomNumber);
}
function playerGuess() {
    // if randomNumber = inputValue, then correct! if randomNumber >/< inputValue, give corresponding response
    setTimeout(function () {
        document.getElementById('answer2').style.backgroundImage = "url(\"../assets/imgs/thinkBubble.png\")";
        updateAnswers('answer2', slider.value);
    }, 1000);
    submitBtn.onclick = function () {
        hideAnswerBubbles();
        guessValue = parseInt(slider.value);
        console.log("Guess: " + guessValue);
        console.log("number: " + randomNumber);
        compareAnswer(guessValue, randomNumber);
        document.getElementById('answer2').style.backgroundImage = "url(\"../assets/imgs/bubbleTR.png\")";
        updateAnswers("answer2", String(guessValue));
        clearInterval(timer);
        gameRound();
    };
    //Timer for the player.
    var timeLeft = 10;
    var timer = setInterval(function () {
        timeLeft--;
        console.log("time left: " + timeLeft);
        if (timeLeft <= 0) {
            guessValue = parseInt(slider.value);
            compareAnswer(guessValue, randomNumber);
            hideAnswerBubbles();
            document.getElementById('answer2').style.backgroundImage = "url(\"../assets/imgs/bubbleTR.png\")";
            updateAnswers("answer2", String(guessValue));
            gameRound();
            clearInterval(timer);
        }
    }, 1000);
}
window.addEventListener('load', welcomeScreen);
var gameMaster = document.getElementById('gameMaster');
var players = [];
//let player: {name: string, highscore: number, games: number}
var bubbleTextID = ['textTL', 'textTR', 'textBL', 'textBR'];
var bubbleID = ['bubbleTL', 'bubbleTR', 'bubbleBL', 'bubbleBR'];
var inputWrapper = document.getElementById('inputField');
function setElementContent(id, mainText) {
    var element = document.getElementById(id);
    element.innerHTML = mainText;
}
function removeBubbles() {
    for (var index = 0; index < bubbleID.length; index++) {
        var bubbles = document.getElementById(bubbleID[index]);
        var text = document.getElementById(bubbleTextID[index]);
        bubbles.onclick = function () {
            // reset onclick 
        };
        bubbles.style.visibility = 'hidden';
        text.innerHTML = '';
    }
}
function removeBubble(bubbleID, textID) {
    document.getElementById(textID).innerHTML = '';
    document.getElementById(bubbleID).style.visibility = 'hidden';
}
function showBubble(bubbleID, bubbleTextID, bubbleText) {
    document.getElementById(bubbleID).style.visibility = "visible";
    setElementContent(bubbleTextID, bubbleText);
}
var bubbleText = [
    "Choose your opponents!",
    "You can pick up to two.",
    "Information",
    "Start game",
];
var chosenBots = [];
function lobby() {
    // display bubbles
    showBubble(bubbleID[0], bubbleTextID[0], bubbleText[0]);
    showBubble(bubbleID[3], bubbleTextID[3], bubbleText[1]);
    showBubble(bubbleID[2], bubbleTextID[2], bubbleText[2]);
    // creates bot players
    var playerBolt = document.createElement("div");
    playerBolt.id = "playerBolt";
    playerBolt.onclick = function () {
        // add or remove bot to array and set img (grey or color)
        checkBotArray("Bolt", playerBolt);
    };
    document.getElementById("botWrapper").appendChild(playerBolt);
    var playerClank = document.createElement("div");
    playerClank.id = "playerClank";
    playerClank.onclick = function () {
        // add or remove bot to array and set img (grey or color)
        checkBotArray("Clank", playerClank);
    };
    document.getElementById("botWrapper").appendChild(playerClank);
    var playerGadget = document.createElement("div");
    playerGadget.id = "playerGadget";
    playerGadget.onclick = function () {
        // add or remove bot to array and set img (grey or color)
        checkBotArray("Gadget", playerGadget);
    };
    document.getElementById("botWrapper").appendChild(playerGadget);
    // bot info click event (show modal)
    var botInfoButton = document.getElementById(bubbleID[2]);
    botInfoButton.onclick = function () {
        var botModal = document.getElementById("botModal");
        botModal.style.opacity = "1";
        botModal.style.visibility = "visible";
        var botClose = document.getElementById("botClose");
        botClose.onclick = function () {
            botModal.style.opacity = "0";
            botModal.style.visibility = "hidden";
        };
    };
    // start new screen for game start
    document.getElementById(bubbleID[1]).onclick = function () {
        playerBolt.remove();
        playerClank.remove();
        playerGadget.remove();
        removeBubbles();
        drawGame();
    };
}
function checkBotArray(bot, botElement) {
    if (chosenBots.indexOf(bot) > -1 || chosenBots.length === 2) {
        // remove bot if same bot is clicked again
        chosenBots = chosenBots.filter(function (b) { return b !== bot; });
        botElement.style.backgroundImage = "url(\"../assets/imgs/player" + bot + "-grey.png\")";
        // removes bubble if no bot chosen
        if (chosenBots.length === 0) {
            removeBubble(bubbleID[1], bubbleTextID[1]);
        }
        else {
            document.getElementById("player" + chosenBots[0]).style.backgroundImage = "url(\"../assets/imgs/player" + chosenBots[0] + "-chosen1.png\")";
        }
    }
    else if (chosenBots.length > 0) {
        // first bot clicked (bot array length is below 2)
        chosenBots.push(bot);
        botElement.style.backgroundImage = "url(\"../assets/imgs/player" + bot + "-chosen2.png\")";
    }
    else if (chosenBots.length > -1 &&
        botElement.style.backgroundImage ===
            "url(\"../assets/imgs/player" + bot + "-chosen2.png\")") {
        botElement.style.backgroundImage = "url(\"../assets/imgs/player" + bot + "-chosen1.png\")";
    }
    else {
        showBubble(bubbleID[1], bubbleTextID[1], bubbleText[3]);
        chosenBots.push(bot);
        botElement.style.backgroundImage = "url(\"../assets/imgs/player" + bot + "-chosen1.png\")";
    }
}
var mainText = ["", "High Scores", "How to play", "Play"];
// let gameState: string = 'main', 'nameChoice', 'lobby', 'gamePlay', 'highScore'
/**
 * First edition of the welcomeScreen, feel free to change it as you like!
 */
function welcomeScreen() {
    removeBubbles();
    document.body.style.background = "linear-gradient(180deg, #FFFFFF 0%, #9B85AD 100%)"; //This needs some adjustment
    document.getElementById("gameMasterWrapper").classList.add('fadeIn');
    document.getElementById(bubbleID[0]).style.visibility = 'visible';
    setElementContent(bubbleTextID[0], "Welcome");
    setTimeout(loadMain, 4000);
    //To be added:
    //"DIGIT DASH" text
    // More smooth transition to next screen(?)s
}
function loadMain() {
    document.body.style.background = "white";
    // gameState = 'main';
    for (var index = 0; index < mainText.length; index++) {
        setElementContent(bubbleTextID[index], mainText[index]);
        document.getElementById(bubbleID[index]).style.visibility = 'visible';
        // move to own function???
        if (mainText[index] === "How to play") {
            var ruleBubble = document.getElementById("bubbleBL");
            ruleBubble.onclick = function () {
                var modal = document.getElementById("ruleModal");
                modal.style.opacity = "1";
                modal.style.visibility = "visible";
                var close = document.getElementById("close");
                close.onclick = function () {
                    modal.style.opacity = "0";
                    modal.style.visibility = "hidden";
                };
                // TO DO: make background close modal on click
                // window.onclick = (event: Event) => {
                //   if (event.target === modal) {
                //     modal.style.visibility = "hidden";
                //   }
                // };
            };
        }
        if (mainText[index] === "Play") {
            var playBubble = document.getElementById("bubbleBR");
            playBubble.onclick = function () {
                console.log("nameChoice");
                removeBubbles();
                nameChoice();
                //gameState = 'nameChoice';
            };
        }
        // high score module 
        if (mainText[index] === "High Scores") {
            var highScoresBubble = document.getElementById("bubbleTR");
            highScoresBubble.onclick = function () {
                var modal = document.getElementById("highScoresModal");
                modal.style.opacity = "1";
                modal.style.visibility = "visible";
                console.log('High score');
                var playerHighScores1 = document.createElement('div');
                playerHighScores1.id = 'playerHighScores1';
                document.getElementById('playerHighScores').appendChild(playerHighScores1);
                var closeHighScores = document.getElementById("closeHighScores");
                closeHighScores.onclick = function () {
                    modal.style.opacity = "0";
                    modal.style.visibility = "hidden";
                    console.log('close High Score');
                };
            };
        }
        document.getElementById(bubbleID[0]).style.visibility = "hidden";
    }
}
// Function showTot() { SHOW TEXT /VIDEO  
var nameInput = document.createElement("input");
var lastPlayer;
function nameChoice() {
    getLastPlayersName();
    showGreeting();
    showNameInput();
    // init onclick event
    document.getElementById("userInput").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            var name_1 = nameInput.value;
            var player = {
                name: name_1,
                highScore: 0,
                games: 0,
            };
            addToLS(player);
            // render new frame
            removeBubbles();
            nameInput.remove();
            lobby();
        }
    });
}
var greeting = "Hi! What's your name?";
function showGreeting() {
    document.getElementById(bubbleID[0]).style.visibility = "visible";
    setElementContent(bubbleTextID[0], greeting);
    gameMaster.load("https://assets2.lottiefiles.com/private_files/lf30_bqqaxg5n.json");
}
function showNameInput() {
    nameInput.type = "text";
    nameInput.id = "userInput";
    nameInput.autocomplete = "off";
    inputWrapper.appendChild(nameInput);
    nameInput.focus();
    nameInput.value = getLastPlayersName(); //Autofills the inputfield with the latest players name
}
/**
 * Adds objects to an array in LS
 */
function addToLS(player) {
    if (localStorage.getItem("players")) {
        players = JSON.parse(localStorage.getItem("players"));
    }
    players.push(player);
    localStorage.setItem("players", JSON.stringify(players));
}
/**
 * Gets the latest players name
 */
function getLastPlayersName() {
    if (localStorage.getItem("players") === null) {
        return "";
    }
    else {
        var players_1 = JSON.parse(localStorage.getItem("players"));
        var number = players_1.length - 1; //-1 to get the right indexnumber
        return players_1[number].name; //Looks like an error but works fine
    }
}
//# sourceMappingURL=index.js.map
const mainText: string[] = ["", "High Scores", "How to play", "Play"];
const backgroundMusic: HTMLAudioElement = new Audio(
  "./assets/sound/AcidJazz.mp3"
);

// let gameState: string = 'main', 'nameChoice', 'lobby', 'gamePlay', 'highScore'

/**
 * First edition of the welcomeScreen, feel free to change it as you like!
 */
function welcomeScreen() {
  // init volume control
  initVolumeControl();
  initHomeButton();

  saveBotWinsToLS();
  removeBubbles();

  document.body.style.background =
    "linear-gradient(180deg, #FFFFFF 0%, #9B85AD 100%)"; //This needs some adjustment
  document.getElementById("gameMasterWrapper").classList.add("fadeIn");
  document.getElementById(bubbleID[0]).style.visibility = "visible";
  document.getElementById(bubbleID[0]).style.textAlign = "center";
  setElementContent(bubbleTextID[0], "Welcome");
  setTimeout(loadMain, 4000);

  //To be added:
  //"DIGIT DASH" text
  // More smooth transition to next screen(?)s
}
// Use playSound() to add soundeffects
function playSound(volume: number, path: string) {
  let sound = new Audio(path);
  soundOn ? (sound.volume = volume) : (sound.volume = 0)
  // sound.volume = volume;
  sound.play();
}

function loadMain(): void {
  console.log( "main" + lastPlayer)
  //setTimeout(drawWinnerScreen, 2000)
  document.body.style.background = "white";
  // gameState = 'main';
  for (let index = 0; index < mainText.length; index++) {
    setElementContent(bubbleTextID[index], mainText[index]);
    document.getElementById(bubbleID[index]).style.visibility = "visible";
    document.getElementById(bubbleID[index]).style.textAlign = "center";

    // how to play module
    if (mainText[index] === "How to play") {
      const ruleBubble: HTMLElement = document.getElementById("bubbleBL");
      ruleBubble.classList.add("cursorPointer");
      ruleBubble.style.backgroundImage =
        "url(../assets/imgs/bubbleBL-button.png)";

      ruleBubble.onclick = () => {
        const modal: HTMLElement | null = document.getElementById("ruleModal");
        playSound(0.2, "./assets/sound/load.mp3");
        modal.style.opacity = "1";
        modal.style.visibility = "visible";

        const close: HTMLElement | null = document.getElementById("close");

        close.onclick = () => {
          modal.style.opacity = "0";
          modal.style.visibility = "hidden";
        };
      };
    }

    if (mainText[index] === "Play") {
      const playBubble: HTMLElement = document.getElementById("bubbleBR");
      playBubble.classList.add("cursorPointer");
      playBubble.style.backgroundImage =
        "url(../assets/imgs/bubbleBR-button.png)";
      playBubble.onclick = () => {
        console.log("nameChoice");
        playSound(0.2, "./assets/sound/load.mp3");
        backgroundMusic.volume = 0.1;
        backgroundMusic.play();
        removeBubbles();
        nameChoice();
        //gameState = 'nameChoice';
      };
    }

    // high score module
    if (mainText[index] === "High Scores") {
      const highScoresBubble: HTMLElement = document.getElementById("bubbleTR");
      highScoresBubble.classList.add("cursorPointer");
      highScoresBubble.style.backgroundImage =
        "url(../assets/imgs/bubbleTR-button.png)";

      highScoresBubble.onclick = () => {
        const modal: HTMLElement | null = document.getElementById(
          "highScoresModal"
        );
        modal.style.opacity = "1";
        modal.style.visibility = "visible";

        drawHighscoreList();
      
        console.log("High score");
        playSound(0.2, "./assets/sound/load.mp3");

        let playerHighScores1 = document.createElement("div");
        playerHighScores1.id = "playerHighScores1";
        document
          .getElementById("playerHighScores")
          .appendChild(playerHighScores1);


        const closeHighScores: HTMLElement | null = document.getElementById(
          "closeHighScores"
        );

        closeHighScores.onclick = () => {
          modal.style.opacity = "0";
          modal.style.visibility = "hidden";
          console.log("close High Score");
        };
      };
    }

    document.getElementById(bubbleID[0]).style.visibility = "hidden";
  }
}

function drawHighscoreList(){

   let player1 = document.getElementById('player1')
   let player2 = document.getElementById('player2')
   let player3 = document.getElementById('player3')
  
   if (localStorage.getItem("players") == null) { 
     player1.innerHTML = "Sorry, we have nothing to display here yet!";
     player2.innerHTML = "";
     player3.innerHTML = "";
   } else {
   // GET THE ARRAY FROM LS
   const playersLS: Array<PlayerObjct> = JSON.parse(localStorage.getItem("players"));

   //DELETES THE PLAYERS WITH 0 AMOUNT OF GUESSES (meaning they did not win)
    playersLS.filter(item => item.amountOfGuesses !== 0);

  //SORTS THE ARRAY WITH LOWEST AMOUNT OF GUESSES FIRST
      playersLS.sort((a, b) => {
     return a.amountOfGuesses - b.amountOfGuesses;
   });


//   //DRAW OUT PLAYER NAME + SCORE
//   player1.innerHTML = highscoreList[0].name + " " +  highscoreList[0].amountOfGuesses;
  
//   //IF THERE IS ONLY 1 OR 2 PLAYER THAT HAVE PLAYED
//   if (highscoreList.length > 1){
//     player2.innerHTML = highscoreList[1].name + " " +  highscoreList[1].amountOfGuesses;
//   } else {
//     player2.innerHTML = "";
//     player3.innerHTML = "";
//   } 

// //IF THERE IS ONLY 2 OR 3  PLAYERS THAT HAVE PLAYED
//   if (highscoreList.length > 2) {
//     player3.innerHTML = highscoreList[2].name + " " +  highscoreList[2].amountOfGuesses;
//   } else {
//     player3.innerHTML = "";
//   }

  console.log ("highscoreList")

 
// }


}
    // Function showTot() { SHOW TEXT /VIDEO  
// Function showTot() { SHOW TEXT /VIDEO
function initVolumeControl(){
  let volIcon = document.getElementById('volIcon');
  let noVolIcon = document.getElementById('noVolIcon');

  volIcon.onclick = () => {
    // set icon
    volIcon.classList.add('hideVolIcon');
    noVolIcon.classList.remove('hideVolIcon');
    
    // set sound off
    soundOn = false;
    backgroundMusic.volume = 0;
  }
  noVolIcon.onclick = () => {
    // set icon
    noVolIcon.classList.add('hideVolIcon');
    volIcon.classList.remove('hideVolIcon');

    //set sound on
    soundOn = true;
    backgroundMusic.volume = 0.1;
  }
}

function initHomeButton(){
  let homeIcon = document.getElementById('homeIcon');
  homeIcon.onclick = () => {
    location.reload();
  }
}

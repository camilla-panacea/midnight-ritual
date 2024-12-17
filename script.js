//An array to store all the location objects
let locations = []
//The input and output divs
let input, output
//and a variable to represent what location the player 
//is in
let locationNum
//IMPORTANT!! set this to be whatever your map width is
const MAPWIDTH = 4
let command = ""
let inventory = []
let grabbed
let locOut = document.getElementById("locOut")  // location output
let log
let divSelected
let divots = []
let selecting = false

let starGet = false
let featherGet = false

let ritualStage = 0
let L = false
let scrolling = false

//calling this function starts the game
initialseGame()



//Turns the command typed in by the player into an array (commandWords) of all the separate words.
//The parser then calls the correct function to deal with the amount of words in the command
function parser(cmd) {
  if (L == false) {
    let commandWords = cmd.trim().toUpperCase().split(" ");
    let commandHandled;

    if (commandWords.length === 1) { // single word commands
      //pass the single word command to the function oneWordCommands
      commandHandled = oneWordCommands(commandWords[0]);
    }
    else if (commandWords.length === 2) { // two word commands
      //pass the two word command to the function twoWordCommands
      console.log(":3")
      commandHandled = twoWordCommands(commandWords[0], commandWords[1]);
    }
    else if (commandWords.length === 3) {
      commandHandled = threeWordCommands(commandWords[0], commandWords[1], commandWords[2],)
    }
    else if (commandWords.length === 4) {
      commandHandled = fourWordCommands(commandWords[0], commandWords[1], commandWords[2], commandWords[3],)
    }
    //Later you can add more else if blocks here for commands with more words
    //if the command couldn't be handled/understood let the player know
    if (commandHandled == false) {
      outputText("I don't understand that command");
    }
  }
}



//handles picking up objects
function pickup(objName) {
  console.log(objName)
  let grabbed = false
  for (let i = 0; i < objects.length; i++) {
    //console.log(objects[i].name.toUpperCase(), objName)
    if (objects[i].name.toUpperCase() === objName && objects[i].active && objects[i].gettable && objects[i].location == locationNum) {
      objects[i].location = -1
      outputText("You pick up the " + objName.toLowerCase())
      inventory.unshift(objects[i].name)
      grabbed = true
      break
    }
    else if (objects[i].name.toUpperCase() === objName && objects[i].location == -1) {
      outputText("You already have that you greedy piggy")
      grabbed == true
      break
    }
    else if (objects[i].name.toUpperCase() === objName && objects[i].location == locationNum && objects[i].gettable == false) {
      outputText("Uhhh... you dont think that will fit in your pockets...")
      grabbed == true
      break
    }
  }
  if (!grabbed) {
    outputText("are you delusional? is the " + objName + " in the room with us right now? huh?? dumbass.")
  }
}




//inserts sigil into selected divot, then removes sigil from inventory
function astPuzzl(sigil) {

  let signame = sigil + " SIGIL"

  for (let i = 0; i < divots.length; i++) {

    if (divots[i].selected == true) {
      divots[i].contents = sigil
      divots[i].selected = false
      divSelected = false

      for (let i = 0; i < objects.length; i++) {

        console.log(objects[i].name, signame)

        if (objects[i].name.toUpperCase() == signame && objects[i].location == -1) {

          objects[i].location = 7
          objects[i].active = false

          console.log(objects[i].name, objects[i].location)

        }

      }
    }

  }
}

//checks and resets puzzle/ gives stardust
function puzzlCheck() {
  if (divots[0].contents === "CANCER" && divots[1].contents === "SAGITTARIUS" && divots[2].contents === "PISCES" && divots[3].contents === "LEO") {
    solved = true //HOORAAAYYYY :))))))))
    outputText("you solved that shit girlie. A hidden panel in  the wall folds out, and 'pon it rests a generous helping of Stardust.")
    objects[13].active = true
    pickup("STARDUST")
    starGet = true
    if (featherGet == true) {
      outputText("You have both the Stardust <i>and</i> Phoenix feather!! Go do the ritual in the room behind the fireplace girl!!")
      objects[6].description = "You have both reagents. The fireplace beckons closer inspection..."
    }
  }
  else {

    outputText("'BZZT! WRONG!! YOU IGNORANT GROUND-SNIFFER!' a hidden speaker mocks your failure.")

    divots[0].contents = ""
    divots[1].contents = ""
    divots[2].contents = ""
    divots[3].contents = ""

    objects[9].active = true
    objects[10].active = true
    objects[11].active = true
    objects[12].active = true

    pickup("SAGITTARIUS SIGIL")
    pickup("LEO SIGIL")
    pickup("PISCES SIGIL")
    pickup("CANCER SIGIL")

  }
}

//handles ending the game
function gameover() {
  outputText("GAME OVER", "50px", "#ff0d00")
  outputText("Reload the page to start anew.")
}

function gamewon() {
  outputText("SUPREME VICTORY", "50px", "#4eff33")
  outputText("Reload the page to start anew.")
}

//******************************************************************************************** */

//This function is called when the player hits enter after typing a command
function checkInput(e) {
  if (e.key == "Enter") {
    command = input.textContent // use the typed command
    input.innerHTML = ""
    parser(command)
    e.preventDefault()
    outputText("~>>" + log, "p", "#dba72c")
  }
}

//******************************************************************************************** */

//This is the function that displays the text info to the 
//player each time they enter a command
function showlocation() {

  outputText(locations[locationNum].description)
  // displays location in the locBox
  locOut.innerHTML = locations[locationNum].name


  //object descriptions
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].location == locationNum && objects[i].active == true) {
      outputText(objects[i].description)
    }
  }

  outputText("You can go " + directions(locations[locationNum].exits), "30px", "#0f7bba")
}

//*********************************************************************************************//

//This function gets sent some text to output to the webpage and creates a <p> tag  with that text in
//then appends it to the page and scrolls it
function outputText(txt, size = "20px", color = "#57c8e4", font = "Roboto", align = "left",) {
  // Create a new element with the specified tag
  let newElement = document.createElement("p");

  // Set the inner content of the element
  newElement.innerHTML = txt;

  // Apply the specified color
  newElement.style.color = color;

  //font
  newElement.style.fontFamily = font;

  //alignment
  newElement.style.textAlign = align;

  //font size
  newElement.style.fontSize = size;



  // Append the element to the output container
  output.appendChild(newElement);

  // Scroll the new element into view
  if (scrolling == true) {
    newElement.scrollIntoView();
  }
}


//******************************************************************************************** */

// outputs directions in a more readable format
function directions(dString) {
  let directions = {
    'N': 'north',
    'E': 'east',
    'S': 'south',
    'W': 'west',
  }
  let dLetters = dString.split('')
  if (dLetters.length == 1) {
    return `${directions[dLetters[0]]}`;
  }
  else if (dLetters.length == 2) {
    return `${directions[dLetters[0]]} or ${directions[dLetters[1]]}`;
  }
  else if (dLetters.length == 3) {
    return `${directions[dLetters[0]]}, ${directions[dLetters[1]]} or ${directions[dLetters[2]]}`;
  }
  else {
    return `${directions[dLetters[0]]}, ${directions[dLetters[1]]}, ${directions[dLetters[2]]}  or ${directions[dLetters[3]]}`;
  }
}

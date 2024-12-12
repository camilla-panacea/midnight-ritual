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
let locOut = document.getElementById("locOut")
let log
let divSelected
let divots = []
let selecting = false

let starGet = false
let featherGet = false

//calling this function starts the game
initialseGame()



//Turns the command typed in by the player into an array (commandWords) of all the separate words.
//The parser then calls the correct function to deal with the amount of words in the command
function parser(cmd) {
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
  //Later you can add more else if blocks here for commands with more words
  //if the command couldn't be handled/understood let the player know
  if (commandHandled == false) {
    outputText("I don't understand that command");
  }
}




function pickup(objName) {
  console.log(objName)
  let grabbed = false
  for (let i = 0; i < objects.length; i++) {
    //console.log(objects[i].name.toUpperCase(), objName)
    if (objects[i].name.toUpperCase() === objName && objects[i].active && objects[i].gettable && objects[i].location == locationNum) {
      objects[i].location = -1
      outputText("You pick up the " + objName)
      grabbed = true
      break
    }
    else if (objects[i].name.toUpperCase() === objName && objects[i].location == -1) {
      outputText("You already have that you greedy piggy")
      grabbed == true
      break
    }
  }
  if (!grabbed) {
    outputText("are you delusional? is the " + objName + " in the room with us right now? huh?? dumbass.")
  }
}





function astPuzzl(sigil) {

  let signame = sigil + " SIGIL"

  for (let i = 0; i < divots.length; i++) {

    if (divots[i].selected == true) {
      divots[i].contents = sigil
      divots[i].selected = false
      divSelected = false

      for (let i = 0; i < inventory.length; i++) {

        if (inventory[i].name.toUpperCase() = signame) {
          inventory[i].location = 7
          inventory[i].active = false
          console.log(inventory[i].name, inventory[i].location)
        }

      }
    }

  }
}

function puzzlCheck() {
  if (divots[0].contents === "CANCER" && divots[1].contents === "SAGITTARIUS" && divots[2].contents === "PISCES" && divots[3].contents === "LEO") {
    solved = true //HOORAAAYYYY :))))))))
    outputText("you solved that shit girlie. A hidden panel in  the wall folds out, and 'pon it rests a generous helping of Stardust.")
    objects[13].active = true
    pickup("STARDUST")
    starGet = true
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
//You will need to edit this array of  locations 
//to suit your own game idea 

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

  outputText("~>>" + log, "p", "#dba72c")
  outputText(locations[locationNum].description)
  locOut.innerHTML = locations[locationNum].name

  for (let i = 0; i < objects.length; i++) {
    if (objects[i].location == locationNum && objects[i].active == true) {
      outputText(objects[i].description)
    }
  }

  outputText("You can go " + directions(locations[locationNum].exits), "h3", "#0f7bba")
}

//******************************************************************************************** */

//This function gets sent some text to output
//to the webpage and creates a <p> tag  with that text in
//then appends it to the page and scrolls it
function outputText(txt, tag = "p", color = "#57c8e4") {
  // Create a new element with the specified tag
  let newElement = document.createElement(tag);

  // Set the inner content of the element
  newElement.innerHTML = txt;

  // Apply the specified color
  newElement.style.color = color;

  // Append the element to the output container
  output.appendChild(newElement);

  // Scroll the new element into view
  newElement.scrollIntoView();
}


//******************************************************************************************** */


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
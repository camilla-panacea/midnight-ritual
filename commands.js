function oneWordCommands(commandWord) {
    log = commandWord
    switch (commandWord) {

        //movement - cant move after staring ritual
        case "NORTH":
        case "N":
            if (ritualStage == 0) {
                //if the location we're in has an exit to the north
                if (locations[locationNum].exits.includes("N")) {
                    locationNum -= MAPWIDTH; // go north
                    showlocation();
                } else {
                    outputText("You can't go that way");
                }
                return true; // Command word has been processed
            }

        case "EAST":
        case "E":
            if (ritualStage == 0) {
                if (locations[locationNum].exits.includes("E")) {
                    locationNum += 1;
                    showlocation();
                } else {
                    outputText("You can't go that way");
                }
                return true;
            }

        case "SOUTH":
        case "S":
            if (ritualStage == 0) {
                if (locations[locationNum].exits.includes("S")) {
                    locationNum += MAPWIDTH;
                    showlocation();
                } else {
                    outputText("You can't go that way");
                }
                return true;
            }

        case "WEST":
        case "W":
            if (ritualStage == 0) {
                if (locations[locationNum].exits.includes("W")) {
                    locationNum -= 1;
                    showlocation();
                } else {
                    outputText("You can't go that way");
                }
                return true; // Command word has been processed
            }

        //displays inventory
        case "INVENTORY":
        case "I":
            for (let i = 0; i < objects.length; i++) {
                console.log(objects[i])
                if (objects[i].location === -1) {
                    console.log("(T.T)b")
                    inventory.unshift(objects[i].name)
                }
            }
            if (inventory.length === 0) {
                outputText("ya got nuthin..", "40px", "#dba72c")
            }
            else {
                outputText("You have: ", "40px", "#dba72c")
                for (let i = 0; i < inventory.length; i++) {
                    outputText(inventory[i])
                }
            }
            return true;



        //sigil selection/insertion for observatory puzzle
        case "SAGITTARIUS":
        case "LEO":
        case "PISCES":
        case "CANCER":
            if (locationNum == 7 && divSelected == true) {
                let inInventory = false
                let signame = commandWord + " SIGIL"
                console.log(signame)

                for (i = 0; i < objects.length; i++) {
                    console.log(objects[i].name, signame)
                    if (objects[i].name.toUpperCase() == signame && objects[i].location == -1) {
                        inInventory = true
                    }
                }
                console.log(inInventory)
                if (inInventory == true) {
                    console.log("(O o O)")
                    astPuzzl(commandWord)
                    console.log(";)")
                    outputText("The " + commandWord.toLowerCase() + " sigil is inserted into the the divot.")

                    outputText("Top right divot contents: " + divots[0].contents, "20px", "#dba72c")
                    outputText("Top left divot contents: " + divots[1].contents, "20px", "#dba72c")
                    outputText("Bottom right divot contents: " + divots[2].contents, "20px", "#dba72c")
                    outputText("Bottom left divot contents: " + divots[3].contents, "20px", "#dba72c")

                    if (divots[0].contents == "" || divots[1].contents == "" || divots[2].contents == "" || divots[3].contents == "") {
                        outputText("Insert a sigil by using it on the top right, top left, bottom right or bottom left divots. \nWhich divot do you want to change?")
                    }
                    else {
                        outputText("All the divots are full! You get the feeling that oh-so beautiful lever is important...")
                    }
                    return true;
                }
                else {
                    outputText("You already used that one...")
                    return true;
                }
            }

        case "HELP":
        case "H":
            outputText("Basic commands:", "h3", "#dba72c")
            outputText("North, east, south, west: Go in the specified direction")
            outputText("Inventory, I: Check your inventory")
            outputText("Inspect x, I x: Inspect x closer")
            outputText("Use x: Use x")
            outputText("Get x, Grab x, Take x: Add x to inventory")
            outputText("")
            return true;

        // start ritual
        case "START":
            if (locationNum == 8) {
                outputText("Don't fuck this up.")
                outputText("What ritual component will you use first?")
                ritualStage = 1
                console.log(ritualStage)
                return true;
            }


        //correct steps
        case "STARDUST":
            if (ritualStage == 1) {
                outputText("You scatter the Stardust across the ritual circle. You feel a prescence in the back of your eyes and in the base of your spine.")
                ritualStage = 2
                console.log(ritualStage)
                return true
            }
            else if (ritualStage == 0) {
                return false
            }
            else {
                outputText("Your body is rent apart by the arcane magics surrounding the ritual circle. You really fumbled the bag here.")

                gameover() // kills you. :(
            }

        case "DAGGER":
            console.log(ritualStage)
            if (ritualStage == 2) {
                outputText("You make a small incision across your palm, <strong>BLOOD</strong> oozes from the wound, ready for the next step of the ritual.")
                ritualStage = 3
                console.log(ritualStage)
                return true
            }
            else if (ritualStage == 0) {
                return false
            }
            else {
                outputText("Your body is rent apart by the arcane magics surrounding the ritual circle. You really fumbled the bag here.")

                gameover()
            }

        case "BLOOD":
            if (ritualStage == 3) {
                outputText("You spread the blood across your forehead in the shape of the symbol of <strong>Glishna.</strong> The prescence gets stronger.")
                ritualStage = 4
                console.log(ritualStage)
                return true
            }
            else if (ritualStage == 0) {
                return false
            }
            else {
                outputText("Your body is rent apart by the arcane magics surrounding the ritual circle. You really fumbled the bag here.")

                gameover()
            }

        case "FEATHER":
            if (ritualStage == 4) {
                outputText("You light the ritual circle aflame with the phoenix feather. The prescence is almost overwhelming now.")
                outputText("'CALL' the demon.")
                ritualStage = 5
                console.log(ritualStage)
                return true
            }
            else if (ritualStage == 0) {
                return false
            }
            else {
                outputText("Your body is rent apart by the arcane magics surrounding the ritual circle. You really fumbled the bag here.")
                gameover()
            }

        case "CALL":
            console.log(":)")
            console.log(ritualStage)
            if (ritualStage == 5) {
                outputText("You recive a message from the astral beyond:")
                outputText("Uhh could you be a bit more specific?? like I don't really know who you're calling...")
                return true;
            }


        //endings
        case "MONEY":
            if (ritualStage == 6) {
                outputText("She summons enough gold to drown you. Which drowns you. You die.")
                outputText("<strong>GREEDY BITCH.</strong>", "20px", "#cf33ff")
                gameover()
                return true;
            }

        case "FAME":
            if (ritualStage == 6) {
                outputText("You are now famous throughout the Astral Beyond! This attracts the attention of multiple nth dimensional beings. The sheer weight of their acknowledgement kills you.")
                outputText("<strong>ATTENTION-SEEKER.</strong>", "20px", "#cf33ff")
                gameover()
                return true;
            }

        case "POWER":
            if (ritualStage == 6) {
                outputText("You are filled with arcane power! Unfortunately you are but a puny little human. The power proves too much for you to handle. You explode.")
                outputText("<strong>STUPID HUMAN. NOW I HAVE TO CLEAN THIS UP. :(</strong>", "20px", "#cf33ff")
                gameover()
                return true;
            }



        //important - this must be the last thing here so that we
        //return false to indicate we were unable to process the
        //command
        default:
            return false; // Command word has not been processed
    }
}

function twoWordCommands(firstWord, secondWord) {
    log = firstWord + " " + secondWord
    switch (firstWord) {
        case "GO":
            if (ritualStage == 0) { // cant move after starting ritual
                switch (secondWord) {
                    case "NORTH":
                    case "N":
                        //if the location we're in has an exit to the north
                        if (locations[locationNum].exits.includes("N")) {
                            locationNum -= MAPWIDTH; // go north
                            showlocation();
                        }
                        else { outputText("You can't go that way"); }
                        return true; // Command word has been processed


                    case "EAST":
                    case "E":
                        if (locations[locationNum].exits.includes("E")) {
                            locationNum += 1;
                            showlocation();
                        }
                        else { outputText("You can't go that way"); }
                        return true;


                    case "SOUTH":
                    case "S":
                        if (locations[locationNum].exits.includes("S")) {
                            locationNum += MAPWIDTH;
                            showlocation();
                        }
                        else { outputText("You can't go that way"); }
                        return true;


                    case "WEST":
                    case "W":
                        if (locations[locationNum].exits.includes("W")) {
                            locationNum -= 1;
                            showlocation();
                        }
                        else { outputText("You can't go that way") }
                        return true; // Command word has been processed
                }
            }

        case "GET":
        case "GRAB":
        case "TAKE":
            pickup(secondWord)
            return true;

        //performs an object's function
        case "USE":

            let func
            for (let i = 0; i < objects.length; i++) {
                // console.log(objects[i].name.toUpperCase(), secondWord)
                if (objects[i].name.toUpperCase() == secondWord) {   // checks to see if the object is recognised

                    func = objects[i].name.toUpperCase()
                    //console.log(func)

                    switch (func) {

                        case "KEY":

                            // console.log(objects[3].location)
                            if (locationNum == 4 && objects[2].location == -1) {
                                outputText("You use the key to unlock the kitchen door.")
                                locations[4].exits = "NES"
                                outputText("You can go " + directions(locations[locationNum].exits), "20px", "#0f7bba")
                                objects[3].active = false
                                objects[2].location = -2
                                return true;
                            }

                            outputText("i dont see anything to use that on.")

                        case "MORSEL":
                            if (locationNum == 0 && objects[7].location == -1) {
                                outputText("You toss the tasty treat into Bertie's waiting maw, and it clamps its jaws shut; the treat is doomed to digestion. Bertie proceeds to spit a smouldering phoenix feather onto the kitchen floor. Great.")
                                objects[5].active = true
                                pickup("PHOENIX FEATHER")
                                featherGet = true
                                if (starGet == true) {
                                    outputText("You have both the Stardust <i>and</i> Phoenix feather!! Go do the ritual in the room behind the fireplace girl!!")
                                }
                                objects[7].location = -2
                                return true;
                            }

                        case "LEVER":
                            puzzlCheck()
                            return true;

                    }

                }
            }


        //alternatives to use key/use morsel

        case "UNLOCK":
            if (secondWord == "DOOR") {
                if (locationNum == 4 && objects[2].location == -1) {
                    outputText("You use the key to unlock the kitchen door.")
                    locations[4].exits = "NES"
                    outputText("You can go " + directions(locations[locationNum].exits), "20px", "#0f7bba")
                    objects[3].active = false
                    objects[2].location = -2
                    return true;
                }
            }

        case "FEED":
            if (secondWord == "BERTIE" || secondWord == "MORSEL") {
                if (locationNum == 0 && objects[7].location == -1) {
                    outputText("You toss the tasty treat into Bertie's waiting maw, and it clamps its jaws shut; the treat is doomed to digestion. Bertie proceeds to spit a smouldering phoenix feather onto the kitchen floor. Great.")
                    objects[5].active = true
                    pickup("PHOENIX FEATHER")
                    featherGet = true
                    if (starGet == true) {
                        outputText("You have both the Stardust <i>and</i> Phoenix feather!! Go do the ritual in the room behind the fireplace girl!!")
                    }
                    objects[7].location = -2
                    return true;
                }
            }


        //inspects object
        case "INSPECT":
        case "I":
        case "LOOK":
            switch (secondWord) {
                case "SHELVES":
                    if (locationNum == objects[8].location) {
                        outputText("Looking closer at the cramped shelves, you discover four sigils nestled betwixt the folders and papers. Cool.")
                        objects[9].active = true
                        objects[10].active = true
                        objects[11].active = true
                        objects[12].active = true
                        pickup("SAGITTARIUS SIGIL")
                        pickup("LEO SIGIL")
                        pickup("PISCES SIGIL")
                        pickup("CANCER SIGIL")
                        return true;
                    }

                case "PLAQUE":
                    if (locationNum == objects[14].location) {
                        outputText("There is some text inscribed on the plaque:", "30px")
                        outputText("The fish rests at the bottom, to the <strong>right</strong> of the lion. The deceitful crustascean says it resides to the <strong>left</strong> of the half-horse. The half-horse rises above the fish and lion.")
                        if (objects[10].location === -1) {
                            console.log("1")
                            outputText("Insert a sigil by using it on the top right, top left, bottom right or bottom left divots. \nWhich divot do you want to change?")
                            console.log("2")
                            selecting = true
                            console.log(selecting)
                        }
                        return true;
                    }

                case "FIREPLACE":
                case "FIRE":
                    if (locationNum == objects[6].location && starGet == false && featherGet == false) {
                        outputText("You need to get the Stardust and Phoenix feather before going through here.")
                    }
                    else if (locationNum == objects[6].location && starGet == true && featherGet == false) {
                        outputText("You need to get the Phoenix feather before going through here.")
                    }
                    else if (locationNum == objects[6].location && starGet == false && featherGet == true) {
                        outputText("You need to get the Stardust before going through here.")
                    }
                    else if (locationNum == objects[6].location && starGet == true && featherGet == true) {
                        outputText("Now you have both of the ritual components, you can open the fireplace by incanting 'open pretty please'. Your grandmother was <i>pretty</i> big on manners.")
                    }
                    return true;


                //inspection from inventory. uses "look" property instead of "description"

                case "KEY":
                    if (objects[2].location == -1) {
                        outputText(objects[2].look)
                    }
                    else {
                        outputText("You don't have that.")
                    }
                    return true;

                case "NOTES":
                    if (objects[0].location == -1) {
                        outputText(objects[0].look)
                    }
                    else {
                        outputText("You don't have that.")
                    }
                    return true;

                case "DAGGER":
                    if (objects[1].location == -1) {
                        outputText(objects[1].look)
                    }
                    else {
                        outputText("You don't have that.")
                    }
                    return true;

                case "MORSEL":
                    if (objects[7].location == -1) {
                        outputText(objects[7].look)
                    }
                    else {
                        outputText("You don't have that.")
                    }
                    return true;

                case "STARDUST":
                    if (objects[13].location == -1) {
                        outputText(objects[13].look)
                    }
                    else {
                        outputText("You don't have that.")
                    }
                    return true;

                case "FEATHER":
                    if (objects[5].location == -1) {
                        outputText(objects[5].look)
                    }
                    else {
                        outputText("You don't have that.")
                    }
                    return true;



                default:
                    return false;
            }


        //divot selection for observatory puzzle
        case "TOP":
        case "BOTTOM":
            switch (secondWord) {
                case "RIGHT":
                case "LEFT":
                    if (selecting == true) {
                        console.log("worked")
                        let selected = firstWord + secondWord
                        divots[0].selected = false
                        divots[1].selected = false
                        divots[2].selected = false
                        divots[3].selected = false
                        switch (selected) {

                            case "TOPRIGHT":
                                divots[0].selected = true
                                outputText("Top right divot selected.")

                                outputText("Which sigil would you like to use?")
                                divSelected = true
                                console.log(divSelected)
                                return true;

                            case "TOPLEFT":
                                divots[1].selected = true
                                outputText("Top left divot selected.")

                                outputText("Which sigil would you like to use?")
                                divSelected = true
                                return true;

                            case "BOTTOMRIGHT":
                                divots[2].selected = true
                                outputText("Bottom right divot selected.")

                                outputText("Which sigil would you like to use?")
                                divSelected = true
                                return true;

                            case "BOTTOMLEFT":
                                divots[3].selected = true
                                outputText("Bottom left divot selected.")

                                outputText("Which sigil would you like to use?")
                                divSelected = true
                                return true;
                        }
                    }
            }

        //checks observatory puzzle
        case "PULL":
            if (secondWord == "LEVER") {
                outputText("You pull on the beautiful beyond-description lever, and a series of whirrs and clunks sound from inside the wall.")
                puzzlCheck()
                return true;
            }

        //alt sigil selection
        case "SAGITTARIUS":
        case "LEO":
        case "PISCES":
        case "CANCER":
            if (locationNum == 7 && divSelected == true) {
                let inInventory = false
                let signame = firstWord + " SIGIL"
                console.log(signame)

                for (i = 0; i < objects.length; i++) {
                    console.log(objects[i].name, signame)
                    if (objects[i].name.toUpperCase() == signame && objects[i].location == -1) {
                        inInventory = true
                    }
                }
                console.log(inInventory)
                if (inInventory == true) {
                    console.log("(O o O)")
                    astPuzzl(firstWord)
                    console.log(";)")
                    outputText("The " + firstWord + " sigil is in the divot.")

                    outputText("Top right divot contents: " + divots[0].contents, "20px", "#dba72c")
                    outputText("Top left divot contents: " + divots[1].contents, "20px", "#dba72c")
                    outputText("Bottom right divot contents: " + divots[2].contents, "20px", "#dba72c")
                    outputText("Bottom left divot contents: " + divots[3].contents, "20px", "#dba72c")

                    if (divots[0].contents == "" || divots[1].contents == "" || divots[2].contents == "" || divots[3].contents == "") {
                        outputText("Insert a sigil by using it on the top right, top left, bottom right or bottom left divots. \nWhich divot do you want to change?")
                    }
                    else {
                        outputText("All the divots are full! You get the feeling that oh-so beautiful lever is important...")
                    }
                    return true;
                }
                else {
                    outputText("You already used that one...")
                    return true;
                }
            }

        //ritual step
        case "PHOENIX":
            if (secondWord == "FEATHER") {
                if (ritualStage == 4) {
                    outputText("You light the ritual circle aflame with the phoenix feather. The prescence is almost overwhelming now.")
                    outputText("'CALL' the demon.")
                    ritualStage = 5
                    return true;
                }
                else if (ritualStage == 0) {
                    return false;
                }
                else {
                    outputText("Your body is rent apart by the arcane magics surrounding the ritual circle. You really fumbled the bag here.")

                    gameover()
                }
            }

        //final ritual step
        case "CALL":
            console.log(":)")
            if (secondWord == "GLISHNA" && ritualStage == 5) {
                console.log(":))")
                outputText("Glishna emerges from the ritual circle. Her profane, unknowable form gives you a minor headache. She speaks.")
                outputText("<strong>MORTAL. FOR WHAT REASON DO YOU SUMMON ME? MONEY? FAME? POWER? A REALLY GOOD SANDWICH?</strong>", "20px", "#cf33ff")
                ritualStage = 6
                return true;
            }


        default:
            return false;
    }
}

function threeWordCommands(firstWord, secondWord, thirdWord) {
    log = firstWord + " " + secondWord + " " + thirdWord
    switch (firstWord) {

        //alt inspect function
        case "LOOK":
            if (secondWord == "AT") {
                switch (thirdWord) {
                    case "SHELVES":
                        outputText("Looking closer at the cramped shelves, you discover four sigils nestled betwixt the folders and papers. Cool.")
                        objects[9].active = true
                        objects[10].active = true
                        objects[11].active = true
                        objects[12].active = true
                        pickup("SAGITTARIUS SIGIL")
                        pickup("LEO SIGIL")
                        pickup("PISCES SIGIL")
                        pickup("CANCER SIGIL")
                        return true;

                    case "PLAQUE":
                        outputText("There is some text inscribed on the plaque:", "30px")
                        outputText("The fish rests at the bottom, to the <strong>right</strong> of the lion. The lying crustascean says it resides to the <strong>left</strong> of the half-horse. The half-horse rises above the fish and lion.")
                        if (objects[9].location === -1) {
                            outputText("Insert a sigil by using it on the top right, top left, bottom right or bottom left divots. \nWhich divot do you want to change?")
                            selecting = true
                        }
                        return true;

                    case "FIREPLACE":
                    case "FIRE":
                        if (locationNum == objects[6].location && starGet == false && featherGet == false) {
                            outputText("You need to get the Stardust and Phoenix feather before going through here.")
                        }
                        else if (locationNum == objects[6].location && starGet == true && featherGet == false) {
                            outputText("You need to get the Phoenix feather before going through here.")
                        }
                        else if (locationNum == objects[6].location && starGet == false && featherGet == true) {
                            outputText("You need to get the Stardust before going through here.")
                        }
                        else if (locationNum == objects[6].location && starGet == true && featherGet == true) {
                            outputText("Now you have both of the ritual components, you can open the fireplace by incanting 'open pretty please'. Your grandmother was <i>pretty</i> big on manners.")
                        }
                        return true;


                    //inspection from inventory. uses "look" property instead of "description"

                    case "KEY":
                        if (objects[2].location == -1) {
                            outputText(objects[2].look)
                        }
                        else {
                            outputText("You don't have that.")
                        }
                        return true;

                    case "NOTES":
                        if (objects[0].location == -1) {
                            outputText(objects[0].look)
                        }
                        else {
                            outputText("You don't have that.")
                        }
                        return true;

                    case "DAGGER":
                        if (objects[1].location == -1) {
                            outputText(objects[1].look)
                        }
                        else {
                            outputText("You don't have that.")
                        }
                        return true;

                    case "MORSEL":
                        if (objects[7].location == -1) {
                            outputText(objects[7].look)
                        }
                        else {
                            outputText("You don't have that.")
                        }
                        return true;

                    case "STARDUST":
                        if (objects[13].location == -1) {
                            outputText(objects[13].look)
                        }
                        else {
                            outputText("You don't have that.")
                        }
                        return true;

                    case "FEATHER":
                        if (objects[5].location == -1) {
                            outputText(objects[5].look)
                        }
                        else {
                            outputText("You don't have that.")
                        }
                        return true;

                }
            }

        //opens fireplace

        case "OPEN":
            if (secondWord == "PRETTY" && thirdWord == "PLEASE" && locationNum == 5) {
                outputText("The fireplace's flickering flames dies down, revealing a gloomy passage into the bowels of the mansion.")
                locations[5].exits = "NESW"
                return true;
            }

        default:
            return false;

    }

}
//good ending :)
function fourWordCommands(firstWord, secondWord, thirdWord, fourthWord) {
    if (firstWord == "A" && secondWord == "REALLY" && thirdWord == "GOOD" && fourthWord == "SANDWICH" && ritualStage == 6) {
        outputText("<strong>FINALLY. A GOOD FUCKING WISH. DO YOU HAVE A KITCHEN AROUND HERE?</strong>", "20px", "#cf33ff")
        outputText("And so, you create a sandwich good enough to make grown men cry alongside Glishna Ramsay, High-Chef of the Outer Beyond. You keep in touch and frequently meet to make more delicious food. Life is good.")
        gamewon()
        return true;
    }
}
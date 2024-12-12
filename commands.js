function oneWordCommands(commandWord) {
    log = commandWord
    switch (commandWord) {

        case "NORTH":
        case "N":
            //if the location we're in has an exit to the north
            if (locations[locationNum].exits.includes("N")) {
                locationNum -= MAPWIDTH; // go north
                showlocation();
            } else {
                outputText("You can't go that way");
            }
            return true; // Command word has been processed


        case "EAST":
        case "E":
            if (locations[locationNum].exits.includes("E")) {
                locationNum += 1;
                showlocation();
            } else {
                outputText("You can't go that way");
            }
            return true;


        case "SOUTH":
        case "S":
            if (locations[locationNum].exits.includes("S")) {
                locationNum += MAPWIDTH;
                showlocation();
            } else {
                outputText("You can't go that way");
            }
            return true;


        case "WEST":
        case "W":
            if (locations[locationNum].exits.includes("W")) {
                locationNum -= 1;
                showlocation();
            } else {
                outputText("You can't go that way");
            }
            return true; // Command word has been processed


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
                outputText("ya got nuthin..", "h2", "#dba72c")
            }
            else {
                outputText("You have: ", "h2", "#dba72c")
                for (let i = 0; i < inventory.length; i++) {
                    console.log(":^)")
                    outputText(inventory[i])
                }
            }
            return true;

        case "SAGITTARIUS":
        case "LEO":
        case "PISCES":
        case "CANCER":
            if (locationNum == 7 && divSelected == true) {
                console.log("(O o O)")
                astPuzzl(commandWord)
                console.log(";)")
                outputText("The " + commandWord + " sigil is in the divot.")

                outputText("Top right divot contents: " + divots[0].contents, "p", "#dba72c")
                outputText("Top left divot contents: " + divots[1].contents, "p", "#dba72c")
                outputText("Bottom right divot contents: " + divots[2].contents, "p", "#dba72c")
                outputText("Bottom left divot contents: " + divots[3].contents, "p", "#dba72c")

                if (divots[0].contents == "" || divots[1].contents == "" || divots[2].contents == "" || divots[3].contents == "") {
                    outputText("Insert a sigil by using it on the top right, top left, bottom right or bottom left divots. \nWhich divot do you want to change?")
                }
                else {
                    outputText("All the divots are full! You get the feeling that oh-so beautiful lever is important...")
                }
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

        case "GET":
        case "GRAB":
        case "TAKE":
            pickup(secondWord)
            return true;

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
                                outputText("You can go " + directions(locations[locationNum].exits), "h3", "#0f7bba")
                                objects[3].active = false
                                return true;
                            }

                            outputText("i dont see anything to use that on.")

                        case "MORSEL":
                            if (locationNum == 0 && objects[7].location == -1) {
                                outputText("You toss the tasty treat into Bertie's waiting maw, and it clamps its jaws shut; the treat is doomed to digestion. Bertie proceeds to spit a smouldering phoenix feather onto the kitchen floor. Great.")
                                pickup("PHOENIX FEATHER")
                                featherGet = true
                            }

                        case "LEVER":
                            puzzlCheck()
                            return true;

                    }

                }
            }

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
                        outputText("There is some text inscribed on the plaque:", "h3")
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



                case "KEY":
                    if (objects[2].location == -1) {
                        outputText()
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

        case "PULL":
            if (secondWord == "LEVER") {
                outputText("You pull on the beautiful beyond-description lever, and a series of whirrs and clunks sound from inside the wall.")
                puzzlCheck()
                return true;
            }


        case "SAGITTARIUS":
        case "LEO":
        case "PISCES":
        case "CANCER":
            if (secondWord === "SIGIL" && locationNum == 7 && divSelected == true) {
                console.log("(O o O)")
                astPuzzl(firstWord)
                console.log(";)")
                outputText("The " + firstWord + " sigil is in the divot.")

                outputText("Top left divot contents: " + divots[0].contents, "p", "#dba72c")
                outputText("Top right divot contents: " + divots[1].contents, "p", "#dba72c")
                outputText("Bottom left divot contents: " + divots[2].contents, "p", "#dba72c")
                outputText("Bottom right divot contents: " + divots[3].contents, "p", "#dba72c")

                if (divots[0].contents == "" || divots[1].contents == "" || divots[2].contents == "" || divots[3].contents == "") {
                    outputText("Insert a sigil by using it on the top right, top left, bottom right or bottom left divots. \nWhich divot do you want to change?")
                }
                else {
                    outputText("All the divots are full! You get the feeling that oh-so beautiful lever is important...")
                }
                return true;
            }


        default:
            return false;
    }
}

function threeWordCommands(firstWord, secondWord, thirdWord) {
    log = firstWord + " " + secondWord + " " + thirdWord
    switch (firstWord) {

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
                        outputText("There is some text inscribed on the plaque:")
                        outputText("The fish rests at the bottom, to the <strong>right</strong> of the lion. The lying crustascean says it resides to the <strong>left</strong> of the half-horse. The half-horse rises above the fish and lion.")
                        if (objects[9].location === -1) {
                            outputText("Insert a sigil by using it on the top right, top left, bottom right or bottom left divots. \nWhich divot do you want to change?")
                            selecting = true
                        }
                        return true;

                }
            }

        case "USE":
            switch (secondWord) {
                case "SAGITTARIUS":
                case "LEO":
                case "PISCES":
                case "CANCER":
                    if (thirdWord === "SIGIL" && locationNum == 7 && (objects[9].location == -1 || objects[10].location == -1 || objects[11].location == -1 || objects[12].location == -1) && divSelected == true) {
                        console.log("(O o O)")
                        astPuzzl(secondWord)
                        console.log(";)")
                        outputText("The " + secondWord + " sigil is in the divot.")

                        outputText("Top left divot contents: " + divots[0].contents, "p", "#dba72c")
                        outputText("Top right divot contents: " + divots[1].contents, "p", "#dba72c")
                        outputText("Bottom left divot contents: " + divots[2].contents, "p", "#dba72c")
                        outputText("Bottom right divot contents: " + divots[3].contents, "p", "#dba72c")

                        if (divots[0].contents == "" || divots[1].contents == "" || divots[2].contents == "" || divots[3].contents == "") {
                            outputText("Insert a sigil by using it on the top right, top left, bottom right or bottom left divots. \nWhich divot do you want to change?")
                        }
                        else {
                            outputText("All the divots are full! You get the feeling that oh-so beautiful lever is important...")
                        }
                        return true;
                    }

            }


        default:
            return false;

    }

}
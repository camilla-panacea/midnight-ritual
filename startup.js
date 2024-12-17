function initialseGame() {
    //create references for the input and output divs
    input = document.getElementById('input')
    output = document.getElementById('output')
    box = document.getElementById("gridBox")


    //populate the locations with data
    locations[0] = {
        name: "Kitchen",
        description: "You step into the large kitchen (large by domestic standards anyway) and cast your gaze across the clustered cabinets and drawers crammed onto every available surface. You recognise Bertie, the cupboard-mimic, looking deranged in one corner of the cluttered workspace. The worktops, inlaid with sinks and strewn with various dishes and ingredients, are lit by the sparkling starlight visible through the half-open windows. You can still faintly smell the remnants of dinners long-past. \nTo the south is the door to the west wing corridor.",
        exits: "S",
        atmos: "MSDefault"
    }

    locations[1] = {
        name: "Foyer",
        description: "You descend the grand and self-important stairs into the main foyer, and take stock of your surroundings. Aforementioned stairs are carpeted a deep green over the chestnut-brown of the glazed wooden steps and ornate bannisters. Your eye follows them up to a great, commanding wyrm-skull, easily as tall as you and twice as deep. It hangs menacingly from the ceiling like a totally overkill guard dog, no doubt intimidating any guests over for a fancy assassination dinner or masquerade wine-huffing or whatever it is rich people do. The doors out of the manor tower over you, unmoving and impenetrable as a particularly stubborn mountain. There is a hook by the side of the door, and you can see something on it glinting in the candlelight.\nYou can go back up the stairs to the south to go back to the living room.",
        exits: "S",
        atmos: "MSDefault"
    }

    locations[4] = {
        name: "West wing corridor",
        description: "The west wing corridor is an ostentatious affair, gaudy sets of armor and impractically embellished weapons line the rich, dark wood walls, while delicately-formed chandeliers cast fluttering, roiling shadows across the plush green carpets.\nOn the right side of the corridor, to the north, is the door to the kitchens.\nOpposite the door, to the south, is the entrance to the dining room.\nTo the east is the living room.",
        exits: "ES",
        atmos: "MSDefault"
    }

    locations[5] = {
        name: "Living room",
        description: "A portrait of your great-great grandmother watches over the living room imperiously, like an ancient  paint-based home security system - though she certainly isn't making you feel secure. Her blank gaze rakes across the dark blue-green walls adorned with photos, paintings and ritual daggers belonging to deceased family members. The daggers glint in the firelight like the twinkling lights of the city visible from the large, double-glazed windows. The fireplace, adorned with the crest of your Noble House crackles contentedly away at the south wall of the lounge, whilst opposite it, a plush, luxurious forest-green sofa seduces your sorry ass with promises of a sit-down and a rest. The temptation is overwhelming, but you still have a job to do.\nTo the north is the hall to the foyer.\nTo the west is the West wing corridor, while shockingly, the East wing corridor lays to the east.\nTo the south is the still crackling fireplace, behind which lies the Ritual Room.",
        exits: "NEW",
        atmos: "MSDefault"
    }
    locations[6] = {
        name: "East wing corridor",
        description: "The east wing corridor is broadly unremarkable. The doors to the servant's quarters break up the dull monotony of the deep blue wallpaper, spotlit by the moonlight streaming through the high, vaulted windows. Candelabras alternate on the blank walls between the doors, casting flickering light across the hall, the telltale glimmers of their presence getting smaller and fainter the closer they get to the terminus of the corridor-the stairs to the observatory.\nTo the east are the stairs to the observatory.\nTo the west is the living room.",
        exits: "EW",
        atmos: "MSDefault"
    }

    locations[7] = {
        name: "Observatory",
        description: "A large, bronzed telescope points out towards a starlit sky through a huge, floor-to-ceiling window. The constellations cast their light across the room, reflecting off the gold-accented star map embellished on the ceiling. Shelves overflowing with astronomical diagrams mapping the movement of celestial bodies are crammed along the left side of the room, while on the right there are several divots set into the wall.\nTo the west is the door to the East wing corridor.",
        exits: "W",
        atmos: "MSDefault",
    }

    locations[8] = {
        name: "Dining room",
        description: "The stuffed, desecrated head of magical and obscure creatures - Dragi, lamia, gargoyles, chimera and more -line the walls of the dining-room, no doubt to put guests off their appetite and save on food. A grand dining table covered in fine white lace spans the length of the rectangular room, with chairs standing (or sitting) at attention along its flanks. The table is watched over by a family of portraits, like a group of unwanted and unfortunately permanent dinner guests. Their oil-captured visages are lit by the dancing light of lit candles on the table and a grand, imposing chandelier that hangs oppressively over the room.\nTo the north is the West wing corridor.",
        exits: "N",
        atmos: "MSDefault"
    }

    locations[9] = {
        name: "Ritual area",
        description: "You step into the secret, windowless room tucked away behind the fireplace and hidden away from any nosy architectural plans. The walls and floor are constructed of the same dusty gray stone brick, and the room is dimly lit by the skittering light of fat, waxy candles crammed onto shelves and strewn across the cold floor. The ritual circles and symbols are already drawn in <i>Circe's Extra Virgin Maiden's Blood</i> (tm) and all you need to do is correctly perform the ritual according to your notes. Easy!",
        exits: "N",
        atmos: "MSDark"
    }


    //defines objects
    objects = [
        { name: "Notes", description: "notes", location: -1, active: true, gettable: true, look: "Spread the stars across the ground; Cut the essence out of Our veins; Spread the blood in the shape of Our lady; Bathe in fire and accept rebirth." },
        { name: "Ritual dagger", look: "A sharp , gleaming, twisting piece of metal used to draw blood in rituals involving communication with the beyond.", location: -1, active: true, gettable: true },
        { name: "Key", description: "A delicately embellished silver key rests on the hook.", location: 1, active: true, gettable: true, action: "unlock", look: "The key rests in your hand, a comfortably heavy weight to it." },
        { name: "door", description: "The door to the kitchen is locked. You think you remember leaving the key somewhere near the main entrance...", location: 4, active: true, gettable: true, locked: true },
        { name: "Bertie", description: "Bertie seems to be rather peckish. Perhaps it will relinquish its inner contents if bribed with a tasty morsel...", location: 0, active: true, gettable: false },
        { name: "Phoenix feather", description: "kewl", location: 0, active: false, gettable: true, look: "The feather crackles with arcane fire - it's warm to the touch." },
        { name: "Fireplace", description: "The fireplace smoulders jovially whilst denying you access to the ritual room within with a wall of flickering flame. You don't need to go there right now <i>anyways.</i>", location: "5", active: true, gettable: false, shut: true },
        { name: "Morsel", description: "A tasty-looking morsel is resting on a china plate on the far end of the table. The crystal glass next to it casts refracing light across it.", location: 8, active: true, gettable: true, look: "A truly scrumptious looking morsel. <i>You</i> aren't hungry, but maybe you know something that is..." },
        { name: "Shelves", description: "Shelves bristling with diagrams and maps of the stars. You notice four curiously shaped sigils...", location: 7, active: true, gettable: false },

        { name: "Sagittarius sigil", description: "A sigil in the shape of the constellation Sagittarius", location: 7, active: false, gettable: true, action: "place" },
        { name: "Leo sigil", description: "A sigil in the shape of the constellation Leo", location: 7, active: false, gettable: true, action: "place" },
        { name: "Pisces sigil", description: "A sigil in the shape of the constellation Pisces", location: 7, active: false, gettable: true, action: "place" },
        { name: "Cancer sigil", description: "A sigil in the shape of the constellation Cancer", location: 7, active: false, gettable: true, action: "place" },

        { name: "Stardust", description: "cocaine joke", location: 7, active: false, gettable: true, look: "The Stardust glimmers with the light of a thousand nebulae, sparkling in the palm of your hand." },
        { name: "Plaque", description: "You see a plaque set near the divots on the wall.", location: 7, active: true, gettable: false },
        { name: "Lever", description: "There is a lever next to the plaque. It's so amazingly and richly detailed that I cannot do it justice writing. So I won't.", location: 7, active: true, gettable: false },
        { name: "Circle", description: "The ritual circle beckons. Look over your notes and then enter 'start' to begin.", location: 9, active: true, gettable: false }
    ]

    outputText("M I D N I G H T  ~~  R I T U A L", "100px", "#c79f1a", "coolFont", "center",)
    outputText("You are a young witch prearing to engage in a most profane summoning rite. You are nearing its completion, but still need to gather two reagents before performing the ritual - Stardust and a Phoenix Feather. You think you left the phoenix feather in the kitchens somewhere, and the stardust is secured in the observatory. Then, you'll need to go behind the fireplace and complete the ritual. Good luck!")
    outputText(".*+++++*+++++*.", "60px", "#c79f1a", "coolFont")
    locationNum = 5
    input.focus()
    showlocation()
    outputText("")
    scrolling = true

    //defines divots for observatory puzzle.
    divots = [
        { id: "topRight", selected: false, contents: "" },
        { id: "topLeft", selected: false, contents: "" },
        { id: "bottomRight", selected: false, contents: "" },
        { id: "bottomLeft", selected: false, contents: "" },
    ]




    //sets up inventory
    for (let i = 0; i < objects.length; i++) {
        if (objects.location == -1) {
            inventory.unshift(objects[i].name)
        }
    }
}

const sys = require('./display.js');

const validateCommand = (command, first) => {
    let commands = ["PLACE", "MOVE", "LEFT", "RIGHT", "REPORT"]
    let c = command[0]
    switch(true){
        case c === commands[0]:
            if(command.length === 2 && command[1].split(",").length === 3){
                try{
                    let newpos = command[1].split(",")
                    if(parseInt(newpos[0]) >= 0 && parseInt(newpos[0]) < 5 && parseInt(newpos[1]) >= 0 && parseInt(newpos[0]) < 5){
                        if(validateDirection(newpos[2])){
                            return true
                        }
                        sys.print("Invalid Direction")
                        return false
                    }
                    sys.print("Invalid Co-ordinates")
                    return false
                }
                catch(err){
                    sys.print("Incorrect use of place Command")
                    return false
                }
            }
            else{
                sys.print("Incorrect Place Command Parameters")
            }
            break;
        case c === commands[1]:
            if(firstCheck(first, command)){return false}
            return true
        case c === commands[2]:
            if(firstCheck(first, command)){return false}
            return true
        case c === commands[3]:
            if(firstCheck(first, command)){return false}
            return true
        case c === commands[4]:
            if(firstCheck(first, command)){return false}
            return true
        default:
            sys.print("Incorrect Command")
            return false
    }
}

const validateDirection = (direction) => {
    let directions = ["NORTH", "SOUTH", "EAST", "WEST"]
    if(directions.includes(direction)){
        return true
    }
}

const firstCheck = (first, command) => {
    if(first){
        sys.print("Place Command has to be used first")
        return true
    }
    else if(command.length > 1){
        sys.print("Incorrect Use Of " +command[0]+ " Command")
        return true
    }
}

module.exports = {validateCommand};

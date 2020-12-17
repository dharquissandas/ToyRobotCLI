const sys = require('./display.js');

const executeCommand = (command, currpos, facing) => {
    let c = command[0]
    switch(true){
        case c === "PLACE":
            newpos = command[1].split(",")
            return placeCommand(newpos[0], newpos[1], newpos[2])
        case c === "MOVE":
            return moveCommand(currpos, facing)
        case c === "LEFT":
            return leftrightCommand(c, currpos, facing)
        case c === "RIGHT":
            return leftrightCommand(c, currpos, facing)
        case c === "REPORT":
            return reportCommand(currpos, facing)
        default:
            sys.print('Command not Defined')
    }
}

const placeCommand = (x, y, f) => {
    return [[parseInt(x),parseInt(y)],f]
}

const moveCommand = (currpos, facing) => {
    if(facing === "NORTH"){
        newy = onBoardPositive(currpos[1], 1)
        return [[currpos[0], newy], facing]
    }
    else if(facing === "SOUTH"){
        newy = onBoardNegative(currpos[1], 1)
        return [[currpos[0], newy], facing]
    }
    else if(facing === "EAST"){
        newx = onBoardPositive(currpos[0], 1)
        return [[newx, currpos[1]], facing]
    }
    else{
        newx = onBoardNegative(currpos[0], 1)
        return [[newx, currpos[1]], facing]
    }
}

const leftrightCommand = (command, currpos, facing) => {
    if(facing === "NORTH"){
        if(command === "LEFT"){return [currpos,"WEST"]}
        else{return [currpos,"EAST"]}
    }
    else if(facing === "SOUTH"){
        if(command === "LEFT"){return [currpos,"EAST"]}
        else{return [currpos,"WEST"]}
    }
    else if(facing === "EAST"){
        if(command === "LEFT"){return [currpos,"NORTH"]}
        else{return [currpos,"SOUTH"]}
    }
    else{
        if(command === "LEFT"){return [currpos,"SOUTH"]}
        else{return [currpos,"NORTH"]}
    }
}

const reportCommand = (currpos, facing) => {
    return [currpos,facing]
}


const onBoardPositive = (currpos, movement) => {
    if(currpos+movement >= 0 && currpos+movement < 5){
        return currpos + movement
    }
    else{
        sys.print("Cannot Move as Robot will Fall Off Board")
        return currpos
    }
}

const onBoardNegative = (currpos, movement) => {
    if(currpos-movement >= 0 && currpos-movement < 5){
        return currpos - movement
    }
    else{
        sys.print("Cannot Move as Robot will Fall Off Board")
        return currpos
    }
}

module.exports = {executeCommand};
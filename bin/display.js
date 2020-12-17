const print = (msg) => {
    console.log(msg)
}

const reportPrint = (newFullPos) => {
    print("("+newFullPos[0][0]+","+newFullPos[0][1]+")"+ " Facing = " + newFullPos[1])
}

const linebreak = () => {
    print("")
}

const printIntro = () => {
    print("TOY ROBOT SIMULATOR")
    linebreak()
    print("Usable Commands:")
    print("PLACE X,Y,F")
    print("LEFT")
    print("RIGHT")
    print("MOVE")
    print("REPORT")
    linebreak()
    print("To terminate press, CTRL+C")
    linebreak()
    print("Start Interacting Here")
    linebreak()
}

module.exports = {print, printIntro, reportPrint, linebreak};

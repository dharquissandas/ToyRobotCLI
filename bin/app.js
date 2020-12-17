#!/usr/bin/env node

const cmdexecute = require('./commandExecution.js');
const cmdvalidate = require('./commandValidation.js');
const sys = require('./display.js');

const cliLoop = () => {
    let robot = {
        currPos : [0,0],
        facing : null
    }
    let first = true;
    let input = process.openStdin();
    input.addListener('data', function(e){
        let command = e.toString().trim().toUpperCase().split(" ")
        check = cmdvalidate.validateCommand(command, first)
        if (check) {
            newFullPos = cmdexecute.executeCommand(command, getRobotCurrPos(robot), getRobotFacing(robot))
            if(command[0] === "REPORT"){
                sys.reportPrint(newFullPos)
            }
            else{
                robot = setRobotCurrPos(robot, newFullPos[0])
                robot = setRobotFacing(robot, newFullPos[1])
                if(command[0] == "PLACE"){
                    first = false
                }
            }
        }
    })
}

const getRobotCurrPos = (robot) => {
    return robot.currPos
}
const getRobotFacing = (robot) => {
    return robot.facing
}
const setRobotCurrPos = (robot, newPos) => {
    robot.currPos = [newx, newy]
    return robot
}
const setRobotFacing = (robot, newFacing) => {
    robot.facing = newFacing
    return robot
}
const sequance = () => {
    sys.printIntro()
    cliLoop()
}

sequance()
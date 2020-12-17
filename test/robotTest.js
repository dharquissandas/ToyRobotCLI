const chai = require('chai')
const expect = chai.expect
const suppressLogs = require('mocha-suppress-logs');
const cmdval = require("../bin/commandValidation.js")
const cmdexec = require("../bin/commandExecution.js") 

before(() => {
    process.env.NODE_ENV = 'runningTests';
});

describe("Testing Invalid Command", () => {
    suppressLogs();
    it("Testing Command That Robot Does Not Understand", () => {
        let first = false
        let cmd = "INVALID"
        let valid = cmdval.validateCommand(cmd, first)
        expect(valid).to.be.false
    })
})

describe("Testing Commands with Place first", () => {
    suppressLogs();
    it("Testing All Commands (Except Place) First", () => {
        let commands = ["MOVE", "LEFT", "RIGHT", "REPORT"]
        let first = true
        for(let i = 0; i< commands.length; i++){
            let valid = cmdval.validateCommand(commands[i],first)
            expect(valid).to.be.false
        }
    })
    it("Testing Place First", () => {
        let command = "PLACE 1,1,NORTH"
        let first = true
        let valid = cmdval.validateCommand(command.split(" "),first)
        expect(valid).to.be.true
    })
    it("Testing all other commands after Place First", () => {
        let commands = ["MOVE", "LEFT", "RIGHT", "REPORT"]
        let first = false
        for(let i = 0; i< commands.length; i++){

            let valid = cmdval.validateCommand(commands[i].split(" "),first)
            expect(valid).to.be.true
        }
    })
})

describe("Place Command Testing", () =>{
    suppressLogs();
    it("Place Robot On Table, With Incorrect Co-ordinates", () => {
        let cmd = "PLACE 10,10,NORTH"
        let first = true
        let valid = cmdval.validateCommand(cmd.split(" "),first)
        expect(valid).to.be.false
    })
    it("Place Robot On Table, With Incorrect Direction", () => {
        let cmd = "PLACE 1,1,SOUTHWEST"
        let first = true
        let valid = cmdval.validateCommand(cmd.split(" "),first)
        expect(valid).to.be.false
    })
    it("Place Robot On Table, With Correct Direction and Co-ordinates", () => {
        let cmd = "PLACE 1,1,NORTH"
        let curpos = [0,0]
        let facing = null
        let newpos = cmdexec.executeCommand(cmd.split(" "), curpos, facing)
        let expectedpos = [1,1]
        let expectedfacing = "NORTH"
        expect(newpos[0]).to.deep.equal(expectedpos)
        expect(newpos[1]).to.deep.equal(expectedfacing)
    })
})

describe("Move Command Testing", () => {
    suppressLogs();
    it("Move Command (NORTH direction)", () => {
        let robot = {
            currPos : [0,0],
            facing : "NORTH"
        }
        cmd = "MOVE"
        let newpos = cmdexec.executeCommand(cmd.split(" "), robot.currPos, robot.facing)
        let expectedpos = [0,1]
        let expectedfacing = "NORTH"
        expect(newpos[0]).to.deep.equal(expectedpos)
        expect(newpos[1]).to.equal(expectedfacing)
    })
    it("Move Command (SOUTH direction)", () => {
        suppressLogs();
        let robot = {
            currPos : [0,1],
            facing : "SOUTH"
        }
        cmd = "MOVE"
        let newpos = cmdexec.executeCommand(cmd.split(" "), robot.currPos, robot.facing)
        let expectedpos = [0,0]
        let expectedfacing = "SOUTH"
        expect(newpos[0]).to.deep.equal(expectedpos)
        expect(newpos[1]).to.equal(expectedfacing)
    })
    it("Move Command (EAST direction)", () => {
        let robot = {
            currPos : [0,0],
            facing : "EAST"
        }
        cmd = "MOVE"
        let newpos = cmdexec.executeCommand(cmd.split(" "), robot.currPos, robot.facing)
        let expectedpos = [1,0]
        let expectedfacing = "EAST"
        expect(newpos[0]).to.deep.equal(expectedpos)
        expect(newpos[1]).to.equal(expectedfacing)
    })
    it("Move Command (WEST direction)", () => {
        let robot = {
            currPos : [1,0],
            facing : "WEST"
        }
        cmd = "MOVE"
        let newpos = cmdexec.executeCommand(cmd.split(" "), robot.currPos, robot.facing)
        let expectedpos = [0,0]
        let expectedfacing = "WEST"
        expect(newpos[0]).to.deep.equal(expectedpos)
        expect(newpos[1]).to.equal(expectedfacing)
    })
    it("Move Command (OFF THE TABLE)", () => {
        let robot = {
            currPos : [0,0],
            facing : "WEST"
        }
        cmd = "MOVE"
        let newpos = cmdexec.executeCommand(cmd.split(" "), robot.currPos, robot.facing)
        let expectedpos = [0,0]
        let expectedfacing = "WEST"
        expect(newpos[0]).to.deep.equal(expectedpos)
        expect(newpos[1]).to.equal(expectedfacing)
    })
})

describe("Place Right & Left Testing", () =>{
    suppressLogs();
    it("Left Command Moves Robot left", () => {
        let robot = {
            currPos : [0,0],
            facing : "NORTH"
        }
        cmd = "LEFT"
        let newpos = cmdexec.executeCommand(cmd.split(" "), robot.currPos, robot.facing)
        let expectedpos = [0,0]
        let expectedfacing = "WEST"
        expect(newpos[0]).to.deep.equal(expectedpos)
        expect(newpos[1]).to.equal(expectedfacing)
    })
    it("Right Command Moves Robot right", () => {
        let robot = {
            currPos : [0,0],
            facing : "NORTH"
        }
        cmd = "RIGHT"
        let newpos = cmdexec.executeCommand(cmd.split(" "), robot.currPos, robot.facing)
        let expectedpos = [0,0]
        let expectedfacing = "EAST"
        expect(newpos[0]).to.deep.equal(expectedpos)
        expect(newpos[1]).to.equal(expectedfacing)
    })
})


describe("Report Testing", () =>{
    suppressLogs();
    it("Testing robot at given position", () => {
        let robot = {
            currPos : [1,0],
            facing : "WEST"
        }
        cmd = "REPORT"
        let newpos = cmdexec.executeCommand(cmd.split(" "), robot.currPos, robot.facing)
        let expectedpos = [1,0]
        let expectedfacing = "WEST"
        expect(newpos[0]).to.deep.equal(expectedpos)
        expect(newpos[1]).to.equal(expectedfacing)
    })
})

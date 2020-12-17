# Toy Robot Simulator
A Node.js cli based application that simulates a toy robot moving on a square tabletop.

# Installation
1. Install by running 'npm install'
2. Can run the program using 'node bin/app.js' or 'toyrobotcli'

# Simulator Specifics:
1. The​ ​application​​ is ​​a​ ​simulation ​​of ​​a​​ toy​​ robot ​​moving ​​on ​​a ​​square ​​tabletop of dimensions 5 by 5
2. There are no obstructions on table surface
3. The robot is free to roam around the surface of the table, but must be prevented from falling to destruction. Any movmenet that would result in the robot failing from the table must be prevented, however further valid movement commands must still be allowed.

## Usable Commands
1. PLACE X,Y,F
2. MOVE
3. LEFT
4. RIGHT
5. REPORT

# Testing
Test the simulator using the command 'npm run test'

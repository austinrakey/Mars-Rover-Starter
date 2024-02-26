const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK'), new Command('MOVE', 20)];
let message = new Message('Test message with two commands', commands);
let rover = new Rover(98382);
let response = rover.receiveMessage(message);

describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
    expect(new Rover(2000).position).toEqual(2000) && expect(new Rover().generatorWatts).toEqual(110) && expect(new Rover().mode).toEqual('NORMAL');
  });

  it("response returned by receiveMessage contains the name of the message", function() {
    expect(new Rover().receiveMessage(new Message('Hello', [new Command('MOVE', 20)])).message).toEqual('Hello');
  });





});
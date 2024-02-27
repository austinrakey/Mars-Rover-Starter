const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Rover class", function () {

  it("constructor sets position and default values for mode and generatorWatts", function () {
    expect(new Rover(2000).position).toEqual(2000) && expect(new Rover().generatorWatts).toEqual(110) && expect(new Rover().mode).toEqual('NORMAL');
  });

  it("response returned by receiveMessage contains the name of the message", function () {
    expect(new Rover().receiveMessage(new Message('Hello', [new Command('MOVE', 20)])).message).toEqual('Hello');
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    expect(new Rover().receiveMessage(new Message('Hello', [new Command('MOVE', 20), new Command('MOVE', 1000)])).results.length).toEqual(2);
  });

  it("responds correctly to the status check command", function () {
    expect(new Rover(1000).statusCommand().roverStatus.generatorWatts).toEqual(110) && expect(new Rover(1000).statusCommand().roverStatus.mode).toEqual('NORMAL') && expect(new Rover(1000).statusCommand().roverStatus.position).toEqual(1000)
  });

  it("responds correctly to the mode change command", function () {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MODE_CHANGE', 'NORMAL')];
    let message = new Message('Test', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);

    expect(response.results[0, 1]).toEqual({ "completed": true })
      && expect(new Rover().receiveMessage(new Message('CHANGE_CHANGE', 'LOW_POWER'))).toEqual({ "completed": true })
      && expect(new Rover().receiveMessage(new Message('CHANGE_CHANGE', 'NORMAL'))).toEqual({ "completed": true })
      && expect(new Rover().receiveMessage(new Message('CHANGE_CHANGE', 'LITERALLY ANYTHING ELSE'))).toEqual({ "completed": false })

  });

  it("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
    expect(new Rover().receiveMessage(new Message('Hello', [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 1000)])).results[1]).toEqual({ "completed": false });

  });

  it("responds with the position for the move command", function () {
    let commands = [new Command('MOVE', 1000)];
    let message = new Message('Test', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);

    expect(rover.position).toEqual(1000);

  });

});


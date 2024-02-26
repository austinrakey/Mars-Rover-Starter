const Command = require('./command.js');
const Message = require('./message.js');


class Rover {
   constructor(position, mode = 'NORMAL', generatorWatts = 110){
      this.position = position;
      this.mode = mode
      this.generatorWatts = generatorWatts
   }

receiveMessage(message){
let response = {
   message: message.name,
   results: []
} 
for (let i=0;i < message.commands.length;i++){   
   if (message.commands[i].commandType === 'MODE_CHANGE'){
      response.results[i] = this.modeCommand(message.commands[i].value)
} else if (message.commands[i].commandType === 'STATUS_CHECK'){
      response.results[i] = this.statusCommand()
} else if (message.commands[i].commandType === 'MOVE'){
      response.results[i] = this.moveCommand(message.commands[i].value)
}
}
return response
}


moveCommand(moveTest){
   let result = {
      completed: true
   }
   if (this.mode === 'NORMAL'){
   this.position = moveTest
   } else {
     result.completed = false
   }
   return result
}

statusCommand(){

   let roverProperties = {
      mode: rover.mode,
      generatorWatts: rover.generatorWatts,
      position: rover.position
   }

   let result = {
      completed: true,
      roverStatus: roverProperties
   }
   return result
}

modeCommand(commandTest){
   let result = {
      completed: true
   }
if ((commandTest) === ('LOW_POWER' || 'NORMAL'))
   this.mode = commandTest

return result
}
}




// let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
// let commands = [new Command('MOVE', 10)]
let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
// let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 10)];

let message = new Message('Test message with two commands', commands);
let rover = new Rover(98382);    // Passes 98382 as the rover's position.
let response = rover.receiveMessage(message);

console.log(response);

// console.log(rover.statusCommand())
// console.log(message.commands.value);
// console.log(message.name);
// console.log(rover.mode)
// rover.position += 1
// console.log(rover)
// console.log(message.commands[0].value)
// console.log(message.commands[0].commandType)
// console.log(message.commands.length)
// console.log(message.commands[0].commandType === 'MODE_CHANGE')


module.exports = Rover;
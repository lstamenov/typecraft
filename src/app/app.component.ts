import { Component, ElementRef, ViewChild } from '@angular/core';
import Engine from 'src/engine/Engine';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public outputMessages: string[] = [];
  public engine: Engine = new Engine();
  @ViewChild('inputArea') inputArea: ElementRef;

  constructor() {}

  executeCommand() {
    const commands: string[] = this.inputArea.nativeElement.value.split(' ');
    const command = commands[0];
    
    switch (command) {
      case 'create':
        if(commands[1].toLowerCase() === 'unit'){
          const [ , ,name, position, team, unitType] = commands;
          this.outputMessages.push(this.engine.createUnit(name, position, team, unitType));
        }else if(commands[1].toLowerCase() === 'resource'){
          const [ , ,type, position, quantity] = commands;
          this.outputMessages.push(this.engine.createResource(type, position, quantity))
        }else{
          this.outputMessages.push('Invalid object type!');
        }
        break;
      case 'order':
        const command: string = commands[2].toLowerCase();
        if(command === 'attack'){
          this.outputMessages.push(this.engine.performAttack(commands[1]));
        }
        if(command === 'gather'){
          this.outputMessages.push(this.engine.performGather(commands[1]));
        }
        if(command === 'go'){
          this.outputMessages.push(this.engine.performGo(commands[1], commands[3]));
        }
        break;
      case 'end':
        this.outputMessages.push(this.engine.endGame());
        this.engine = new Engine();
        break;
      default:
        break;
    }
  }
}

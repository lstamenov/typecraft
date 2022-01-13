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

  constructor() { }

  executeCommand() {
    const commands: string[] = this.inputArea.nativeElement.value.split(' ');
    const command = commands[0];

    switch (command) {
      case 'create':
        if (commands[1].toLowerCase() === 'unit') {
          const [, , name, position, team, unitType] = commands;
          this.outputMessages.push(this.engine.createUnit(name, position, team, unitType));
        } else if (commands[1].toLowerCase() === 'resource') {
          const [, , type, position, quantity] = commands;
          this.outputMessages.push(this.engine.createResource(type, position, quantity))
        } else {
          this.outputMessages.push('Invalid object type!');
        }
        break;
      case 'order':
        const command: string = commands[2].toLowerCase();
        if (command === 'attack') {
          this.outputMessages.push(this.engine.performAttack(commands[1]));
        }
        if (command === 'gather') {

        }
        if (command === 'go') {

        }
        break;
      case 'show':
        const type: string = commands[1];
        if (type === 'all') {
          const redTeamUnitsCount = this.engine.redTeam.units.length;
          const blueTeamUnitsCount = this.engine.blueTeam.units.length;

          if (redTeamUnitsCount > 0) {
            this.outputMessages.push(this.engine.redTeam.getInformationForAllUnits());
          }
          if (blueTeamUnitsCount > 0) {
            this.outputMessages.push(this.engine.blueTeam.getInformationForAllUnits());
          }
        }else if(type === 'units'){
          const teamColor = commands[2].toUpperCase();
          this.outputMessages.push(this.engine.showUnits(teamColor));
        }
        break
      default:
        break;
    }
  }
}

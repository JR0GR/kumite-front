import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { GameTournamentListComponent } from "./game-tournament-list.component";
@NgModule({
    declarations: [GameTournamentListComponent],
    imports: [CommonModule, IonicModule],
    exports: [GameTournamentListComponent]
})
export class GameTournamentListModule { }
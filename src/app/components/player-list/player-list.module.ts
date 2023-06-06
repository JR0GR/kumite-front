import { NgModule } from "@angular/core";
import { PlayerListComponent } from "./player-list.component";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
@NgModule({
    declarations: [PlayerListComponent],
    imports: [CommonModule, IonicModule],
    exports: [PlayerListComponent]
})
export class PlayerListModule { }
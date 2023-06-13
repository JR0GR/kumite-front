import { NgModule } from "@angular/core";
import { SelectComponent } from "./select.component";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
@NgModule({
    declarations: [SelectComponent],
    imports: [CommonModule, IonicModule, FormsModule],
    exports: [SelectComponent],

})
export class SelectModule { }
import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header.component";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
@NgModule({
    declarations: [HeaderComponent],
    imports: [CommonModule, IonicModule],
    exports: [HeaderComponent]
})
export class HeaderModule { }
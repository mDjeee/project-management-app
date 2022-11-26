import { Component } from "@angular/core";

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss', './greeting.component-extra.scss']
})
export class GreetingComponent {
  AppName = 'Tagger'
}

import { Component } from '@angular/core';
import { ViewerComponent } from '../shared/viewer/viewer.component';
import { AudioComponent } from '../shared/audio/audio.component';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [AudioComponent, ViewerComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent {}

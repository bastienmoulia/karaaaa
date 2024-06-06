import { Routes } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { PlayerComponent } from './player/player.component';

export const routes: Routes = [
  { path: 'player', component: PlayerComponent },
  { path: 'editor', component: EditorComponent },
  { path: '', redirectTo: '/player', pathMatch: 'full' },
];

import { Routes } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { PlayerComponent } from './player/player.component';
import { HomeComponent } from './home/home.component';
import { SongComponent } from './song/song.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'player', component: PlayerComponent },
  { path: 'editor', component: EditorComponent },
  { path: ':songId', component: SongComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

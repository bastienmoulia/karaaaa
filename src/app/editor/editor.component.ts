import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { AudioComponent } from '../shared/audio/audio.component';
import { ViewerComponent } from '../shared/viewer/viewer.component';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [AudioComponent, ViewerComponent, FormComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent {}

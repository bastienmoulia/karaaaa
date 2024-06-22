import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  DocumentReference,
  Firestore,
  doc,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { AudioComponent } from '../shared/audio/audio.component';
import { ViewerComponent } from '../shared/viewer/viewer.component';
import { FormComponent } from '../editor/form/form.component';
import { FormsModule } from '@angular/forms';
import { LyricsService } from '../core/lyrics/lyrics.service';
import { Auth, user } from '@angular/fire/auth';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-song',
  standalone: true,
  imports: [
    AudioComponent,
    ViewerComponent,
    FormComponent,
    FormsModule,
    AsyncPipe,
  ],
  templateUrl: './song.component.html',
  styleUrl: './song.component.scss',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongComponent implements OnInit {
  private _activatedRoute = inject(ActivatedRoute);
  private _firestore = inject(Firestore);
  private _lyricsService = inject(LyricsService);
  private _auth = inject(Auth);

  loading = signal(true);
  songId = signal('');
  songData = signal<any>(null);
  edit = signal(false);
  songDocRef!: DocumentReference;
  user$ = user(this._auth);

  ngOnInit(): void {
    this.loading.set(true);
    this._activatedRoute.params.subscribe((params) => {
      this.songId.set(params['songId']);
      this.songDocRef = doc(this._firestore, 'songs', params['songId']);
      getDoc(this.songDocRef)
        .then((songDoc) => {
          if (songDoc.exists()) {
            this.songData.set(songDoc.data());
            console.log('Document data:', songDoc.data());
            this._lyricsService.set({ lines: songDoc.data()['lines'] });
          } else {
            // songDoc.data() will be undefined in this case
            console.log('No such document!');
          }
        })
        .finally(() => {
          this.loading.set(false);
        });
    });
  }

  saveLyrics() {
    if (this.songDocRef) {
      console.log('Saving lyrics:', this._lyricsService.lyrics);
      updateDoc(this.songDocRef, { lines: this._lyricsService.lyrics.lines });
    }
  }
}

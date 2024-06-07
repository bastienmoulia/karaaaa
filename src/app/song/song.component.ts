import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { AudioComponent } from '../shared/audio/audio.component';

@Component({
  selector: 'app-song',
  standalone: true,
  imports: [AudioComponent],
  templateUrl: './song.component.html',
  styleUrl: './song.component.scss',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongComponent implements OnInit {
  private _activatedRoute = inject(ActivatedRoute);
  private _firestore = inject(Firestore);
  loading = signal(true);
  songData = signal<any>(null);

  ngOnInit(): void {
    this.loading.set(true);
    this._activatedRoute.params.subscribe((params) => {
      const songDocRef = doc(this._firestore, 'songs', params['songId']);
      getDoc(songDocRef)
        .then((songDoc) => {
          if (songDoc.exists()) {
            this.songData.set(songDoc.data());
            console.log('Document data:', songDoc.data());
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
}

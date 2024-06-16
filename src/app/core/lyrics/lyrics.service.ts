import { Injectable } from '@angular/core';

export interface Lyrics {
  lines: LyricsLine[];
}

export interface LyricsLine {
  start: number;
  stop: number;
  text?: string;
}

@Injectable({
  providedIn: 'root',
})
export class LyricsService {
  lyrics!: Lyrics;

  constructor() {
    const lyricsLocal = localStorage.getItem('lyrics');
    if (lyricsLocal) {
      this.set(JSON.parse(lyricsLocal));
    }
  }

  set(lyrics: Lyrics) {
    // TODO: vérifier le contenu
    this.lyrics = lyrics;
  }

  save() {
    localStorage.setItem('lyrics', JSON.stringify(this.lyrics));
  }

  reset() {
    this.lyrics = null!;
    this.save();
  }

  download() {
    const blob = new Blob([JSON.stringify(this.lyrics)], {
      type: 'application/json',
    });
    const filename = 'lyrics.json';

    const elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
}

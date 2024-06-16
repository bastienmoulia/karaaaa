import { Component, inject, output } from '@angular/core';
import { LyricsService } from '../../core/lyrics/lyrics.service';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MoveLineComponent } from '../move-line/move-line.component';
import { FormsModule } from '@angular/forms';

const lineTime = 2;

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, NgbDropdownModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  lyricsService = inject(LyricsService);
  private ngbModal = inject(NgbModal);

  saveLyrics = output();

  newLyrics() {
    this.lyricsService.set({ lines: [] });
  }

  newLine() {
    let start = 0;
    if (this.lyricsService.lyrics.lines.length > 0) {
      start = this.lyricsService.lyrics.lines.slice(-1)[0].stop;
    }
    const stop = start + lineTime;

    this.lyricsService.lyrics.lines.push({
      start,
      stop,
      text: '',
    });
    this.save();
  }

  save() {
    this.lyricsService.save();
    this.saveLyrics.emit();
  }

  download() {
    this.lyricsService.download();
  }

  keydown(event: KeyboardEvent) {
    event.stopPropagation();
  }

  deleteLine(index: number) {
    this.lyricsService.lyrics.lines.splice(index, 1);
    this.save();
  }

  insertLine(index: number) {
    let start = 0;
    if (this.lyricsService.lyrics.lines.length > 1) {
      start = this.lyricsService.lyrics.lines[index].stop;
    }
    const stop = start + lineTime;

    this.lyricsService.lyrics.lines.splice(index + 1, 0, {
      start,
      stop,
      text: '',
    });
    this.save();
  }

  moveLine(index: number) {
    this.ngbModal.open(MoveLineComponent);
    this.save();
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { AudioService } from '../../core/audio/audio.service';
import { LyricsLine, LyricsService } from '../../core/lyrics/lyrics.service';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgStyle } from '@angular/common';
import { FunctionPipe } from '../function/function.pipe';

@Component({
  selector: 'app-viewer',
  standalone: true,
  imports: [FormsModule, NgbTooltipModule, NgStyle, FunctionPipe],
  templateUrl: './viewer.component.html',
  styleUrl: './viewer.component.scss',
})
export class ViewerComponent implements OnInit {
  audioService = inject(AudioService);
  lyricsService = inject(LyricsService);

  elapsed: number = 0;
  duration: number = 0;
  lyricsFile: File = null!;
  fontSize = 1;
  isFullscreen = false;
  progressThreshold = 5;

  ngOnInit() {
    this.audioService.timeupdate$.subscribe(() => {
      this.elapsed = this.audioService.audio.currentTime;
      this.duration = this.audioService.audio.duration;
    });
  }

  onLyricsFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.onload = (e) => {
        try {
          this.lyricsService.set(JSON.parse(reader.result as string));
        } catch (ex) {
          console.warn(ex);
        }
      };
      reader.readAsText(file);
    }
  }

  fullscreen() {
    const elem = document.getElementById('viewer-fullscreen')!;
    if (document.fullscreenElement) {
      document.exitFullscreen();
      this.isFullscreen = false;
    } else {
      elem.requestFullscreen();
      this.isFullscreen = true;
    }
  }

  reset() {
    this.lyricsService.reset();
  }

  bigger() {
    this.fontSize++;
  }

  smaller() {
    this.fontSize--;
  }

  leftCalcul(ellapsed: number, line: LyricsLine): number {
    const duration = ellapsed - line.start;
    const durationTotal = line.stop - line.start;
    return (duration / durationTotal) * 100;
  }
}

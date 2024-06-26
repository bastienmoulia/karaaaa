import { Component, OnInit, inject, input } from '@angular/core';
import { AudioService } from '../../core/audio/audio.service';
import { FormsModule } from '@angular/forms';
import { TimePipe } from '../time/time.pipe';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { getBlob, getBytes, getStorage, ref } from '@angular/fire/storage';

@Component({
  selector: 'app-audio',
  standalone: true,
  imports: [FormsModule, TimePipe, NgbTooltipModule],
  templateUrl: './audio.component.html',
  styleUrl: './audio.component.scss',
})
export class AudioComponent implements OnInit {
  audioService = inject(AudioService);

  songUrl = input<string>();

  elapsed = 0;
  duration = 0;
  progress = 0;
  audioFile = '';

  async ngOnInit() {
    this.audioService.timeupdate$.subscribe(() => {
      console.log('timeupdate');
      this.elapsed = this.audioService.audio.currentTime;
      this.duration = this.audioService.audio.duration || 1;
      this.progress = (this.elapsed * 100) / this.duration;
    });

    if (this.songUrl()) {
      const name = decodeURI(this.songUrl()!.split('?')[0].split('/').pop()!);
      this.audioService.set(this.songUrl()!, name);
    }
  }

  playPause() {
    this.audioService.toggle();
  }

  progressChanged(progress: number) {
    console.log('progressChanged');
    const time = (progress * this.audioService.audio.duration) / 100;
    this.audioService.audio.currentTime = time;
  }

  onAudioFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.loadFile(file);
    }
  }

  loadFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.audioService.set(reader.result as string, file.name);
    };
    reader.readAsDataURL(file);
  }

  resetFile() {
    this.audioFile = null!;
    this.audioService.reset();
  }
}

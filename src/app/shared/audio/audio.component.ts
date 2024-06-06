import { Component, OnInit, inject } from '@angular/core';
import { AudioService } from '../../core/audio/audio.service';
import { FormsModule } from '@angular/forms';
import { TimePipe } from '../time/time.pipe';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-audio',
  standalone: true,
  imports: [FormsModule, TimePipe, NgbTooltipModule],
  templateUrl: './audio.component.html',
  styleUrl: './audio.component.scss',
})
export class AudioComponent implements OnInit {
  audioService = inject(AudioService);

  elapsed = 0;
  duration = 0;
  progress = 0;
  audioFile = '';

  ngOnInit() {
    this.audioService.timeupdate$.subscribe(() => {
      console.log('timeupdate');
      this.elapsed = this.audioService.audio.currentTime;
      this.duration = this.audioService.audio.duration || 1;
      this.progress = (this.elapsed * 100) / this.duration;
    });
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
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.onload = (e) => {
        this.audioService.set(reader.result as string, file.name);
      };
      reader.readAsDataURL(file);
    }
  }

  resetFile() {
    this.audioFile = null!;
    this.audioService.reset();
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private _router = inject(Router);

  joinForm = new FormGroup({
    code: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
  });

  ngOnInit(): void {
    this.joinForm.get('code')!.valueChanges.subscribe((value) => {
      this.joinForm.get('code')!.setValue(value!.toUpperCase(), {
        emitEvent: false,
      });
    });
  }

  onSubmit() {
    if (this.joinForm.valid) {
      this._router.navigate([this.joinForm.value.code]);
    }
  }
}

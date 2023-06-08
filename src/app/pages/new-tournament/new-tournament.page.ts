import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast/toast.service';

@Component({
  selector: 'app-new-tournament',
  templateUrl: './new-tournament.page.html',
  styleUrls: ['./new-tournament.page.scss'],
})
export class NewTournamentPage implements OnInit {
  tournament: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.tournament = this.fb.group({
      tournamentName: ['', [Validators.required]],
      tournamentParticipants: ['', [Validators.required, Validators.min(4), Validators.max(32)]]
    })
  }

  createTournament() {
    if (!this.tournament.valid) {
      this.toastService.presentToast('All fields are required and participants must be between 4 and 32', false);
      return;
    }
  }

  image() {
    console.log('test');
  }

}

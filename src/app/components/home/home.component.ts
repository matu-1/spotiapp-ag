import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cancion } from 'src/app/interfaces/album';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  canciones!: Cancion[];
  isLoading: boolean;
  error?: string;

  constructor(private spotifyService: SpotifyService, private router: Router) {
    this.isLoading = true;
    spotifyService.getNewReleases().subscribe((data) => {
      this.canciones = data.items;
      this.isLoading = false;
      this.error = undefined;
    },  (error) => {
      this.isLoading = false;
      if(error instanceof HttpErrorResponse)
        this.error = error.error.error.message;
      else this.error = "Ups ocurrio un error :(";
    });
  }

  ngOnInit(): void {}

  goArtist(id: string){
    this.router.navigate(['artist', id]);
  }
}

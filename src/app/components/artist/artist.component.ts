import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import {  Artist, Cancion } from '../../interfaces/album';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styles: [],
})
export class ArtistComponent {
  artista?: Artist;
  canciones?: Cancion[];
  isLoading: boolean;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {
    this.isLoading = true;
    activatedRoute.params.subscribe((params) => {
      this.getArtista(params.id);
      this.getTopTracks(params.id);
    });
  }

  getArtista(id: string) {
    this.spotifyService.getArtistById(id).subscribe((data) => {
      this.artista = data;
      this.isLoading = false;
    });
  }

  getTopTracks(id: string) {
    this.spotifyService.getTopTracks(id).subscribe((data) => {
      this.canciones = data;
      this.isLoading = false;
    });
  }

  goBack() {
    window.history.back();
  }
}

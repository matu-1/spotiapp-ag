import { Component, OnInit } from '@angular/core';
import { Artist } from '../../interfaces/album';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  artistas!: Artist[];
  isLoading = false;

  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit(): void {}

  buscar(query: string) {
    this.isLoading = true;
    this.spotifyService.getArtist(query).subscribe((data) => {
      this.artistas = data.items;
      this.isLoading = false;
    });
  }
  
  goArtist(id: string){
    this.router.navigate(['/artist', id]);
  }
}

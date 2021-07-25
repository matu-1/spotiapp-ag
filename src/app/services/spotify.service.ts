import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Album, Artists, Artist, Cancion } from '../interfaces/album';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  apiUrl = 'https://api.spotify.com/v1';
  private headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  constructor(private http: HttpClient) {
    this.getToken().then((token) => localStorage.setItem('token', token));
  }

  async getToken() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    });
    const body = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: '12cba311c99c45b9a9da59f85090fddb',
      client_secret: '524676aa34b148b087180426f63b7a0b',
    });
    const data = await this.http
      .post<any>('https://accounts.spotify.com/api/token', body, { headers })
      .toPromise();
    return <string>data.access_token;
  }

  getNewReleases() {
    return this.http
      .get(`${this.apiUrl}/browse/new-releases`, { headers: this.headers })
      .pipe(map((data: any) => <Album>data.albums));
  }

  getArtist(query: string) {
    return this.http
      .get(`${this.apiUrl}/search?q=${query}&type=artist&limit=20`, {
        headers: this.headers,
      })
      .pipe(map((data: any) => <Artists>data.artists));
  }

  getArtistById(id: string) {
    return this.http.get<Artist>(`${this.apiUrl}/artists/${id}`, {
      headers: this.headers,
    });
  }

  getTopTracks(id: string) {
    return this.http
      .get(`${this.apiUrl}/artists/${id}/top-tracks?market=ES`, {
        headers: this.headers,
      })
      .pipe(map((data: any) => <Cancion[]>data.tracks));
  }
}

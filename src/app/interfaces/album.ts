export interface Album {
  id: string;
  href: string;
  items: Cancion[]
}

export interface Artists {
  id: string;
  href: string;
  items: Artist[]
}

export interface Cancion {
  name: string;
  images: Image[]
  artists: Artist[],
  album: Cancion,
  preview_url: string;
  id: string;
}

export interface Image {
  url: string;
}

export interface Artist {
  id: string;
  name: string;
  images: Image[],
  external_urls: any
}

export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyExternalUrls {
  spotify: string;
}

export interface SpotifyAlbum {
  name: string;
  images: SpotifyImage[];
}

export interface SpotifyArtist {
  name: string;
  external_urls: SpotifyExternalUrls;
}

export interface CurrentTrack {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  name: string;
  external_urls: SpotifyExternalUrls;
}

export interface CurrentTrackResponse {
  item: CurrentTrack;
}

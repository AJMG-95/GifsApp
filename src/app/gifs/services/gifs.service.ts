import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';


/* const GIPHY_API_KEY = 'qWmOMfpV4xJbBbm6JSdlNNNZSrJUUjP9'; */

@Injectable({
  providedIn: 'root' /* Eso provee el servicio al root para que sea global */
})
export class GifsService {


  public gifsList: Gif[] = [];

  private _tagsHistory: string[] = []; /* Almacena todos los tags que busca el usuario */
  private apiKey: string = 'qWmOMfpV4xJbBbm6JSdlNNNZSrJUUjP9'; /* ApiKey from https://developers.giphy.com/dashboard/ */
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage()
  }

  get tagsHistory(): string[] {
    return [...this._tagsHistory]; /* Se usa el operador [...] para copiar los tagsHistory */
  }

  private organizeHistory(tag: string): void {
    tag = tag.toLowerCase(); /* se pasa todo lo lowecase porque js es case-sensitive */

    //*El objetivo es borrar el tag anterior e insertarlo al inicio
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldtag) => oldtag !== tag);  /* filtra las coincidencias */
    }

    this._tagsHistory.unshift(tag); /* se inserta en la posicion 0 de _tagsHistory */
    this._tagsHistory = this._tagsHistory.splice(0, 10);  /* Limita la longitud del hitorial a 10 */

    this.saveLocalStorage() /* Se guardar el historial en el localStorage cada vez que se modufuca el _tagsHistory */
  }


  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }
  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if (this._tagsHistory.length === 0) return

    this.searchTag(this._tagsHistory[0]);
  }

  //*Hay varias formas de realizar la peticion a la API:
  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 12)
      .set('q', tag)
    const url: string = `${this.serviceUrl}/search`


    this.http.get<SearchResponse>(url, { params: params }).subscribe(resp => {
      this.gifsList = resp.data;
    })
  }
  /*
  //? fetch: Es una forma nativa de JS
  async searchTag(tag: string): Promise<void> {
      if (tag.length === 0) return;
      this.organizeHistory(tag);
      const url: string = 'https://api.giphy.com/v1/gifs/search?api_key=qWmOMfpV4xJbBbm6JSdlNNNZSrJUUjP9&q=Valorant&limit=15'
      fetch(url)
        .then(resp => resp.json())
        .then(data => console.log(data));
    }

    //? async /await: Es mas facil y legible
    async searchTag(tag: string): Promise<void> {
      if (tag.length === 0) return;
      this.organizeHistory(tag);
      const url: string = 'https://api.giphy.com/v1/gifs/search?api_key=qWmOMfpV4xJbBbm6JSdlNNNZSrJUUjP9&q=Valorant&limit=15'
      const resp = await fetch(url)
      const data = await resp.json();
      console.log(data);
    }
    */

}

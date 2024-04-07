import { Injectable } from '@angular/core';


/* const GIPHY_API_KEY = 'qWmOMfpV4xJbBbm6JSdlNNNZSrJUUjP9'; */

@Injectable({
  providedIn: 'root' /* Eso provee el servicio al root para que sea global */
})
export class GifsService {

  /* Almacena todos los tags que busca el usuario */
  private _tagsHistory: string[] = [];
  private apiKey: string = 'qWmOMfpV4xJbBbm6JSdlNNNZSrJUUjP9';

  constructor() { }

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
  }


  async searchTag(tag: string): Promise<void> {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    /*     fetch('https://api.giphy.com/v1/gifs/search?api_key=qWmOMfpV4xJbBbm6JSdlNNNZSrJUUjP9&q=Valorant&limit=15')
          .then(resp => resp.json())
          .then(data => console.log(data)); */
    const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=qWmOMfpV4xJbBbm6JSdlNNNZSrJUUjP9&q=Valorant&limit=15')
    const data = await resp.json();
    console.log(data);
  }

}

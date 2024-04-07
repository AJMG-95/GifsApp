import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private gifsService: GifsService) { }

  /* Como la propiedad _tagsHistory es privada se necesita un getter para obtener su valor */
  get tags() {
    return this.gifsService.tagsHistory;
  }


}

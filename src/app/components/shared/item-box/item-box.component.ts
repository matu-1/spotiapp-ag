import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cancion, Artist } from '../../../interfaces/album';

@Component({
  selector: 'app-item-box[item]',
  templateUrl: './item-box.component.html',
  styles: [],
})
export class ItemBoxComponent implements OnInit {
  @Input()
  item!: Cancion | Artist;

    
  @Output()
  onPressed: EventEmitter<string>;
  
  constructor() {
    this.onPressed = new EventEmitter();
  }

  ngOnInit(): void {}

  get artists() {
    if ('artists' in this.item) return this.item.artists;
    return null;
  }

  onTab(){
    if('artists' in this.item)
      this.onPressed.emit(this.item.artists[0].id);
    else this.onPressed.emit(this.item.id);
  }
}

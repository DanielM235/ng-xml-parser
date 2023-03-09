import { Component, Input } from '@angular/core';
import { XmlItem } from './xml-item';

@Component({
  selector: 'ngx-xml-reader',
  templateUrl: './ngx-xml-reader.component.html',
  styleUrls: ['./ngx-xml-reader.component.less']
})
export class NgxXmlReaderComponent {

  @Input() items: XmlItem[] = [];
}

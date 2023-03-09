import { Component, Inject, Input, OnChanges, Optional, SimpleChanges } from '@angular/core';
import { IXmlParser, DefaultXmlParser } from './parsers';
import { XmlItem } from './reader';

@Component({
  selector: 'ngx-xml-parser',
  templateUrl: './ngx-xml-parser.component.html',
  styleUrls: ['./ngx-xml-parser.component.less' ]
})
export class NgxXmlParserComponent implements OnChanges {

  /**
   * The parsed output to display
   */
  items: XmlItem[] = [];
  /**
   * Input file
   */
  @Input() source: File | undefined;
  /**
   * Optional custom xml parser - will override default if defined
   */
  @Input() customXmlParser: IXmlParser | undefined;

  /**
   * File name to display
   */
  get currentPath(): string {
    return this.source?.name ?? 'Please select a file';
  }

  constructor(@Optional() @Inject(DefaultXmlParser) private readonly globalXmlParser: IXmlParser) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['source']) {
      this.loadContent();
    }
  }

  onFileSelected(file: File | undefined): void {
    this.source = file ?? undefined;
    this.loadContent();
  }

  async loadContent(): Promise<void> {
    const parser = this.customXmlParser ?? this.globalXmlParser;
    if (!parser) {
      throw Error('Could not parse xml, no xml parser found');
    }
    this.items = await parser.parse(this.source);
  }

}

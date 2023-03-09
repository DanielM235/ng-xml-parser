import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxXmlParserComponent } from './ngx-xml-parser.component';
import { DefaultXmlParser, HotmailArchiveParser } from 'ngx-xml-parser';
import { FileLoaderComponent } from './file-loader/file-loader.component';
import { NgxXmlReaderModule } from './reader';

describe('NgxXmlParserComponent', () => {
  let component: NgxXmlParserComponent;
  let fixture: ComponentFixture<NgxXmlParserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxXmlReaderModule],
      declarations: [NgxXmlParserComponent, FileLoaderComponent],
      providers: [{ provide: DefaultXmlParser, useClass: HotmailArchiveParser }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NgxXmlParserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

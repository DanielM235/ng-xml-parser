import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxXmlReaderComponent } from './ngx-xml-reader.component';

describe('XmlReaderComponent', () => {
  let component: NgxXmlReaderComponent;
  let fixture: ComponentFixture<NgxXmlReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxXmlReaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxXmlReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

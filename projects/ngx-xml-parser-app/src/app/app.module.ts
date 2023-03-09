import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxXmlParserModule, DefaultXmlParser, HotmailArchiveParser } from 'ngx-xml-parser';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxXmlParserModule.forRoot({
      defaultParser: { provide: DefaultXmlParser, useClass: HotmailArchiveParser }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

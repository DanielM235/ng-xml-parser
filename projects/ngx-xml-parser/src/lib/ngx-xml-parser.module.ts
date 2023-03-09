import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxXmlParserComponent } from './ngx-xml-parser.component';
import { DefaultReaderOptions, XmlReaderOptions, NgxXmlReaderModule } from './reader';
import { ParserConfig } from './config';
import { FileLoaderComponent } from './file-loader/file-loader.component';
import { XmlDefaultFileHandler, BaseFileHandler } from './file-handler';

@NgModule({
  declarations: [
    NgxXmlParserComponent,
    FileLoaderComponent
  ],
  imports: [NgxXmlReaderModule],
  exports: [
    NgxXmlParserComponent
  ]
})
export class NgxXmlParserModule {
  static forRoot(config: ParserConfig): ModuleWithProviders<NgxXmlParserModule> {
    return {
      ngModule: NgxXmlParserModule,
      providers: [
        config.defaultParser,
        config.customFileHandler ?? { provide: XmlDefaultFileHandler, useClass: BaseFileHandler },
        { provide: XmlReaderOptions, useValue: config?.displayOptions ?? DefaultReaderOptions }
      ]
    }
  }
}

# NgxXmlParser
Small angular library to parse and read xml files.


### Installation

`npm install ngx-xml-parser`

To use the library, in your root module, import `NgxXmlParserModule` specifying the default parser :


```typescript

import { NgxXmlParserModule, DefaultXmlParser, HotmailArchiveParser } from 'ngx-xml-parser';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxXmlParserModule.forRoot({
      defaultParser: { provide: DefaultXmlParser, useClass: HotmailArchiveParser }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

You can define your own parser as an injectable service implementing the `IXmlParser` interface :

```typescript
import { InjectionToken } from '@angular/core';
import { XmlItem } from '../reader';

interface IXmlParser {
  parse(sourceFile?: string | File): Promise<XmlItem[]>;
}
```

Then just call the component in the template :

```angular2html
<ngx-xml-parser></ngx-xml-parser>
```

## Code scaffolding

Run `ng generate component component-name --project ngx-xml-parser` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ngx-xml-parser`.
> Note: Don't forget to add `--project ngx-xml-parser` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build ngx-xml-parser` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ngx-xml-parser`, go to the dist folder `cd dist/ngx-xml-parser` and run `npm publish`.

## Running unit tests

Run `ng test ngx-xml-parser` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

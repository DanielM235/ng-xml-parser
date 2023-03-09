import { Provider } from '@angular/core';
import { IXmlReaderOptions } from '../reader';

export interface ParserConfig {
  /**
   * The parser to use by default to transform the xml content
   */
  defaultParser: Provider;
  /**
   * Options for the reader
   */
  displayOptions?: IXmlReaderOptions;
  /**
   * If a custom file handler (see IFileHandler) is defined, using the token XmlDefaultFileHandler
   */
  customFileHandler?: Provider;
}

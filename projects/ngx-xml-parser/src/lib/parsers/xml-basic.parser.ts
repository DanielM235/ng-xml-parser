import { DefaultReaderOptions, XmlItem } from '../reader';
import { Inject } from '@angular/core';
import { IFileHandler, XmlDefaultFileHandler } from '../file-handler';

/**
 * Class to be extended by the parsers
 *
 * Provides basic methods, ie for reading files and converting into a Document object
 */
export abstract class XmlBasicParser {
  xmlParser = new DOMParser();

  constructor(@Inject(XmlDefaultFileHandler) protected readonly fileHandler: IFileHandler) {
  }

  /**
   * Reads the file content from the file
   *
   * Returns the content as a string
   * Catch reading errors, returns empty string if anything goes wrong
   *
   * @param filePath the File object from the file input
   */
  readFile(filePath?: File): Promise<string> {
    if (!this.fileHandler) {
      throw Error('No file handler found');
    }
    return this.fileHandler.readFile(filePath)
      .catch((err: { code: string, message: string }) => {
        console.error('Error at reading file :' + err);
        return Promise.resolve('');
      });
  }

  /**
   * Generates a Document object from the XML file content
   *
   * @param content the file content as a string
   * @param type the type of content for the dom parser
   */
  buildDocument(content?: string, type: DOMParserSupportedType = 'text/xml'): Document | null {
    if (!content) {
      return null;
    }
    return this.xmlParser.parseFromString(content, type);
  }

  /**
   * Basic color resolver, returns a couple of color/bgColor depending on the given index
   *
   * If index is out of bond, repeat over the color sequence using modulo
   *
   * @param index the index of the colors to resolve
   * @param colors all available colors
   */
  resolveColors(index: number, colors: { color: string | undefined, bgColor: string | undefined }[] = DefaultReaderOptions.colors)
    : { color: string | undefined, bgColor: string | undefined } {
    if (index < 0) {
      return colors[0];
    }
    // If out of bond, use modulo to resolve the best color
    return index >= colors.length ? colors[index % colors.length] : colors[index];
  }

  protected buildSeparator(date: string | null): XmlItem {
    return {
      th: { name: 'separator-header', content: date ?? '' },
      cells: [{ name: 'separator', content: '' }],
      bgColor: '#333', color: '#eee'
    };
  }
}

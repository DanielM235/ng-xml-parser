import { Inject, Injectable } from '@angular/core';
import { IXmlParser } from './xml-parser.interface';
import { XmlBasicParser } from './xml-basic.parser';
import { IXmlReaderOptions, XmlReaderOptions, XmlItem } from '../reader';
import { IFileHandler, XmlDefaultFileHandler } from '../file-handler';

@Injectable()
export class HotmailArchiveParser extends XmlBasicParser implements IXmlParser {

  private static readonly MESSAGE_TAG_NAME = 'Message';
  private static readonly USER_ATT_NAME = 'FriendlyName';
  private static readonly DEFAULT_USER_NAME = 'No name';
  private static readonly DATE_ATT_NAME = 'Date';
  private static readonly TIME_ATT_NAME = 'Time';

  constructor(@Inject(XmlReaderOptions) protected readonly options: IXmlReaderOptions,
              @Inject(XmlDefaultFileHandler) fileHandler: IFileHandler) {
    super(fileHandler);
  }

  parse(sourceFile?: File): Promise<XmlItem[]> {
    let promise = Promise.resolve<XmlItem[]>([]);
    try {
      promise = this.readFile(sourceFile)
        .then((content: string) => this.buildDocument(content))
        .then((doc: Document | null) => this.parseDocument(doc))
        .catch((err: unknown) => {
          console.log('Error at parsing the file ' + err);
          return [];
        });
    } catch (err: unknown) {
      console.error('Could not parse file content: ' + err);
    }
    return promise;
  }

  private parseDocument(document: Document | null): XmlItem[] {
    if (!document) {
      return [];
    }
    // Find messages in hotmail archive
    const messages = document.getElementsByTagName(HotmailArchiveParser.MESSAGE_TAG_NAME);

    let lastUser: string | undefined;
    let lastDate: string | undefined;
    let current: XmlItem;
    // Array for caching all user names found in archive
    const userNames: string[] = [];

    return Array.from(messages).reduce((memo: XmlItem[], m: Element) => {
      try {
        // Extract the name of current cell author
        const name = m.children[0].children[0].getAttribute(HotmailArchiveParser.USER_ATT_NAME)
          ?? HotmailArchiveParser.DEFAULT_USER_NAME;

        const sameUser = name === lastUser;
        if (!userNames.includes(name)) {
          userNames.push(name);
        }
        // Resolve colors for current user
        const { color, bgColor } = this.resolveColors(userNames.indexOf(name), this.options.colors);
        // Current date
        const currentDate = m.getAttribute(HotmailArchiveParser.DATE_ATT_NAME);

        if (currentDate && currentDate !== lastDate) {
          memo.push(this.buildSeparator(currentDate));
        }

        current = {
          th: {
            name: 'header',
            title: (sameUser && currentDate === lastDate) ?
              `${m.getAttribute(HotmailArchiveParser.TIME_ATT_NAME)}` :
              `${currentDate}|${m.getAttribute(HotmailArchiveParser.TIME_ATT_NAME)}`,
            content: sameUser ? '' : name
          },
          cells: [
            { name: 'message', content: m.children[2].textContent ?? '', },
          ],
          bgColor,
          color,
        };
        // Save last user's name and date for next loop
        lastUser = name;
        lastDate = currentDate ?? undefined;
      } catch (err: unknown) {
        current = {
          th: { name: 'error', content: 'Error in xml structure' + err },
          cells: [],
          color: 'red',
        };
      } finally {
        memo.push(current);
      }
      return memo;
    }, [])
  }

}

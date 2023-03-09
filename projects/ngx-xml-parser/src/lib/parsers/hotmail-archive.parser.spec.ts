import { HotmailArchiveParser } from './hotmail-archive.parser';

import { TestBed } from '@angular/core/testing';
import { BaseFileHandler, IFileHandler, XmlDefaultFileHandler } from '../file-handler';
import { XML_CONTENT_1, XML_CONTENT_WITH_ERRORS, XML_INVALID } from './stubs/hotmail-archive.data';
import { DefaultReaderOptions, XmlItem, XmlReaderOptions } from '../reader';

describe('HotmailArchiveParserService test', () => {
  let service: HotmailArchiveParser;
  let fileHandler: IFileHandler;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [
      HotmailArchiveParser,
      { provide: XmlDefaultFileHandler, useClass: BaseFileHandler },
      { provide: XmlReaderOptions, useValue: DefaultReaderOptions },
    ]
  }));

  beforeEach(() => {
    service = TestBed.inject(HotmailArchiveParser);
    fileHandler = TestBed.inject(XmlDefaultFileHandler);
  });

  describe('It should parse the xml', () => {
    let fakeFile: File;
    beforeEach(() => {
      fakeFile = new File([new Blob(['fake'], { type: 'text/xml' })], 'name');
    });
    it('', (done) => {
      // Given the content is a basic convo
      spyOn(fileHandler, 'readFile').and.returnValue(Promise.resolve(XML_CONTENT_1));

      // When parsing the xml
      service.parse(fakeFile).then((result: XmlItem[]) => {
        expect(fileHandler.readFile).toHaveBeenCalledOnceWith(fakeFile);
        // Then the result should contain the messages
        expect(result).toEqual([
          {
            th: { name: 'separator-header', content: '06/06/2009' },
            cells: [{ name: 'separator', content: '' }],
            bgColor: '#333',
            color: '#eee'
          },
          {
            th: { name: 'header', title: '06/06/2009|11:25:23', content: 'User1' },
            cells: [{ name: 'message', content: 'HI all' }],
            bgColor: undefined,
            color: undefined
          },
          {
            th: { name: 'header', title: '06/06/2009|11:26:01', content: 'User2' },
            cells: [{ name: 'message', content: 'Hya' }],
            bgColor: 'bisque', color: 'dimgrey'
          },
          {
            th: { name: 'header', title: '06/06/2009|11:26:10', content: 'User3' },
            cells: [{ name: 'message', content: 'Hohe' }],
            bgColor: '#FFCC66', color: '#330066'
          },
          {
            th: { name: 'separator-header', content: '24/06/2010' },
            cells: [{ name: 'separator', content: '' }],
            bgColor: '#333',
            color: '#eee'
          },
          {
            th: { name: 'header', title: '24/06/2010|00:56:07', content: 'User4' },
            cells: [{ name: 'message', content: 'hello' }],
            bgColor: '#333333', color: '#FFF'
          },
          {
            th: { name: 'header', title: '24/06/2010|00:56:42', content: 'User1' },
            cells: [{ name: 'message', content: 'how are you ' }],
            bgColor: undefined, color: undefined
          },
          {
            th: { name: 'header', title: '00:56:47', content: '' },
            cells: [{ name: 'message', content: 'all fine here' }],
            bgColor: undefined, color: undefined
          },
        ]);
        done();
      });
    });

    it('Should not break and replace incorrect content', (done) => {
      // Given the content has some missing parts
      spyOn(fileHandler, 'readFile').and.returnValue(Promise.resolve(XML_CONTENT_WITH_ERRORS));

      // When parsing the xml
      service.parse(fakeFile).then((result: XmlItem[]) => {
        expect(fileHandler.readFile).toHaveBeenCalledOnceWith(fakeFile);
        // Then the result should contain the error messages
        expect(result).toEqual([
          {
            th: { name: 'separator-header', content: '06/06/2009' },
            cells: [{ name: 'separator', content: '' }],
            bgColor: '#333',
            color: '#eee'
          },
          {
            th: { name: 'header', title: '06/06/2009|11:25:23', content: 'User1' },
            cells: [{ name: 'message', content: 'HI all' }],
            bgColor: undefined,
            color: undefined
          },
          {
            th: {
              name: 'error',
              content: 'Error in xml structureTypeError: Cannot read properties of undefined (reading \'textContent\')'},
            cells: [],
            color: 'red'
          },
          {
            th: { name: 'header', title: '06/06/2009|11:26:10', content: 'User3' },
            cells: [{ name: 'message', content: 'Hohe' }],
            bgColor: '#FFCC66', color: '#330066'
          },
        ]);
        done();
      });

    });

    it('Should not break if file content is not valid', (done) => {
      // Given file content is not valid
      spyOn(fileHandler, 'readFile').and.returnValue(Promise.resolve(XML_INVALID));

      // When parsing the xml
      service.parse(fakeFile).then((result: XmlItem[]) => {
        expect(fileHandler.readFile).toHaveBeenCalledOnceWith(fakeFile);
        // Then the result should be an empty array
        expect(result).toEqual([]);
        done();
      })
    });

    it('Should not break if file handler promise was rejected', (done) => {
      // Given fileHandler promise was rejected
      spyOn(fileHandler, 'readFile').and.returnValue(Promise.reject('An error occurred'));

      // When parsing the xml
      service.parse(fakeFile).then((result: XmlItem[]) => {
        expect(fileHandler.readFile).toHaveBeenCalledOnceWith(fakeFile);
        // Then the result should be an empty array
        expect(result).toEqual([]);
        done();
      })
    });

    it('Should not break if file handler throws an error', (done) => {
      // Given fileHandler throws
      spyOn(fileHandler, 'readFile').and.throwError('Error');

      // When parsing the xml
      service.parse(fakeFile).then((result: XmlItem[]) => {
        expect(fileHandler.readFile).toHaveBeenCalledOnceWith(fakeFile);
        // Then the result should be an empty array
        expect(result).toEqual([]);
        done();
      })
    });
  });

});

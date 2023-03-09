import { XmlBasicParser } from './xml-basic.parser';
import { BaseFileHandler } from '../file-handler';
import { DefaultReaderOptions } from '../reader';

class TestParser extends XmlBasicParser {}
describe('Test XmlBasicParser', () => {
  let service: TestParser;
  beforeEach(() => {
    service = new TestParser(new BaseFileHandler());
  });

  describe('Test resolveColors', () => {
    let colors: { color: string | undefined, bgColor: string | undefined }[];

    beforeEach(() => {
      colors = [
        { color: undefined, bgColor: undefined },
        { color: 'abc', bgColor: 'cde' },
        { color: 'def', bgColor: 'hij' },
        { color: 'klm', bgColor: 'nop' },
      ];
    });

    it('Should return the first color', () => {
      expect(service.resolveColors(0, colors)).toEqual({ color: undefined, bgColor: undefined });
      expect(service.resolveColors(1, colors)).toEqual({ color: 'abc', bgColor: 'cde' });
      expect(service.resolveColors(2, colors)).toEqual({ color: 'def', bgColor: 'hij' });
      expect(service.resolveColors(3, colors)).toEqual({ color: 'klm', bgColor: 'nop' });
    });

    it('should return a color modulo if index is out of range', () => {
      expect(service.resolveColors(4, colors)).toEqual({ color: undefined, bgColor: undefined });
      expect(service.resolveColors(5, colors)).toEqual({ color: 'abc', bgColor: 'cde' });
      expect(service.resolveColors(14, colors)).toEqual({ color: 'def', bgColor: 'hij' });
      expect(service.resolveColors(16, colors)).toEqual({ color: undefined, bgColor: undefined });
    });

    it('should return the first color if index is -1', () => {
      expect(service.resolveColors(-1, colors)).toEqual({ color: undefined, bgColor: undefined });
    });

    it('should use default colors if colors are not provided', () => {
      expect(service.resolveColors(2)).toEqual(DefaultReaderOptions.colors[2]);
      expect(service.resolveColors(2)).toEqual(DefaultReaderOptions.colors[2]);
    });

  });
});

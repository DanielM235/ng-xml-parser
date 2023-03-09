import { InjectionToken } from '@angular/core';

export interface IXmlReaderOptions {
  colors: { color: string | undefined, bgColor: string | undefined }[];
}

export const DefaultReaderOptions: IXmlReaderOptions = {
  colors: [
    { color: undefined, bgColor: undefined },
    { color: 'dimgrey', bgColor: 'bisque' },
    { color: '#330066', bgColor: '#FFCC66' },
    { color: '#FFF', bgColor: '#333333' },
  ]
};
export const XmlReaderOptions = new InjectionToken<IXmlReaderOptions>('XmlReaderOptions');


import { InjectionToken } from '@angular/core';
import { XmlItem } from '../reader';

/**
 * Parsers for the xml files
 * To be provided within the main module, or through component input
 */
export interface IXmlParser {
  parse(sourceFile?: File): Promise<XmlItem[]>;
}

export const DefaultXmlParser = new InjectionToken<IXmlParser>('DefaultXmlParser');

import { XmlCell } from './xml-cell';

export interface XmlItem {
  th?: XmlCell;
  cells: XmlCell[];
  color?: string;
  bgColor?: string;
}

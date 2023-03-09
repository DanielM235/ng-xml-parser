import { InjectionToken } from '@angular/core';

export interface IFileHandler {

  /**
   * Reads the file content from the file
   *
   * Returns the content as an async string
   *
   * @param file the File object from the file input
   */
  readFile(file?: File): Promise<string>;
}

export const XmlDefaultFileHandler = new InjectionToken<IFileHandler>('XmlDefaultFileHandler');

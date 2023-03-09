import { IFileHandler } from './file-handler.interface';

export class BaseFileHandler implements IFileHandler {

  /**
   * Reads the file content from the file
   *
   * Returns the content as an async string
   *
   * @param file the File object from the file input
   */
  readFile(file?: File): Promise<string> {
    return file ? new Promise<string>((resolve) => {
      if (!file) {
        return resolve('');
      }
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result?.toString() ?? '');
      }
      reader.readAsText(file);
    }) : Promise.resolve('');
  }

}

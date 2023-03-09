import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ngx-file-loader',
  templateUrl: './file-loader.component.html',
  styleUrls: ['./file-loader.component.less']
})
export class FileLoaderComponent {

  @Output() fileLoaded: EventEmitter<File | undefined> = new EventEmitter<File | undefined>();

  onFileSelected(event: Event): void {
    const target: HTMLInputElement | null = event.target as HTMLInputElement;
    this.fileLoaded.emit((target && target.files?.length) ? target.files[0] : undefined);
  }

}

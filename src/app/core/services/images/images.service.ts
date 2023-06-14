
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import {
  Directory,
  Filesystem
} from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { isPlatform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

const CACHE_FOLDER = 'CACHED-IMG';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private PHOTO_STORAGE = 'photos';

  constructor(private http: HttpClient, private authService: AuthService, handler: HttpBackend) {
    this.http = new HttpClient(handler);
    Preferences.remove({ key: this.PHOTO_STORAGE });
  }

  async pickFromGallery() {
    const images = [];
    const { photos } = await Camera.pickImages({});
    if (photos.length > 1) {
      return null;
    }

    for (const capturedPhoto of photos) {
      const image = await this.addNewToGallery(capturedPhoto);
      images.push(image);
    }
    return images;
  }

  async pickFromCamera() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 50,
    });
    return await this.addNewToGallery(capturedPhoto);
  }

  async addNewToGallery(capturedPhoto) {

    const base64File = await this.readAsBase64(capturedPhoto);

    const raw = await fetch(base64File);
    const blob = await raw.blob();


    const title = new Date().getTime() + '.png';
    const data = { base64: base64File.split(',')[1], title };

    return data
  }

  async uploadImage(data) {
    const image = await this.upload(data);
    return { title: image, base64File: 'data:image/png;base64,' + data.base64File };
  }

  async getCacheImagen(data): Promise<string> {
    let base64File;

    // eslint-disable-next-line no-underscore-dangle
    const _path = `${CACHE_FOLDER}/${data}`;
    await Filesystem.readFile({
      directory: Directory.Cache,
      path: _path
    }).then((readFile) => {
      base64File = readFile.data;
    }).catch(async (e) => {
      const image = await this.getImage(data);
      await this.saveImageToCache({ title: data, base64File: image });
      base64File = image;

    });
    return 'data:image/png;base64,' + base64File;
  }

  async saveImageToCache(data) {
    // eslint-disable-next-line no-underscore-dangle
    const _path = `${CACHE_FOLDER}/${data?.title}`;
    Filesystem.writeFile({
      directory: Directory.Cache,
      path: _path,
      data: data.base64File,
      recursive: true
    });
  }

  async upload(data): Promise<any> {

    const httpOptions = {
      responseType: 'text' as 'text'
    };
    return this.http.post(`${environment.urlApi}/images/add`, data, httpOptions).toPromise();;
  }

  async getImage(id: string): Promise<string> {
    const httpOptions = {
      responseType: 'text' as 'text'
    };

    return this.http
      .get(`${environment.urlApi}/images/${id}`, httpOptions)
      .toPromise();
  }

  private async readAsBase64(photo: Photo) {
    // "hybrid" will detect Cordova or Capacitor

    if (isPlatform('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: photo.path,
      });

      return 'data:image/png;base64,' + file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return (await this.convertBlobToBase64(blob)) as string;
    }
  }

  private convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
}


import { HttpClient } from '@angular/common/http';
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

const CACHE_FOLDER = 'CACHED-IMG';

@Injectable({
  providedIn: 'root',
})
export class ImagenService {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private PHOTO_STORAGE = 'photos';

  constructor(private http: HttpClient) {
    Preferences.remove({ key: this.PHOTO_STORAGE });
  }

  async pickFromGallery(id) {
    const images = [];
    const { photos } = await Camera.pickImages({});
    if (photos.length > 1) {
      return null;
    }

    for (const capturedPhoto of photos) {
      console.log(capturedPhoto);
      const image = await this.addNewToGallery(id, capturedPhoto);
      images.push(image);
    }
    return images;
  }

  async pickFromCamera(id) {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 50,
    });
    return await this.addNewToGallery(id, capturedPhoto);
  }

  async addNewToGallery(id, capturedPhoto) {

    const base64File = await this.readAsBase64(capturedPhoto);

    const raw = await fetch(base64File);
    const blob = await raw.blob();

    console.log(blob);

    const fileName = new Date().getTime() + '.jpeg';
    const data = { base64File: base64File, fileName, id: id };

    const image = await this.create(data);
    await this.saveImageToCache({ ...image, base64fFile: base64File });
    return { ...image, base64File: base64File };
  }

  async getCacheImagen(data) {
    let base64File;

    // eslint-disable-next-line no-underscore-dangle
    const _path = `${CACHE_FOLDER}/${data?.fileName}`;
    await Filesystem.readFile({
      directory: Directory.Cache,
      path: _path
    }).then((readFile) => {
      base64File = readFile.data;
    }).catch(async (e) => {
      const image = await this.getImageThumbnail(data.fileName);
      await this.saveImageToCache(image);
      base64File = image.base64File;

    });
    return 'data:image/jpeg;base64,' + base64File;
  }

  async saveImageToCache(data) {
    // eslint-disable-next-line no-underscore-dangle
    const _path = `${CACHE_FOLDER}/${data?.fileName}`;
    await Filesystem.writeFile({
      directory: Directory.Cache,
      path: _path,
      data: data.base64File,
    });
  }

  async create(data): Promise<any> {
    return this.http
      .post(`${environment.urlApi}/image/create`, data)
      .toPromise();
  }

  upload(data): Observable<any> {
    return this.http.post(`${environment.urlApi}/image/upload`, data);
  }

  getImage(name: string): Promise<any> {
    return this.http
      .get(`${environment.urlApi}/image/getImage/${name}`)
      .toPromise();
  }

  getImageThumbnail(name: string): Promise<any> {
    return this.http
      .get(`${environment.urlApi}/image/getImageThumbnail/${name}`)
      .toPromise();
  }

  delete(data): Observable<any> {
    const imagen = JSON.parse(JSON.stringify(data));
    imagen.base64File = '';
    return this.http.delete(
      `${environment.urlApi}/image/deleteImage/${data.id}`,
      { body: imagen }
    );
  }

  private async readAsBase64(photo: Photo) {
    // "hybrid" will detect Cordova or Capacitor

    if (isPlatform('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: photo.path,
      });

      return 'data:image/jpeg;base64,' + file.data;
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

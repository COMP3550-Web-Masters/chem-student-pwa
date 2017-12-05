import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageService{
    constructor(private storage: Storage){}

    addToStorage(key:string, val:string){ this.storage.set(key,val); }
    getFromStorage(key:string){ return this.storage.get(key); }
}

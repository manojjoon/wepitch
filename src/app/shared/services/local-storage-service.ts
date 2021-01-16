import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    public localStorageData: any = null;
    public setItem(key: string, value: any): void {
        if (!this.localStorageData) {
            this.localStorageData = {};
        }
        this.localStorageData[key] = value;
        localStorage.setItem(key, JSON.stringify(value));
    }

    public getItem(key: string): any {
        if (!this.localStorageData) {
            this.localStorageData = {};
        }
        if (!this.localStorageData[key]) {
            this.localStorageData[key] = JSON.parse(localStorage.getItem(key));
        }
        return this.localStorageData[key];
    }

    public clearItem(key): void {
        this.localStorageData[key] = null;
        localStorage.removeItem(key);
    }

    public clear() {
        this.localStorageData = null;
        localStorage.clear();
    }





}
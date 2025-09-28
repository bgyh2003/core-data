import { IData, ICallback } from "./types";
import { DataStorage } from "./data-storage";
import { DataEvent } from "./data-event";
export declare class CoreData<T extends IData> {
    dataStorage: DataStorage<T>;
    dataEvent: DataEvent<T>;
    constructor(data: T);
    get<K extends keyof T>(key: K): T[K];
    set<K extends keyof T>(key: K, value: T[K], channelNames?: string[]): void;
    export(): T;
    update(newData: Partial<T>, channelNames?: string[]): void;
    addListener(callback: ICallback<T>, keys?: (keyof T)[], channels?: string[]): void;
    removeListener(callback: ICallback<T>): void;
    clearListeners(): void;
}

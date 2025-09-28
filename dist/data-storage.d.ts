import { IData } from "./types";
export declare class DataStorage<T extends IData> {
    data: T;
    constructor(data: T);
    get<K extends keyof T>(key: K): T[K];
    set<K extends keyof T>(key: K, value: T[K]): void;
    update(newData: Partial<T>): (keyof T)[];
    export(): T;
}

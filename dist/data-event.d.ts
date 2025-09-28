import type { IData, ICallback, IListener } from "./types";
export declare class DataEvent<T extends IData> {
    listeners: IListener<T>[];
    constructor();
    addListener(callback: ICallback<T>, keys?: (keyof T)[], channels?: string[]): void;
    removeListener(callback: ICallback<T>): void;
    clearListeners(): void;
    trigger(data: T, updatedKeys: (keyof T)[], channelNames?: string[]): void;
}

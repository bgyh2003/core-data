import { IData, IListener, ICallback } from "./types"
import { DataStorage } from "./data-storage"
import { DataEvent } from "./data-event"

export class CoreData<T extends IData> {

    dataStorage: DataStorage<T>

    dataEvent: DataEvent<T>

    constructor(data: T) {
        this.dataStorage = new DataStorage(data)
        this.dataEvent = new DataEvent()
    }

    get<K extends keyof T>(key: K): T[K] {
        return this.dataStorage.get(key)
    }

    set<K extends keyof T>(key: K, value: T[K], channelNames: string[] | null = []) {
        this.dataStorage.set(key, value)
        this.dataEvent.trigger(this.dataStorage.data, [key], channelNames)
    }

    export(): T {
        return this.dataStorage.export()
    }


    update(newData: Partial<T>, channelNames: string[] | null = []) {
        const updatedKeys = this.dataStorage.update(newData)
        this.dataEvent.trigger(this.dataStorage.data, updatedKeys, channelNames)
    }


    addListener(
        callback: ICallback<T>,
        keys: (keyof T)[] = [],
        channels: string[] = []
    ) {
        this.dataEvent.addListener(callback, keys, channels)
    }

    removeListener(callback: ICallback<T>) {
        this.dataEvent.removeListener(callback)
    }

    clearListeners() {
        this.dataEvent.clearListeners()
    }
}
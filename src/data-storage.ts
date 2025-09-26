import { IData } from "./types"
import { DataEvent } from "./data-event"

export class DataStorage<T extends IData> {

    constructor(
        public data: T,
    ) { }

    get<K extends keyof T>(key: K): T[K] {
        return this.data[key]
    }

    set<K extends keyof T>(key: K, value: T[K]) {
        this.data[key] = value
    }

    update(newData: Partial<T>): (keyof T)[] {
        Object.assign(this.data, newData)
        return Object.keys(newData)
    }

    export(): T {
        return JSON.parse(JSON.stringify(this.data))
    }

}
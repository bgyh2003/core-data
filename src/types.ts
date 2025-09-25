export type IData = Record<string, any>

export type ICallback<T extends IData> = (data: Readonly<T>, keys: (keyof T)[], channels: string[]) => void

export type IListener<T extends IData> = {
    keys: (keyof T)[]
    callback: ICallback<T>
    channels: string[]
}
import type { IData, ICallback, IListener } from "./types"

export class DataEvent<T extends IData> {

    listeners: IListener<T>[] = []
    constructor() { }

    addListener(
        callback: ICallback<T>,
        keys: (keyof T)[] = [],
        channels: string[] = []
    ) {
        this.listeners.push({ callback, keys, channels })
    }

    removeListener(callback: ICallback<T>) {
        this.listeners = this.listeners.filter(listener => listener.callback !== callback)
    }

    clearListeners() {
        this.listeners = []
    }

    trigger(
        data: T,
        updatedKeys: (keyof T)[],
        channelNames: string[] | null = []
    ) {

        // 不推送任何频道
        if (channelNames === null) return

        // 遍历全部监听器
        this.listeners.forEach(({ keys, callback, channels }) => {

            // 检测频道
            if (

                // 全频道推送
                channelNames.length === 0 ||

                // 全频道监听
                channels.length === 0 ||

                // 监听器监听的频道与更新的频道有交集
                channelNames.some(ch => channels.includes(ch))
            ) {

                // 检测键
                if (

                    // 监听器监听所有键
                    keys.length === 0 ||

                    // 监听器监听的键与更新的键有交集
                    updatedKeys.some(key => keys.includes(key))

                ) callback(data, updatedKeys, channelNames)

            }


        })


    }


}
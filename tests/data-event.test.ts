import { DataEvent } from "../src"

const originData = {
    a: 1,
    b: 2,
    c: "3",
    d: true,
}

describe('DataEvent', () => {

    test('no-limit', () => {

        let res: Array<any> = []

        const dataEvent = new DataEvent<typeof originData>()
        dataEvent.addListener((data, keys, channels) => res.push({ keys, channels }))

        dataEvent.trigger(originData, ["a"], ["ch1"])
        dataEvent.trigger(originData, ["b"], ["ch2"])
        dataEvent.trigger(originData, ["c"], ["ch3"])
        dataEvent.trigger(originData, ["d"], ["ch4"])
        dataEvent.trigger(originData, ["a", "b", "c", "d"], ["ch1", "ch2", "ch3", "ch4"])

        expect(res).toEqual([
            { keys: ["a"], channels: ["ch1"] },
            { keys: ["b"], channels: ["ch2"] },
            { keys: ["c"], channels: ["ch3"] },
            { keys: ["d"], channels: ["ch4"] },
            { keys: ["a", "b", "c", "d"], channels: ["ch1", "ch2", "ch3", "ch4"] },
        ])

    })

    test('limit-all', () => {

        let res: Array<any> = []

        const dataEvent = new DataEvent<typeof originData>()
        dataEvent.addListener((data, keys, channels) => res.push({ keys, channels }), ["a", "b"], ["ch1", "ch2"])

        dataEvent.trigger(originData, ["a"], ["ch1"])
        dataEvent.trigger(originData, ["b"], ["ch2"])

        dataEvent.trigger(originData, ["a"], ["ch5"])
        dataEvent.trigger(originData, ["b"], ["ch6"])

        dataEvent.trigger(originData, ["c"], ["ch3"])
        dataEvent.trigger(originData, ["d"], ["ch4"])
        dataEvent.trigger(originData, ["a", "b", "c", "d"], ["ch1", "ch2", "ch3", "ch4"])

        expect(res).toEqual([
            { keys: ["a"], channels: ["ch1"] },
            { keys: ["b"], channels: ["ch2"] },
            { keys: ['a', 'b', 'c', 'd'], channels: ['ch1', 'ch2', 'ch3', 'ch4'] }
        ])

    })

    test('limit-keys', () => {

        let res: Array<any> = []

        const dataEvent = new DataEvent<typeof originData>()
        dataEvent.addListener((data, keys, channels) => res.push({ keys, channels }), ["a", "b"])

        dataEvent.trigger(originData, ["a"], ["ch1"])
        dataEvent.trigger(originData, ["b"], ["ch2"])

        dataEvent.trigger(originData, ["a"], ["ch5"])
        dataEvent.trigger(originData, ["b"], ["ch6"])

        dataEvent.trigger(originData, ["c"], ["ch3"])
        dataEvent.trigger(originData, ["d"], ["ch4"])
        dataEvent.trigger(originData, ["a", "b", "c", "d"], ["ch1", "ch2", "ch3", "ch4"])

        expect(res).toEqual([
            { keys: ['a'], channels: ['ch1'] },
            { keys: ['b'], channels: ['ch2'] },
            { keys: ['a'], channels: ['ch5'] },
            { keys: ['b'], channels: ['ch6'] },
            { keys: ['a', 'b', 'c', 'd'], channels: ['ch1', 'ch2', 'ch3', 'ch4'] }
        ])

    })

    test('limit-channels', () => {

        let res: Array<any> = []

        const dataEvent = new DataEvent<typeof originData>()
        dataEvent.addListener((data, keys, channels) => res.push({ keys, channels }), [], ["ch5", "ch6"])

        dataEvent.trigger(originData, ["a"], ["ch1"])
        dataEvent.trigger(originData, ["b"], ["ch2"])

        dataEvent.trigger(originData, ["a"], ["ch5"])
        dataEvent.trigger(originData, ["b"], ["ch6"])
        dataEvent.trigger(originData, ["a", "b", "c"], ["ch5", "ch6", "ch7"])

        dataEvent.trigger(originData, ["c"], ["ch3"])
        dataEvent.trigger(originData, ["d"], ["ch4"])
        dataEvent.trigger(originData, ["a", "b", "c", "d"], ["ch1", "ch2", "ch3", "ch4"])

        expect(res).toEqual([
            { keys: ['a'], channels: ['ch5'] },
            { keys: ['b'], channels: ['ch6'] },
            { keys: ['a', 'b', 'c'], channels: ['ch5', 'ch6', 'ch7'] },
        ])

    })

});


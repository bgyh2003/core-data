import { CoreData } from "../src"

interface ITestData {
    name: string,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    locked: boolean,
    points: Array<{ x: number, y: number }>

}

describe('CoreData', () => {

    test('set-get', async () => {

        const coreData = new CoreData<ITestData>({
            name: 'test',
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            color: 'red',
            locked: false,
            points: [{ x: 0, y: 0 }, { x: 10, y: 10 }, { x: 20, y: 20 }]
        })

        expect(coreData.get('name')).toBe('test')
        expect(coreData.get('x')).toBe(0)
        expect(coreData.get('y')).toBe(0)
        expect(coreData.get('locked')).toBe(false)

        coreData.set('name', 'test2')
        coreData.set('x', 10)
        coreData.set('y', 10)
        coreData.set('locked', true)

        expect(coreData.get('name')).toBe('test2')
        expect(coreData.get('x')).toBe(10)
        expect(coreData.get('y')).toBe(10)
        expect(coreData.get('locked')).toBe(true)


        coreData.update({ name: 'test3', x: 20, y: 20, color: 'blue' })
        expect(coreData.get('name')).toBe('test3')
        expect(coreData.get('x')).toBe(20)
        expect(coreData.get('y')).toBe(20)
        expect(coreData.get('color')).toBe('blue')

        const data = coreData.export()
        expect(data).toEqual({
            name: 'test3',
            x: 20,
            y: 20,
            width: 0,
            height: 0,
            color: 'blue',
            locked: true,
            points: [{ x: 0, y: 0 }, { x: 10, y: 10 }, { x: 20, y: 20 }]
        })

    })


    test('event', async () => {

        const originData = {
            a: 1,
            b: 2,
            c: "3",
            d: true,
        }

        const coreData = new CoreData<typeof originData>(originData)

        let resNoLimit: Array<any> = []
        coreData.addListener((data, keys, channels) => resNoLimit.push({ keys, channels }))

        let resLimitAll: Array<any> = []
        coreData.addListener((data, keys, channels) => resLimitAll.push({ keys, channels }), ["a", "b"], ["ch1", "ch2"])

        let resLimitKeys: Array<any> = []
        coreData.addListener((data, keys, channels) => resLimitKeys.push({ keys, channels }), ["c", "d"])

        let resLimitChannels: Array<any> = []
        coreData.addListener((data, keys, channels) => resLimitChannels.push({ keys, channels }), [], ["ch3", "ch4"])


        coreData.set("a", 2)
        coreData.set("b", 3)
        coreData.set("c", "4", ["ch1"])
        coreData.set("d", false, ["ch2"])
        coreData.update({ a: 3, b: 4, c: "5", d: true }, ["ch3"])

        expect(resNoLimit).toEqual([
            { keys: ['a'], channels: [] },
            { keys: ['b'], channels: [] },
            { keys: ['c'], channels: ['ch1'] },
            { keys: ['d'], channels: ['ch2'] },
            { keys: ['a', 'b', 'c', 'd'], channels: ['ch3'] }
        ])

        expect(resLimitAll).toEqual([
            { keys: ['a'], channels: [] },
            { keys: ['b'], channels: [] }
        ])

        expect(resLimitKeys).toEqual([
            { keys: ['c'], channels: ['ch1'] },
            { keys: ['d'], channels: ['ch2'] },
            { keys: ['a', 'b', 'c', 'd'], channels: ['ch3'] }
        ])

        expect(resLimitChannels).toEqual([
            { keys: ['a'], channels: [] },
            { keys: ['b'], channels: [] },
            { keys: ['a', 'b', 'c', 'd'], channels: ['ch3'] }
        ])

    })


});


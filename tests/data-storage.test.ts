import { DataStorage } from "../src"

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

describe('SoraPayload', () => { 
    
    test('DataStorage', async () => {

        const dataStorage = new DataStorage<ITestData>({
            name: 'testName',
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            color: 'red',
            locked: false,
            points: [
                { x: 0, y: 0 },
                { x: 100, y: 0 },
                { x: 100, y: 100 },
                { x: 0, y: 100 }
            ]
        })

        expect(dataStorage.get('name')).toBe('testName')
        expect(dataStorage.get('x')).toBe(0)
        expect(dataStorage.get('y')).toBe(0)
        expect(dataStorage.get('width')).toBe(100)
        expect(dataStorage.get('height')).toBe(100)
        expect(dataStorage.get('color')).toBe('red')
        expect(dataStorage.get('locked')).toBe(false)
        expect(dataStorage.get('points')).toEqual([
            { x: 0, y: 0 },
            { x: 100, y: 0 },
            { x: 100, y: 100 },
            { x: 0, y: 100 }
        ])

        dataStorage.set('x', 10)
        dataStorage.set('y', 10)
        expect(dataStorage.get('x')).toBe(10)
        expect(dataStorage.get('y')).toBe(10)

        dataStorage.update({
            x: 20,
            y: 20,
            points: [
                { x: 20, y: 20 },
                { x: 300, y: 300 },
            ]
        })

        expect(dataStorage.get('x')).toBe(20)
        expect(dataStorage.get('y')).toBe(20)
        expect(dataStorage.get('points')).toEqual([
            { x: 20, y: 20 },
            { x: 300, y: 300 },
        ])


        expect(dataStorage.export()).toEqual({
            name: 'testName',
            x: 20,
            y: 20,
            width: 100,
            height: 100,
            color: 'red',
            locked: false,
            points: [
                { x: 20, y: 20 },
                { x: 300, y: 300 },
            ]
        })

    })

});


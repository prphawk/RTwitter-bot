import { BotInit } from './index.js'

describe('Index', () => {
    const BotInitMock = jest.fn(BotInit)
    it('should BotInit to be defined', () => {
        expect(BotInitMock).toBeDefined();
    })
})

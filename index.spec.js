const Index = require('./index.ts')

describe('Index', () => {
    const BotInitMock = jest.fn(Index.BotInit)
    it('should BotInit to be defined', () => {
        expect(BotInitMock).toBeDefined();
    })
})

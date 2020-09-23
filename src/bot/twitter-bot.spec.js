import { Bot, BotRetweet } from './twitter-bot.js'
import Twit from 'twit'

// Smoke Tests
describe('Smoke Tests', () => {
    describe('Bot', () => {
        it('should exists as object', () => {
            expect(typeof Bot).toBe('object');
        });

        it('should be instance of Twit', () => {
            expect(Bot).toBeInstanceOf(Twit);
        });

        it('should Bot config have twitter access properties', () => {
            const expected = {
                consumer_key: expect.anything(),
                consumer_secret: expect.anything(),
                access_token: expect.anything(),
                access_token_secret: expect.anything(),
            };
            expect(Bot.config).toEqual(expect.objectContaining(expected))
        });

    });

    describe('BotRetweet', () => {
        it('should BotRetweet exist and be a function', () => {
            expect(typeof BotRetweet).toBe('function');
        });
    });

    /*
    describe('isReply', () => {
        it('should exist and be a function', () => {
            expect(typeof TwitterBot.isReply).toBe('function');
        });
    });
    */

})


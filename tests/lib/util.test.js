import faker from 'faker';

import { util } from '../../lib';

const {
  parseNumber,
  copyKeysToEmptyObject,
  filterObject,
  chompFloat,
  isEmptyObject
} = util;

describe('Util', () => {
  describe('parseNumber', () => {
    it('should return a number given a number', () => {
      const number = faker.random.number();
      expect(parseNumber(number)).toEqual(number);
    });
    it('should return a number given a number string', () => {
      const number = `${faker.random.number()}`;
      expect(parseNumber(number)).toEqual(parseFloat(number));
    });
    it('should return undefined given a text string', () => {
      const number = faker.random.word();
      expect(parseNumber(number)).toEqual(undefined);
    });
  });

  describe('copyKeysToEmptyObject', () => {
    const object = {
      one: faker.random.word(),
      two: {
        [faker.random.word()]: faker.random.word()
      },
      three: {
        [faker.random.word()]: {
          [faker.random.word()]: faker.random.word()
        },
        [faker.random.word()]: [faker.random.word(), faker.random.word()]
      }
    };

    it('should copy the top level of an object with undefined properties', () => {
      const expected = {
        one: undefined,
        two: undefined,
        three: undefined
      };
      expect(copyKeysToEmptyObject(object)).toEqual(expected);
    });

    it('should copy the top level of an object with the default value', () => {
      const expected = {
        one: {},
        two: {},
        three: {}
      };
      expect(copyKeysToEmptyObject(object, {})).toEqual(expected);
    });
  });

  describe('filterObject', () => {
    const whitelist = ['pizza', 'delivery'];

    const expected = {
      pizza: 'yum'
    };

    const object = {
      ...expected,
      pickup: 'nope'
    };

    it('should return an object with properties listed in the whitelist', () => {
      expect(filterObject(object, (key) => whitelist.includes(key))).toEqual(
        expected
      );
    });
  });

  describe('chompFloat', () => {
    it('should return the number fixed', () => {
      expect(chompFloat(0.1234, 3)).toEqual(0.123);
      expect(chompFloat('0.1234', 3)).toEqual(0.123);
      expect(chompFloat(4321.2, 2)).toEqual(4321.2);
      expect(chompFloat('4321.2', 2)).toEqual(4321.2);
      expect(chompFloat(0, 5)).toEqual(0);
      expect(chompFloat('0', 5)).toEqual(0);
    });

    it('should return the number fixed', () => {
      const errorMessage = 'Invalid value passed to fixFloat';

      try {
        chompFloat(undefined);
      } catch (e) {
        expect(e.message).toMatch(errorMessage);
      }

      try {
        chompFloat(null);
      } catch (e) {
        expect(e.message).toMatch(errorMessage);
      }

      try {
        chompFloat(false);
      } catch (e) {
        expect(e.message).toMatch(errorMessage);
      }
    });
  });

  describe('isEmptyObject', () => {
    it('should be an empty object', () => {
      expect(isEmptyObject({})).toEqual(true);
    });
    it('should not be an empty object', () => {
      expect(
        isEmptyObject({
          test: true
        })
      ).toEqual(false);
    });
  });
});

import faker from 'faker';

import { Validation } from '../../models';
import { regexByFieldName } from 'lib/input';

describe('Validation', () => {
  const rules = {
    firstName: {
      required: true
    },
    lastName: {
      minLength: 4,
      maxLength: 8
    },
    email: {
      required: true,
      regex: regexByFieldName('email')
    },
    confirmEmail: {
      required: true,
      regex: regexByFieldName('email'),
      dependencies: [
        {
          field: 'email',
          exactMatch: true
        }
      ]
    },
    password: {
      minLength: 8,
      isValid: (value) => {
        // Check that the value has "coolbeans" in it
        // for testing purposes
        return value.includes('coolbeans');
      }
    },
    number: {
      required: true
    },
    radioList: {
      required: true
    }
  };

  const email = faker.internet.email();

  const validFields = {
    firstName: {
      value: faker.name.firstName()
    },
    lastName: {
      value: 'Fiver'
    },
    email: {
      value: email
    },
    confirmEmail: {
      value: email
    },
    password: {
      value: 'coolbeans88'
    },
    number: {
      value: 0
    },
    radioList: {
      value: ['blue']
    }
  };

  describe('updateRules', () => {
    const validate = new Validation({});

    it('should update rules on validation object', () => {
      expect(validate.rules).toEqual({});

      validate.updateRules(rules);

      expect(validate.rules).toEqual(rules);
    });
  });

  describe('byField', () => {
    const validate = new Validation(rules);

    it('should return true a valid input', () => {
      expect(validate.byField('firstName', faker.name.firstName())).toEqual(
        true
      );
      expect(validate.byField('password', '')).toEqual(true);
      expect(validate.byField('radioList', [faker.name.firstName()])).toEqual(
        true
      );
      expect(validate.byField('radioList', [0])).toEqual(true);
      expect(validate.byField('radioList', [faker.random.word(), 0])).toEqual(
        true
      );
    });

    it('should return false with no input', () => {
      expect(validate.byField('firstName')).toEqual(false);
      expect(validate.byField('firstName', undefined)).toEqual(false);
      expect(validate.byField('firstName', null)).toEqual(false);
      expect(validate.byField('radioList', [undefined])).toEqual(false);
      expect(validate.byField('radioList', [null])).toEqual(false);
      expect(validate.byField('radioList', [undefined, null])).toEqual(false);
    });

    it('should return true if no value on a not required field', () => {
      expect(validate.byField('lastName')).toEqual(true);
      expect(validate.byField('lastName', undefined)).toEqual(true);
    });

    it('should return proper valid state for min and max length rules', () => {
      expect(validate.byField('lastName', 'Sho')).toEqual(false);
      expect(validate.byField('lastName', 'Shortn')).toEqual(true);
      expect(validate.byField('lastName', 'Shortname')).toEqual(false);
    });

    it('should return proper valid state for regex rules', () => {
      expect(validate.byField('email', 'test@company.tech')).toEqual(true);
      expect(validate.byField('email', 'test.test@company.tech')).toEqual(true);
      expect(validate.byField('email', 'test@company.tech.org')).toEqual(true);
      expect(validate.byField('email', 'test.test@company.tech.org')).toEqual(
        true
      );
      expect(validate.byField('email', '@company.tech')).toEqual(false);
      expect(validate.byField('email', 'test@')).toEqual(false);
      expect(validate.byField('email', 'test@org')).toEqual(false);
    });

    it('should return return true if the custom isValid function is truthy', () => {
      expect(validate.byField('password', 'coolbeans88')).toEqual(true);
      expect(validate.byField('password', 'beansthatarenotcool99')).toEqual(
        false
      );
    });

    it('should return return true if there is no rule for the field', () => {
      expect(validate.byField('colby', 'cool')).toEqual(true);
    });

    it('should consider 0 valid input and not empty', () => {
      expect(validate.byField('number', 0)).toEqual(true);
    });

    describe('Dependencies', () => {
      it('should validate exactMatch dependencies', () => {
        const email = faker.internet.email();
        const fieldDependencies = [
          {
            ...rules.confirmEmail.dependencies[0],
            value: email
          }
        ];

        expect(
          validate.byField('confirmEmail', email, fieldDependencies)
        ).toEqual(true);
        expect(
          validate.byField('confirmEmail', `test${email}`, fieldDependencies)
        ).toEqual(false);
      });
    });
  });

  describe('bySet', () => {
    const validate = new Validation(rules);

    it('should return true for valid inputs', () => {
      expect(validate.bySet(validFields)).toEqual(true);
      expect(
        validate.bySet(
          Object.assign({}, validFields, {
            password: {
              value: ''
            }
          })
        )
      ).toEqual(true);
    });

    it('should return false for invalid inputs', () => {
      expect(
        validate.bySet(
          Object.assign({}, validFields, {
            firstName: {
              value: undefined
            }
          })
        )
      ).toEqual(false);
      expect(
        validate.bySet(
          Object.assign({}, validFields, {
            lastName: {
              value: 'Bus'
            }
          })
        )
      ).toEqual(false);
      expect(
        validate.bySet(
          Object.assign({}, validFields, {
            email: {
              value: 'blue'
            }
          })
        )
      ).toEqual(false);
    });

    describe('Dependencies', () => {
      it('should validate exactMatch dependencies by the set', () => {
        const key = 'confirmEmail';
        const invalidFields = {
          ...validFields,
          [key]: {
            ...validFields[key],
            value: faker.internet.email()
          }
        };

        expect(validate.bySet(validFields, true)).toEqual([]);
        expect(validate.bySet(invalidFields, true)).toEqual([key]);
      });
    });
  });
});

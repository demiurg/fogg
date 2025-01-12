import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';

import SearchBox from './';

// TODO: seems like some of these tests are difficult to set up without Enzyme having
// Hook support at this time. We should write tests when possible

describe('SearchBox', () => {
  it('renders a SearchBox', () => {
    const searchbox = shallow(<SearchBox />);
    expect(searchbox.find('FormInput').prop('className')).toEqual(
      'search-box-input'
    );
    expect(searchbox.find('SearchDate').exists()).toEqual(true);
    expect(
      searchbox.find('.search-box-controls-search').find('Button').exists()
    ).toEqual(true);
  });

  describe('Events', () => {
    describe('Search Box Input', () => {
      const inputTestValue = faker.random.word();

      it('should have the correct input value', () => {
        const searchbox = shallow(<SearchBox onInput={handleInput} />);
        const searchboxInput = searchbox.find('FormInput');

        let inputTest = null;

        function handleInput (event) {
          inputTest = event.target.value;
        }

        searchboxInput.prop('onInput')({
          target: {
            value: inputTestValue
          }
        });

        expect(inputTest).toEqual(inputTestValue);
      });
    });
  });
});

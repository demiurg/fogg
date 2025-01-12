import React from 'react';
import PropTypes from 'prop-types';

import { useLens } from '../../hooks';

import SearchDate from '../SearchDate';

const LensSearchDate = ({ allowFutureDate }) => {
  const { geoSearch = {} } = useLens();
  const { updateSearch, queryParams = {}, config = {} } = geoSearch;
  const { date = {} } = queryParams;
  const { utc } = config;

  /**
   * handleOnDateChange
   */

  function handleOnDateChange (changedDate = {}) {
    updateSearch({
      date: changedDate.date
    });
  }

  return (
    <SearchDate
      onDateChange={handleOnDateChange}
      onDateClear={handleOnDateChange}
      onDateCancel={handleOnDateChange}
      defaultDate={date}
      classPrefix={'search-box-controls'}
      allowFutureDate={allowFutureDate}
      utc={utc}
    />
  );
};

LensSearchDate.propTypes = {
  allowFutureDate: PropTypes.bool
};

export default LensSearchDate;

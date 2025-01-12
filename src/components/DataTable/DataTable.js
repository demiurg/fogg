import React from 'react';
import PropTypes from 'prop-types';

import ClassName from '../../models/classname';

import Button from '../Button';
import Table from '../Table';

const DataTable = ({
  children,
  label = 'Items',
  labelLower,
  data = [],
  isLoading,
  emptyActions = [],
  ...rest
}) => {
  const componentClass = new ClassName('data-table');

  const isEmpty = data.length === 0;
  const hasEmptyActions =
    Array.isArray(emptyActions) && emptyActions.length > 0;

  componentClass.addIf(componentClass.childString('empty'), isEmpty);
  componentClass.addIf(componentClass.childString('is-loading'), isLoading);

  if (!labelLower && typeof label === 'string') {
    labelLower = label.toLowerCase();
  }

  return (
    <div className={componentClass.string}>
      <Table data={data} {...rest} />
      {!!children && children}
      {!children && isEmpty && (
        <div className={componentClass.childString('empty-content')}>
          <p>Looks like there are no {labelLower}!</p>
          {hasEmptyActions && (
            <ul className={componentClass.childString('empty-actions')}>
              {emptyActions.map(({ to, label } = {}, index) => {
                return (
                  <li key={`DataTable-Action-${index}`}>
                    <Button to={to}>{label}</Button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

DataTable.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  label: PropTypes.string,
  labelLower: PropTypes.string,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  emptyActions: PropTypes.array
};

export default DataTable;

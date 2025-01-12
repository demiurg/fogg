import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';

import { useTableData } from '../../../hooks';

import Table from './';

const tableColumns = [
  {
    Header: 'First Name',
    columnId: 'firstName'
  },
  {
    Header: 'Last Name',
    columnId: 'lastName'
  },
  {
    columnId: 'actions',
    Header: false,
    align: 'right',
    type: 'action',
    widthRatio: 1
  }
];

const tableData = [
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName()
  },
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    actions: [
      {
        to: '#',
        label: 'View'
      },
      {
        to: '#',
        label: 'Edit'
      }
    ]
  },
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName()
  }
];

describe('Table', () => {
  describe('Render', () => {
    const ComponentWithHook = () => {
      const { columns, data } = useTableData({
        columns: tableColumns,
        data: tableData
      });

      return <Table label="test" columns={columns} data={data} />;
    };

    const componentShallow = shallow(<ComponentWithHook />);
    const tableComponent = componentShallow.dive();

    it('should render a table', () => {
      expect(tableComponent.hasClass('table')).toBeTruthy();
    });

    const tableComponentHeader = tableComponent.find('.table-header');

    it('should render a table header', () => {
      expect(tableComponentHeader.length).toEqual(1);
    });

    const tableComponentGrid = tableComponent.find('Grid');

    it('should render a Grid', () => {
      expect(tableComponentGrid.length).toEqual(1);
    });
  });
});

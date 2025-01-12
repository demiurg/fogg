import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import { useTableData } from '../../../hooks';

import DataTable from '../';

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
    firstName: 'Enos',
    lastName: 'Considine',
    actions: [
      {
        to: '#',
        label: 'View',
        buttonType: ['text']
      }
    ]
  },
  {
    firstName: 'Pearline',
    lastName: 'Veum',
    actions: [
      {
        to: '#',
        label: 'Edit',
        icon: 'FaPen',
        buttonType: ['text', 'icon-before']
      }
    ]
  },
  {
    firstName: 'Kiara',
    lastName: 'Gerlach',
    actions: [
      {
        to: '#',
        label: 'Go',
        icon: 'FaChevronRight',
        buttonType: ['text', 'icon-after']
      }
    ]
  }
];

const STORY_COMPONENT = 'DataTable';
const STORY_NAME = 'Actions';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  const { columns, data } = useTableData({
    columns: tableColumns,
    data: tableData
  });

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <DataTable label="Users" columns={columns} data={data} />
    </Story>
  );
});

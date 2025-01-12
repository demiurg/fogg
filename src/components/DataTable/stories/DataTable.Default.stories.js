import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';
import StoryNotes from '../../../../stories/helpers/StoryNotes';

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
    firstName: 'Karina',
    lastName: 'Schaefer'
  },
  {
    firstName: 'Lillie',
    lastName: 'Waters',
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
    firstName: 'Friedrich',
    lastName: 'Jenkins'
  }
];

const STORY_COMPONENT = 'DataTable';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  const { columns, data } = useTableData({
    columns: tableColumns,
    data: tableData
  });

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <StoryNotes>
        <p>
          The DataTable component extends the Table component. It accepts all
          props that would be usable in the Table component itself.
        </p>
      </StoryNotes>
      <DataTable label="Users" columns={columns} data={data} />
    </Story>
  );
});

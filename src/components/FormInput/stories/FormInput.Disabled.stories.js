import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';
import BaseForm from '../../../../stories/helpers/BaseForm';

import FormInput from '../';

const STORY_COMPONENT = 'Form Input';
const STORY_NAME = 'Disabled';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const SELECT_OPTIONS = [
  {
    label: 'Ruthie',
    value: 'Feeney'
  },
  {
    label: 'Lurline',
    value: 'Heaney'
  },
  {
    label: 'Barney',
    value: 'Nolan'
  }
];

const DATALIST_OPTIONS = [
  'payment',
  'multi-byte',
  'Station',
  'Liaison',
  'Squares'
];

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <BaseForm>
        <FormInput id="disabled-text" label="Disabled Text" disabled={true} />
        <FormInput
          id="disabled-email"
          label="Disabled Email"
          type="email"
          disabled={true}
        />
        <FormInput
          id="disabled-select"
          label="Disabled Select"
          type="select"
          options={SELECT_OPTIONS}
          disabled={true}
        />
        <FormInput
          id="disabled-textarea"
          label="Disabled Textarea"
          type="textarea"
          disabled={true}
        />
        <FormInput
          id="disabled-datalist"
          label="Disabled Datalist"
          disabled={true}
          dataList={DATALIST_OPTIONS}
        />
      </BaseForm>
    </Story>
  );
});

import React from 'react';
import { storiesOf } from '@storybook/react';

import LensLayers from './stories/LensLayers.story';
import LensEarthSearchDynamicLayerDate from './stories/LensEarthSearchDynamicLayerDate.story';
import LensEarthSearchNoFilter from './stories/LensEarthSearchNoFilter.story';
import LensEarthSearchDateOnly from './stories/LensEarthSearchDateOnly.story';
import LensEarthSearchCustomDraw from './stories/LensEarthSearchCustomDraw.story';
import LensSearchSearchUpdateFilterSelect from './stories/LensSearchSearchUpdateFilterSelect.story';
import LensEarthSearchResetView from './stories/LensEarthSearchResetView.story';
import LensEarthSearchInitialSearch from './stories/LensEarthSearchInitialSearch.story';
import LensEarthSearchNoGeoSearch from './stories/LensEarthSearchNoGeoSearch.story';
import LensEarthSearchResultsNoFilter from './stories/LensEarthSearchResultsNoFilter.story';
import LensEarthSearchCustomAutocomplete from './stories/LensEarthSearchCustomAutocomplete.story';
import LensEarthSearchNoAutocomplete from './stories/LensEarthSearchNoAutocomplete.story';
import LensEarthSearchUtc from './stories/LensEarthSearchUtc.story';

const stories = storiesOf('Components|Lens', module);

stories.add('Layers', LensLayers);
stories.add('Earth Search - No Filter', LensEarthSearchNoFilter);
stories.add('Earth Search - Date Only', LensEarthSearchDateOnly);
stories.add('Earth Search - Date Only with Default Date', () => {
  return (
    <LensEarthSearchDateOnly
      defaultDateRange={{
        start: 1568260800000,
        end: 1569007834750
      }}
    />
  );
});
stories.add(
  'Earth Search - Dynamic Layer Date',
  LensEarthSearchDynamicLayerDate
);
stories.add('Earth Search - Custom Draw Options', LensEarthSearchCustomDraw);
stories.add(
  'Earth Search - Update Filter on Select',
  LensSearchSearchUpdateFilterSelect
);

stories.add(
  'Earth Search - Reset View on Clear Search',
  LensEarthSearchResetView
);

stories.add('Earth Search - Initial Search', LensEarthSearchInitialSearch);
stories.add('Earth Search - No Geo Search', LensEarthSearchNoGeoSearch);
stories.add(
  'Earth Search - No Filters on Results',
  LensEarthSearchResultsNoFilter
);
stories.add(
  'Earth Search - No Autocomplete (default autocomplete)',
  LensEarthSearchNoAutocomplete
);
stories.add(
  'Earth Search - Custom Autocomplete',
  LensEarthSearchCustomAutocomplete
);
stories.add('Earth Search - UTC', LensEarthSearchUtc);

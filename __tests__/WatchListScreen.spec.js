import React from 'react';
import { render, getNodeText } from '@testing-library/react-native'
import WatchListScreen from '../src/WatchListScreen';

describe('WatchList flow', () => {
  it('displays empty list message', () => {
    const emptyWatchlistMessage = 'Your watch list is empty';

    const { getByLabelText, debug } = render(<WatchListScreen />);

    const watchListMessage = getByLabelText(emptyWatchlistMessage);

    expect(getNodeText(watchListMessage)).toEqual(emptyWatchlistMessage);
  });
});
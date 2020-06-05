import React from 'react';
import App from '../App';

import { render, fireEvent, wait, act } from '@testing-library/react-native';

import { getDetails } from '../stockService';

jest.mock('../stockService');

describe('SearchView', () => {
  it('displays stock that has been found', async () => {
    const stockTicker = 'AAPL';
    const data = {ask: 228.25}
    const { getByLabelText, findByLabelText, findByText } = render(<App />);

    getDetails.mockImplementation(() => {
      return Promise.resolve(data)
    });

    const stockInput = getByLabelText('Stock Search');

    // fireEvent.changeText didn't seem to work here
    fireEvent.change(stockInput, { nativeEvent: { text: stockTicker}});
    // blur needs text
    fireEvent(stockInput, new NativeTestEvent('blur', { nativeEvent: { text: stockTicker } }));

    expect(await findByLabelText('ask')).toBeTruthy();

    expect(getDetails).toHaveBeenCalledWith(stockTicker);
  });
});
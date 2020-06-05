import React from 'react';
import App from '../App';

import { render, fireEvent, wait } from '@testing-library/react-native';

import { getDetails } from '../stockService';

jest.mock('../stockService');

describe('SearchView', () => {
  it('displays stock that has been found', async () => {
    const stockTicker = 'AAPL';
    const price = '$14.12'
    const { getByLabelText, findByText } = render(<App />);

    getDetails.mockImplementation(() => {
      return Promise.resolve(price)
    });

    const stockInput = getByLabelText('Stock Search');
    // fireEvent.changeText didn't seem to work here
    fireEvent.change(stockInput, { nativeEvent: { text: stockTicker}});
    fireEvent(stockInput, new NativeTestEvent('blur', { nativeEvent: { value: stockTicker } }));

    expect(await findByText(price)).toBeTruthy();
  });
});
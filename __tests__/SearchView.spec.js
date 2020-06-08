import React from 'react'
import App from '../App'

import { render, fireEvent } from '@testing-library/react-native'

import { getQuote } from '../src/stockService'

jest.mock('../src/stockService')

describe('SearchView', () => {
  it('displays stock that has been found', async () => {
    const stockTicker = 'AAPL'
    const data = [{ 'symbol': 'AAPL', 'exchange': 'Q', 'type': 'stock', 'description': 'Apple Inc' }]
    const { getByLabelText, findByText } = render(<App/>)

    getQuote.mockImplementation(() => Promise.resolve(data))

    const stockInput = getByLabelText('Stock Search')

    // fireEvent.changeText didn't seem to work here
    fireEvent.change(stockInput, { nativeEvent: { text: stockTicker } })
    // blur needs text
    fireEvent(stockInput, new NativeTestEvent('blur', { nativeEvent: { text: stockTicker } }))

    expect(await findByText('AAPL')).toBeTruthy()
    expect(await findByText('Apple Inc')).toBeTruthy()

    expect(getQuote).toHaveBeenCalledWith(stockTicker)
  })
})
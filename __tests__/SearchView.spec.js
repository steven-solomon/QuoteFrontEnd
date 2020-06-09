import React from 'react'
import { render, fireEvent, getByText as localizedGetByText } from '@testing-library/react-native'
import { useNavigation } from '@react-navigation/native'
import { getQuote } from '../src/stockService'
import SearchView from '../src/SearchView'
import { OptionExpirationViewName } from '../src/OptionExpirationView'

jest.mock('../src/stockService')
jest.mock('@react-navigation/native')

describe('SearchView', () => {
  it('displays stock that has been found', async () => {
    const symbol = 'AAPL'
    const description = 'Apple Inc'
    const data = [{ 'symbol': symbol, 'exchange': 'Q', 'type': 'stock', 'description': description }]
    const { getByLabelText, findByLabelText } = render(<SearchView/>)

    getQuote.mockImplementation(() => Promise.resolve(data))
    const mockNavigation = { push: jest.fn() }
    useNavigation.mockImplementation(() => mockNavigation)

    const stockInput = getByLabelText('Stock Search')

    // fireEvent.changeText didn't seem to work here
    fireEvent.change(stockInput, { nativeEvent: { text: symbol } })
    // blur needs text
    fireEvent(stockInput, new NativeTestEvent('blur', { nativeEvent: { text: symbol } }))

    const tickerRow = await findByLabelText('AAPL Apple Inc')
    expect(localizedGetByText(tickerRow, symbol)).toBeTruthy()
    expect(localizedGetByText(tickerRow, description)).toBeTruthy()

    expect(getQuote).toHaveBeenCalledWith(symbol)

    fireEvent.press(tickerRow)

    expect(await findByLabelText('AAPL Apple Inc selected')).toBeTruthy()

    expect(mockNavigation.push).toHaveBeenCalledWith(OptionExpirationViewName, expect.objectContaining({ symbol: symbol }))
  })
})
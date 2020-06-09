import React from 'react'
import { render, fireEvent, getByText as localizedGetByText } from '@testing-library/react-native'
import { useNavigation } from '@react-navigation/native'
import { getQuote } from '../src/stockService'
import SearchView from '../src/SearchView'

jest.mock('../src/stockService')
jest.mock('@react-navigation/native')

describe('SearchView', () => {
  it('displays stock that has been found', async () => {
    const stockTicker = 'AAPL'
    const data = [{ 'symbol': 'AAPL', 'exchange': 'Q', 'type': 'stock', 'description': 'Apple Inc' }]
    const { getByLabelText, findByLabelText } = render(<SearchView/>)

    getQuote.mockImplementation(() => Promise.resolve(data))
    const mockNavigation = { push: jest.fn() }
    useNavigation.mockImplementation(() => mockNavigation)

    const stockInput = getByLabelText('Stock Search')

    // fireEvent.changeText didn't seem to work here
    fireEvent.change(stockInput, { nativeEvent: { text: stockTicker } })
    // blur needs text
    fireEvent(stockInput, new NativeTestEvent('blur', { nativeEvent: { text: stockTicker } }))

    const tickerRow = await findByLabelText('AAPL Apple Inc')
    expect(localizedGetByText(tickerRow, 'AAPL')).toBeTruthy()
    expect(localizedGetByText(tickerRow, 'Apple Inc')).toBeTruthy()

    expect(getQuote).toHaveBeenCalledWith(stockTicker)

    fireEvent.press(tickerRow)

    expect(await findByLabelText('AAPL Apple Inc selected')).toBeTruthy()

    expect(mockNavigation.push).toHaveBeenCalledWith('ChooseOptions')
  })
})
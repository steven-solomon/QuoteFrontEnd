import React from 'react'
import { act, fireEvent, getByText as localizedGetByText, render } from '@testing-library/react-native'
import { getQuote } from '../src/stockService'
import SearchView from '../src/SearchView'
import { OptionExpirationViewName } from '../src/OptionExpirationView'

jest.mock('../src/stockService')
jest.mock('@react-navigation/native')

describe('SearchView', () => {
  it('displays stocks', async () => {
    const symbol = 'AAPL'
    const description = 'Apple Inc'
    const data = [{ 'symbol': symbol, 'exchange': 'Q', 'type': 'stock', 'description': description }]
    const mockNavigation = { push: jest.fn(), addListener: jest.fn() }

    const { getByLabelText, findByLabelText } = render(<SearchView navigation={mockNavigation}/>)

    getQuote.mockImplementation(() => Promise.resolve(data))

    const stockInput = getByLabelText('Stock Search')

    // fireEvent.changeText didn't seem to work here
    fireEvent.change(stockInput, { nativeEvent: { text: symbol } })
    // blur needs text
    fireEvent(stockInput, new NativeTestEvent('blur', { nativeEvent: { text: symbol } }))

    const tickerRow = await findByLabelText('AAPL Apple Inc')
    expect(localizedGetByText(tickerRow, symbol)).toBeTruthy()
    expect(localizedGetByText(tickerRow, description)).toBeTruthy()

    expect(getQuote).toHaveBeenCalledWith(symbol)
  })

  it('selects stock when pressed', async () => {
    const symbol = 'AAPL'
    const description = 'Apple Inc'
    const data = [{ 'symbol': symbol, 'exchange': 'Q', 'type': 'stock', 'description': description }]
    const mockNavigation = { push: jest.fn(), addListener: jest.fn() }

    const { getByLabelText, findByLabelText } = render(<SearchView navigation={mockNavigation}/>)

    getQuote.mockImplementation(() => Promise.resolve(data))

    const stockInput = getByLabelText('Stock Search')

    // fireEvent.changeText didn't seem to work here
    fireEvent.change(stockInput, { nativeEvent: { text: symbol } })
    // blur needs text
    fireEvent(stockInput, new NativeTestEvent('blur', { nativeEvent: { text: symbol } }))

    fireEvent.press(await findByLabelText('AAPL Apple Inc'))

    expect(await findByLabelText('AAPL Apple Inc selected')).toBeTruthy()
  })

  it('navigates to OptionExpirationView when stock pressed', async () => {
    const symbol = 'AAPL'
    const description = 'Apple Inc'
    const data = [{ 'symbol': symbol, 'exchange': 'Q', 'type': 'stock', 'description': description }]
    const mockNavigation = { push: jest.fn(), addListener: jest.fn() }

    const { getByLabelText, findByLabelText } = render(<SearchView navigation={mockNavigation}/>)

    getQuote.mockImplementation(() => Promise.resolve(data))

    const stockInput = getByLabelText('Stock Search')

    // fireEvent.changeText didn't seem to work here
    fireEvent.change(stockInput, { nativeEvent: { text: symbol } })
    // blur needs text
    fireEvent(stockInput, new NativeTestEvent('blur', { nativeEvent: { text: symbol } }))

    const tickerRow = await findByLabelText('AAPL Apple Inc')

    fireEvent.press(tickerRow)

    expect(mockNavigation.push).toHaveBeenCalledWith(OptionExpirationViewName, expect.objectContaining({ symbol: symbol }))
  })
})
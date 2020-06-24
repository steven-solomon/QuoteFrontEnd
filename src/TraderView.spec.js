import React from 'react'
import { render } from '@testing-library/react-native'

import TraderView from '../src/TraderView'

describe('<TraderView />', () => {
  it('displays the ticker contract ID', () => {
    const params = { contractID: 'AAPL' }
    const { getByLabelText } = render(<TraderView route={{ params }} />)

    expect(getByLabelText('AAPL')).toBeTruthy()
  })

  it('displays the premium', () => {
    const params = { contractID: 'AAPL', premium: 100 }
    const { getByLabelText } = render(<TraderView route={{ params }} />)

    expect(getByLabelText('premium 100')).toBeTruthy()
  })

  it('displays the type', () => {
    const params = { contractID: 'AAPL', premium: 100, type: 'call' }
    const { getByLabelText } = render(<TraderView route={{ params }} />)

    expect(getByLabelText('type call')).toBeTruthy()
  })
})

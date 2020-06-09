import axios from 'axios'

// There is no unit test for this function since we already know how to test it
export function getQuote (symbol) {
  const endpoint = `http://localhost:3000/quote?symbol=${symbol}`

  return new Promise((resolve, reject) => {
    axios.get(endpoint, {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Origin'
      }
    }).then((d) => resolve(d.data))
      .catch((e) => reject('failed', e))
  })
}

export function getExpiration(symbol) {
  const endpoint = `http://localhost:3000/expiration?symbol=${symbol}`

  return new Promise((resolve, reject) => {
    axios.get(endpoint).then((d) => resolve(d.data))
      .catch((e) => reject('failed', e))
  })
}

export function getOptionChain(symbol, expiration) {
  const endpoint = `http://localhost:3000/option_chain?symbol=${symbol}&expiration=${expiration}`

  return new Promise((resolve, reject) => {
    axios.get(endpoint).then((d) => resolve(d.data))
      .catch((e) => reject('failed', e))
  })
}

export function getHistoricalData(symbol) {
  return Promise.resolve([50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80])
}
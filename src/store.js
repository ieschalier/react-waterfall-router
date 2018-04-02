import { initStore } from 'react-waterfall'
import { waterfallMiddelware } from './Router'

const store = {
  initialState: {
    counter: 1,
  },
  actions: {
    increment: ({ counter }) => ({
      counter: counter + 1,
    }),
    decrement: ({ counter }) => ({
      counter: counter - 1,
    }),
  },
}

export const {
  Provider,
  Consumer,
  actions,
  getState,
  connect,
  subscribe,
} = initStore(store, waterfallMiddelware)

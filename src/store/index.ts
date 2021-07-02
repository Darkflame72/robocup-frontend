import { createStore, createLogger } from 'vuex'
import main from './modules/main';

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    // @ts-ignore
    main: main  
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

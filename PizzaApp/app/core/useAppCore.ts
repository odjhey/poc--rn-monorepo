import { createContext, useContext } from "react"
import { DataProvider, appCore } from "@ftmobsquad/collections-app-state"
// eslint-disable-next-line react-native/split-platform-components
import { ToastAndroid } from "react-native"

const dataProvider = DataProvider({
  config: {
    url: "http://localhost:8080",
    httpClient: {
      get: (url, { body, headers }) => {
        console.info(url, body, headers)
        // @todo fix any
        return fetch(url, { method: "GET", body: body as any, headers })
      },
      post: (url, { body, headers }) => {
        console.info(url, body, headers)
        // @todo fix any
        return fetch(url, { method: "POST", body: body as any, headers })
      },
    },
  },
})

/**
 * Create the initial (empty) global RootStore instance here.
 *
 * Later, it will be rehydrated in app.tsx with the setupRootStore function.
 *
 * If your RootStore requires specific properties to be instantiated,
 * you can do so here.
 *
 * If your RootStore has a _ton_ of sub-stores and properties (the tree is
 * very large), you may want to use a different strategy than immediately
 * instantiating it, although that should be rare.
 */
const _appCore = appCore({
  deps: {
    online: dataProvider.calls,
    notifications: {
      info: (message: string) => {
        // Alert.alert("Info", message)
        ToastAndroid.show(message, ToastAndroid.SHORT)
      },
    },

    plugins: {
      timer: {
        register: (cb) => {
          console.info("register timer")
          const timeout = setInterval(() => {
            cb(undefined, "tick 2s " + new Date().toISOString())
          }, 2000)
          return () => clearInterval(timeout)
        },
      },
      autoKick: {
        register: (cb) => {
          console.info("register timer")
          const timeout = setInterval(() => {
            cb(undefined, "autokick 60s*10 " + new Date().toISOString())
          }, 60000 * 10)
          return () => clearInterval(timeout)
        },
      },
    },
  },
})

const AppCoreContext = createContext<ReturnType<typeof appCore>>(_appCore)

export const useAppCore = () => useContext(AppCoreContext)

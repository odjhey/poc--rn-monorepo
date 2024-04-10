import { createContext, useContext } from "react"
import { appCore } from "@ftmobsquad/collections-app-state"
// eslint-disable-next-line react-native/split-platform-components
import { ToastAndroid } from "react-native"

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
  context: {
    // @todo should be a result type?
    getToken: async () => {
      try {
        const result = await fetch("http://localhost:8080/public/login", {
          method: "POST",
        })
        console.log(result.status)
        return (await result.json()).token
      } catch (e) {
        console.error(e)
      }
    },
  },
  deps: {
    online: {
      fetchTodos: async (context) => {
        // #todo: extract this to own module/service for better error handling
        try {
          const token = await context.getToken()
          const response = await fetch("http://localhost:8080/api/todos", {
            method: "GET",
            headers: {
              Authorization: token,
            },
          })

          console.log(response.status)
          // @todo validate this of course
          return await response.json()
        } catch (e) {
          console.error(e)
        }
        // this is much better than have the app crash
        return []
      },

      sync: async (todos: string[], context) => {
        try {
          const token = await context.getToken()
          const result = await fetch("http://localhost:8080/api/todos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify(todos),
          })
          console.log(result.status)
        } catch (e) {
          console.error(e)
        }
      },
    },

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
            cb(undefined, "autokick 60s " + new Date().toISOString())
          }, 60000)
          return () => clearInterval(timeout)
        },
      },
    },
  },
})

const AppCoreContext = createContext<ReturnType<typeof appCore>>(_appCore)

export const useAppCore = () => useContext(AppCoreContext)

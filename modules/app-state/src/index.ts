import { types, Instance } from 'mobx-state-tree'
import { appUi } from './ui/ui'

const TodoModel = types
  .model({
    todo: types.array(types.string),
  })
  .actions((self) => ({
    setAll(values: string[]) {
      self.todo.clear()
      self.todo.push(...values)
    },
    add(newTodo: string) {
      self.todo.push(newTodo)
    },
    edit(index: number, newTodo: string) {
      self.todo[index] = newTodo
    },
    remove(index: number) {
      self.todo.splice(index, 1)
    },
    get() {
      return self.todo
    },
    getIdx(index: number) {
      return self.todo[index]
    },
    clear() {
      self.todo.clear()
    },
  }))

export const AppModel = types
  .model({
    todo: TodoModel,
    timer: types.optional(types.string, ''), // @todo
  })
  .actions((self) => ({
    setTimer(value: string) {
      self.timer = value
    },
  }))

type Deps = {
  // @todo rename this lol
  online: {
    // @todo these things fail, and we want to handle them, use a ResultType
    fetchTodos: () => Promise<string[]>
    sync: (todos: string[]) => Promise<void>
  }
  notifications: {
    info: (message: string) => void
  }
  plugins: {
    timer: {
      // return cleanup function
      register: (
        cb: (err: Error | undefined, value: string) => void
      ) => () => void
    }
  }
}

// think dataProvider and navigationProvider and notificationsProvider
// @todo maybe we don't need to expose this?
// @todo add kick (like when not auth or expired token)
export const appCore = ({ deps }: { deps: Deps }) => {
  let _appState: ReturnType<typeof appState>

  return {
    configure: (model: Instance<typeof AppModel>) => {
      _appState = appState(model, deps)
    },
    // @todo we could cache this in a ref
    appUi: () => appUi(_appState),
  }
}

const appState = (model: Instance<typeof AppModel>, deps: Deps) => {
  // @todo add uid
  const cleanupFns: (() => void)[] = []

  return {
    plugins: {
      // @todo add a way to register individual
      register: () => {
        console.info('registering plugins', cleanupFns)
        const cleanup = deps.plugins.timer.register((err, v) => {
          console.log('timer ticked!')
          // @todo check err
          model.setTimer(v)
        })
        cleanupFns.push(cleanup)
      },

      // @todo add a way to unregister individual
      unregister: () => {
        console.info('un-registering plugins')
        cleanupFns.forEach((cleanup) => cleanup())
      },
    },
    timer: {
      value: () => model.timer,
    },
    todo: {
      fetch: async () => {
        const todos = await deps.online.fetchTodos()
        model.todo.setAll(todos)
        deps.notifications.info('Done Refetch!')
      },
      sync: async () => {
        await deps.online.sync(model.todo.todo)
        deps.notifications.info('Synced!')
      },
      add: (newTodo: string, effects?: { after: () => void }) => {
        model.todo.add(newTodo)

        if (effects && typeof effects.after === 'function') {
          effects.after()
        }
      },
      edit: (index: number, newTodo: string) => {
        model.todo.edit(index, newTodo)
      },
      remove: (index: number) => {
        model.todo.remove(index)
      },
      syncOnline: () => {
        // POST to server
      },
      get: () => model.todo.todo,
      getIdx: (index: number) => model.todo.getIdx(index),
      clear: () => model.todo.clear(),
    },
  }
}

export type AppState = ReturnType<typeof appState>

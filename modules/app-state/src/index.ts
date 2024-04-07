import { types, Instance } from 'mobx-state-tree'

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

// think dataProvider and navigationProvider and notificationsProvider
// @todo maybe we don't need to expose this?
// @todo add kick (like when not auth or expired token)
export const appState = (
  model: Instance<typeof AppModel>,
  deps: {
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
) => {
  // @todo add uid
  const cleanupFns: (() => void)[] = []

  return {
    plugins: {
      // @todo add a way to register individual
      register: () => {
        const cleanup = deps.plugins.timer.register((err, v) => {
          // @todo check err
          model.setTimer(v)
        })
        cleanupFns.push(cleanup)
      },

      // @todo add a way to unregister individual
      unregister: () => {
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

type Screens = 'screens/todo/add' | 'screens/todo/list'
type Screen<T extends Screens> = (navigator: {
  navigate: (target: T) => void
}) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  actions: Record<string, Function>
}

export const appUi = (app: ReturnType<typeof appState>) => {
  const screens = {
    'screens/todo/add': ((navigator: {
      navigate: (target: Extract<Screens, 'screens/todo/list'>) => void
    }) => ({
      actions: {
        add: (value: string) => {
          app.todo.add(value, {
            after: () => {
              // add events for sync later (offline feature)
              navigator.navigate('screens/todo/list')
            },
          })
        },
      },
    })) satisfies Screen<Extract<Screens, 'screens/todo/list'>>,

    'screens/todo/list': ((navigator: {
      navigate: (target: Extract<Screens, 'screens/todo/add'>) => void
    }) => ({
      actions: {
        add: () => {
          navigator.navigate('screens/todo/add')
        },
        clear: () => {
          app.todo.clear()
        },
        refresh: () => {
          app.todo.fetch()
        },
        sync: () => {
          app.todo.sync()
        },
      },
      views: {
        todos: () => app.todo.get(),
      },
    })) satisfies Screen<Extract<Screens, 'screens/todo/add'>>,

    'screens/todo/single': ((navigator: {
      navigate: (target: Extract<Screens, 'screens/todo/list'>) => void
    }) => ({
      actions: {
        list: () => {
          navigator.navigate('screens/todo/list')
        },
      },
      views: {
        todo: (idx: number) => app.todo.getIdx(idx),
      },
    })) satisfies Screen<Extract<Screens, 'screens/todo/list'>>,
  } as const

  // type-check workaround since i can't seem to infer the type of screens
  type InferredScreens = typeof screens
  type ValidateScreensCoverage = {
    [K in Screens]: K extends keyof InferredScreens ? InferredScreens[K] : never
  }
  // Compile-time validation (won't be used at runtime)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _screen_definition_completeness_check: ValidateScreensCoverage = screens

  return {
    globals: {
      timer: {
        get: app.timer.value,
      },
    },
    screens,
  }
}

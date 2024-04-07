import { types, Instance } from 'mobx-state-tree'

export const TodoModel = types
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

// think dataProvider and navigationProvider
// @todo maybe we don't need to expose this?
export const appState = (
  model: Instance<typeof TodoModel>,
  deps: {
    // @todo rename this lol
    online: {
      fetchTodos: () => Promise<string[]>
      sync: (todos: string[]) => Promise<void>
    }
  }
) => ({
  todo: {
    fetch: async () => {
      const todos = await deps.online.fetchTodos()
      model.setAll(todos)
    },
    sync: async () => {
      await deps.online.sync(model.todo)
    },
    add: (newTodo: string, effects?: { after: () => void }) => {
      model.add(newTodo)

      if (effects && typeof effects.after === 'function') {
        effects.after()
      }
    },
    edit: (index: number, newTodo: string) => {
      model.edit(index, newTodo)
    },
    remove: (index: number) => {
      model.remove(index)
    },
    syncOnline: () => {
      // POST to server
    },
    get: () => model.todo,
    getIdx: (index: number) => model.getIdx(index),
    clear: () => model.clear(),
  },
})

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
    screens,
  }
}

import { types, Instance } from 'mobx-state-tree'

export const TodoModel = types
  .model({
    todo: types.array(types.string),
  })
  .actions((self) => ({
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
  }))

// think dataProvider and navigationProvider
// @todo maybe we don't need to expose this?
export const appState = (model: Instance<typeof TodoModel>) => ({
  todo: {
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
    get: () => model.todo,
    getIdx: (index: number) => model.getIdx(index),
  },
})

type Screens = 'screens/todo/add' | 'screens/todo/list'

export const appUi = (
  app: ReturnType<typeof appState>,
  navigator: { navigate: (target: Screens) => void }
) => {
  const screens = {
    'screens/todo/add': {
      actions: {
        add: () => {
          app.todo.add('new todo', {
            after: () => {
              navigator.navigate('screens/todo/list')
            },
          })
        },
      },
    },
    'screens/todo/list': {
      actions: {
        add: () => {
          navigator.navigate('screens/todo/add')
        },
      },
    },
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

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

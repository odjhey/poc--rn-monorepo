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

export const appState = (model: Instance<typeof TodoModel>) => ({
  todo: {
    add: (newTodo: string) => {
      model.add(newTodo)
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

import type { AppState } from '../../index'
import type { Screens, Screen } from '../screens.types'

export const todoScreens = (app: AppState) => ({
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
    views: {},
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
})

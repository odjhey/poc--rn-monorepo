export type Screens = 'screens/todo/add' | 'screens/todo/list'

export type Screen<Target extends Screens> = (navigator: {
  navigate: (target: Target) => void
}) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  actions: Record<string, Function>
  // eslint-disable-next-line @typescript-eslint/ban-types
  views: Record<string, Function>
}

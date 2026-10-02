const files = import.meta.glob('./*.css', { query: '?raw', import: 'default', eager: true })

export const defaultTheme = 'dark'

export const themes = Object.keys(files)
  .map((path) => path.replace(/^\.\//, '').replace(/\.css$/, ''))
  .sort()
  .map((id) => ({ id, label: id }))

export function applyTheme(id) {
  const theme = themes.some((candidate) => candidate.id === id) ? id : defaultTheme
  let element = document.getElementById('theme')

  if (element == undefined) {
    element = document.createElement('style')
    element.id = 'theme'
    document.head.appendChild(element)
  }

  document.documentElement.dataset.theme = theme
  element.textContent = files[`./${theme}.css`]
}

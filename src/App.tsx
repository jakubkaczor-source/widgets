import { GeneratorPage } from './components/GeneratorPage'
import { WidgetPage } from './components/WidgetPage'

export default function App() {
  const match = window.location.pathname.match(/^\/widget\/([^/]+)\/?$/)
  return match ? <WidgetPage id={decodeURIComponent(match[1])} /> : <GeneratorPage />
}

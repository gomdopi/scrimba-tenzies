import Header from "./components/Header"
import Main from "./components/Main"

export default function App() {
  return (
    <main>
      <Header statusText="Roll until all dice are the same. Click each die to freeze it at its current value between rolls." />
      <Main />
    </main>
  )
}

import { useState } from "react"
import Header from "./components/Header"
import DiceContainer from "./components/DiceContainer"

export type Dice = {
  idx: number
  value: number
  frozen: boolean
}

export default function App() {
  function initializeDie() {
    const die: Array<Dice> = []

    for (let i = 0; i < 10; i++) {
      const value = Math.floor(Math.random() * 6) + 1
      die.push({
        idx: i,
        value,
        frozen: false,
      })
    }

    return die
  }

  function handleDiceClick(idx: number) {
    setDie(prevDie => {
      return prevDie.map(dice =>
        dice.idx === idx ? { ...dice, frozen: !dice.frozen } : dice
      )
    })
    console.log(idx)
  }

  function handleClick() {
    setDie(initializeDie())
  }

  const [die, setDie] = useState(initializeDie())
  return (
    <main>
      <Header statusText="Roll until all dice are the same. Click each die to freeze it at its current value between rolls." />
      <DiceContainer die={die} onDiceClick={handleDiceClick} />
      <button className="game-button" onClick={handleClick}>
        Roll
      </button>
    </main>
  )
}

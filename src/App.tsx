import { useEffect, useState } from "react"
import DiceContainer from "./components/DiceContainer"
import Header from "./components/Header"

export type Dice = {
  idx: number
  value: number
  frozen: boolean
}

export default function App() {
  const [die, setDie] = useState(initialDie())
  const [hasWon, setHasWon] = useState(false)

  useEffect(() => {
    checkHasWon()
  }, [die])

  function initialDie(): Array<Dice> {
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

  function resetDie(): void {
    setDie(initialDie())
  }

  function rollDie(): void {
    setDie(prevDie =>
      prevDie.map(dice => (dice.frozen ? dice : rollDice(dice)))
    )
  }

  function rollDice(dice: Dice): Dice {
    const value = Math.floor(Math.random() * 6) + 1
    return {
      ...dice,
      value,
    }
  }

  function checkHasWon(): void {
    const value = die[0].value
    if (die.every(dice => dice.value === value && dice.frozen)) {
      setHasWon(true)
    }
  }

  function handleDiceClick(idx: number): void {
    if (hasWon) return
    setDie(prevDie => {
      return prevDie.map(dice =>
        dice.idx === idx ? { ...dice, frozen: !dice.frozen } : dice
      )
    })
  }

  function handleClick(): void {
    if (hasWon) {
      resetDie()
      setHasWon(false)
    } else {
      rollDie()
    }
  }

  return (
    <main>
      <Header statusText="Roll until all dice are the same. Click each die to freeze it at its current value between rolls." />
      <DiceContainer die={die} onDiceClick={handleDiceClick} />
      <button className="game-button" onClick={handleClick}>
        {hasWon ? "New Game" : "Roll"}
      </button>
    </main>
  )
}

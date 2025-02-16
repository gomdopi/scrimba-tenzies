import { useEffect, useRef, useState } from "react"
import ReactConfetti from "react-confetti"
import DieComponent from "./components/DieComponent"
import Header from "./components/Header"

export type Die = {
  idx: number
  value: number
  frozen: boolean
}

export default function App() {
  const [dice, setDice] = useState(initialDice)
  const [rolls, setRolls] = useState(0)
  const [time, setTime] = useState(0)

  const startedGame = rolls > 0 || dice.some(die => die.frozen)
  const hasWon = dice.every(die => die.frozen && die.value === dice[0].value)
  const gameButtonRef = useRef(null)

  const interval = useRef(0)
  useEffect(() => {
    if (startedGame && interval.current === 0) {
      interval.current = setInterval(
        () => setTime(prevTime => prevTime + 1),
        1000
      )
    }
  }, [startedGame])

  useEffect(() => {
    if (hasWon) {
      ;(gameButtonRef.current! as HTMLButtonElement).focus()
      clearInterval(interval.current)
    }
  }, [hasWon, interval])

  const dieElements = dice.map(die => (
    <DieComponent key={die.idx} die={die} onDieClick={handleDieClick} />
  ))

  function initialDice(): Array<Die> {
    const dice: Array<Die> = []

    for (let i = 0; i < 10; i++) {
      const value = Math.floor(Math.random() * 6) + 1
      dice.push({
        idx: i,
        value,
        frozen: false,
      })
    }

    return dice
  }

  function resetDice(): void {
    setDice(initialDice())
  }

  function rollDice(): void {
    setDice(prevDice => prevDice.map(die => (die.frozen ? die : rollDie(die))))
  }

  function rollDie(die: Die): Die {
    const value = Math.floor(Math.random() * 6) + 1
    return {
      ...die,
      value,
    }
  }

  function handleDieClick(idx: number): void {
    if (hasWon) return
    setDice(prevDice => {
      return prevDice.map(die =>
        die.idx === idx ? { ...die, frozen: !die.frozen } : die
      )
    })
  }

  function handleClick(): void {
    if (hasWon) {
      resetDice()
      setRolls(0)
      setTime(0)
      interval.current = 0
    } else {
      rollDice()
      setRolls(prevRolls => prevRolls + 1)
    }
  }

  return (
    <main>
      {hasWon ? <ReactConfetti width={360} height={380} /> : undefined}
      <div aria-live="polite" className="sr-only">
        {hasWon && (
          <p>Congratulations! You won! Press "New Game" to play again.</p>
        )}
      </div>
      <Header statusText="Roll until all dice are the same. Click each die to freeze it at its current value between rolls." />
      <div className="dice-container">{dieElements}</div>
      <button ref={gameButtonRef} className="game-button" onClick={handleClick}>
        {hasWon ? "New Game" : "Roll"}
      </button>
      <div className="rolls-timer-container">
        <div>
          Rolls:
          <span className="rolls-counter">{rolls}</span>
        </div>
        <div>
          Timer:
          <span className="timer">{time}</span>
        </div>
      </div>
    </main>
  )
}

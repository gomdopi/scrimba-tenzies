import { Dice } from "../App"
import DiceComponent from "./DiceComponent"

export default function DiceContainer(props: {
  die: Array<Dice>
  onDiceClick: (idx: number) => void
}) {
  const dieElements = props.die.map(dice => (
    <DiceComponent key={dice.idx} dice={dice} onDiceClick={props.onDiceClick} />
  ))
  return (
    <main>
      <div className="die-container">{dieElements}</div>
    </main>
  )
}

import { Dice } from "../App"

export default function DiceComponent(props: {
  dice: Dice
  onDiceClick: (idx: number) => void
}) {
  return (
    <button
      className={"dice" + (props.dice.frozen ? " frozen" : "")}
      onClick={() => props.onDiceClick(props.dice.idx)}
    >
      {props.dice.value}
    </button>
  )
}

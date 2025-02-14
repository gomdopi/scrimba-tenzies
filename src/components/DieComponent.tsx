import { Die } from "../App"

export default function DiceComponent(props: {
  die: Die
  onDieClick: (idx: number) => void
}) {
  return (
    <button
      className={"die" + (props.die.frozen ? " frozen" : "")}
      onClick={() => props.onDieClick(props.die.idx)}
    >
      {props.die.value}
    </button>
  )
}

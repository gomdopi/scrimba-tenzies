import { Die } from "../App"

export default function DiceComponent(props: {
  die: Die
  onDieClick: (idx: number) => void
}) {
  return (
    <button
      className={"die" + (props.die.frozen ? " frozen" : "")}
      onClick={() => props.onDieClick(props.die.idx)}
      aria-pressed={props.die.frozen}
      aria-label={`Die with value ${props.die.value}; ${
        props.die.frozen ? "frozen" : "not frozen"
      }`}
    >
      {props.die.value}
    </button>
  )
}

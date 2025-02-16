import { Die } from "../App"

export default function DiceComponent(props: {
  die: Die
  onDieClick: (idx: number) => void
}) {
  const pipElements = []
  for (let i = 1; i <= props.die.value; i++) {
    pipElements.push(<div className={`pip-${i}`}></div>)
  }

  return (
    <button
      className={"die" + (props.die.frozen ? " frozen" : "")}
      onClick={() => props.onDieClick(props.die.idx)}
      aria-pressed={props.die.frozen}
      aria-label={`Die with value ${props.die.value}; ${
        props.die.frozen ? "frozen" : "not frozen"
      }`}
    >
      <div className={`pips-${props.die.value}`}>{pipElements}</div>
    </button>
  )
}

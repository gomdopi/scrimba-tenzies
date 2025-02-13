import Dice from "./Dice"

export default function Main() {
  const dieValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const dieElements = dieValues.map(dieValue => <Dice number={dieValue} />)
  return (
    <main>
      <div className="die-container">{dieElements}</div>
      <button className="button">Roll</button>
    </main>
  )
}

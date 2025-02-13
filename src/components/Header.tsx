export default function Header(props: { statusText: string }) {
  return (
    <header>
      <h1>Tenzies</h1>
      <p>{props.statusText}</p>
    </header>
  )
}

export function GameSearch({ status, setStatus }) {
  if (status !== "search") return null
  return (
    <div>
      Поиск
      <button onClick={() => setStatus("game")}>Старт</button>
    </div>
  )
}

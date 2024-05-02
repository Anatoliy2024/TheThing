export function GameLayout({ chat, deck, map }) {
  return (
    <div className="flex text-lime-500 gap-3">
      <div className="flex-chat">{chat}</div>
      <div className="flex-game">{deck}</div>
      <div className="flex-map">{map}</div>
    </div>
  )
}

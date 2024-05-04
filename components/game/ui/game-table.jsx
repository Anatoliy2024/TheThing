import { GameChat } from "./game-chat"
import { GameDeck } from "./game-deck"
import { GameMap } from "./game-map"

export function GameTable({ status, setStatus }) {
  if (status !== "game") return null
  return (
    <>
      <GameChat />
      <GameDeck />
      <GameMap />
    </>
  )
}

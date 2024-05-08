import { GameChat } from "./game-chat"
import { GameDeck } from "./game-deck"
import { GameMap } from "./game-map"

export function GameTable({ optionPlayers, dispatch }) {
  const { status } = optionPlayers
  if (status !== "game") return null

  return (
    <>
      <GameChat />
      <GameDeck optionPlayers={optionPlayers} dispatch={dispatch} />
      <GameMap optionPlayers={optionPlayers} dispatch={dispatch} />
    </>
  )
}

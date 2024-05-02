import { GameChat } from "./ui/game-chat"
import { GameLayout } from "./ui/game-layout"
import { GameDeck } from "./ui/game-deck"
import { GameMap } from "./ui/game-map"

const PLAYER_COUNT = 4
export function Game() {
  return (
    <GameLayout chat={<GameChat />} deck={<GameDeck />} map={<GameMap />} />
  )
}

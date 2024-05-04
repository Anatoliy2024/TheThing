import { GameLayout } from "./ui/game-layout"
import { createPack } from "./modal/create-pack"
import { useState, useMemo } from "react"
import { GameMenu } from "./ui/game-menu"
import { GameOption } from "./ui/game-option"
import { GameTable } from "./ui/game-table"
import { PLAYERS } from "./constants"
import { GameSearch } from "./ui/game-search"

const PLAYER_COUNT = 4
export function Game() {
  //возможно нужно будет его замемоизировать,чтобы он заного не расчитывался при рендере
  //он уёдёт в друго компонент при нажатии на начать игру будеть открываться окошко в котором можно будет выбрать настроийки игры потом нужно будет дождаться всех участников а в конце нужно нажать на старт и в этот момент будет расчитанна колода
  const [gameStart, setGameStart] = useState(false)
  const pack = useMemo(() => createPack(PLAYER_COUNT), [gameStart])
  const players = PLAYERS.slice(0, PLAYER_COUNT)
  const [status, setStatus] = useState("menu")

  console.log(players)
  console.log(pack)

  return (
    <GameLayout
      status={status}
      menu={<GameMenu status={status} setStatus={setStatus} />}
      option={<GameOption status={status} setStatus={setStatus} />}
      search={<GameSearch status={status} setStatus={setStatus} />}
      game={<GameTable status={status} setStatus={setStatus} />}
    />
  )
}

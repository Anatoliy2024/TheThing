import { GameLayout } from "./ui/game-layout"
import { createPack, createPlayerInfo } from "./modal/create-pack"
import { useState, useMemo, useReducer } from "react"
import { GameMenu } from "./ui/game-menu"
import { GameOption } from "./ui/game-option"
import { GameTable } from "./ui/game-table"
import { PLAYERS } from "./constants"
import { GameSearch } from "./ui/game-search"
import {
  optionPlayersReduce,
  initialOptionPlayers,
} from "./modal/option-players-reduce"

const PLAYER_COUNT = 4
export function Game() {
  //возможно нужно будет его замемоизировать,чтобы он заного не расчитывался при рендере
  //он уёдёт в друго компонент при нажатии на начать игру будеть открываться окошко в котором можно будет выбрать настроийки игры потом нужно будет дождаться всех участников а в конце нужно нажать на старт и в этот момент будет расчитанна колода
  const [gameStart, setGameStart] = useState(false)
  // const pack = useMemo(() => createPack(PLAYER_COUNT), [gameStart])
  // const players = PLAYERS.slice(0, PLAYER_COUNT)
  // // const [status, setStatus] = useState("menu")
  // const [options, setOptions] = useState({
  //   time: "1 мин",
  //   thething: "Рандом",
  //   superCard: "Без супер карт",
  //   mode: "Классика",
  // })

  const [optionPlayers, dispatch] = useReducer(
    optionPlayersReduce,
    {
      pack: useMemo(() => createPack(PLAYER_COUNT), [gameStart, PLAYER_COUNT]),
      // players: PLAYERS.slice(0, PLAYER_COUNT),
      status: "menu",
      options: {
        time: "1 мин",
        theThing: "Рандом",
        superCard: "Без супер карт",
        mode: "Классика",
      },
      //бита(уменьшается основная клода прибавляется Trick)
      trick: [],
      //имя игрока, его роль(заражён,выживший, нечто), время на ход, ео карты, isActivePlayer:true или false , status:bash,default
      playersInfo: useMemo(
        () => createPlayerInfo(PLAYER_COUNT),
        [gameStart, PLAYER_COUNT]
      ),
    },
    initialOptionPlayers
  )

  return (
    <GameLayout
      optionPlayers={optionPlayers}
      menu={<GameMenu optionPlayers={optionPlayers} dispatch={dispatch} />}
      option={<GameOption optionPlayers={optionPlayers} dispatch={dispatch} />}
      search={
        <GameSearch
          optionPlayers={optionPlayers}
          dispatch={dispatch}
          setGameStart={setGameStart}
        />
      }
      game={<GameTable optionPlayers={optionPlayers} dispatch={dispatch} />}
    />
  )
}

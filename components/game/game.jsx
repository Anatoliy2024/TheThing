import { GameLayout } from "./ui/game-layout"
import { createPack, createPlayerInfo } from "./modal/create-packAndPlayer"
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
import { GameOverModal } from "./ui/game-over-modal"

const PLAYER_COUNT = 12
export function Game() {
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
      pack: useMemo(() => createPack(PLAYER_COUNT), [gameStart]),
      activeCard: null,
      protectionCard: null,
      trash: [],
      status: "menu",
      options: {
        time: "1 мин",
        theThing: "Рандом",
        superCard: "Без супер карт",
        mode: "Классика",
      },
      moveStatus: "getCard", //getCard, selectCard(selectCard/activeCard),useCard,useBlockCard,trashCard,exchangeCard
      wayGame: "left",
      countStep: 0,
      // clickCard: null,
      //имя игрока, его роль(заражён,выживший, нечто), время на ход, ео карты, isActivePlayer:true или false , status:bash,default and death
      playersInfo: useMemo(() => createPlayerInfo(PLAYER_COUNT), [gameStart]),
      isOpenModal: false,
    },
    initialOptionPlayers
  )
  console.log(optionPlayers.playersInfo)
  return (
    <>
      <GameLayout
        optionPlayers={optionPlayers}
        menu={<GameMenu optionPlayers={optionPlayers} dispatch={dispatch} />}
        option={
          <GameOption optionPlayers={optionPlayers} dispatch={dispatch} />
        }
        search={
          <GameSearch
            optionPlayers={optionPlayers}
            dispatch={dispatch}
            setGameStart={setGameStart}
          />
        }
        game={<GameTable optionPlayers={optionPlayers} dispatch={dispatch} />}
      />
      <GameOverModal optionPlayers={optionPlayers} dispatch={dispatch} />
    </>
  )
}

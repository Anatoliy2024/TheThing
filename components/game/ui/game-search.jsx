import Image from "next/image"
import { GameChat } from "./game-chat"
import { UiButton } from "../../uikit/ui-button"
import { GAME_STATE_ACTIONS } from "../modal/option-players-reduce"

export function GameSearch({ setGameStart, optionPlayers, dispatch }) {
  const { status, options, playersInfo } = optionPlayers
  if (status !== "search") return null
  return (
    <>
      <GameChat />
      <div className="flex flex-col bg-lime-950 rounded-3xl px-12 py-7  text-2xl flex-game ">
        <div className="text-center">Ожидание участников</div>
        <div className="flex gap-5 pb-5">
          <div>Время хода: {options.time}</div>
          <div>Нечто: {options.theThing}</div>
          <div>Особые карты: {options.superCard}</div>
          <div>Мод: {options.mode}</div>
        </div>
        <div className="px-10">
          {playersInfo.map((player, index) => (
            <div key={player.id} className="flex gap-3 pb-2 ">
              <div>{index + 1}</div>
              <Image
                src={player.avatar}
                className="w-10 rounded-full"
                alt="avatar"
              />
              {player.name}
            </div>
          ))}
        </div>
        <UiButton
          className="mt-auto max-w-14 mx-auto"
          variant="active"
          onClick={() => {
            if (Object.keys(playersInfo).length >= 4) {
              console.log(optionPlayers)
              dispatch({
                type: GAME_STATE_ACTIONS.CREATE_DECK,
                status: "game",
                playerDesk: getCardDeck(optionPlayers),
                //pack:function()//уменьшение общей колоды на карты которые я вынул
                //  playersInfo.map((player) => {
                //   const newObject =
                //   return "hi"
                // }),
              })
              setGameStart(true)
              // optionPlayers.pack
            } else {
              alert("Минимальное количество участников в игре 4 человека")
            }
          }}
        >
          Старт
        </UiButton>
        {/* <button className="mt-auto" onClick={() => setStatus("game")}>
          Старт
        </button> */}
      </div>
      <div className="flex-map"></div>
    </>
  )
}
const getCardDeck = (state) => {
  const { pack, playersInfo } = state
  const newCard = playersInfo.map((player) => {
    const newObject = {}
    const pack = "" // нужно выбрать тоько события из карты
    for (let i = 0; i < 4; i++) {
      const randomNumber = Math.floor(Math.random() * pack.length)
    }
    return "hi"
  })
  return newCard
}

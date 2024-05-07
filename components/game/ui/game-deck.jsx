import Image from "next/image"
import { UiTrick } from "../../uikit/ui-trick.jsx"
import { UiCard } from "../../uikit/ui-card.jsx"
import { GAME_STATE_ACTIONS } from "../modal/option-players-reduce.js"
import clsx from "clsx"
import { getMoveStatusInfo } from "../modal/get-move-status-info.js"

export function GameDeck({ optionPlayers, dispatch }) {
  const { playersInfo, pack, activeCard, trick, clickCard, moveStatus } =
    optionPlayers

  const activePlayer = playersInfo.find((player) => player.isPlayerActive)
  const activePlayerIndex = playersInfo.findIndex(
    (player) => player.isPlayerActive
  )

  return (
    <div className="flex-game">
      <div className="rounded-xl min-h-[600px] px-1 py-1 bg-sky-950 flex flex-col py-10">
        <div className="flex gap-10 justify-center  mx-10 ">
          <UiTrick
            onClick={() => {
              dispatch({
                type: GAME_STATE_ACTIONS.GET_CARD,
                card: pack[pack.length - 1],
                player: activePlayerIndex,
              })
            }}
          >
            {pack.length > 0 ? (
              <Image
                unoptimized
                alt="колода"
                src={pack[pack.length - 1].shirt}
                className="max-w-[150px] p-1 rounded-xl"
              />
            ) : (
              "Перемешать колоду"
            )}
          </UiTrick>
          <UiTrick onClick={() => {}}>
            {activeCard ? (
              <Image
                unoptimized
                alt="колода"
                src={activeCard.image}
                className="max-w-[150px] p-1 rounded-xl hover:scale-[2.5] duration-300 transition-transform hover:translate-y-12 "
              />
            ) : (
              "Активная карта"
            )}
          </UiTrick>
          <UiTrick onClick={() => {}}>
            {trick.length ? (
              <Image
                unoptimized
                alt="бита"
                src={trick[trick.length - 1].shirt}
                className="max-w-[150px] p-1 rounded-xl"
              />
            ) : (
              "Бита"
            )}
          </UiTrick>
        </div>
        <div className="flex justify-center">2:00</div>
        <div className="flex justify-center text-lime-400 py-3 text-2xl">
          {getMoveStatusInfo(optionPlayers)}
        </div>

        <div className="flex justify-center gap-2">
          {activePlayer.playerDeck.map((el) => (
            <UiCard
              onClick={() => {
                dispatch({
                  type: GAME_STATE_ACTIONS.CLICK_CARD,
                  card: el,
                })
              }}
              key={el.id}
            >
              <Image
                unoptimized
                alt={el.name}
                src={el.image}
                className={clsx(
                  "max-w-[150px] rounded-xl",
                  clickCard === el
                    ? el.status === "active"
                      ? "shadow-lime-400 shadow-lg"
                      : "shadow-red-400 shadow-lg"
                    : ""
                )}
              />
            </UiCard>
          ))}
        </div>
      </div>
    </div>
  )
}

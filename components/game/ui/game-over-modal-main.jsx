import clsx from "clsx"
import { UiCard } from "../../uikit/ui-card"
import Image from "next/image"
import { GAME_STATE_ACTIONS } from "../modal/option-players-reduce"

export function ModalMain({ optionPlayers, dispatch }) {
  const { playersInfo, moveStatus, activeCard } = optionPlayers
  const targetPlayer = playersInfo.find(
    (player) => player.isTarget === "targetPlayer"
  )

  return (
    <div className="flex flex-col gap-3 items-center">
      <div>на {targetPlayer.name}</div>
      <div className="flex gap-5 justify-center">
        {targetPlayer?.playerDeck.map((card) => {
          let image
          if (activeCard.name === "Подозрение") {
            image =
              card.id === targetPlayer.exchangeCard?.id
                ? card.image
                : card.shirt
          } else if (activeCard.name === "Анализ") {
            image = card.image
          }

          return (
            <UiCard
              key={card.id}
              className=" hover:scale-[1.3] duration-300 transition-transform "
              onClick={() => {
                if (moveStatus === "useCard") {
                  return dispatch({
                    type: GAME_STATE_ACTIONS.USE_CARD,
                    targetPlayer: targetPlayer,
                    clickCard: card,
                  })
                }
              }}
            >
              <Image
                unoptimized
                alt="карта"
                src={image}
                className={clsx("max-w-[150px] rounded-xl")}
              />
            </UiCard>
          )
        })}
      </div>
    </div>
  )
}

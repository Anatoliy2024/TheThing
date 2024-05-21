import Image from "next/image"
import { UiCard } from "../../uikit/ui-card"
import { createPortal } from "react-dom"
import clsx from "clsx"
import { GAME_STATE_ACTIONS } from "../modal/option-players-reduce"
import { ModalMain } from "./game-over-modal-main"

export function GameOverModal({ optionPlayers, dispatch }) {
  const { isOpenModal } = optionPlayers

  if (!isOpenModal) return null
  const { activeCard, playersInfo } = optionPlayers

  const targetPlayerIndex = playersInfo.findIndex(
    (player) => player.isTarget === "targetPlayer"
  )

  const activePlayer = playersInfo.find((player) => player.isPlayerActive)
  const targetPlayer = playersInfo.find(
    (player) => player.isTarget === "targetPlayer"
  )

  const modal = (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur  pt-10 pb-10 overflow-y-auto z-50">
      <div
        data-id="modal"
        className="bg-sky-950/90 max-w-[900px] rounded-lg min-h-[320px] mx-auto flex flex-col items-center py-5 text-lime-500 text-2xl gap-3 relative"
      >
        {targetPlayer && (
          <div
            className=" rounded-full border-2 border-lime-500 p-4 absolute top-6 right-6 hover:bg-lime-500/10 cursor-pointer"
            onClick={() => dispatch({ type: GAME_STATE_ACTIONS.MODAL_CLOSE })}
          >
            <CrossLightIcon className="" />
          </div>
        )}

        <div className="flex flex-col gap-3 items-center ">
          <h3>{activePlayer.name} использовал(-ла)</h3>
          <UiCard className="">
            <Image
              unoptimized
              alt={activeCard.name}
              src={activeCard.image}
              className={clsx(
                "max-w-[150px] rounded-xl  hover:scale-[2.5] duration-300 transition-transform hover:translate-y-16"
              )}
            />
          </UiCard>
        </div>
        <ModalMain optionPlayers={optionPlayers} dispatch={dispatch} />
      </div>
    </div>
  )

  return createPortal(modal, document.getElementById("modals"))
}

function CrossLightIcon({ className }) {
  return (
    <svg
      className={className}
      width="15"
      height="15"
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M40.1361 3.86233C40.9538 2.9792 40.9538 1.54548 40.1361 0.662347C39.0458 -0.220782 37.6829 -0.220782 36.8652 0.662347L20.2384 17.1611L3.88413 0.662347C2.79385 -0.220782 1.431 -0.220782 0.613284 0.662347C-0.204428 1.54548 -0.204428 2.9792 0.613284 3.86233L17.2401 20.361L0.613284 36.8625C-0.204428 37.7456 -0.204428 39.1766 0.613284 40.0597C1.431 40.9456 2.79385 40.9456 3.88413 40.0597L20.2384 23.561L36.8652 40.0597C37.6829 40.9456 39.0458 40.9456 40.1361 40.0597C40.9538 39.1766 40.9538 37.7456 40.1361 36.8625L23.5092 20.361L40.1361 3.86233Z"
        fill="currentColor"
      />
    </svg>
  )
}

// function ModalMain({ optionPlayers, dispatch }){

//   const targetPlayer = playersInfo.find(
//     (player) => player.isTarget === "targetPlayer"
//   )
//   return (
//     <div className="flex flex-col gap-3 items-center">
//           <div>на {targetPlayer.name}</div>
//           <div className="flex gap-5 justify-center">
//             {targetPlayer?.playerDeck.map((card) => {
//               return (
//                 <UiCard
//                   key={card.id}
//                   className=" hover:scale-[1.3] duration-300 transition-transform "
//                 >
//                   <Image
//                     unoptimized
//                     alt={card.name}
//                     src={card.shirt}
//                     className={clsx("max-w-[150px] rounded-xl")}
//                   />
//                 </UiCard>
//               )
//             })}
//           </div>
//         </div>
//   )
// }

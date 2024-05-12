import clsx from "clsx"
import Image from "next/image"
import { GAME_STATE_ACTIONS } from "../modal/option-players-reduce"

export function GameMap({ optionPlayers, dispatch }) {
  const { playersInfo, wayGame } = optionPlayers
  const activePlayerIndex = playersInfo.findIndex(
    (player) => player.isPlayerActive
  )
  const angleIncrement = (2 * Math.PI) / playersInfo.length
  return (
    <div className="flex-map relative">
      <div className="rounded-xl bg-stone-800	 min-h-[600px] px-1 py-1">
        <div className="flex justify-center items-center py-10">
          <div className="relative w-64 h-[500px] border-1 border-gray-300 rounded-full">
            {playersInfo.map((player, index) => {
              const angle = angleIncrement * index
              const radius = 50
              const playerStyle = {
                position: "absolute",
                top: `${50 + Math.sin(angle) * radius}%`,
                left: `${50 + Math.cos(angle) * radius}%`,
                transform: "translate(-50%, -50%)", // Центрируем каждого персонажа
              }

              return (
                <div
                  key={player.id}
                  className={clsx(
                    "absolute text-lime-500 flex flex-col  cursor-pointer  max-w-[100px] px-2 py-2 rounded-2xl overflow-hidden  ",
                    player.isPlayerActive ? "bg-lime-800 z-20" : ""
                  )}
                  style={playerStyle}
                  onClick={() =>
                    dispatch({
                      type: GAME_STATE_ACTIONS.ACTIVE_TARGET,
                      playerTargetIndex: index,
                      activePlayerIndex: activePlayerIndex,
                    })
                  }
                >
                  <Image
                    alt="avatar"
                    src={player.avatar}
                    width={50}
                    className="rounded-full place-self-center"
                  />

                  <div className="truncate select-none place-self-start pr-px">
                    {player.name}
                  </div>
                </div>
              )
            })}
            <div
              className="absolute  text-center w-[calc(100%-150px)]  h-[calc(100%-150px)]  text-lime-500 border-[13px] border-yellow-900 rounded-full flex justify-center items-center bg-green-900 select-none"
              style={{
                top: "50%",
                left: "50%",
                transform: "translateY(-50%) translateX(-50%)",
              }}
            >
              Ход: {wayGame === "right" ? "По часовой" : "Против часовой"}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

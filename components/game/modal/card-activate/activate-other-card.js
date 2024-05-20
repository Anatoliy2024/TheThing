import door from "../../image/avatar/door.jpg"
import { getNextPlayerIndex } from "../next-player"

export function setPlayerTargetAndUseCard(state, playerTargetIndex) {
  const activePlayerIndex = state.playersInfo.findIndex(
    (player) => player.isPlayerActive
  )
  console.log(playerTargetIndex)

  const nextPlayerIndex = getNextPlayerIndex(state, state.wayGame)
  const activeCard = state.activeCard

  switch (activeCard.name) {
    case "Заколоченная дверь":
      console.log("Дверь сработала")
      let checkIndex
      if (state.wayGame === "right") {
        checkIndex =
          playerTargetIndex === nextPlayerIndex
            ? playerTargetIndex
            : activePlayerIndex
      } else {
        checkIndex =
          playerTargetIndex === nextPlayerIndex
            ? activePlayerIndex
            : playerTargetIndex
      }

      const newDoor = {
        id: Math.random(),
        name: "Boarder door",
        avatar: door,
        player: "Door",
      }

      const updatedPlayersInfo = [
        ...state.playersInfo.slice(0, checkIndex),
        newDoor,
        ...state.playersInfo.slice(checkIndex),
      ]

      return {
        ...state,
        playersInfo: updatedPlayersInfo,
        moveStatus: "trashCard",
      }
      break
    case "Подозрение":
      return {
        ...state,
        playersInfo: setPlayerTarget(state, playerTargetIndex),
        isOpenModal: true,
      }
      break
    case "Анализ":
      return {
        ...state,
        playersInfo: setPlayerTarget(state, playerTargetIndex),
        isOpenModal: true,
      }
      break
    // case "Огнемёт":
    //   if(state.moveStatus === 'useCard'){
    //     return {
    //       ...state,
    //       playersInfo: setPlayerTarget(state, playerTargetIndex),
    //       moveStatus: "useBlockCard",
    //     }
    //   }
    default:
      return {
        ...state,
        playersInfo: setPlayerTarget(state, playerTargetIndex),
        moveStatus: "useBlockCard",
      }
  }
}

// function addBorderDoor(state, index) {
//   return state.playersInfo.splice(index, 0, {
//     id: Math.random(),
//     name: "Boarder door",
//     avatar: door,
//     player: "Door",
//   })
// }

// {
//     ...state,
//     playersInfo: setPlayerTargetAndUseCard(
//       state,
//       action.playerTargetIndex
//     ),
//     isOpenModal: true,
//   }

function setPlayerTarget(state, playerTargetIndex) {
  return state.playersInfo.map((player, index) => {
    if (index === playerTargetIndex) {
      return { ...player, isTarget: "targetPlayer" }
    } else {
      return player
    }
  })
}

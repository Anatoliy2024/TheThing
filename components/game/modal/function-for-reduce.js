import { nextPLayerIndexChange } from "./next-player"

export function delCard(state, actionCard) {
  return state.pack.filter((card) => card.id !== actionCard.id)
}

export function getCard(state, playerIndex, newCard) {
  return [
    ...state.playersInfo.slice(0, playerIndex),
    {
      ...state.playersInfo[playerIndex],
      playerDeck: [...state.playersInfo[playerIndex].playerDeck, newCard],
      isTarget: "noTarget", //первоначальный сброс target при смене игрока
    },
    ...state.playersInfo.slice(playerIndex + 1),
  ]
}

export function delCardPLayerPack(
  state,
  playerIndex,
  indexCard,
  statusActivePlyer = {},
  nextPlayerIndex,
  statusNextPlyer = {}
) {
  if (nextPlayerIndex) {
    const updatedPlayersInfo = state.playersInfo.map((player, currentIndex) => {
      if (currentIndex === playerIndex) {
        return {
          ...player,
          playerDeck: [
            ...player.playerDeck.slice(0, indexCard),
            ...player.playerDeck.slice(indexCard + 1),
          ],
          ...statusActivePlyer, // Предполагается, что `status` содержит другие свойства для обновления
        }
      } else if (currentIndex === nextPlayerIndex) {
        return {
          ...player,
          ...statusNextPlyer,
        }
      } else {
        return player
      }
    })
    return updatedPlayersInfo
  } else {
    const updatedPlayersInfo = state.playersInfo.map((player, currentIndex) => {
      if (currentIndex === playerIndex) {
        return {
          ...player,
          playerDeck: [
            ...player.playerDeck.slice(0, indexCard),
            ...player.playerDeck.slice(indexCard + 1),
          ],
          ...statusActivePlyer,
        }
      } else {
        return player
      }
    })
    return updatedPlayersInfo
  }

  // if(playerIndex>nextPlayerIndex){
  //   return [
  //     ...state.playersInfo.slice(0, playerIndex),
  //     {
  //       ...state.playersInfo[playerIndex],
  //       playerDeck: [
  //         ...state.playersInfo[playerIndex].playerDeck.slice(0, indexCard),
  //         ...state.playersInfo[playerIndex].playerDeck.slice(indexCard + 1),
  //       ],
  //       ...status,
  //     },
  //     {...state.playersInfo[playerIndex+1],

  //     },
  //     ...state.playersInfo.slice(playerIndex + 2),
  //   ]
  // } else{
  //   return [
  //     ...state.playersInfo.slice(0, playerIndex),
  //     {
  //       ...state.playersInfo[playerIndex],
  //       playerDeck: [
  //         ...state.playersInfo[playerIndex].playerDeck.slice(0, indexCard),
  //         ...state.playersInfo[playerIndex].playerDeck.slice(indexCard + 1),
  //       ],
  //       ...status,
  //     },
  //     ...state.playersInfo.slice(playerIndex + 1),
  //   ]
  // }
}

export function getIndexCard(state, playerIndex) {
  // console.log(state)
  // console.log(playerIndex)
  // console.log(state.playersInfo[playerIndex].clickCard)
  return state.playersInfo[playerIndex].playerDeck.findIndex(
    (card) => card.id === state.playersInfo[playerIndex].clickCard.id
  )
}

export function getActivePlayerIndex(state) {
  // const activePlayer = state.playersInfo.find((player) => player.isPlayerActive)
  const activePlayerIndex = state.playersInfo.findIndex(
    (player) => player.isPlayerActive
  )
  // console.log(activePlayerIndex)
  return activePlayerIndex
}

export function getTargetPlayerIndex(state) {
  const targetPlayerIndex = state.playersInfo.findIndex(
    (player) => player.isTarget === "targetPlayer"
  )
  if (targetPlayerIndex === -1) {
    return null
  }
  // console.log(activePlayerIndex)
  return targetPlayerIndex
}

export function changeClickCard(state, playerIndex, card) {
  return [
    ...state.playersInfo.slice(0, playerIndex),
    {
      ...state.playersInfo[playerIndex],
      clickCard: card,
    },
    ...state.playersInfo.slice(playerIndex + 1),
  ]
}

export function setPlayerStatus(state, playerIndex, status = {}) {
  const indexTargetPlayer = getTargetPlayerIndex(state)

  return state.playersInfo.map((player, index) => {
    if (index === playerIndex) {
      return { ...player, ...status }
    } else if (index === indexTargetPlayer) {
      return { ...player, isTarget: "noTarget" }
    } else {
      return player
    }
  })
}

export function setPlayerActiveForDoor(state, nextPlayerIndex, card) {
  const newNextPlayerIndex = nextPLayerIndexChange(state, nextPlayerIndex)

  return {
    ...state,
    activeCard: null,
    trash: [...state.trash, card],
    moveStatus: "getCard",
    playersInfo: state.playersInfo.map((player, index) => {
      if (index === newNextPlayerIndex) {
        return { ...player, isPlayerActive: true }
      } else {
        return { ...player, isPlayerActive: false }
      }
    }),
  }
}

export function setExchangeCard(state, indexActivePlayer, actionCard) {
  return state.playersInfo.map((player, index) => {
    if (index === indexActivePlayer) {
      return { ...player, exchangeCard: actionCard }
    }
    return player
  })
}

export function playersCheckExchangeCard(
  state,
  playerIndexOne,
  playerIndexTwo,
  activeCard
) {
  const player = state.playersInfo[playerIndexOne]

  if (player.isRole === "survivor") {
    if (activeCard.name !== "Заражение") {
      return {
        ...state,
        playersInfo: setExchangeCard(state, playerIndexOne, activeCard),
        activeCard: activeCard,
      }
    } else {
      alert("Выживший не может передавать заражение")
      return state
    }
  } else if (player.isRole === "theThing") {
    if (activeCard.status !== "blocked") {
      return {
        ...state,
        playersInfo: setExchangeCard(state, playerIndexOne, activeCard),
        activeCard: activeCard,
      }
    } else {
      alert("Нельзя передавать карту Нечто")
    }
  } else if (player.isRole === "infected") {
    if (activeCard.name !== "Заражение") {
      return {
        ...state,
        playersInfo: setExchangeCard(state, playerIndexOne, activeCard),
        activeCard: activeCard,
      }
    } else {
      if (
        state.playersInfo[playerIndexTwo].isRole === "theThing" &&
        activeCard.status !== "blocked"
      ) {
        return {
          ...state,
          playersInfo: setExchangeCard(state, playerIndexOne, activeCard),
          activeCard: activeCard,
        }
      } else {
        alert(
          "Заражение можно передавать только Нечто. Нельзя передавать заражение, которым вас заразил Нечто"
        )
      }
      alert("Выживший не может передавать заражение")
      return state
    }
  } else {
    alert("что то пошло не так")
    return state
  }
}

// export function playersCheckExchangeCard(
//   state,
//   playerIndexOne,
//   playerIndexTwo,
//   activeCard
// ) {
//   const player = state.playersInfo[playerIndexOne]

//   if (player.isRole === "survivor") {
//     // console.log(action)
//     if (activeCard.name !== "Заражение") {
//       return {
//         ...state,
//         playersInfo: setExchangeCard(state, playerIndexOne, activeCard),
//         activeCard: activeCard,
//       }
//     } else {
//       alert("Выживший не может передавать заражение")
//       return state
//     }
//   } else if (player.isRole === "theThing") {
//     return {
//       ...state,
//       playersInfo: setExchangeCard(state, playerIndexOne, activeCard),
//       activeCard: activeCard,
//     }
//   } else if (player.isRole === "infected") {
//     if (activeCard.name !== "Заражение") {
//       return {
//         ...state,
//         playersInfo: setExchangeCard(state, playerIndexOne, activeCard),
//         activeCard: activeCard,
//       }
//     } else {
//       if (
//         state.playersInfo[playerIndexTwo].isRole === "theThing" &&
//         activeCard.status !== "blocked"
//       ) {
//         return {
//           ...state,
//           playersInfo: setExchangeCard(state, playerIndexOne, activeCard),
//           activeCard: activeCard,
//         }
//       } else {
//         alert(
//           "Заражение можно передавать только Нечто. Нельзя передавать заражение, которым вас заразил Нечто"
//         )
//       }
//       alert("Выживший не может передавать заражение")
//       return state
//     }
//   } else {
//     alert("что то пошло не так")
//     return state
//   }
// }

export function checkPlayerSeatNearby(
  arrayPlayers,
  indexActivePlayer,
  indexTargetPlayer
) {
  // Если один из игроков - первый, а другой - последний, они считаются рядом
  //>>>>>>>>>>>>>>>>>проверка на закрытую дверь и карантин должна быть тоут<<<<<<<<<<<<<<<<<<<<<<<<<

  if (
    (indexActivePlayer === 0 &&
      indexTargetPlayer === arrayPlayers.length - 1) ||
    (indexTargetPlayer === 0 && indexActivePlayer === arrayPlayers.length - 1)
  ) {
    return true
  }

  // Проверяем, являются ли игроки соседями
  return Math.abs(indexActivePlayer - indexTargetPlayer) === 1
}

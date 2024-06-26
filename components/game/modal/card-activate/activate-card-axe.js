import { delCardPLayerPack } from "../function-for-reduce"

export function activateCardAxe(state, indexActivePlayer, indexCard) {
  const activePlayer = state.playersInfo[indexActivePlayer]
  const nextPlayer =
    state.playersInfo[indexActivePlayer + 1] ?? state.playersInfo[0]
  const previousPlayer =
    state.playersInfo[indexActivePlayer - 1] ??
    state.playersInfo[state.playersInfo.length - 1]
  if (
    nextPlayer.name === "Boarder door" ||
    previousPlayer.name === "Boarder door" ||
    activePlayer.statusPlayer === "quarantine" ||
    nextPlayer.statusPlayer === "quarantine" ||
    previousPlayer.statusPlayer === "quarantine"
  ) {
    return {
      ...state,
      playersInfo: delCardPLayerPack(state, indexActivePlayer, indexCard, {
        clickCard: null,
      }),
      activeCard: activePlayer.clickCard,

      moveStatus: "useCard",
    }
  } else {
    alert("Невозможно использовать данную карту")
    return state
  }
}

export function usedCardAxeTomyself(state, activePlayerIndex) {
  return {
    ...state,
    playersInfo: state.playersInfo.map((player, index) => {
      if (index === activePlayerIndex) {
        return { ...player, statusPlayer: "default", countQuarantine: 0 }
      } else {
        return player
      }
    }),
    moveStatus: "trashCard",
  }
}

export function usedCardAxe(state, playerTargetIndex) {
  if (state.playersInfo[playerTargetIndex].name === "Boarder door") {
    return {
      ...state,
      playersInfo: state.playersInfo.filter(
        (_, index) => index !== playerTargetIndex
      ),
      moveStatus: "trashCard",
    }
  } else if (
    state.playersInfo[playerTargetIndex].statusPlayer === "quarantine"
  ) {
    return {
      ...state,
      playersInfo: state.playersInfo.map((player, index) => {
        if (index === playerTargetIndex) {
          //
          return {
            ...player,
            statusPlayer: "default",
            // условно пока для этого нет логики
            countQuarantine: 0,
          }
        } else {
          return player
        }
      }),
      moveStatus: "exchangeCard",
    }
  }
}

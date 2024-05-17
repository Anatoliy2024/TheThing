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

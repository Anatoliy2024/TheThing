export function getNextPlayerIndex(state, way) {
  const activePlayerIndex = state.playersInfo.findIndex(
    (player) => player.isPlayerActive
  )
  let nextPlayerIndex

  // if (way === "right") {
  //   if (activePlayerIndex < state.playersInfo.length - 1) {
  //     nextPlayerIndex = activePlayerIndex + 1
  //   } else {
  //     nextPlayerIndex = 0
  //   }
  // } else if (way === "left") {
  //   if (activePlayerIndex > 0) {
  //     nextPlayerIndex = activePlayerIndex - 1
  //   } else {
  //     nextPlayerIndex = state.playersInfo.length - 1
  //   }
  // }

  if (way === "right") {
    nextPlayerIndex = (activePlayerIndex + 1) % state.playersInfo.length
  } else if (way === "left") {
    nextPlayerIndex =
      (activePlayerIndex - 1 + state.playersInfo.length) %
      state.playersInfo.length
  }

  return nextPlayerIndex
}

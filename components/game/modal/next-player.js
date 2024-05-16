export function getNextPlayerIndex(state, way) {
  const activePlayerIndex = state.playersInfo.findIndex(
    (player) => player.isPlayerActive
  )

  let nextPlayerIndex
  if (way === "right") {
    nextPlayerIndex = (activePlayerIndex + 1) % state.playersInfo.length
  } else if (way === "left") {
    nextPlayerIndex =
      (activePlayerIndex - 1 + state.playersInfo.length) %
      state.playersInfo.length
  }

  return nextPlayerIndex
}

export function nextPLayerIndexChange(activePlayerIndex, nextPlayerIndex) {
  console.log(activePlayerIndex, nextPlayerIndex)
  if (activePlayerIndex < nextPlayerIndex) {
    return nextPlayerIndex + 1
  } else {
    return nextPlayerIndex - 1
  }
}

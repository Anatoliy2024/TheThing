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

export function nextPLayerIndexChange(
  state,
  activePlayerIndex,
  nextPlayerIndex
) {
  const totalPlayers = state.playersInfo.length

  if (activePlayerIndex < nextPlayerIndex) {
    // Уменьшаем индекс, и если он меньше нуля, то "заворачиваем" его к последнему элементу
    return (nextPlayerIndex - 1 + totalPlayers) % totalPlayers
  } else {
    // Увеличиваем индекс, и если он превышает длину массива, то "заворачиваем" его к первому элементу
    return (nextPlayerIndex + 1) % totalPlayers
  }
}

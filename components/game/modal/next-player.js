export function getNextPlayerIndex(state) {
  const activePlayerIndex = state.playersInfo.findIndex(
    (player) => player.isPlayerActive
  )
  const totalPlayers = state.playersInfo.length
  let nextPlayerIndex
  if (state.wayGame === "right") {
    nextPlayerIndex = (activePlayerIndex + 1) % totalPlayers
  } else {
    nextPlayerIndex = (activePlayerIndex - 1 + totalPlayers) % totalPlayers
  }

  return nextPlayerIndex
}

export function nextPLayerIndexChange(state, nextPlayerIndex) {
  const totalPlayers = state.playersInfo.length

  if (state.wayGame === "right") {
    // Увеличиваем индекс, и если он превышает длину массива, то "заворачиваем" его к первому элементу
    return (nextPlayerIndex + 1) % totalPlayers
  } else {
    // Уменьшаем индекс, и если он меньше нуля, то "заворачиваем" его к последнему элементу
    return (nextPlayerIndex - 1 + totalPlayers) % totalPlayers
  }
}

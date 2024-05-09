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

export function delCardPLayerPack(state, playerIndex, indexCard) {
  return [
    ...state.playersInfo.slice(0, playerIndex),
    {
      ...state.playersInfo[playerIndex],
      playerDeck: [
        ...state.playersInfo[playerIndex].playerDeck.slice(0, indexCard),
        ...state.playersInfo[playerIndex].playerDeck.slice(indexCard + 1),
      ],
      clickCard: null,
    },
    ...state.playersInfo.slice(playerIndex + 1),
  ]
}

export function getIndexCard(state, playerIndex, cardClick) {
  return state.playersInfo[playerIndex].playerDeck.findIndex(
    (card) => card.id === cardClick.id
  )
}

export function getActivePlayerIndex(state) {
  // const activePlayer = state.playersInfo.find((player) => player.isPlayerActive)
  const activePlayerIndex = state.playersInfo.findIndex(
    (player) => player.isPlayerActive
  )
  console.log(activePlayerIndex)
  return activePlayerIndex
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

export function setPlayerIsTarget(state, playerIndex, status) {
  return [
    ...state.playersInfo.slice(0, playerIndex),
    {
      ...state.playersInfo[playerIndex],
      isTarget: status,
    },
    ...state.playersInfo.slice(playerIndex + 1),
  ]
}

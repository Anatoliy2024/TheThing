export function delCard(state, actionCard) {
  return state.pack.filter((card) => card.id !== actionCard.id)
}

export function getCard(state, playerIndex, newCard) {
  return [
    ...state.playersInfo.slice(0, playerIndex),
    {
      ...state.playersInfo[playerIndex],
      playerDeck: [...state.playersInfo[playerIndex].playerDeck, newCard],
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
    },
    ...state.playersInfo.slice(playerIndex + 1),
  ]
}

export function getIndexCard(state, playerIndex, cardClick) {
  return state.playersInfo[playerIndex].playerDeck.findIndex(
    (card) => card.id === cardClick.id
  )
}

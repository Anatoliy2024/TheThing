export function exchangeCardPlayer(
  state,
  indexActivePlayer,
  nextPlayerIndex,
  cardActivePlayer,
  cardNextPlayer
) {
  //   console.log("первый", state.playersInfo[indexActivePlayer])
  //   console.log("второй", state.playersInfo[nextPlayerIndex])
  const activePlayer = state.playersInfo[indexActivePlayer]
  const nextPlayer = state.playersInfo[nextPlayerIndex]
  if (
    cardActivePlayer.name !== "Заражение" &&
    cardNextPlayer.name !== "Заражение"
  ) {
    return stepTwoExchangeCard(
      state,
      indexActivePlayer,
      nextPlayerIndex,
      cardActivePlayer,
      cardNextPlayer
    )
  } else if (
    cardActivePlayer.name === "Заражение" &&
    cardNextPlayer.name !== "Заражение"
  ) {
    if (nextPlayer.isRole === "infected" || nextPlayer.isRole === "theThing") {
      return stepTwoExchangeCard(
        state,
        indexActivePlayer,
        nextPlayerIndex,
        cardActivePlayer,
        cardNextPlayer
      )
    } else {
      return stepTwoExchangeCardInfected(
        state,
        indexActivePlayer,
        nextPlayerIndex,
        cardActivePlayer,
        cardNextPlayer,
        nextPlayerIndex
      )
    }
  } else if (
    cardActivePlayer.name !== "Заражение" &&
    cardNextPlayer.name === "Заражение"
  ) {
    if (
      activePlayer.isRole === "infected" ||
      activePlayer.isRole === "theThing"
    ) {
      return stepTwoExchangeCard(
        state,
        indexActivePlayer,
        nextPlayerIndex,
        cardActivePlayer,
        cardNextPlayer
      )
    } else {
      return stepTwoExchangeCardInfected(
        state,
        indexActivePlayer,
        nextPlayerIndex,
        cardActivePlayer,
        cardNextPlayer,
        indexActivePlayer
      )
    }
  } else if (
    cardActivePlayer.name === "Заражение" &&
    cardNextPlayer.name === "Заражение"
  ) {
    return stepTwoExchangeCard(
      state,
      indexActivePlayer,
      nextPlayerIndex,
      cardActivePlayer,
      cardNextPlayer
    )
  }
}

function stepTwoExchangeCard(
  state,
  indexActivePlayer,
  nextPlayerIndex,
  cardActivePlayer,
  cardNextPlayer
) {
  return state.playersInfo.map((player, index) => {
    if (index === indexActivePlayer) {
      return {
        ...player,
        playerDeck: player.playerDeck.map((card) => {
          if (card.id === cardActivePlayer.id) {
            return cardNextPlayer
          }
          return card
        }),
        clickCard: null,
        exchangeCard: null,
        isPlayerActive: false,
      }
    } else if (index === nextPlayerIndex) {
      return {
        ...player,
        playerDeck: player.playerDeck.map((card) => {
          if (card.id === cardNextPlayer.id) {
            return cardActivePlayer
          }
          return card
        }),
        clickCard: null,
        exchangeCard: null,
        isPlayerActive: true,
        isTarget: "noTarget",
      }
    }
    return player
  })
}

function stepTwoExchangeCardInfected(
  state,
  indexActivePlayer,
  nextPlayerIndex,
  cardActivePlayer,
  cardNextPlayer,
  indexPlayerInfected
) {
  return state.playersInfo.map((player, index) => {
    if (index === indexActivePlayer) {
      return {
        ...player,
        playerDeck: player.playerDeck.map((card) => {
          if (card.id === cardActivePlayer.id) {
            if (indexPlayerInfected === indexActivePlayer) {
              cardNextPlayer = { ...cardNextPlayer, status: "blocked" }
            }
            return cardNextPlayer
          }
          return card
        }),
        clickCard: null,
        exchangeCard: null,
        isPlayerActive: false,
        isRole:
          indexPlayerInfected === indexActivePlayer
            ? "infected"
            : state.playersInfo[indexActivePlayer].isRole,
      }
    } else if (index === nextPlayerIndex) {
      return {
        ...player,
        playerDeck: player.playerDeck.map((card) => {
          if (card.id === cardNextPlayer.id) {
            if (indexPlayerInfected === nextPlayerIndex) {
              cardActivePlayer = { ...cardActivePlayer, status: "blocked" }
            }
            return cardActivePlayer
          }
          return card
        }),
        clickCard: null,
        exchangeCard: null,
        isPlayerActive: true,
        isTarget: "noTarget",
        isRole:
          indexPlayerInfected === nextPlayerIndex
            ? "infected"
            : state.playersInfo[nextPlayerIndex].isRole,
      }
    }
    return player
  })
}

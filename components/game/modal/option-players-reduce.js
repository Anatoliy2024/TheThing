export const GAME_STATE_ACTIONS = {
  STATUS: "status",
  OPTIONS: "options",
  CREATE_DECK: "create-deck",
  GET_CARD: "get-card",
  CLICK_CARD: "click-card",
  ACTIVE_CARD: "active-card",
  TRASH_CARD: "trash-card",
  TICK: "tick",
}

export const initialOptionPlayer = ({ pack, players, status, options }) => ({
  pack,
  players,
  status,
  options,
})

export const optionPlayersReduce = (state, action) => {
  switch (action.type) {
    case GAME_STATE_ACTIONS.STATUS: {
      if (action.status === "option") {
        return { ...state, status: "option" }
      } else if (action.status === "search") {
        return { ...state, status: "search" }
      } else if (action.status === "game") {
        return { ...state, status: "game" }
      } else {
        return state
      }
    }
    case GAME_STATE_ACTIONS.OPTIONS: {
      console.log(action.options)
      return { ...state, options: { ...state.options, ...action.options } }
    }
    case GAME_STATE_ACTIONS.CREATE_DECK: {
      if (action.status === "game") {
        return {
          ...state,
          status: "game",
          pack: action.pack,
          playersInfo: action.playerDesk,
        }
      } else {
        return state
      }
    }
    case GAME_STATE_ACTIONS.GET_CARD: {
      if (state.moveStatus === "getCard") {
        if (action.card.property === "паника") {
          return {
            ...state,
            pack: delCard(state, action.card),
            activeCard: action.card,
            moveStatus: "useCard",
          }
        } else {
          return {
            ...state,
            pack: delCard(state, action.card),
            playersInfo: getCard(state, action.player, action.card),
            moveStatus: "selectCard",
          }
        }
      } else {
        alert("Вы уже взяли карту из колода")
        return state
      }
    }
    case GAME_STATE_ACTIONS.CLICK_CARD: {
      if (state.moveStatus === "selectCard") {
        console.log(GAME_STATE_ACTIONS.CLICK_CARD)

        if (state.clickCard === action.card) {
          return { ...state, clickCard: null }
        } else {
          return { ...state, clickCard: action.card }
        }
      } else {
        return state
      }
      // if (state.moveStatus === "selectCard") {
      //   console.log(action.card)
      //   console.log(action.player)
      //   return {
      //     ...state,

      //     playersInfo: [
      //       ...state.playersInfo.slice(0, action.player),
      //       {
      //         ...state.playersInfo[action.player],
      //         playerDeck: [
      //           ...state.playersInfo[action.player].playerDeck.slice(
      //             0,
      //             action.index
      //           ),
      //           {
      //             ...state.playersInfo[action.player].playerDeck[action.index],
      //             focus: true,
      //           },
      //           ...state.playersInfo[action.player].playerDeck.slice(
      //             action.index + 1
      //           ),
      //         ],
      //       },
      //       ...state.playersInfo.slice(action.player + 1),
      //     ],
      //     moveStatus: "useCard",
      //   }
      // } else if (state.moveStatus === "useCard") {
      //   return {
      //     ...state,

      //     playersInfo: [
      //       ...state.playersInfo.slice(0, action.player),
      //       {
      //         ...state.playersInfo[action.player],
      //         playerDeck: [
      //           ...state.playersInfo[action.player].playerDeck.slice(
      //             0,
      //             action.index
      //           ),
      //           {
      //             ...state.playersInfo[action.player].playerDeck[action.index],
      //             focus: false,
      //           },
      //           ...state.playersInfo[action.player].playerDeck.slice(
      //             action.index + 1
      //           ),
      //         ],
      //       },
      //       ...state.playersInfo.slice(action.player + 1),
      //     ],

      //     moveStatus: "selectCard",
      //   }
      // }
    }
    case GAME_STATE_ACTIONS.ACTIVE_CARD: {
      if (action.card.status === "activeCard") {
      } else {
        alert(`${action.card.name} не может быть активирована`)
      }
      return state
    }

    default: {
      return state
    }
  }
}

function delCard(state, actionCard) {
  return state.pack.filter((card) => card.id !== actionCard.id)
}

function getCard(state, playerIndex, newCard) {
  return [
    ...state.playersInfo.slice(0, playerIndex),
    {
      ...state.playersInfo[playerIndex],
      playerDeck: [...state.playersInfo[playerIndex].playerDeck, newCard],
    },
    ...state.playersInfo.slice(playerIndex + 1),
  ]
}

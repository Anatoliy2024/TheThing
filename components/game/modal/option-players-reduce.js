export const GAME_STATE_ACTIONS = {
  STATUS: "status",
  OPTIONS: "options",
  CREATE_DECK: "create-deck",
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
      }
    }
    case GAME_STATE_ACTIONS.OPTIONS: {
      console.log(action.options)
      return { ...state, options: { ...state.options, ...action.options } }
    }
    case GAME_STATE_ACTIONS.CREATE_DECK: {
      if (action.status === "game") {
        // console.log(action.playerDesk)
        // console.log(action.pack)
        return {
          ...state,
          status: "game",
          pack: action.pack,
          playersInfo: action.playerDesk,
        }
      }
    }
    default: {
      return state
    }
  }
}

import {
  changeClickCard,
  delCard,
  delCardPLayerPack,
  exchangeCardPlayer,
  getActivePlayerIndex,
  getCard,
  getIndexCard,
  playersCheckExchangeCard,
  setExchangeCard,
  setPlayerIsTarget,
  setPlayerStatus,
  checkPlayerSeatNearby,
  setPlayerTarget,
} from "./function-for-reduce"
import { shuffleArray } from "./get-card"
import { getNextPlayerIndex } from "./next-player"

export const GAME_STATE_ACTIONS = {
  STATUS: "status",
  OPTIONS: "options",
  CREATE_DECK: "create-deck",
  GET_CARD: "get-card",
  CLICK_CARD: "click-card",
  ACTIVE_CARD: "active-card",
  USE_CARD: "use-card",
  TRASH_CARD: "trash-card",
  ACTIVE_TARGET: "active-target",
  MODAL_CLOSE: "modal-close",
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
      break
    }
    case GAME_STATE_ACTIONS.OPTIONS: {
      console.log(action.options)
      return { ...state, options: { ...state.options, ...action.options } }
      break
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
      break
    }
    case GAME_STATE_ACTIONS.GET_CARD: {
      if (state.moveStatus === "getCard") {
        if (state.pack.length !== 0) {
          if (action.card.property === "паника") {
            return {
              ...state,
              pack: delCard(state, action.card),
              activeCard: action.card,
              moveStatus: "useCard",
              playersInfo: setPlayerStatus(state, action.player, {
                isTarget: "noTarget",
              }),
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
          const newDeck = shuffleArray(state.trash)

          return { ...state, trash: [], pack: newDeck }
        }
      } else {
        alert("Вы уже взяли карту из колода")
        return state
      }
      break
    }
    case GAME_STATE_ACTIONS.CLICK_CARD: {
      const nextPlayerIndex = getNextPlayerIndex(state, state.wayGame)
      const indexActivePlayer = getActivePlayerIndex(state)

      const checkOption =
        state.moveStatus === "selectCard" ||
        (state.moveStatus === "exchangeCard" &&
          ((action.playerIndex === indexActivePlayer &&
            state.playersInfo[action.playerIndex].exchangeCard === null) ||
            (action.playerIndex === nextPlayerIndex &&
              state.playersInfo[nextPlayerIndex].id === null)))

      if (checkOption) {
        const indexActivePlayer = action.playerIndex // получение из dicpatch

        if (state.playersInfo[indexActivePlayer].clickCard === action.card) {
          return {
            ...state,
            playersInfo: changeClickCard(state, indexActivePlayer, null),
          }
        } else {
          return {
            ...state,
            playersInfo: changeClickCard(state, indexActivePlayer, action.card),
          }
        }
      } else {
        return state
      }
      break
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
      if (state.moveStatus === "selectCard") {
        // const indexActivePlayer = getActivePlayerIndex(state) //получение из стейта
        const indexActivePlayer = action.playerIndex // получение из dicpatch

        const activePlayer = state.playersInfo[indexActivePlayer]

        if (activePlayer.clickCard !== null && state.activeCard === null) {
          //поменять не то приходит где лучше здесть или снаружи
          if (action.card.status === "active") {
            const indexCard = getIndexCard(
              state,
              indexActivePlayer,
              action.card
            )
            if (action.card.areaUse === "toMyself") {
              //упорство сократи запись у return
              if (action.card.name === "Упорство") {
                return {
                  ...state,
                  playersInfo: delCardPLayerPack(
                    state,
                    indexActivePlayer,
                    indexCard,
                    { clickCard: null }
                  ),
                  activeCard: activePlayer.clickCard,
                  // clickCard: null,
                  moveStatus: "useCard",
                }
              } else {
                // виски и гляди по сторонам
                return {
                  ...state,
                  playersInfo: delCardPLayerPack(
                    state,
                    indexActivePlayer,
                    indexCard,
                    { clickCard: null }
                  ),
                  activeCard: activePlayer.clickCard,
                  // clickCard: null,
                  moveStatus: "trashCard",
                }
              }
            } else {
              return {
                ...state,
                playersInfo: delCardPLayerPack(
                  state,
                  indexActivePlayer,
                  indexCard,
                  { clickCard: null }
                ),
                activeCard: activePlayer.clickCard,
                // clickCard: null,
                moveStatus: "useCard",
              }
            }
          } else {
            alert(`${action.card.name} не может быть активирована`)
            return state
          }
        } else {
          alert("Карта не выбрана")
          return state
        }
      } else if (state.moveStatus === "exchangeCard") {
        const indexActivePlayer = action.playerIndex // получение из dicpatch
        const activePlayer = state.playersInfo[indexActivePlayer]
        const nextPlayerIndex = getNextPlayerIndex(state, state.wayGame)
        const nextPlayer = state.playersInfo[nextPlayerIndex]

        // console.log("ActiveCard")

        if (
          activePlayer.clickCard !== null &&
          activePlayer.clickCard.id !== activePlayer.exchangeCard?.id
        ) {
          // console.log(action.card)
          const nextPlayerIndex = getNextPlayerIndex(state, state.wayGame)
          return playersCheckExchangeCard(
            state,
            indexActivePlayer,
            nextPlayerIndex,
            action.card
          )
        } else if (
          nextPlayer.clickCard !== null &&
          nextPlayer.clickCard.id !== nextPlayer.exchangeCard?.id
        ) {
          // console.log(action.card)
          //вроде так должно быть но это неточно, не проверить пока не будет сервера
          /* Если будет сервер нужно включить чтобы у next игрока работала проверка на карту, пришлось отключить из за того что ломается всё я искусственно добавляю все данные */
          // const nextPlayerIndex = getNextPlayerIndex(state, state.wayGame)
          // return playersCheckExchangeCard(
          //   state,
          //   nextPlayerIndex,
          //   indexActivePlayer,
          //   action.card
          // )
        }

        if (
          activePlayer.exchangeCard !== null &&
          nextPlayer.exchangeCard !== null
        ) {
          // console.log("У обоих есть")
          // indexActivePlayer
          // nextPlayerIndex
          const cardActivePlayer =
            state.playersInfo[indexActivePlayer].exchangeCard
          const cardNextPlayer = state.playersInfo[nextPlayerIndex].exchangeCard

          return {
            ...state,
            playersInfo: exchangeCardPlayer(
              state,
              indexActivePlayer,
              nextPlayerIndex,
              cardActivePlayer,
              cardNextPlayer
            ),
            activeCard: null,
            moveStatus: "getCard",
            countStep: state.countStep + 1,
          }
        }
        // console.log(
        //   "Карты активного игрока",
        //   state.playersInfo[indexActivePlayer].playerDeck
        // )
        // console.log(
        //   "Карты следующего игрока",
        //   state.playersInfo[nextPlayerIndex].playerDeck
        // )
        /** Проверка на то что есть ли у обоих игроков карты в clickCard  если есть тогда обмен сразу  или внутри функции проверить и обменяться? возможно лучше внутри после того как задал ехчендж первому игроку проверь есть ли ехчендж у второго, если есть обмен
         * потом на кнопу создай псевдо отдачу каты следующим игроком а затем будет меняться активный игрок и начинается следущий ход
         */
      }
      // console.log("конец активации")
      return state
      break
    }
    case GAME_STATE_ACTIONS.USE_CARD: {
      console.log("Зашёл в useCard")
      if (state.moveStatus === "useCard") {
        return { ...state, moveStatus: "trashCard" }
      } else if ((state.moveStatus = "exchangeCard")) {
        console.log("Next игрок положил карту")
        const nextPlayerIndex = getNextPlayerIndex(state, state.wayGame)
        const randomIndex = Math.floor(Math.random() * 4)

        const randomCard =
          state.playersInfo[nextPlayerIndex].playerDeck[randomIndex]

        return {
          ...state,
          playersInfo: state.playersInfo.map((player, index) => {
            if (index === nextPlayerIndex) {
              return {
                ...player,
                exchangeCard: randomCard,
                clickCard: randomCard,
              }
            }
            return player
          }),
          activeCard: randomCard,
        }
      } else state
      break
    }
    case GAME_STATE_ACTIONS.ACTIVE_TARGET: {
      if (state.moveStatus === "useCard") {
        if (action.activePlayerIndex === action.playerTargetIndex) {
          if (state.activeCard.areaUse === "toMyself") {
            //это сработает только о тогда когда будет использована карта упорство и человек начнёт тыкать на карту зачем то
            return state
            break
          }
        } else if (
          checkPlayerSeatNearby(
            state.playersInfo,
            action.activePlayerIndex,
            action.playerTargetIndex
          )
        ) {
          if (
            state.activeCard.name === "Подозрение" ||
            state.activeCard.name === "Анализ"
          ) {
            return {
              ...state,
              playersInfo: setPlayerTarget(state, action.playerTargetIndex),
              isOpenModal: true,
            }
            break
          } else {
            return {
              ...state,
              playersInfo: setPlayerTarget(state, action.playerTargetIndex),
            }
            break
          }
        } else {
          if (state.activeCard.areaUse === "everyBody") {
            return {
              ...state,
              playersInfo: setPlayerTarget(state, action.playerTargetIndex),
            }
          } else {
            alert(
              `${state.activeCard.name} нельзя использовать карту на данного игрока`
            )
            return state
            break
          }
        }
      } else {
        return state
        break
      }
    }

    case GAME_STATE_ACTIONS.MODAL_CLOSE: {
      if (state.moveStatus === "useCard") {
        return { ...state, isOpenModal: false, moveStatus: "trashCard" }
        break
      } else {
        return state
        break
      }
    }
    // когда стадия useCard ИГРОК БУДЕТ СОВЕРШАТЬ ДЕЙСТВИЕ и как только он его совершит moveStatus поменяется на trashCard нужно новый кейс добавить но сейчас сразу начинается trashCard для упрощения
    case GAME_STATE_ACTIONS.TRASH_CARD: {
      if (state.moveStatus === "selectCard") {
        if (state.playersInfo[action.player].clickCard !== null) {
          const indexCard = getIndexCard(state, action.player)
          const nextPlayerIndex = getNextPlayerIndex(state, state.wayGame)
          return {
            ...state,
            trash: [...state.trash, state.playersInfo[action.player].clickCard],
            playersInfo: delCardPLayerPack(
              state,
              action.player,
              indexCard,
              {
                clickCard: null,
              },
              nextPlayerIndex,
              { isTarget: "nextPlayer" }
            ),
            moveStatus: "exchangeCard",
          }
        } else {
          alert("карта не выбрана")
          return state
        }
      } else if (state.moveStatus === "trashCard") {
        // const indexActivePlayer = action.playerIndex // получение из dicpatch
        // const activePlayer = state.playersInfo[indexActivePlayer]
        const nextPlayerIndex = getNextPlayerIndex(state, state.wayGame)
        console.log(state.playersInfo[nextPlayerIndex])
        console.log("Trash")
        return {
          ...state,
          activeCard: null,
          trash: [...state.trash, state.activeCard],
          moveStatus: "exchangeCard",
          playersInfo: setPlayerStatus(state, nextPlayerIndex, {
            isTarget: "nextPlayer",
          }),
        }
      } else {
        return state
      }
      break
    }

    default: {
      return state
      break
    }
  }
}

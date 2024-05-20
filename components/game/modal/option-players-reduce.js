import {
  activateCardAxe,
  usedCardAxe,
  usedCardAxeTomyself,
} from "./card-activate/activate-card-axe"
import { setPlayerTargetAndUseCard } from "./card-activate/activate-other-card"
import { useCardToMyself } from "./card-activate/use-card-to-myself"
import { exchangeCardPlayer } from "./exchange-card-player"
import {
  changeClickCard,
  delCard,
  delCardPLayerPack,
  getActivePlayerIndex,
  getCard,
  getIndexCard,
  playersCheckExchangeCard,
  setExchangeCard,
  setPlayerIsTarget,
  setPlayerStatus,
  checkPlayerSeatNearby,
  getTargetPlayerIndex,
  setPlayerActiveForDoor,
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
        break
      } else if (action.status === "search") {
        return { ...state, status: "search" }
        break
      } else if (action.status === "game") {
        return { ...state, status: "game" }
        break
      } else {
        return state
        break
      }
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
        break
      } else {
        return state
        break
      }
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
            break
          } else {
            return {
              ...state,
              pack: delCard(state, action.card),
              playersInfo: getCard(state, action.player, action.card),
              moveStatus: "selectCard",
            }
            break
          }
        } else {
          const newDeck = shuffleArray(state.trash)

          return { ...state, trash: [], pack: newDeck }
          break
        }
      } else {
        alert("Вы уже взяли карту из колода")
        return state
        break
      }
      break
    }
    case GAME_STATE_ACTIONS.CLICK_CARD: {
      const indexNextPlayer = getNextPlayerIndex(state)
      const indexActivePlayer = getActivePlayerIndex(state)
      const indexTargetPlayer = getTargetPlayerIndex(state)

      const checkOption =
        state.moveStatus === "selectCard" ||
        (state.moveStatus === "exchangeCard" &&
          ((action.playerIndex === indexActivePlayer &&
            state.playersInfo[action.playerIndex].exchangeCard === null) ||
            (action.playerIndex === indexNextPlayer &&
              state.playersInfo[indexNextPlayer].exchangeCard === null))) ||
        (state.moveStatus === "useBlockCard" &&
          action.playerIndex === indexTargetPlayer)

      if (checkOption) {
        const indexActivePlayer = action.playerIndex // получение из dicpatch

        if (state.playersInfo[indexActivePlayer].clickCard === action.card) {
          return {
            ...state,
            playersInfo: changeClickCard(state, indexActivePlayer, null),
          }
          break
        } else {
          return {
            ...state,
            playersInfo: changeClickCard(state, indexActivePlayer, action.card),
          }
          break
        }
      } else {
        return state
        break
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
              return useCardToMyself(
                state,
                indexActivePlayer,
                indexCard,
                activePlayer.clickCard
              )
              break
              // //упорство сократи запись у return
              // if (action.card.name === "Упорство") {
              //   return useCardToMyself(
              //     state,
              //     indexActivePlayer,
              //     indexCard,
              //     activePlayer.clickCard
              //   )
              //   break
              // } else {
              //   // виски и гляди по сторонам
              //   return useCardToMyself(
              //     state,
              //     indexActivePlayer,
              //     indexCard,
              //     activePlayer.clickCard
              //   )

              //   break
              // }
            } else if (action.card.areaUse === "nearby") {
              console.log("Второй уровень")
              if (action.card.name === "Топор") {
                return activateCardAxe(state, indexActivePlayer, indexCard)
                break
              } else {
                /**Добавил весь return  */
                return {
                  ...state,
                  playersInfo: delCardPLayerPack(
                    state,
                    indexActivePlayer,
                    indexCard,
                    { clickCard: null }
                  ),
                  activeCard: activePlayer.clickCard,

                  moveStatus: "useCard",
                }
                break
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

                moveStatus: "useCard",
              }
              break
            }
          } else {
            alert(`${action.card.name} не может быть активирована`)
            return state
            break
          }
        } else {
          alert("Карта не выбрана")
          return state
          break
        }
      } else if (state.moveStatus === "exchangeCard") {
        const indexActivePlayer = action.playerIndex // получение из dicpatch
        const activePlayer = state.playersInfo[indexActivePlayer]
        const nextPlayerIndex = getNextPlayerIndex(state)
        const nextPlayer = state.playersInfo[nextPlayerIndex]

        if (
          activePlayer.clickCard !== null &&
          activePlayer.clickCard.id !== activePlayer.exchangeCard?.id
        ) {
          // console.log(action.card)
          // const nextPlayerIndex = getNextPlayerIndex(state)
          return playersCheckExchangeCard(
            state,
            indexActivePlayer,
            nextPlayerIndex,
            action.card
          )
          break
        } else if (
          nextPlayer.clickCard !== null &&
          nextPlayer.clickCard.id !== nextPlayer.exchangeCard?.id
        ) {
          return state
          break
          // console.log(action.card)
          //вроде так должно быть но это неточно, не проверить пока не будет сервера
          /* Если будет сервер нужно включить чтобы у next игрока работала проверка на карту, пришлось отключить из за того что ломается всё я искусственно добавляю все данные */
          // const nextPlayerIndex = getNextPlayerIndex(state)
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
          break
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
      } else if (state.moveStatus === "useBlockCard") {
        //добавить логику защитных карт
        console.log("Стадия блокирования карты")
        return { ...state, moveStatus: "trashCard" }
        break
      }
      // console.log("конец активации")
      return state
      break
    }
    case GAME_STATE_ACTIONS.USE_CARD: {
      if (state.moveStatus === "useCard") {
        if (state.isOpenModal === false) {
          return { ...state, moveStatus: "trashCard" }
          break
        } else {
          return {
            ...state,
            playersInfo: state.playersInfo.map((player) => {
              if (action.targetPlayer.id === player.id) {
                return { ...player, exchangeCard: action.clickCard }
              } else {
                return player
              }
            }),
            moveStatus: "trashCard",
          }
          break
        }
      } else if (state.moveStatus === "exchangeCard") {
        console.log("Next игрок положил карту")
        const nextPlayerIndex = getNextPlayerIndex(state)
        let randomCard
        for (let i = 0; i < 20; i++) {
          const randomIndex = Math.floor(Math.random() * 4)
          randomCard =
            state.playersInfo[nextPlayerIndex].playerDeck[randomIndex]
          if (randomCard.name !== "Нечто" && randomCard.name !== "Заражение") {
            break
          }
        }

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
        break
      } else state
      break
    }

    case GAME_STATE_ACTIONS.ACTIVE_TARGET: {
      if (state.moveStatus === "useCard") {
        if (action.activePlayerIndex === action.playerTargetIndex) {
          if (state.activeCard.name === "Топор") {
            if (
              state.playersInfo[action.playerTargetIndex].statusPlayer ===
              "quarantine"
            ) {
              return usedCardAxeTomyself(state, action.playerTargetIndex)
              break
            } else {
              return state
              break
            }
            //это сработает только о тогда когда будет использована карта упорство и человек начнёт тыкать на карту зачем то
          } else {
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
            state.playersInfo[action.playerTargetIndex].name !==
              "Boarder door" &&
            state.playersInfo[action.playerTargetIndex].statusPlayer !==
              "quarantine"
          ) {
            if (
              state.activeCard.name === "Подозрение" ||
              state.activeCard.name === "Анализ"
            ) {
              return setPlayerTargetAndUseCard(state, action.playerTargetIndex)
              break
            } else if (state.activeCard.name === "Топор") {
              alert(
                `Топор нельзя использовать на ${
                  state.playersInfo[action.playerTargetIndex].name
                }`
              )
              return state
              break
            }
            //  else if ((a = a)) {
            //   return state
            //   break
            // }
            else {
              //все карты которые используются на соседнего игрока будут в setPlayerTargetAndUseCard
              return setPlayerTargetAndUseCard(state, action.playerTargetIndex)
              break
            }
          } else {
            if (state.activeCard.name === "Топор") {
              return usedCardAxe(state, action.playerTargetIndex)
              break
              // if (
              //   state.playersInfo[action.playerTargetIndex].name ===
              //   "Boarder door"
              // ) {
              //   return {
              //     ...state,
              //     playersInfo: state.playersInfo.filter(
              //       (_, index) => index !== action.playerTargetIndex
              //     ),
              //     moveStatus: "trashCard",
              //   }
              //   break
              // } else if (
              //   state.playersInfo[action.playerTargetIndex].statusPlayer ===
              //   "quarantine"
              // ) {
              //   return {
              //     ...state,
              //     playersInfo: state.playersInfo.map((player, index) => {
              //       if (index === action.playerTargetIndex) {
              //         //
              //         return {
              //           ...player,
              //           statusPlayer: "default",
              //           // условно пока для этого нет логики
              //           countQuarantine: 0,
              //         }
              //       } else {
              //         return player
              //       }
              //     }),
              //     moveStatus: "exchangeCard",
              //   }
              //   break
              // } else {
              //   alert(
              //     `Нельзя использовать топор на ${
              //       state.playersInfo[action.playerTargetIndex].name
              //     }`
              //   )
              //   return state
              //   break
              // }
            } else {
              alert(
                `Нельзя использовать ${state.activeCard.name} на заколоченную дверь`
              )
              return state
              break
            }
          }
        } else {
          if (state.activeCard.areaUse === "everyBody") {
            // 4 карты соблазн, сматывай удочки, некрономикон и лавкрафт
            return setPlayerTargetAndUseCard(state, action.playerTargetIndex)

            break
          } else {
            alert(
              `Карту ${state.activeCard.name} нельзя использовать на данного игрока`
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
      if (state.moveStatus === "trashCard" || state.moveStatus === "useCard") {
        return {
          ...state,
          isOpenModal: false,
          moveStatus: "trashCard",
          playersInfo: state.playersInfo.map((player) => {
            return { ...player, exchangeCard: null }
          }),
        }
        break
      } else {
        return state
        break
      }
    }
    // когда стадия useCard ИГРОК БУДЕТ СОВЕРШАТЬ ДЕЙСТВИЕ и как только он его совершит moveStatus поменяется на trashCard нужно новый кейс добавить но сейчас сразу начинается trashCard для упрощения
    case GAME_STATE_ACTIONS.TRASH_CARD: {
      if (state.moveStatus === "selectCard") {
        const activeCard = state.playersInfo[action.player].clickCard
        if (activeCard !== null) {
          if (activeCard.status !== "blocked") {
            const indexCard = getIndexCard(state, action.player)
            const nextPlayerIndex = getNextPlayerIndex(state)
            if (state.playersInfo[nextPlayerIndex].name === "Boarder door") {
              console.log(state.playersInfo)
              return setPlayerActiveForDoor(
                state,
                nextPlayerIndex,
                // action.player,
                activeCard
              )
              break
            } else {
              return {
                ...state,
                trash: [...state.trash, activeCard],
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
              break
            }
          } else {
            alert(`Карту ${activeCard.name} нельзя сбросить`)
            return state
            break
          }
        } else {
          alert("карта не выбрана")
          return state
          break
        }
      } else if (state.moveStatus === "trashCard") {
        // const indexActivePlayer = action.playerIndex // получение из dicpatch
        // const activePlayer = state.playersInfo[indexActivePlayer]
        const nextPlayerIndex = getNextPlayerIndex(state)

        if (state.playersInfo[nextPlayerIndex].name === "Boarder door") {
          console.log(state.playersInfo)
          return setPlayerActiveForDoor(
            state,
            nextPlayerIndex,
            // action.player,
            state.activeCard
          )
          break
        } else {
          return {
            ...state,
            activeCard: null,
            trash: [...state.trash, state.activeCard],
            moveStatus: "exchangeCard",
            playersInfo: setPlayerStatus(state, nextPlayerIndex, {
              isTarget: "nextPlayer",
            }),
          }
          break
        }
      } else {
        return state
        break
      }
    }

    default: {
      return state
    }
  }
}

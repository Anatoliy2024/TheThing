import { delCardPLayerPack } from "../function-for-reduce"

export function useCardToMyself(
  state,
  indexActivePlayer,
  indexCard,
  activeCard
) {
  switch (activeCard.name) {
    case "Упорство":
      const newDeck = [...state.pack]
      const newTrash = [...state.trash]
      const cardsPerseverance = []
      for (let i = 0; i < 20; i++) {
        if (newDeck[newDeck.length - 1].property === "событие") {
          const newCard = newDeck.pop()
          cardsPerseverance.push(newCard)
          if (cardsPerseverance.length === 3) {
            break
          }
        } else {
          const newCard = newDeck.pop()
          newTrash.push(newCard)
        }
      }

      return {
        ...state,
        playersInfo: delCardPLayerPack(state, indexActivePlayer, indexCard, {
          clickCard: null,
        }),
        activeCard: activeCard,
        moveStatus: "useCard",
        isOpenModal: true,
        pack: newDeck,
        trash: newTrash,
        isCardPerseverance: cardsPerseverance,
      }
      break
    case "Гляди по сторонам":
      let newWay = state.wayGame === "right" ? "left" : "right"

      return {
        ...state,
        playersInfo: delCardPLayerPack(state, indexActivePlayer, indexCard, {
          clickCard: null,
        }),
        activeCard: activeCard,
        moveStatus: "trashCard",
        wayGame: newWay,
      }
      break
    default:
      return {
        ...state,
        playersInfo: delCardPLayerPack(state, indexActivePlayer, indexCard, {
          clickCard: null,
        }),
        activeCard: activeCard,
        moveStatus: "trashCard",
      }
  }
  //   if (activeCard.name === "Упорство") {
  //     return {
  //       ...state,
  //       playersInfo: delCardPLayerPack(state, indexActivePlayer, indexCard, {
  //         clickCard: null,
  //       }),
  //       activeCard: activeCard,
  //       moveStatus: "useCard",
  //     }
  //   } else if (activeCard.name === "Гляди по сторонам") {
  //     let newWay = state.wayGame === "right" ? "left" : "right"

  //     return {
  //       ...state,
  //       playersInfo: delCardPLayerPack(state, indexActivePlayer, indexCard, {
  //         clickCard: null,
  //       }),
  //       activeCard: activeCard,
  //       moveStatus: "trashCard",
  //       wayGame: newWay,
  //     }
  //   } else {
  //     return {
  //       ...state,
  //       playersInfo: delCardPLayerPack(state, indexActivePlayer, indexCard, {
  //         clickCard: null,
  //       }),
  //       activeCard: activeCard,
  //       moveStatus: "trashCard",
  //     }
  //   }
}

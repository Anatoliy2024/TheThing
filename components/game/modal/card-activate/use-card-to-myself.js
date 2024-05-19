import { delCardPLayerPack } from "../function-for-reduce"

export function useCardToMyself(
  state,
  indexActivePlayer,
  indexCard,
  activeCard
) {
  switch (activeCard.name) {
    case "Упорство":
      return {
        ...state,
        playersInfo: delCardPLayerPack(state, indexActivePlayer, indexCard, {
          clickCard: null,
        }),
        activeCard: activeCard,
        moveStatus: "useCard",
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

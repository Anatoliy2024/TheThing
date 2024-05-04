import { CARDS } from "../constants"

export function createPack(count) {
  console.log("Создание колоды")
  return CARDS.filter((card) => {
    if (card.pack <= count) {
      return card
    }
  })
}

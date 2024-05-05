import { CARDS, PLAYERS } from "../constants"

export function createPack(count) {
  console.log("Создание колоды")
  return CARDS.filter((card) => {
    if (card.pack <= count) {
      return card
    }
  })
}

export function createPlayerInfo(count) {
  return PLAYERS.slice(0, count).map((el) => {
    const newObject = {
      ...el,
      isRole: "survivor",
      time: 6000,
      playerDeck: [],
      isPlayerActive: false, //кто ходит в данный момент
      statusPlayer: "default",
    }
    console.log("render")
    return newObject
  })
}

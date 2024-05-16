import { CARDS, PLAYERS } from "../constants"

export function createPack(count) {
  console.log("Создание колоды")
  return CARDS.filter((card) => {
    if (card.pack <= count) {
      return card
    }
  })
}
//isPlayerActive: true| false  ////   active, nextPlayer,targetPlayer, death,bash,default
export function createPlayerInfo(count) {
  const players = PLAYERS.slice(0, count).map((el) => {
    const player = {
      ...el,
      isRole: "survivor",
      time: 6000,
      playerDeck: [],
      isPlayerActive: false, //кто ходит в данный момент
      statusPlayer: "default", // default,death,quarantine,
      countQuarantine: 0,
      isTarget: "noTarget", //noTarget,nextPlayer,targetPlayer,
      clickCard: null,
      exchangeCard: null,
      // activeCard: null,
    }
    console.log("render")
    return player
  })

  const randomPlayers = Math.floor(Math.random() * count)
  players[randomPlayers].isPlayerActive = true

  return players
}

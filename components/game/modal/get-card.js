export const getCard = (state) => {
  const { pack, playersInfo, options } = state

  const newPlayersInfo = [...playersInfo]
  console.log(newPlayersInfo)

  const newPack = [...pack]

  const theThing = newPack.splice(0, 1)[0]
  const packPanic = newPack.filter((el) => el.property === "паника")
  const packEvent = newPack.filter((el) => el.property === "событие")

  const intermediatePack = [...packPanic]

  if (options.theThing === "Раздается сразу") {
    const randomNumber = Math.floor(Math.random() * playersInfo.length)
    newPlayersInfo[randomNumber].playerDeck.push(theThing)
    newPlayersInfo[randomNumber].isRole = "theThing"
  } else if (options.theThing === "Рандом") {
    packEvent.push(theThing)
  } else if (options.theThing === "Находится в колоде") {
    intermediatePack.push(theThing)
  }

  let count = 0
  for (let i = 0; i < playersInfo.length * 4; i++) {
    const randomNumber = Math.floor(Math.random() * packEvent.length)
    // console.log(newPlayersInfo)
    if (newPlayersInfo[count].playerDeck.length < 4) {
      const randomCard = packEvent.splice(randomNumber, 1)[0]
      if (randomCard.name === "Нечто") {
        newPlayersInfo[count].isRole = "theThing"
      }
      newPlayersInfo[count].playerDeck.push(randomCard)
    } else {
      count++
      if (count === playersInfo.length) {
        break
      }
      const randomCard = packEvent.splice(randomNumber, 1)[0]
      newPlayersInfo[count].playerDeck.push(randomCard)
    }
  }
  const finishPack = shuffleArray([...intermediatePack, ...packEvent])

  return [[...newPlayersInfo], [...finishPack]]
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

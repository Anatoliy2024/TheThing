export function getMoveStatusInfo(state) {
  switch (state.moveStatus) {
    case "getCard":
      return "Возьмите карту"
      break
    case "selectCard":
      return "Выберите карту, а после активируйте или сбростье её"
      break
    case "activeCard":
      return "Стадия действия или сброса"
      break
    case "useCard":
      return "Выполните действие написанное на карте"
      break
    case "useBlockCard":
      return "стадия блокирования активной карты"
      break
    case "trashCard":
      return "Сбросьте карту в бито"
      break
    case "exchangeCard":
      return "Стадия обмена картами"
      break
  }

  // if (state.moveStatus === "getCard") {
  //   return "Возьмите карту"
  // } else if (state.moveStatus === "selectCard") {
  //   return "Выберите карту, а после активируйте или сбростье её"
  // } else if (state.moveStatus === "activeCard") {
  //   return "Стадия действия или сброса"
  // } else if (state.moveStatus === "useCard") {
  //   return "Выполните действие написанное на карте"
  // } else if(state.moveStatus === "useBlockCard"){
  //   return "стадия блокирования активной карты"
  // }  else if (state.moveStatus === "trashCard") {
  //   return "Сбросьте карту в бито"
  // } else if (state.moveStatus === "exchangeCard") {
  //   return "Стадия обмена"
  // }
}

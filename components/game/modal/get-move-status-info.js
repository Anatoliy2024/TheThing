export function getMoveStatusInfo(state) {
  if (state.moveStatus === "getCard") {
    return "Возьмите карту"
  } else if (state.moveStatus === "selectCard") {
    return "Выберите карту, а после активируйте или сбростье её"
  } else if (state.moveStatus === "activeCard") {
    return "Стадия действия или сброса"
  } else if (state.moveStatus === "useCard") {
    return "Выполните действие написанное на карте"
  } else if (state.moveStatus === "trashCard") {
    return "Сбросьте карту в бито"
  } else if (state.moveStatus === "exchangeCard") {
    return "Стадия обмена"
  }
}

// export function getMoveStatusInfo(state) {
//   if (state.moveStatus === "getCard") {
//     return "Пожалуста возьмите карту"
//   } else if (state.moveStatus === "selectCard") {
//     if (state.clickCard === null) {
//       return "Выберите карту которую хотите использовать"
//     } else {
//       if (state.clickCard.status === "active") {
//         return "Кликните на колоду активная карта, чтобы использовать или бито чтобы скинуть карту"
//       } else {
//         return "Карта не может быть использована, выберите другую карту или скиньте карту "
//       }
//     }
//   } else if (state.moveStatus === "activeCard") {
//     return "Воспользуйтесь свойством выбранной карты или следуйте действию тому что написано в панике"
//   } else if (state.moveStatus === "exchangeCard") {
//     return "Обменяйтеcь одной картой, со следующим по порядку хода игроком"
//   }
// }

import { UiButton } from "../../uikit/ui-button"
import { GAME_STATE_ACTIONS } from "../modal/option-players-reduce"

export function GameMenu({ optionPlayers, dispatch }) {
  const { status } = optionPlayers
  if (status !== "menu") return null
  return (
    <>
      <UiButton
        variant="menu"
        onClick={
          () =>
            dispatch({
              type: GAME_STATE_ACTIONS.STATUS,
              status: "option",
            }) /*setStatus("option")*/
        }
      >
        Новая игра
      </UiButton>
      <UiButton
        variant="menu"
        onClick={() =>
          dispatch({
            type: GAME_STATE_ACTIONS.STATUS,
            status: "searchGame",
          })
        }
      >
        Поиск игры
      </UiButton>
      <UiButton
        variant="menu"
        onClick={() =>
          dispatch({
            type: GAME_STATE_ACTIONS.STATUS,
            status: "statistics",
          })
        }
      >
        Статистика
      </UiButton>
    </>
  )
}

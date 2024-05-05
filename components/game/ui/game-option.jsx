import { UiButton } from "../../uikit/ui-button"
import { UiSelect } from "../../uikit/ui-select"
import { GAME_STATE_ACTIONS } from "../modal/option-players-reduce"
export function GameOption({ optionPlayers, dispatch }) {
  const { status } = optionPlayers
  if (status !== "option") return null
  // const handleSelectChange = (event, nameSelect) => {
  //   setOptions({ ...options, [nameSelect]: event.target.value })
  // }

  return (
    <>
      <div className="text-center">Option</div>
      <div className="flex flex-col gap-7">
        <UiSelect
          name="time"
          label="Время на ход"
          onChange={(event) =>
            dispatch({
              type: GAME_STATE_ACTIONS.OPTIONS,
              options: { time: event.target.value },
            })
          }
        >
          <option value="1 мин">1 мин</option>
          <option value="2 мин">2 мин</option>
          <option value="3 мин">3 мин</option>
          <option value="4 мин">4 мин</option>
          <option value="5 мин">5 мин</option>
          <option value="∞">∞</option>
        </UiSelect>
        <UiSelect
          name="theThing"
          label="Нечто"
          onChange={(event) =>
            dispatch({
              type: GAME_STATE_ACTIONS.OPTIONS,
              options: { theThing: event.target.value },
            })
          }
        >
          <option
            value="Рандом"
            title="Карта Нечто может быть: как в колоде, так и у любого из участников игры"
          >
            Рандом
          </option>
          <option value="Находится в колоде">Находится в колоде</option>
          <option
            value="Раздается сразу"
            title="Нечто раздается сразу, одному из игроков в начале игры"
          >
            Раздается сразу
          </option>
        </UiSelect>
        <UiSelect
          name="superCard"
          label="Особые карты"
          onChange={(event) =>
            dispatch({
              type: GAME_STATE_ACTIONS.OPTIONS,
              options: { superCard: event.target.value },
            })
          }

          // onChange={(event) => handleSelectChange(event, "superCard")}
        >
          <option value="Без супер карт">Без особых карт</option>
          <option
            value="Г.Ф. Лавкрафт"
            title="Посмотреть карты на руке любого выбранного игрока"
          >
            Г.Ф. Лавкрафт
          </option>
          <option
            value="Некрономикон"
            title="Любой выбранный игрок выбывает из игры"
          >
            Некрономикон
          </option>
          <option value="Обе карты">Обе карты</option>
        </UiSelect>
        <UiSelect
          name="mode"
          label="Режим игры"
          onChange={(event) =>
            dispatch({
              type: GAME_STATE_ACTIONS.OPTIONS,
              options: { mode: event.target.value },
            })
          }

          // onChange={(event) => handleSelectChange(event, "mode")}
        >
          <option value="Классика" title="Окончание игры, после сожжения Нечто">
            Классика
          </option>
          <option
            value="Хардкор"
            title="После сожжения Нечто игра не заканчивается. Зараженные игроки, будут мстить за смерть Нечто"
          >
            Хардкор
          </option>
        </UiSelect>
      </div>

      <UiButton
        variant="active"
        onClick={() =>
          dispatch({
            type: GAME_STATE_ACTIONS.STATUS,
            status: "search",
          })
        }
      >
        Создать карту
      </UiButton>
    </>
  )
}

import { UiButton } from "../../uikit/ui-button"

export function GameOption({ status, setStatus }) {
  if (status !== "option") return null

  return (
    <>
      <div className="text-center">Option</div>
      <div className="flex flex-col gap-7">
        <div>
          <select
            className="bg-lime-800 mr-2.5 rounded text-slate-950 "
            name="time"
            id="time"
          >
            <option value="1">1 мин</option>
            <option value="2">2 мин</option>
            <option value="3">3 мин</option>
            <option value="4">4 мин</option>
            <option value="5">5 мин</option>
            <option value="6">∞</option>
          </select>
          <label htmlFor="time">Время на ход</label>
        </div>
        <div>
          <select
            className="bg-lime-800 mr-2.5 rounded text-slate-950  "
            name=""
            id="thething"
          >
            <option
              value="1"
              title="Нечто раздается сразу одному из игроков в начале игры"
            >
              Раздается сразу
            </option>
            <option value="2">Находится в колоде</option>
            <option value="3">Рандом</option>
          </select>
          <label htmlFor="thething">Нечто</label>
        </div>
        <div>
          <select
            className="bg-lime-800 mr-2.5 rounded text-slate-950 "
            name=""
            id="thething"
          >
            <option value="1">Без супер карт</option>
            <option
              value="2"
              title="Посмотреть карты на руке любого выбранного игрока"
            >
              Г.Ф. Лавкрафт
            </option>
            <option value="3" title="Любой выбранный игрок выбывает из игры">
              Некрономикон
            </option>
            <option value="4">Обе карты</option>
          </select>
          <label htmlFor="thething">Супер карты</label>
        </div>
        <div>
          <select
            className="bg-lime-800 mr-2.5 rounded text-slate-950 "
            name=""
            id="mode"
          >
            <option value="1" title="Окончание игры, после сожжения Нечто">
              Классика
            </option>
            <option
              value="2"
              title="После сожжения Нечто игра не заканчивается. Зараженные игроки будут мстить за смерть Нечто"
            >
              Хардкор
            </option>
          </select>
          <label htmlFor="mode">Режим игры</label>
        </div>
      </div>

      <UiButton variant="active" onClick={() => setStatus("search")}>
        Создать карту
      </UiButton>
    </>
  )
}

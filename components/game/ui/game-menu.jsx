import { UiButton } from "../../uikit/ui-button"
export function GameMenu({ setStatus, status }) {
  console.log(status)
  if (status !== "menu") return null
  return (
    <>
      <UiButton variant="menu" onClick={() => setStatus("option")}>
        Новая игра
      </UiButton>
      <UiButton variant="menu" onClick={() => setStatus("search")}>
        Поиск игры
      </UiButton>
      <UiButton variant="menu" onClick={() => setStatus("statistics")}>
        Статистика
      </UiButton>
    </>
  )
}

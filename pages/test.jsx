export default function Test() {
  const players = [
    { id: 1, name: "Игрок 1" },
    { id: 2, name: "Игрок 2" },
    { id: 3, name: "Игрок 3" },
    { id: 4, name: "Игрок 4" },
    { id: 4, name: "Игрок 4" },
    { id: 4, name: "Игрок 4" },
    { id: 4, name: "Игрок 4" },
    { id: 4, name: "Игрок 4" },
    { id: 4, name: "Игрок 4" },
    // Добавьте остальных игроков по аналогии
  ]
  const angleIncrement = (2 * Math.PI) / players.length

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-64 h-64 border-2 border-gray-300 rounded-full">
        {players.map((player, index) => {
          const angle = angleIncrement * index
          const radius = 50
          const playerStyle = {
            position: "absolute",
            top: `${50 + Math.sin(angle) * radius}%`,
            left: `${50 + Math.cos(angle) * radius}%`,
            transform: "translate(-50%, -50%)", // Центрируем каждого персонажа
          }

          return (
            <div
              key={player.id}
              className="absolute bg-blue-500 text-white px-4 py-2 rounded-full"
              style={playerStyle}
            >
              {player.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}

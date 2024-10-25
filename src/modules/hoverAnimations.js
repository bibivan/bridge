export default () => {
  // Проверка, поддерживается ли hover на устройстве
  window.document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.rotating-box')

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect()

        // Позиция курсора относительно центра карточки
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        // Коэффициент для настройки интенсивности эффекта
        const intensity = 15

        // Вычисляем углы поворота
        const rotateX = (-y / (rect.height / 2)) * intensity
        const rotateY = (x / (rect.width / 2)) * intensity

        // Применяем трансформации
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
      })

      card.addEventListener('mouseleave', () => {
        // Сбрасываем трансформации при уходе курсора
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)'
      })
    })
  })
}

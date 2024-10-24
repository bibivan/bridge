export default () => {
  // Проверка, поддерживается ли hover на устройстве
  window.document.addEventListener('DOMContentLoaded', () => {
    // Проверка, поддерживается ли hover на устройстве
    const canHover = window.matchMedia('(hover: hover)').matches

    if (canHover) {
      const addHoverEffect = (box) => {
        let currentX = 0
        let currentY = 0
        let targetX = 0
        let targetY = 0
        let animationFrameId = null
        let isHovering = false

        const lerp = (start, end, t) => start + (end - start) * t

        const animate = () => {
          if (!isHovering) return

          // Плавное приближение к целевым значениям
          currentX = lerp(currentX, targetX, 0.1)
          currentY = lerp(currentY, targetY, 0.1)

          // Применяем ротацию и масштабирование
          box.style.transform = `rotateX(${currentY}deg) rotateY(${currentX}deg) scale(1.1)`

          animationFrameId = requestAnimationFrame(animate)
        }

        box.addEventListener('mousemove', (event) => {
          const { width, height, left, top } = box.getBoundingClientRect()

          // Координаты курсора относительно блока
          const x = event.clientX - left - width / 2
          const y = event.clientY - top - height / 2

          // Настройка вращения: поворот в сторону курсора
          // Поворачиваем по оси Y: уменьшаем ротацию по Y в сторону курсора
          targetX = -(x / width) * 30
          // Поворачиваем по оси X: уменьшаем ротацию по X в сторону курсора
          targetY = (y / height) * 30

          if (!isHovering) {
            isHovering = true
            animate()
          }
        })

        box.addEventListener('mouseleave', () => {
          isHovering = false
          cancelAnimationFrame(animationFrameId)
          box.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`
        })
      }

      // Применяем эффект ко всем элементам rotating-box только если устройство поддерживает hover
      const boxes = document.querySelectorAll('.rotating-box')
      boxes.forEach((box) => addHoverEffect(box))
    }
  })
}

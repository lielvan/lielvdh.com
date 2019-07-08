export default {
  isLiteral: true,
  inserted: (el, binding) => {
    let f = () => {
      let rect = el.getBoundingClientRect()
      let inView = (
        rect.width > 0 &&
        rect.height > 0 &&
        rect.top <= window.innerHeight - 125 //125px top offset
        // rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      )
      if (inView) {
        el.classList.add(binding.value)
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
    f()
  }
}
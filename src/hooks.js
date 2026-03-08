import { useState, useEffect, useRef, useCallback } from 'react'

export function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return ref
}

export function useCountUp(end, duration = 1800) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)
  const from = end > 100 ? end - 12 : 0

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.unobserve(el) } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    setCount(from)
    let t0 = null
    const step = (ts) => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(from + eased * (end - from)))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, end, from, duration])

  return [ref, count]
}

export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const h = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', h, { passive: true })
    return () => window.removeEventListener('mousemove', h)
  }, [])
  return pos
}

export function useDragScroll() {
  const ref = useRef(null)
  const state = useRef({ isDragging: false, startX: 0, scrollLeft: 0 })
  const [dragging, setDragging] = useState(false)

  const onPointerDown = useCallback((e) => {
    if (e.pointerType !== 'mouse') return
    state.current.isDragging = true
    state.current.startX = e.pageX - ref.current.offsetLeft
    state.current.scrollLeft = ref.current.scrollLeft
    setDragging(true)
  }, [])

  const onPointerMove = useCallback((e) => {
    if (!state.current.isDragging) return
    e.preventDefault()
    const x = e.pageX - ref.current.offsetLeft
    ref.current.scrollLeft = state.current.scrollLeft - (x - state.current.startX) * 1.5
  }, [])

  const onPointerUp = useCallback(() => {
    state.current.isDragging = false
    setDragging(false)
  }, [])

  useEffect(() => {
    document.addEventListener('pointerup', onPointerUp)
    return () => document.removeEventListener('pointerup', onPointerUp)
  }, [onPointerUp])

  return { ref, onPointerDown, onPointerMove, dragging }
}

import { useEffect, useRef, useState } from 'react'

/**
 * Wraps children and fades/slides them into view the first time they
 * scroll into the viewport. Uses IntersectionObserver so it only fires
 * once per element and costs nothing for content already off-screen.
 *
 * Usage:
 *   <Reveal><h2>Section title</h2></Reveal>
 *   <Reveal delay={150} as="li">Staggered item</Reveal>
 */
function Reveal({ children, className = '', delay = 0, as: Tag = 'div', ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect users who've asked for reduced motion — show immediately.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Reveal

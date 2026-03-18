"use client"

import { useEffect, useRef, useState } from "react"

type AnimationVariant = "up" | "left" | "right" | "scale" | "fade"

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  delay?: number
  variant?: AnimationVariant
}

const EASING = "cubic-bezier(0.22, 1, 0.36, 1)"
const DURATION = 650

const keyframes: Record<AnimationVariant, Keyframe[]> = {
  up:    [{ opacity: 0, transform: "translateY(28px)" }, { opacity: 1, transform: "translateY(0)" }],
  left:  [{ opacity: 0, transform: "translateX(-36px)" }, { opacity: 1, transform: "translateX(0)" }],
  right: [{ opacity: 0, transform: "translateX(36px)" }, { opacity: 1, transform: "translateX(0)" }],
  scale: [{ opacity: 0, transform: "scale(0.93)" }, { opacity: 1, transform: "scale(1)" }],
  fade:  [{ opacity: 0 }, { opacity: 1 }],
}

export function useInView(
  options: UseInViewOptions = {}
): [React.RefObject<HTMLDivElement>, boolean] {
  const {
    threshold = 0.15,
    rootMargin = "0px",
    triggerOnce = true,
    delay = 0,
    variant,
  } = options

  const ref = useRef<HTMLDivElement>(null!)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Check prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Hide element initially only if we'll animate it
    if (variant && !prefersReduced) {
      el.style.opacity = "0"
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)

          if (variant) {
            if (prefersReduced) {
              el.style.opacity = "1"
            } else {
              const frames = keyframes[variant]
              const anim = el.animate(frames, {
                duration: DURATION,
                delay,
                easing: EASING,
                fill: "forwards",
              })
              anim.onfinish = () => {
                el.style.opacity = "1"
                el.style.transform = "none"
              }
            }
          }

          if (triggerOnce) observer.unobserve(el)
        } else if (!triggerOnce) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce, delay, variant])

  return [ref, isInView]
}

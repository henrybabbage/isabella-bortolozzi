import gsap from 'gsap'
import { CustomEase } from 'gsap/dist/CustomEase'
import { Flip } from 'gsap/dist/Flip'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(CustomEase, Flip, ScrollTrigger)
}

// Defaults from https://basement.studio/blog/gsap-next-js-setup-the-bsmnt-way
const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2
const RECIPROCAL_GR = 1 / GOLDEN_RATIO
const DURATION = RECIPROCAL_GR
const DEFAULT_EASE = CustomEase.create('ease', '0.175, 0.885, 0.32, 1')
const PRIMARY_EASE = CustomEase.create('ease', 'M0,0 C0.62,0.05 0.01,0.99 1,1')

// Configuring GSAP with custom settings that aren't Tween-specific
gsap.config({
  autoSleep: 60,
  nullTargetWarn: false,
})

// Setting default animation properties that should be inherited by ALL tweens
gsap.defaults({
  duration: DURATION,
  ease: DEFAULT_EASE,
})

// Once the desired configurations are set, we simply export what we need to work with in the future.
export {
  CustomEase,
  DEFAULT_EASE,
  DURATION,
  Flip,
  GOLDEN_RATIO,
  gsap,
  PRIMARY_EASE,
  ScrollTrigger,
}

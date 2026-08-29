// Framer Motion animation presets
// Reusable variants for consistent motion across the app

export const spring = {
  type: 'spring',
  stiffness: 260,
  damping: 20,
}

export const springGentle = {
  type: 'spring',
  stiffness: 120,
  damping: 14,
}

export const springBouncy = {
  type: 'spring',
  stiffness: 400,
  damping: 15,
}

export const tween = {
  type: 'tween',
  ease: [0.22, 1, 0.36, 1],
  duration: 0.4,
}

export const tweenFast = {
  type: 'tween',
  ease: [0.22, 1, 0.36, 1],
  duration: 0.2,
}

export const tweenSlow = {
  type: 'tween',
  ease: [0.22, 1, 0.36, 1],
  duration: 0.6,
}

// === FADE VARIANTS ===
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: tween },
  exit: { opacity: 0, transition: tweenFast },
}

// === FADE + UP (most common) ===
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: tween },
  exit: { opacity: 0, y: -10, transition: tweenFast },
}

export const fadeUpStrong = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: tweenSlow },
  exit: { opacity: 0, y: -20, transition: tweenFast },
}

// === FADE + DOWN ===
export const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: tween },
  exit: { opacity: 0, y: 10, transition: tweenFast },
}

// === FADE + LEFT/RIGHT ===
export const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: tween },
  exit: { opacity: 0, x: 20, transition: tweenFast },
}

export const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: tween },
  exit: { opacity: 0, x: -20, transition: tweenFast },
}

// === SCALE ===
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: springGentle },
  exit: { opacity: 0, scale: 0.95, transition: tweenFast },
}

export const scaleBounce = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: springBouncy },
  exit: { opacity: 0, scale: 0.9, transition: tweenFast },
}

// === STAGGER CONTAINER ===
export const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
}

export const staggerContainerSlow = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
}

// === STAGGER ITEM (pair with container) ===
export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...tween, duration: 0.35 },
  },
}

export const staggerItemLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...tween, duration: 0.35 },
  },
}

export const staggerItemScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springGentle,
  },
}

// === HOVER / TAP PRESETS ===
export const hoverScale = {
  scale: 1.02,
  transition: springGentle,
}

export const hoverLift = {
  y: -4,
  transition: springGentle,
}

export const hoverGlow = {
  boxShadow: '0 0 32px rgba(99, 102, 241, 0.35)',
  transition: tween,
}

export const tapScale = {
  scale: 0.97,
  transition: tweenFast,
}

export const tapNone = {}

// === MODAL / OVERLAY VARIANTS ===
export const overlayFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

export const modalSlideUp = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springGentle,
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.98,
    transition: { duration: 0.15 },
  },
}

// === DROPDOWN / POPOVER ===
export const dropdownSlide = {
  hidden: { opacity: 0, y: -8, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...springGentle, duration: 0.2 },
  },
  exit: {
    opacity: 0,
    y: -4,
    scale: 0.98,
    transition: { duration: 0.12 },
  },
}

// === PAGE TRANSITION ===
export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { ...tween, duration: 0.35 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
}

// === SIDEBAR ===
export const sidebarItem = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: tween },
}

// === ACCORDION ===
export const accordionContent = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: { height: { ...springGentle, duration: 0.3 }, opacity: { duration: 0.2, delay: 0.05 } },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { height: { duration: 0.2 }, opacity: { duration: 0.1 } },
  },
}

// === PROGRESS BAR ===
export const progressFill = {
  hidden: { width: '0%' },
  visible: (value) => ({
    width: `${value}%`,
    transition: { ...tweenSlow, duration: 1 },
  }),
}

// === SCORE RING ===
export const ringStroke = {
  hidden: (circumference) => ({ strokeDashoffset: circumference }),
  visible: (offset) => ({
    strokeDashoffset: offset,
    transition: { ...tweenSlow, duration: 1.2 },
  }),
}

// === FLOATING / ORB ===
export const float = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export const floatSlow = {
  animate: {
    y: [0, -8, 0],
    x: [0, 4, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// === SPIN ===
export const spin = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  }
}

// === PULSE ===
export const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// === TYPING DOTS ===
export const typingDots = {
  animate: {
    y: [0, -6, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

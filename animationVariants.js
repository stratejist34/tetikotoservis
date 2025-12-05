// Animasyon Varyantları - Farklı efektler için
export const animationVariants = {
  // 1. Slide Up (varsayılan)
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  },

  // 2. Slide Right
  slideRight: {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  },

  // 3. Bounce In
  bounceIn: {
    hidden: { opacity: 0, scale: 0.3 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        bounce: 0.4
      }
    }
  },

  // 4. Fade In with Scale
  fadeScale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  },

  // 5. Flip In
  flipIn: {
    hidden: { opacity: 0, rotateX: -90 },
    visible: { 
      opacity: 1, 
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  },

  // 6. Zoom In
  zoomIn: {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }
};

// Hover animasyonları
export const hoverAnimations = {
  // Yumuşak yükselme
  lift: {
    whileHover: { 
      y: -5,
      transition: { duration: 0.3 }
    }
  },

  // Glow efekti
  glow: {
    whileHover: {
      boxShadow: "0 25px 50px rgba(102, 126, 234, 0.3)",
      transition: { duration: 0.3 }
    }
  },

  // Slight rotation
  rotate: {
    whileHover: {
      rotate: 1,
      transition: { duration: 0.3 }
    }
  },

  // Scale up
  scale: {
    whileHover: {
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  }
};

// Accordion animasyon varyantları
export const accordionAnimations = {
  // Accordion açılma animasyonu
  expand: {
    collapsed: { height: 0, opacity: 0 },
    expanded: { 
      height: "auto", 
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  },

  // Accordion açılma + slide
  expandSlide: {
    collapsed: { 
      height: 0, 
      opacity: 0,
      y: -20
    },
    expanded: { 
      height: "auto", 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  },

  // Zoom açılma
  expandZoom: {
    collapsed: { 
      height: 0, 
      opacity: 0,
      scale: 0.95
    },
    expanded: { 
      height: "auto", 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }
};

// Loading animasyonları
export const loadingAnimations = {
  // Pulse loading
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },

  // Shimmer loading
  shimmer: {
    backgroundPosition: ["-200px 0", "200px 0"],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear"
    }
  },

  // Skeleton loading
  skeleton: {
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Buton animasyonları
export const buttonAnimations = {
  // Hover fill effect
  hoverFill: {
    whileHover: {
      scale: 1.05,
      boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
      transition: { duration: 0.2 }
    },
    whileTap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  },

  // Ripple effect
  ripple: {
    whileTap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  },

  // Magnetic hover
  magnetic: {
    whileHover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 }
    }
  }
};

// Page transition efektleri
export const pageTransitions = {
  // Fade in
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  },

  // Slide up
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  },

  // Scale fade
  scaleFade: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 },
    transition: { duration: 0.3 }
  }
};

// Scroll-triggered animasyonlar
export const scrollAnimations = {
  // Fade in up
  fadeInUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  },

  // Fade in left
  fadeInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 }
  },

  // Fade in right
  fadeInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 }
  },

  // Zoom in
  zoomIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6 }
  }
};
// BrandAccordion Touch Support and Responsive Enhancements
// JavaScript for mobile touch interactions and responsive behavior

class BrandAccordionTouchSupport {
  constructor() {
    this.init();
  }

  init() {
    this.setupTouchDetection();
    this.setupResponsiveBehavior();
    this.setupAccessibility();
  }

  // Dokunmatik cihaz tespiti
  setupTouchDetection() {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
      this.addTouchSupport();
      document.body.classList.add('touch-device');
    } else {
      document.body.classList.add('no-touch-device');
    }
  }

  // Touch friendly interactions
  addTouchSupport() {
    const accordions = document.querySelectorAll('.brand-accordion-container');
    
    accordions.forEach(container => {
      const cards = container.querySelectorAll('.brand-card-link');
      
      cards.forEach(card => {
        // Touch start için genişletilmiş hit area
        card.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
        card.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
        
        // Long press detection
        card.addEventListener('touchstart', this.handleLongPress.bind(this), { passive: true });
        
        // Prevent zoom on double tap
        let touchStartTime = 0;
        let lastTouchEnd = 0;
        
        card.addEventListener('touchstart', () => {
          touchStartTime = Date.now();
        });
        
        card.addEventListener('touchend', (e) => {
          const timeDiff = Date.now() - lastTouchEnd;
          
          if (timeDiff < 300 && timeDiff > 50) {
            e.preventDefault();
            // Simulate click for double tap
            card.click();
          }
          
          lastTouchEnd = Date.now();
        });
      });
    });
  }

  handleTouchStart(e) {
    const card = e.currentTarget;
    card.classList.add('touch-active');
    
    // Genişletilmiş tıklanabilir alan
    const rect = card.getBoundingClientRect();
    const touch = e.touches[0];
    const touchX = touch.clientX;
    const touchY = touch.clientY;
    
    // Check if touch is within expanded hit area
    const expandedArea = {
      top: rect.top - 20,
      left: rect.left - 20,
      bottom: rect.bottom + 20,
      right: rect.right + 20
    };
    
    if (touchX < expandedArea.left || touchX > expandedArea.right || 
        touchY < expandedArea.top || touchY > expandedArea.bottom) {
      e.preventDefault();
    }
  }

  handleTouchEnd(e) {
    const card = e.currentTarget;
    setTimeout(() => {
      card.classList.remove('touch-active');
    }, 100);
  }

  handleLongPress(e) {
    const card = e.currentTarget;
    let pressTimer;
    
    card.addEventListener('touchstart', () => {
      pressTimer = setTimeout(() => {
        card.classList.add('long-press');
      }, 500);
    });
    
    card.addEventListener('touchend', () => {
      clearTimeout(pressTimer);
      card.classList.remove('long-press');
    });
    
    card.addEventListener('touchmove', () => {
      clearTimeout(pressTimer);
    });
  }

  // Responsive behavior adjustments
  setupResponsiveBehavior() {
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        
        if (width <= 480) {
          document.body.classList.add('mobile-small');
          document.body.classList.remove('mobile-large', 'tablet', 'desktop');
        } else if (width <= 768) {
          document.body.classList.add('mobile-large');
          document.body.classList.remove('mobile-small', 'tablet', 'desktop');
        } else if (width <= 1024) {
          document.body.classList.add('tablet');
          document.body.classList.remove('mobile-small', 'mobile-large', 'desktop');
        } else {
          document.body.classList.add('desktop');
          document.body.classList.remove('mobile-small', 'mobile-large', 'tablet');
        }
        
        this.adjustForBreakpoint(width);
      }
    });
    
    const containers = document.querySelectorAll('.brand-accordion-container');
    containers.forEach(container => {
      resizeObserver.observe(container);
    });
  }

  adjustForBreakpoint(width) {
    const accordions = document.querySelectorAll('.brand-accordion-container');
    
    accordions.forEach(container => {
      const cards = container.querySelectorAll('.brand-card-link');
      
      if (width <= 480) {
        // Very small mobile adjustments
        cards.forEach((card, index) => {
          // Reduce animation durations
          card.style.transitionDuration = '0.3s';
          
          // Adjust hover behavior for touch
          if (card.classList.contains('group')) {
            card.addEventListener('click', () => {
              cards.forEach(c => c.classList.remove('active'));
              card.classList.add('active');
            });
          }
        });
      } else if (width <= 768) {
        // Mobile adjustments
        cards.forEach(card => {
          card.style.transitionDuration = '0.4s';
        });
      } else {
        // Desktop behavior
        cards.forEach(card => {
          card.style.transitionDuration = '';
        });
      }
    });
  }

  // Accessibility improvements
  setupAccessibility() {
    const accordions = document.querySelectorAll('.brand-accordion-container');
    
    accordions.forEach(container => {
      const cards = container.querySelectorAll('.brand-card-link');
      
      cards.forEach((card, index) => {
        // Add ARIA attributes
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Go to ${card.querySelector('h3')?.textContent || 'brand page'}`);
        
        // Keyboard navigation
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
          }
        });
        
        // Focus management
        card.addEventListener('focus', () => {
          card.style.outline = '2px solid #3b82f6';
          card.style.outlineOffset = '2px';
        });
        
        card.addEventListener('blur', () => {
          card.style.outline = '';
        });
      });
    });
  }

  // Performance optimizations for mobile
  setupPerformanceOptimizations() {
    // Reduce animations on low-end devices
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.setProperty('--animation-duration', '0.1s');
    }
    
    // Lazy load images on mobile
    if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('.brand-card-link img');
      images.forEach(img => {
        img.loading = 'lazy';
      });
    }
    
    // Optimize for battery saver mode
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        const optimizeForBattery = () => {
          const isLowPower = battery.charging === false && battery.level < 0.2;
          
          if (isLowPower) {
            document.documentElement.classList.add('low-power-mode');
            // Disable heavy animations
            document.documentElement.style.setProperty('--animation-duration', '0.1s');
          } else {
            document.documentElement.classList.remove('low-power-mode');
            document.documentElement.style.setProperty('--animation-duration', '0.6s');
          }
        };
        
        battery.addEventListener('levelchange', optimizeForBattery);
        battery.addEventListener('chargingchange', optimizeForBattery);
        optimizeForBattery();
      });
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new BrandAccordionTouchSupport();
  });
} else {
  new BrandAccordionTouchSupport();
}

// Export for use in other modules
window.BrandAccordionTouchSupport = BrandAccordionTouchSupport;
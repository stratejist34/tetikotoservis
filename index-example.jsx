import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index-example.css';

// Gelişmiş accordion komponenti
const AdvancedAccordion = ({ brands, animationType = "slideUp" }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
      return;
    }

    setIsLoading(true);
    
    // Loading efekti için küçük bir gecikme
    await new Promise(resolve => setTimeout(resolve, 200));
    
    setActiveIndex(index);
    setIsLoading(false);
  };

  const accordionVariants = {
    collapsed: { height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 },
    expanded: { 
      height: "auto", 
      opacity: 1,
      paddingTop: 20,
      paddingBottom: 20,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="advanced-accordion">
      {brands.map((brand, index) => (
        <motion.div
          key={index}
          className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          custom={index}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
        >
          <motion.div
            className={`accordion-header ${activeIndex === index ? 'active' : ''}`}
            onClick={() => handleToggle(index)}
            whileTap={{ scale: 0.98 }}
          >
            <div className="brand-info">
              <motion.div 
                className="brand-logo"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                {brand.logo}
              </motion.div>
              <div className="brand-details">
                <h3 className="brand-name">{brand.name}</h3>
                <p className="service-type">{brand.serviceType}</p>
              </div>
            </div>
            
            <motion.div
              className="accordion-icon"
              animate={{ rotate: activeIndex === index ? 45 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                className="accordion-content"
                variants={accordionVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <div className="content-wrapper">
                  <motion.p 
                    className="service-description"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {brand.description}
                  </motion.p>
                  
                  <motion.div 
                    className="service-features"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {brand.features.map((feature, featureIndex) => (
                      <motion.div 
                        key={featureIndex} 
                        className="feature"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + featureIndex * 0.1 }}
                      >
                        <motion.div 
                          className="feature-icon"
                          whileHover={{ scale: 1.2 }}
                        >
                          ✓
                        </motion.div>
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <motion.button 
                    className="detail-button"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Detaylı İncele</span>
                    <motion.div 
                      className="button-shine"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              className="loading-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="spinner" />
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

// Ana uygulama bileşeni
const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const brands = [
    {
      name: "HYUNDAI",
      serviceType: "ÖZEL SERVİS",
      logo: "HY",
      description: "Orijinal yedek parça ve uzman teknisyenlerle Hyundai aracınız için garantili bakım ve onarım hizmeti.",
      features: ["Garantili servis", "Orijinal yedek parça", "Uzman teknisyen"]
    },
    {
      name: "KIA",
      serviceType: "ÖZEL SERVİS",
      logo: "KI",
      description: "Kia modelleri için profesyonel bakım, mekanik onarım ve yedek parça çözümleri.",
      features: ["Profesyonel bakım", "Mekanik onarım", "Yedek parça çözümleri"]
    },
    {
      name: "NISSAN",
      serviceType: "ÖZEL SERVİS",
      logo: "NI",
      description: "Nissan Qashqai, Juke ve Micra gibi tüm modeller için uzman servis hizmeti.",
      features: ["Tüm modeller", "Uzman servis", "Kaliteli hizmet"]
    },
    {
      name: "TOYOTA",
      serviceType: "ÖZEL SERVİS",
      logo: "TO",
      description: "Corolla, Auris, Yaris ve diğer Toyota modelleri için hibrit dahil tam kapsamlı servis.",
      features: ["Hibrit sistem uzmanı", "Tam kapsamlı servis", "Tüm Toyota modelleri"]
    }
  ];

  return (
    <motion.div 
      className="app"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <motion.h1 
          className="section-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          MARK A SERVİSLERİMİZ
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <AdvancedAccordion brands={brands} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default App;
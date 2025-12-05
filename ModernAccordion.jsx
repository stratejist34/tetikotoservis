import React, { useState } from 'react';
import './ModernAccordion.css';

const ModernAccordion = ({ brands }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {brands.map((brand, index) => (
        <div 
          key={index} 
          className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div 
            className={`accordion-header ${activeIndex === index ? 'active' : ''}`}
            onClick={() => handleToggle(index)}
          >
            <div className="brand-info">
              <div className="brand-logo">
                {brand.logo}
              </div>
              <div className="brand-details">
                <h3 className="brand-name">{brand.name}</h3>
                <p className="service-type">{brand.serviceType}</p>
              </div>
            </div>
            <svg className="accordion-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          
          <div className={`accordion-content ${activeIndex === index ? 'active' : ''}`}>
            <p className="service-description">
              {brand.description}
            </p>
            <div className="service-features">
              {brand.features.map((feature, featureIndex) => (
                <div className="feature" key={featureIndex}>
                  <div className="feature-icon">✓</div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <button 
              className="detail-button"
              onClick={(e) => {
                e.stopPropagation();
                // Navigasyon veya modal işlemi
                console.log(`${brand.name} detay sayfasına yönlendiriliyor...`);
              }}
            >
              Detaylı İncele
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Kullanım örneği:
const App = () => {
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
    <div className="container">
      <h1 className="section-title">MARKA SERVİSLERİMİZ</h1>
      <ModernAccordion brands={brands} />
    </div>
  );
};

export default App;
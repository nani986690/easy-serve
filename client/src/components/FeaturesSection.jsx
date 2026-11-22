import React from 'react';

export default function FeaturesSection() {
  const features = [
    {
      icon: 'fa-solid fa-bolt',
      title: 'Fast Ordering',
      desc: 'Place your order in seconds directly from your table',
    },
    {
      icon: 'fa-solid fa-mobile-screen-button',
      title: 'Contactless Dining',
      desc: 'Safe, hygienic and seamless digital dining experience',
    },
    {
      icon: 'fa-solid fa-utensils',
      title: 'Real-Time Updates',
      desc: 'Track preparation status directly to delivery',
    },
    {
      icon: 'fa-solid fa-users',
      title: 'Better Service',
      desc: 'More time to enjoy quality food with family & friends',
    },
  ];

  return (
    <section className="features-section">
      <div className="features-grid">
        {features.map((f, i) => (
          <div key={i} className="feature-card">
            <div className="feature-icon">
              <i className={f.icon}></i>
            </div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      num: 1,
      cls: 'step-1',
      icon: 'fa-solid fa-qrcode',
      title: '1. Scan QR Code',
      desc: 'Scan the QR code on your table to identify your seat',
    },
    {
      num: 2,
      cls: 'step-2',
      icon: 'fa-solid fa-book-open',
      title: '2. Browse Menu',
      desc: 'Explore fresh starters, main courses, desserts & drinks',
    },
    {
      num: 3,
      cls: 'step-3',
      icon: 'fa-solid fa-cart-shopping',
      title: '3. Place Order',
      desc: 'Customize quantities and send orders straight to kitchen',
    },
    {
      num: 4,
      cls: 'step-4',
      icon: 'fa-solid fa-plate-wheat',
      title: '4. Enjoy Your Meal',
      desc: 'Our staff freshly prepares and delivers right to your table',
    },
  ];

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="section-subtitle">HOW IT WORKS</div>
      <h2 className="section-title">
        Simple Steps to a <span>Better Dining Experience</span>
      </h2>
      <div className="steps-container">
        {steps.map((s) => (
          <div key={s.num} className={`step-card ${s.cls}`}>
            <div className="step-icon-box">
              <i className={s.icon}></i>
            </div>
            <h4>{s.title}</h4>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

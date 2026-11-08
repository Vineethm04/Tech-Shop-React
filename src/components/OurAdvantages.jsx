import servicesData from '../data/servicesData';
import './OurAdvantages.css';

function OurAdvantages() {
  return (
    <section className="our-advantages-section">
      <h2>Our Advantages</h2>

      <div className="advantages-container">
        {servicesData.map((service) => {
          const Icon = service.icon;

          return (
            <div className="advantage-item" key={service.id}>
              <div className="advantage-icon">
                <Icon />
              </div>

              <div className="advantage-information">
                <h3>{service.title}</h3>
                <p>{service.info}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default OurAdvantages;

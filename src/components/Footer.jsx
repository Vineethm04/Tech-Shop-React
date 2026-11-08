import { footMenu, footSocial } from '../data/footerData';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-newsletter">
          <h2>Tech-Shop</h2>

          <p>
            Subscribe to our newsletter to receive the latest
            updates, offers and deals.
          </p>

          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email address"
              aria-label="Email address"
            />

            <button type="button">Subscribe</button>
          </div>
        </div>

        <div className="footer-menu-container">
          {footMenu.map((section) => (
            <div className="footer-menu" key={section.id}>
              <h3>{section.title}</h3>

              <ul>
                {section.menu.map((item) => (
                  <li key={item.id}>
                    <a href={item.path}>{item.link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p>2026 Tech-Shop. All Rights Reserved.</p>

        <div className="footer-social-icons">
          {footSocial.map((social) => {
            const Icon = social.icon;

            return (
              <a
                key={social.id}
                href={social.path}
                aria-label={`Social media link ${social.id}`}
              >
                <Icon />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

export default Footer;

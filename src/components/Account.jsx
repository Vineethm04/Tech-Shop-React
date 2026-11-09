import { useState } from 'react';
import { X } from 'lucide-react';
import './Account.css';

function Account({ onClose }) {
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Frontend only: authentication is not connected to a backend.
  };

  return (
    <div className="account-overlay" onClick={onClose}>
      <div
        className={`account-popup ${
          isSignup ? 'account-popup-signup' : 'account-popup-login'
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="account-close"
          onClick={onClose}
          aria-label="Close account popup"
        >
          <X size={20} />
        </button>

        <h2>{isSignup ? 'Signup' : 'Login'}</h2>

        <p className="account-switch-text">
          {isSignup
            ? 'Already have an account?'
            : 'New to Tech-Shop?'}{' '}

          <button
            type="button"
            onClick={() => setIsSignup((previous) => !previous)}
          >
            {isSignup ? 'Login' : 'Create an account'}
          </button>
        </p>

        <form className="account-form" onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              placeholder="Username"
              aria-label="Username"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            aria-label="Email"
            required
          />

          <input
            type="password"
            placeholder="Password"
            aria-label="Password"
            required
          />

          {isSignup && (
            <input
              type="password"
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              required
            />
          )}

          <button className="account-submit" type="submit">
            {isSignup ? 'Signup' : 'Login'}
          </button>
        </form>

        <div className="account-divider">
          <span></span>
          <p>or login with</p>
          <span></span>
        </div>

        <div className="account-social-buttons">
          <button type="button" className="facebook-button">
            Facebook
          </button>

          <button type="button" className="google-button">
            Google
          </button>

          <button type="button" className="twitter-button">
            Twitter
          </button>
        </div>
      </div>
    </div>
  );
}

export default Account;

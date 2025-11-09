import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Feedback() {
  const router = useRouter();
  const [stage, setStage] = useState(1); // 1: rating, 2: comment, 3: thank you
  const [rating, setRating] = useState(0);
  const [feedbackId, setFeedbackId] = useState(null);
  const [comments, setComments] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  useEffect(() => {
    // Parse URL parameters
    const { r, utm_campaign, utm_term, utm_content } = router.query;
    
    if (r) {
      const initialRating = parseInt(r);
      if (initialRating >= 1 && initialRating <= 5) {
        setRating(initialRating);
        
        // Record initial rating immediately
        recordFeedback(initialRating, utm_campaign, utm_term, utm_content);
      }
    }

    // Show comment section after 3 seconds
    const timer = setTimeout(() => {
      setStage(2);
    }, 3000);

    return () => clearTimeout(timer);
  }, [router.query]);

  const recordFeedback = async (ratingValue, campaign, term, content) => {
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: ratingValue,
          utm_campaign: campaign,
          utm_term: term,
          utm_content: content,
        }),
      });

      const data = await response.json();
      if (data.success && data.id) {
        setFeedbackId(data.id);
      }
    } catch (error) {
      console.error('Error recording feedback:', error);
    }
  };

  const updateRating = async (newRating) => {
    setRating(newRating);
    
    if (feedbackId) {
      try {
        await fetch(`/api/feedback/${feedbackId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            rating: newRating,
          }),
        });
      } catch (error) {
        console.error('Error updating rating:', error);
      }
    }
  };

  const handleFinish = async () => {
    if (feedbackId && comments.trim()) {
      try {
        await fetch(`/api/feedback/${feedbackId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            comments: comments.trim(),
          }),
        });
      } catch (error) {
        console.error('Error submitting comments:', error);
      }
    }
    setStage(3);
  };

  const renderStars = (size = 'large') => {
    const displayRating = hoveredStar || rating;
    return (
      <div 
        className={`star-rating ${size === 'large' ? 'star-rating-small' : ''}`}
        onMouseLeave={() => setHoveredStar(0)}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= displayRating ? 'star-filled' : ''}`}
            onClick={() => updateRating(star)}
            onMouseEnter={() => setHoveredStar(star)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Feedback - Thank You</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>

      {/* Background Effects */}
      <div className="background-container">
        <div className="gradient-background">
          <svg className="hidden">
            <defs>
              <filter id="blurMe">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo"></feColorMatrix>
                <feBlend in="SourceGraphic" in2="goo"></feBlend>
              </filter>
            </defs>
          </svg>
          <div className="gradients-container">
            <div className="gradient-orb gradient-orb-1"></div>
            <div className="gradient-orb gradient-orb-2"></div>
            <div className="gradient-orb gradient-orb-3"></div>
            <div className="gradient-orb gradient-orb-4"></div>
            <div className="gradient-orb gradient-orb-5"></div>
          </div>
        </div>

        <div className="stars-container">
          <canvas id="starsCanvas" className="stars-canvas"></canvas>
        </div>

        <div className="bottom-glow-container">
          <svg className="bottom-glow-svg">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#2EB9DF', stopOpacity: 0 }}></stop>
                <stop offset="100%" style={{ stopColor: '#9E00FF', stopOpacity: 1 }}></stop>
              </linearGradient>
            </defs>
          </svg>
          <div className="bottom-gradient"></div>
          <div className="bottom-glow-orb"></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="main-content">
        <header className="header"></header>

        {stage === 1 && (
          <div className="hero-section">
            <section className="hero-content">
              <div className="hero-spacing">
                <h1 className="hero-title">Thank you, your rating has been submitted.</h1>
                {renderStars('large')}
                <p className="hero-terms">
                 
                </p>
              </div>
            </section>
          </div>
        )}

        {stage === 2 && (
          <div className="hero-section">
            <section className="hero-content">
              <div className="hero-spacing">
                <h2 className="hero-title">Optional feedback</h2>
                <p className="hero-description">
                  Help us understand your rating better by providing optional comments.
                </p>
                <div className="upload-container">
                  {renderStars('large')}
                  <textarea
                    id="feedback-comments"
                    rows="4"
                    placeholder=""
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="feedback-textarea"
                  />
                  <div className="hero-actions">
                    <button onClick={handleFinish} className="btn-verify">
                      Finish
                      <span aria-hidden="true" className="btn-verify-arrow">→</span>
                    </button>
                  </div>
                </div>
                <p className="hero-terms">
                  This feedback is anonymous and will help us improve our service.
                </p>
              </div>
            </section>
          </div>
        )}

        {stage === 3 && (
          <div className="hero-section">
            <section className="hero-content">
              <div className="hero-spacing">
                <h1 className="hero-title" style={{ fontSize: '4rem' }}>Thank you</h1>
                 <p className="hero-description">
                  Your feedback is greatly appreciated.
                </p>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
          Copyright 2025
        
      </footer>

      <style jsx>{`
        .star-rating {
          font-size: 20px;
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          margin: 2rem 0;
        }

        .star-rating-small {
          font-size: 8rem;
          margin: 1rem 0;
        }

        .star {
          cursor: pointer;
          color: rgba(255, 255, 255, 0.2);
          transition: all 0.2s;
          user-select: none;
        }

        .star:hover {
          transform: scale(1.1);
        }

        .star-filled {
          color: #fbbf24;
          text-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
        }

        .feedback-textarea {
          width: 100%;
          padding: 1rem;
          border-radius: 0.5rem;
          background-color: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--color-white);
          font-size: 1rem;
          font-family: inherit;
          resize: vertical;
          margin-bottom: 1rem;
        }

        .feedback-textarea:focus {
          outline: 2px solid var(--color-blue-500);
          outline-offset: 2px;
          border-color: var(--color-blue-400);
        }

        .feedback-textarea::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
      `}</style>

      
    </>
  );
}

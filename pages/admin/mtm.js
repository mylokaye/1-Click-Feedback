import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import BentoBox from '../../components/BentoBox';

export default function AdminMtM() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mtmCampaigns = ['Newsletter', 'Signup', 'Inquiry'];

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/feedback/stats/mtm');
      if (!response.ok) throw new Error('Failed to fetch statistics');
      const data = await response.json();
      setStats(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Admin Dashboard - Moments that Matter</title>
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

        <div className="admin-container">
          <div className="admin-header">
            <h1 className="admin-title">Moments that Matter (MtM)</h1>
            <div className="admin-nav">
              <Link href="/admin/lob" className="nav-link">
                LoB
              </Link>
              <Link href="/admin/mtm" className="nav-link nav-link-active">
                MtM
              </Link>
            </div>
          </div>

          {loading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading statistics...</p>
            </div>
          )}

          {error && (
            <div className="error-state">
              <p>Error: {error}</p>
              <button onClick={fetchStats} className="btn-verify">
                Retry
              </button>
            </div>
          )}

          {!loading && !error && stats && (
            <div className="bento-grid">
              {mtmCampaigns.map((campaign) => (
                <BentoBox
                  key={campaign}
                  title={campaign}
                  average={stats[campaign]?.average || 0}
                  count={stats[campaign]?.count || 0}
                  lastUpdated={stats[campaign]?.lastUpdated}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <a href="https://pattens.tech" className="footer-link">
          Copyright 2025
        </a>
      </footer>

      <style jsx>{`
        .admin-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .admin-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--color-white);
          margin: 0;
        }

        .admin-nav {
          display: flex;
          gap: 1rem;
          background: rgba(30, 41, 59, 0.5);
          padding: 0.5rem;
          border-radius: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .nav-link {
          padding: 0.5rem 1.5rem;
          border-radius: 0.375rem;
          color: var(--color-slate-300);
          text-decoration: none;
          transition: all 0.2s;
          font-weight: 500;
        }

        .nav-link:hover {
          color: var(--color-white);
          background: rgba(255, 255, 255, 0.1);
        }

        .nav-link-active {
          background: var(--color-blue-600);
          color: var(--color-white);
        }

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .loading-state,
        .error-state {
          text-align: center;
          padding: 4rem 2rem;
          color: var(--color-white);
        }

        .loading-state p,
        .error-state p {
          margin-top: 1rem;
          font-size: 1.125rem;
        }

        @media (max-width: 768px) {
          .admin-title {
            font-size: 2rem;
          }

          .bento-grid {
            grid-template-columns: 1fr;
          }

          .admin-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <script dangerouslySetInnerHTML={{
        __html: `
          // Stars Animation
          const canvas = document.getElementById('starsCanvas');
          if (canvas) {
            const ctx = canvas.getContext('2d');
            
            function resizeCanvas() {
              canvas.width = window.innerWidth;
              canvas.height = window.innerHeight;
            }
            
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            
            class Star {
              constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random();
                this.fadeSpeed = (Math.random() - 0.5) * 0.01;
              }
              
              update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
                
                this.opacity += this.fadeSpeed;
                if (this.opacity <= 0 || this.opacity >= 1) this.fadeSpeed *= -1;
              }
              
              draw() {
                ctx.fillStyle = 'rgba(255, 255, 255, ' + this.opacity + ')';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
              }
            }
            
            const stars = [];
            for (let i = 0; i < 150; i++) {
              stars.push(new Star());
            }
            
            function animate() {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              stars.forEach(star => {
                star.update();
                star.draw();
              });
              requestAnimationFrame(animate);
            }
            
            animate();
          }
        `
      }} />
    </>
  );
}

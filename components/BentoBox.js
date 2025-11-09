export default function BentoBox({ title, average, count, lastUpdated }) {
  // Determine color based on average rating
  const getColor = (avg) => {
    if (avg === 0) return { bg: '#334155', text: '#94a3b8' }; // No data - gray
    if (avg >= 3.8) return { bg: '#22c55e', text: '#ffffff' }; // Green
    if (avg >= 3.0) return { bg: '#f97316', text: '#ffffff' }; // Orange
    return { bg: '#ef4444', text: '#ffffff' }; // Red
  };

  const color = getColor(parseFloat(average));
  const percentage = (parseFloat(average) / 5) * 100;

  const formatDate = (dateString) => {
    if (!dateString) return 'No data yet';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bento-box">
      <h3 className="bento-title">{title}</h3>
      
      <div className="gauge-container">
        <svg viewBox="0 0 200 120" className="gauge-svg">
          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="20"
            strokeLinecap="round"
          />
          {/* Progress arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke={color.bg}
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray={`${(percentage / 100) * 251.2} 251.2`}
            className="gauge-progress"
          />
        </svg>
        
        <div className="gauge-value" style={{ color: color.bg }}>
          {average > 0 ? parseFloat(average).toFixed(1) : '—'}
        </div>
        <div className="gauge-label">out of 5</div>
      </div>

      <div className="bento-stats">
        <div className="stat-item">
          <span className="stat-label">Total Feedback:</span>
          <span className="stat-value">{count}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Last Updated:</span>
          <span className="stat-value">{formatDate(lastUpdated)}</span>
        </div>
      </div>

      <style jsx>{`
        .bento-box {
          background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          backdrop-filter: blur(10px);
          transition: all 0.3s;
        }

        .bento-box:hover {
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.4);
        }

        .bento-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--color-white);
          text-align: center;
          margin: 0;
        }

        .gauge-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .gauge-svg {
          width: 100%;
          max-width: 200px;
          height: auto;
        }

        .gauge-progress {
          transition: stroke-dasharray 0.5s ease;
        }

        .gauge-value {
          position: absolute;
          top: 60%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 3rem;
          font-weight: 700;
          line-height: 1;
        }

        .gauge-label {
          font-size: 0.875rem;
          color: var(--color-slate-300);
          margin-top: -1rem;
        }

        .bento-stats {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stat-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stat-label {
          color: var(--color-slate-400);
          font-size: 0.875rem;
        }

        .stat-value {
          color: var(--color-white);
          font-weight: 500;
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .bento-box {
            padding: 1.5rem;
          }

          .bento-title {
            font-size: 1.25rem;
          }

          .gauge-value {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
}

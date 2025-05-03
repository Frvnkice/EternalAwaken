import React, { useState, useEffect, useRef } from 'react';
import './Awaken.css';

const getRandomSymbol = () => {
  const symbols = '日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ0123456789';
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const generateSymbolLines = (count: number) => {
  return Array(count).fill(null).map(() => ({
    symbols: Array(20).fill(null).map(() => getRandomSymbol()),
    delay: Math.random() * 10
  }));
};

// Define a type for valid ranks
type Rank = 'S' | 'A' | 'B' | 'C' | 'D' | 'E';

// Define rankOrder outside component to be reusable
const rankOrder: Record<Rank, number> = {
  'S': 6,
  'A': 5,
  'B': 4,
  'C': 3,
  'D': 2,
  'E': 1
};

const determineRank = (): Rank => {
  const random = Math.random() * 100;
  
  if (random < 25) return 'E';      // 25%
  if (random < 60) return 'D';      // 35%
  if (random < 90) return 'C';      // 30%
  if (random < 98) return 'B';      // 8%
  if (random < 99.4) return 'A';    // 1.4%
  return 'S';                       // 0.6%
};

const Awaken = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);
  const [showFlash, setShowFlash] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [newRank, setNewRank] = useState<Rank | ''>('');
  const [isImproved, setIsImproved] = useState(false);
  const rank = localStorage.getItem('rank') as Rank | null;
  const symbolLinesRef = useRef(generateSymbolLines(50));

  const handleAwaken = () => {
    if (pulseCount >= 5) {
      setShowFlash(true);
      const determinedRank = determineRank();
      setNewRank(determinedRank);
      
      setTimeout(() => {
        setShowFlash(false);
        const currentRank = localStorage.getItem('rank') as Rank | null;
        
        const isImprovement = !currentRank || 
          (determinedRank && (!currentRank || rankOrder[determinedRank] > rankOrder[currentRank]));
        
        setIsImproved(isImprovement);
        
        if (isImprovement) {
          setShowNotification(true);
          localStorage.setItem('rank', determinedRank);
        
          setTimeout(() => {
            setShowNotification(false);
            window.location.reload();
          }, 5000);
        } else {
          setShowNotification(true);
        
          setTimeout(() => {
            setShowNotification(false);
            window.location.reload();
          }, 5000);
        }
      }, 500);
    }
  };

  useEffect(() => {
    if (isHovering && pulseCount < 5) {
      const timer = setTimeout(() => {
        setPulseCount(prev => prev + 1);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isHovering, pulseCount]);

  return (
    <div className="awaken-container">
      {showFlash && <div className="screen-flash" />}
      {showNotification && (
        <div className={`rank-notification ${isImproved ? 'success' : ''}`}>
          <h2>Awakening Result</h2>
          {isImproved ? (
            <>
              <p>Congratulations on your rank increase!</p>
              <div className="rank">{newRank} Rank</div>
            </>
          ) : (
            <>
              <div className="rank">{rank} Rank</div>
              <p>Current rank remains unchanged :(</p>
              <p>Try again next time!</p>
            </>
          )}
        </div>
      )}
      <div className="matrix-background">
        {symbolLinesRef.current.map((line, i) => (
          <div key={i} className="symbol-line" style={{ 
            left: `${i * 2}%`,
            animationDelay: `${line.delay}s`
          }}>
            {line.symbols.map((symbol, j) => (
              <span key={j} className="symbol" style={{
                animationDelay: `${Math.random() * 2}s`
              }}>
                {symbol}
              </span>
            ))}
          </div>
        ))}
      </div>
      <button
        className={`awaken-button ${isHovering ? 'loading' : ''} ${pulseCount >= 5 ? 'active' : ''}`}
        onMouseEnter={() => {
          setIsHovering(true);
          setPulseCount(0);
        }}
        onMouseLeave={() => {
          setIsHovering(false);
          setPulseCount(0);
        }}
        onClick={handleAwaken}
      >
        <div className="loading-border loading-border-left"></div>
        <div className="loading-border loading-border-right"></div>
        <div className="loading-border loading-border-bottom-left"></div>
        <div className="loading-border loading-border-bottom-right"></div>
        <div className="loading-border loading-border-left-side"></div>
        <div className="loading-border loading-border-right-side"></div>
        <div className="pulse-effect" />
        {rank ? 'Re-evaluation' : 'Awaken'}
      </button>
    </div>
  );
};

export default Awaken;
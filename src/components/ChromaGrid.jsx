import React from 'react';
import "./ChromaGrid.css";

export const ChromaGrid = ({
  items,
  className = "",
  radius = 300,
  columns = 3,
  rows = 2,
}) => {
  const handleCardMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleCardClick = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className={`chroma-grid ${className}`}
      style={{
        "--r": `${radius}px`,
        "--cols": columns,
        "--rows": rows,
      }}
    >
      {items.map((item, i) => (
        <article
          key={i}
          className="chroma-card"
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(item.url)}
          style={{
            "--card-border": item.borderColor || "transparent",
            "--card-gradient": item.gradient,
            cursor: item.url ? "pointer" : "default",
          }}
        >
          <div className="chroma-content">
            <div className="chroma-header">
              <h3 className="chroma-title">{item.title || item.name || item.driver}</h3>
              {item.handle && <span className="chroma-handle">{item.handle}</span>}
            </div>
            <div className="chroma-body">
              <p className="chroma-main-value">{item.value || item.points || item.probability}</p>
              <p className="chroma-subtitle">{item.subtitle || item.team || `${item.points} points`}</p>
              {item.date && <span className="chroma-detail">{item.date}</span>}
              {item.circuit && <span className="chroma-detail">{item.circuit}</span>}
              {item.probability && <span className="chroma-detail">{item.probability}% probability</span>}
              {item.engine && <span className="chroma-detail">{item.engine}</span>}
              {item.reliability && <span className="chroma-detail">{item.reliability}% reliability</span>}
              {item.avgQuali && <span className="chroma-detail">Avg Quali: {item.avgQuali}</span>}
              {item.podiums && <span className="chroma-detail">Podiums: {item.podiums}</span>}
            </div>
          </div>
        </article>
      ))}
      <div className="chroma-overlay" />
      <div className="chroma-fade" />
    </div>
  );
};

export default ChromaGrid; 
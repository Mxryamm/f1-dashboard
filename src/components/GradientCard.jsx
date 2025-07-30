import React from 'react';

const GradientCard = ({ children, className = "" }) => {
  return (
    <div className={`group relative rounded-2xl p-px overflow-hidden ${className}`}>
      <span className="absolute inset-0 rounded-full overflow-hidden">
        <span className="inset-0 absolute pointer-events-none select-none">
          <span
            className="block -translate-x-1/2 -translate-y-1/3 size-24 blur-xl"
            style={{background: 'linear-gradient(135deg, rgb(122, 105, 249), rgb(242, 99, 120), rgb(245, 131, 63))'}}
          />
        </span>
      </span>

      <span
        className="inset-0 absolute pointer-events-none select-none"
        style={{animation: '10s ease-in-out 0s infinite alternate none running border-glow-translate'}}
      >
        <span
          className="block z-0 h-full w-12 blur-xl -translate-x-1/2 rounded-full"
          style={{animation: '10s ease-in-out 0s infinite alternate none running border-glow-scale', background: 'linear-gradient(135deg, rgb(122, 105, 249), rgb(242, 99, 120), rgb(245, 131, 63))'}}
        />
      </span>

      <span className="relative z-[1] bg-f1-card/90 backdrop-blur-xl rounded-2xl w-full h-full block">
        {children}
      </span>
    </div>
  );
};

export default GradientCard; 
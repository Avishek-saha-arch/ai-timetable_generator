import React from 'react';

const Card = React.forwardRef(({ children, className = '', noPadding = false, hover = false, ...props }, ref) => {
  const { glass = false, ...rest } = props;
  const base = `${glass ? '' : 'bg-white dark:bg-[#1E293B]'} rounded-[20px] border border-slate-200/80 dark:border-slate-700/80 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all duration-300`;
  const padding = noPadding ? '' : 'p-6 sm:p-8';
  const hoverStyle = hover
    ? 'hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-0.5 hover:border-slate-300 dark:hover:border-slate-600'
    : '';

  return (
    <div ref={ref} className={`${base} ${padding} ${hoverStyle} ${className}`} {...rest}>
      {children}
    </div>
  );
});
Card.displayName = 'Card';

export default Card;

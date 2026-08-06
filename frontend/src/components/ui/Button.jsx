import React from 'react';

const Button = React.forwardRef(({ children, variant = 'primary', size = 'md', className = '', ...props }, ref) => {
  const baseStyle =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-[12px] transition-all duration-200 active:scale-[0.97] outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary: 'bg-[#FFA20A] text-white hover:bg-[#E69209] focus:ring-[#FFA20A] shadow-md shadow-[#FFA20A]/20',
    secondary: 'bg-[#416F7D] text-white hover:bg-[#284A50] focus:ring-[#416F7D] shadow-md shadow-[#416F7D]/20',
    accent: 'bg-[#0F172A] text-white hover:bg-slate-800 focus:ring-slate-900 shadow-md',
    outline:
      'border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800 shadow-sm',
    ghost: 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-500/20',
    glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-lg',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base rounded-[14px]',
    xl: 'px-8 py-4 text-lg font-bold rounded-[16px]',
  };

  return (
    <button ref={ref} className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
});
Button.displayName = 'Button';

export default Button;

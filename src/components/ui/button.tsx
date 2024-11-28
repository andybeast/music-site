interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'default' | 'outline';
    size?: 'default' | 'sm' | 'lg';
  }
  
  export function Button({ 
    children, 
    className = "", 
    variant = 'default',
    size = 'default',
    disabled,
    ...props 
  }: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-20";
    
    const variants = {
      default: "bg-white text-black hover:bg-primary/90",
      outline: "border border-input bg-white hover:bg-accent hover:text-accent-foreground"
    };
  
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3",
      lg: "h-11 px-8"
    };
  
    return (
      <button 
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
  
  
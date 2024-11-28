interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
  }
  
  export function Card({ children, className = "", ...props }: CardProps) {
    return (
      <div 
        className={`bg-zinc-900 dark:bg-gray-800 rounded-lg shadow-lg ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
  
  export function CardHeader({ children, className = "", ...props }: CardProps) {
    return (
      <div 
        className={`px-6 py-4 border-b border-zinc-900 dark:border-zinc-700 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
  
  export function CardContent({ children, className = "", ...props }: CardProps) {
    return (
      <div 
        className={`p-6 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
  
  export function CardTitle({ children, className = "", ...props }: CardProps) {
    return (
      <h2 
        className={`text-4xl font-bold text-white dark:text-gray-100 ${className}`}
        {...props}
      >
        {children}
      </h2>
    );
  }
  
  
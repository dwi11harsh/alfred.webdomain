interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'neo-outset neo-rounded-sm neo-hover neo-active font-medium transition-all duration-200'
  
  const variantClasses = {
    primary: 'bg-[var(--bg-secondary)] text-[var(--text-primary)]',
    secondary: 'bg-[var(--bg-tertiary)] text-[var(--text-primary)]',
    outline: 'neo-border bg-transparent text-[var(--text-primary)]',
  }
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

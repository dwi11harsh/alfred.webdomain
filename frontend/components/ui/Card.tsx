interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'outset' | 'inset' | 'flat'
}

export default function Card({
  children,
  className = '',
  variant = 'outset',
}: CardProps) {
  const variantClasses = {
    outset: 'neo-outset',
    inset: 'neo-inset',
    flat: 'neo-flat',
  }
  
  return (
    <div className={`neo-rounded-lg p-6 ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  )
}

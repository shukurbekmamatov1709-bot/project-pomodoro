


import type { ReactNode } from "react"

type CardProps = {
  children: ReactNode
  className?: string
}

export const Card = ({ children, className }: CardProps) => (
  <div className={`rounded-2xl shadow-xl flex flex-col ${className}`}>
    {children}
  </div>
)
export default Card





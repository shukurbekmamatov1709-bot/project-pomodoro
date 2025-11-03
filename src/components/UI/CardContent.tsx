

import type { ReactNode } from "react"

type CardContentProps = {
  children: ReactNode
  className?: string
}
export const CardContent = ({ children, className }:CardContentProps) => (
  <div className={`p-4 pt-0 ${className}`}>{children}</div>
)
export default CardContent


import type { ReactNode } from "react"

type CardHeaderProps = {
  children: ReactNode
  className?: string
}

export const CardHeader = ({ children, className }:CardHeaderProps) => (
  <div className={`flex flex-col p-4 ${className}`}>{children}</div>
)
export default CardHeader
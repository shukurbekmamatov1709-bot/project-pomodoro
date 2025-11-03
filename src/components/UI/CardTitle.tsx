

import type { ReactNode } from "react"

type CardTitleProps = {
  children: ReactNode
  className?: string
}




export const CardTitle = ({ children, className }:CardTitleProps) => (
  <h3 className={`text-2xl font-semibold ${className}`}>{children}</h3>
)
export default CardTitle
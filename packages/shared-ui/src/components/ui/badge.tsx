import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@portfolio/shared-ui"

// Import the variants from the new file
import { badgeVariants } from "./badge-variants"

// FIX: 'interface' to 'type' + Readonly<> for SonarQube (typescript:S6759)
export type BadgeProps = Readonly<
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>
>

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

// FIX: Only export the React component for ESLint Fast Refresh
export { Badge }
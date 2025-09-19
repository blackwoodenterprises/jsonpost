import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const loadingVariants = cva(
  "animate-spin rounded-full border-solid border-t-transparent",
  {
    variants: {
      variant: {
        default: "border-primary",
        secondary: "border-secondary",
        muted: "border-muted-foreground",
        destructive: "border-destructive",
      },
      size: {
        sm: "h-4 w-4 border-2",
        default: "h-6 w-6 border-2",
        lg: "h-8 w-8 border-2",
        xl: "h-12 w-12 border-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(loadingVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
LoadingSpinner.displayName = "LoadingSpinner"

// Full page loading component
export interface LoadingPageProps {
  title?: string
  description?: string
  className?: string
}

const LoadingPage = React.forwardRef<HTMLDivElement, LoadingPageProps>(
  ({ title = "Loading...", description, className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900",
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {title}
            </h2>
            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }
)
LoadingPage.displayName = "LoadingPage"

// Card loading component
export interface LoadingCardProps {
  title?: string
  description?: string
  className?: string
}

const LoadingCard = React.forwardRef<HTMLDivElement, LoadingCardProps>(
  ({ title = "Loading...", description, className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex items-center justify-center py-12",
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="text-center space-y-4">
          <LoadingSpinner />
          <div className="space-y-2">
            <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }
)
LoadingCard.displayName = "LoadingCard"

// Button loading component
export interface LoadingButtonProps {
  children: React.ReactNode
  loading?: boolean
  loadingText?: string
  className?: string
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, loading = false, loadingText, className, disabled, ...props }, ref) => {
    return (
      <button
        className={className}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <LoadingSpinner size="sm" variant="secondary" />
            <span>{loadingText || "Loading..."}</span>
          </div>
        ) : (
          children
        )}
      </button>
    )
  }
)
LoadingButton.displayName = "LoadingButton"

export { LoadingSpinner, LoadingPage, LoadingCard, LoadingButton, loadingVariants }
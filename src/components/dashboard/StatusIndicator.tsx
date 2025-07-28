import { Badge } from "@/components/ui/badge"

interface StatusIndicatorProps {
  status: "running" | "stopped" | "error" | "pending" | "warning"
  text?: string
  size?: "sm" | "default" | "lg"
}

export function StatusIndicator({ status, text, size = "default" }: StatusIndicatorProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "running":
        return {
          variant: "default" as const,
          className: "bg-success text-success-foreground border-success/20",
          dot: "bg-success"
        }
      case "stopped":
        return {
          variant: "secondary" as const,
          className: "bg-muted text-muted-foreground border-muted/40",
          dot: "bg-muted-foreground"
        }
      case "error":
        return {
          variant: "destructive" as const,
          className: "bg-destructive text-destructive-foreground border-destructive/20",
          dot: "bg-destructive"
        }
      case "pending":
        return {
          variant: "outline" as const,
          className: "bg-warning text-warning-foreground border-warning/20",
          dot: "bg-warning animate-pulse"
        }
      case "warning":
        return {
          variant: "outline" as const,
          className: "bg-warning text-warning-foreground border-warning/20",
          dot: "bg-warning"
        }
      default:
        return {
          variant: "default" as const,
          className: "",
          dot: "bg-primary"
        }
    }
  }

  const config = getStatusConfig()

  return (
    <Badge variant={config.variant} className={`inline-flex items-center gap-1.5 ${config.className}`}>
      <div className={`w-2 h-2 rounded-full ${config.dot}`} />
      {text || status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}
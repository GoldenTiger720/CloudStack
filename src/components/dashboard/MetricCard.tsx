import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: number
    positive: boolean
  }
  status?: "success" | "warning" | "destructive" | "default"
  className?: string
}

export function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  status = "default",
  className = ""
}: MetricCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case "success": return "text-success"
      case "warning": return "text-warning"
      case "destructive": return "text-destructive"
      default: return "text-primary"
    }
  }

  const getTrendColor = () => {
    if (!trend) return ""
    return trend.positive ? "text-success" : "text-destructive"
  }

  return (
    <Card className={`bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300 animate-fade-in ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${getStatusColor()}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground mb-1">
          {value}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mb-2">
            {description}
          </p>
        )}
        {trend && (
          <div className="flex items-center gap-2">
            <Badge 
              variant={trend.positive ? "default" : "destructive"}
              className={`text-xs ${getTrendColor()}`}
            >
              {trend.positive ? "+" : ""}{trend.value}%
            </Badge>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
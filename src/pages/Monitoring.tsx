import { useState } from "react"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { StatusIndicator } from "@/components/dashboard/StatusIndicator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Activity, 
  Search,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Cpu,
  MemoryStick,
  HardDrive,
  Network,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Eye
} from "lucide-react"

export default function Monitoring() {
  const [searchTerm, setSearchTerm] = useState("")
  const [timeRange, setTimeRange] = useState("24h")

  const systemMetrics = [
    {
      title: "CPU Usage",
      value: "68%",
      description: "Average across all nodes",
      icon: Cpu,
      trend: { value: 5, positive: false },
      status: "warning" as const,
      threshold: 80
    },
    {
      title: "Memory Usage",
      value: "45%",
      description: "Total RAM utilization",
      icon: MemoryStick,
      trend: { value: 2, positive: true },
      status: "success" as const,
      threshold: 85
    },
    {
      title: "Disk I/O",
      value: "234 MB/s",
      description: "Combined read/write",
      icon: HardDrive,
      trend: { value: 12, positive: true },
      status: "default" as const,
      threshold: 500
    },
    {
      title: "Network Traffic",
      value: "1.2 GB/s",
      description: "Total bandwidth usage",
      icon: Network,
      trend: { value: 8, positive: false },
      status: "success" as const,
      threshold: 2
    }
  ]

  const alerts = [
    {
      id: "alert-1",
      severity: "critical",
      title: "High CPU Usage",
      description: "CPU usage on node-03 has exceeded 90% for 15 minutes",
      instance: "web-server-01",
      timestamp: "2024-02-15 14:30:00",
      status: "active",
      duration: "15m"
    },
    {
      id: "alert-2", 
      severity: "warning",
      title: "Disk Space Low",
      description: "Available disk space below 20% on volume vol-001",
      instance: "db-primary",
      timestamp: "2024-02-15 13:45:00",
      status: "acknowledged",
      duration: "1h 5m"
    },
    {
      id: "alert-3",
      severity: "info",
      title: "Network Latency",
      description: "Increased response time detected on network interface",
      instance: "api-gateway",
      timestamp: "2024-02-15 12:20:00",
      status: "resolved",
      duration: "2h 30m"
    },
    {
      id: "alert-4",
      severity: "warning",
      title: "Memory Usage High",
      description: "Memory usage approaching threshold on cache server",
      instance: "cache-redis",
      timestamp: "2024-02-15 11:15:00",
      status: "active",
      duration: "3h 15m"
    }
  ]

  const performanceData = [
    {
      instance: "web-server-01",
      status: "healthy",
      cpu: 72,
      memory: 58,
      disk: 34,
      network: 1.2,
      uptime: "5d 12h",
      alerts: 1
    },
    {
      instance: "db-primary",
      status: "warning",
      cpu: 45,
      memory: 78,
      disk: 89,
      network: 0.8,
      uptime: "12d 8h",
      alerts: 1
    },
    {
      instance: "api-gateway",
      status: "healthy",
      cpu: 35,
      memory: 42,
      disk: 23,
      network: 2.1,
      uptime: "8d 16h",
      alerts: 0
    },
    {
      instance: "cache-redis",
      status: "critical",
      cpu: 89,
      memory: 92,
      disk: 45,
      network: 0.3,
      uptime: "3d 4h",
      alerts: 2
    },
    {
      instance: "worker-node-03",
      status: "healthy",
      cpu: 28,
      memory: 35,
      disk: 67,
      network: 0.5,
      uptime: "15d 2h",
      alerts: 0
    }
  ]

  const filteredAlerts = alerts.filter(alert =>
    alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.instance.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive'
      case 'warning': return 'outline'
      case 'info': return 'secondary'
      default: return 'default'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'success'
      case 'warning': return 'warning'
      case 'critical': return 'error'
      default: return 'default'
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Monitoring</h1>
          <p className="text-muted-foreground">System performance and health monitoring</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* System Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemMetrics.map((metric, index) => (
          <MetricCard
            key={metric.title}
            {...metric}
            className={`animation-delay-${index * 100}`}
          />
        ))}
      </div>

      {/* Alert Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold text-destructive">
                  {alerts.filter(a => a.status === 'active').length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Healthy Instances</p>
                <p className="text-2xl font-bold text-success">
                  {performanceData.filter(p => p.status === 'healthy').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold text-primary">245ms</p>
              </div>
              <Clock className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">System Load</p>
                <p className="text-2xl font-bold text-warning">2.45</p>
              </div>
              <Zap className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview Chart Placeholder */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Performance Trends - {timeRange}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-secondary rounded-lg flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Performance charts will be displayed here</p>
              <p className="text-sm">Connected to monitoring data for {timeRange}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instance Performance Table */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Instance Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Instance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>CPU</TableHead>
                <TableHead>Memory</TableHead>
                <TableHead>Disk</TableHead>
                <TableHead>Network</TableHead>
                <TableHead>Uptime</TableHead>
                <TableHead>Alerts</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {performanceData.map((instance) => (
                <TableRow key={instance.instance} className="hover:bg-background/50">
                  <TableCell className="font-medium">{instance.instance}</TableCell>
                  <TableCell>
                    <StatusIndicator status={getStatusColor(instance.status) as any} />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{instance.cpu}%</span>
                        {instance.cpu > 80 ? (
                          <TrendingUp className="w-3 h-3 text-destructive" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-success" />
                        )}
                      </div>
                      <Progress value={instance.cpu} className="h-1" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{instance.memory}%</span>
                      </div>
                      <Progress value={instance.memory} className="h-1" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{instance.disk}%</span>
                      </div>
                      <Progress value={instance.disk} className="h-1" />
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{instance.network} GB/s</TableCell>
                  <TableCell className="text-sm">{instance.uptime}</TableCell>
                  <TableCell>
                    {instance.alerts > 0 ? (
                      <Badge variant="destructive" className="text-xs">
                        {instance.alerts}
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs">
                        0
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Alerts Section */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Recent Alerts
            </CardTitle>
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.severity === 'critical' ? 'bg-destructive' : 
                  alert.severity === 'warning' ? 'bg-warning' : 'bg-primary'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{alert.title}</span>
                    <Badge variant="outline" className="text-xs">{alert.instance}</Badge>
                    <Badge variant={alert.status === 'resolved' ? 'secondary' : alert.status === 'acknowledged' ? 'outline' : 'destructive'} className="text-xs">
                      {alert.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">{alert.description}</div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{alert.timestamp}</span>
                    <span>Duration: {alert.duration}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getSeverityColor(alert.severity) as any} className="text-xs">
                    {alert.severity}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
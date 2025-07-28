import { MetricCard } from "@/components/dashboard/MetricCard"
import { StatusIndicator } from "@/components/dashboard/StatusIndicator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Server, 
  Network, 
  HardDrive, 
  Users, 
  Cpu, 
  MemoryStick, 
  Activity,
  AlertTriangle,
  Plus,
  RefreshCw
} from "lucide-react"
import { useTranslation } from "react-i18next"

export default function Dashboard() {
  const { t } = useTranslation()
  
  const kpiData = [
    {
      title: t('dashboard.totalInstances'),
      value: 142,
      description: t('dashboard.activeVirtualMachines'),
      icon: Server,
      trend: { value: 12, positive: true },
      status: "success" as const
    },
    {
      title: t('dashboard.cpuUsage'),
      value: "68%",
      description: t('dashboard.clusterAverage'),
      icon: Cpu,
      trend: { value: 5, positive: false },
      status: "warning" as const
    },
    {
      title: t('dashboard.memoryUsage'), 
      value: "45%",
      description: t('dashboard.totalRamUtilization'),
      icon: MemoryStick,
      trend: { value: 2, positive: true },
      status: "success" as const
    },
    {
      title: t('dashboard.storageUsed'),
      value: "2.3TB",
      description: t('dashboard.ofTotalStorage', { total: '4.5TB' }),
      icon: HardDrive,
      trend: { value: 8, positive: false },
      status: "default" as const
    },
    {
      title: t('dashboard.networks'),
      value: 24,
      description: t('dashboard.virtualNetworks'),
      icon: Network,
      status: "success" as const
    },
    {
      title: t('dashboard.activeUsers'),
      value: 18,
      description: t('dashboard.loggedInUsers'),
      icon: Users,
      status: "default" as const
    }
  ]

  const recentInstances = [
    { name: "web-server-01", status: "running", type: "m1.large", ip: "192.168.1.10" },
    { name: "db-primary", status: "running", type: "m1.xlarge", ip: "192.168.1.20" },
    { name: "worker-node-03", status: "stopped", type: "m1.medium", ip: "192.168.1.30" },
    { name: "cache-redis", status: "pending", type: "m1.small", ip: "192.168.1.40" },
    { name: "api-gateway", status: "error", type: "m1.large", ip: "192.168.1.50" },
  ]

  const alerts = [
    { message: t('alerts.highCpuUsage', { server: 'web-server-01' }), severity: "warning", time: "2 min ago" },
    { message: t('alerts.diskSpaceLow', { volume: 'vol-001' }), severity: "error", time: "5 min ago" },
    { message: t('alerts.networkLatencySpike'), severity: "warning", time: "10 min ago" },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('dashboard.title')}</h1>
          <p className="text-muted-foreground">{t('dashboard.subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            {t('dashboard.refresh')}
          </Button>
          <Button size="sm" className="bg-gradient-primary hover:shadow-glow">
            <Plus className="w-4 h-4 mr-2" />
            {t('dashboard.quickCreate')}
          </Button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiData.map((metric, index) => (
          <MetricCard
            key={metric.title}
            {...metric}
            className={`animation-delay-${index * 100}`}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Instances */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Server className="w-5 h-5 text-primary" />
                {t('dashboard.recentInstances')}
              </span>
              <Button variant="ghost" size="sm">{t('dashboard.viewAll')}</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentInstances.map((instance) => (
                <div key={instance.name} className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Server className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{instance.name}</div>
                      <div className="text-xs text-muted-foreground">{instance.type} • {instance.ip}</div>
                    </div>
                  </div>
                  <StatusIndicator status={instance.status as any} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                {t('dashboard.recentAlerts')}
              </span>
              <Badge variant="destructive" className="text-xs">
                3 {t('dashboard.active')}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.severity === 'error' ? 'bg-destructive' : 'bg-warning'
                  }`} />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{alert.message}</div>
                    <div className="text-xs text-muted-foreground">{alert.time}</div>
                  </div>
                  <Badge variant={alert.severity === 'error' ? 'destructive' : 'outline'} className="text-xs">
                    {t(`alerts.${alert.severity}`)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resource Usage Chart Placeholder */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            {t('dashboard.resourceUsageTrends')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-secondary rounded-lg flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>{t('dashboard.resourceUsageChartsMessage')}</p>
              <p className="text-sm">{t('dashboard.connectedToMonitoring')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
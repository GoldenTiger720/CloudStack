import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
  AlertTriangle, 
  Search,
  Filter,
  Download,
  RefreshCw,
  User,
  Settings,
  Shield,
  Database,
  Network,
  Server,
  Eye,
  Calendar,
  Clock
} from "lucide-react"

export default function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterSeverity, setFilterSeverity] = useState("all")
  const [dateRange, setDateRange] = useState("24h")

  const auditLogs = [
    {
      id: "log-1a2b3c4d",
      timestamp: "2024-02-15 14:35:22",
      user: "john.anderson@company.com",
      action: "Instance Created",
      resource: "web-server-04",
      resourceType: "instance",
      severity: "info",
      ip: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      details: "Created new instance with flavor m1.large",
      status: "success"
    },
    {
      id: "log-2b3c4d5e",
      timestamp: "2024-02-15 14:28:15",
      user: "sarah.chen@company.com",
      action: "Security Group Modified",
      resource: "web-servers",
      resourceType: "security",
      severity: "warning",
      ip: "192.168.1.101",
      userAgent: "Mozilla/5.0 (macOS; Intel Mac OS X 10_15_7)",
      details: "Added new inbound rule for port 8080",
      status: "success"
    },
    {
      id: "log-3c4d5e6f",
      timestamp: "2024-02-15 14:15:08",
      user: "system",
      action: "Failed Login Attempt",
      resource: "authentication",
      resourceType: "security",
      severity: "critical",
      ip: "203.0.113.45",
      userAgent: "curl/7.68.0",
      details: "Multiple failed login attempts from suspicious IP",
      status: "blocked"
    },
    {
      id: "log-4d5e6f7g",
      timestamp: "2024-02-15 13:58:44",
      user: "emma.t@company.com",
      action: "User Role Changed",
      resource: "david.kim@company.com",
      resourceType: "user",
      severity: "warning",
      ip: "192.168.1.102",
      userAgent: "Mozilla/5.0 (Ubuntu; Linux x86_64)",
      details: "Changed user role from Viewer to Developer",
      status: "success"
    },
    {
      id: "log-5e6f7g8h",
      timestamp: "2024-02-15 13:45:12",
      user: "michael.rodriguez@company.com",
      action: "Volume Deleted",
      resource: "temp-volume-001",
      resourceType: "storage",
      severity: "warning",
      ip: "192.168.1.103",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      details: "Permanently deleted volume temp-volume-001 (50GB)",
      status: "success"
    },
    {
      id: "log-6f7g8h9i",
      timestamp: "2024-02-15 13:32:30",
      user: "system",
      action: "Network Configuration",
      resource: "production-vpc",
      resourceType: "network",
      severity: "info",
      ip: "internal",
      userAgent: "OpenStack Service",
      details: "Automatic network configuration update",
      status: "success"
    },
    {
      id: "log-7g8h9i0j",
      timestamp: "2024-02-15 12:55:18",
      user: "john.anderson@company.com",
      action: "Settings Updated",
      resource: "system-config",
      resourceType: "system",
      severity: "info",
      ip: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      details: "Updated system backup configuration",
      status: "success"
    },
    {
      id: "log-8h9i0j1k",
      timestamp: "2024-02-15 12:20:45",
      user: "system",
      action: "Backup Completed",
      resource: "database-backup-daily",
      resourceType: "storage",
      severity: "info",
      ip: "internal",
      userAgent: "Backup Service",
      details: "Daily database backup completed successfully",
      status: "success"
    }
  ]

  const activitySummary = [
    { action: "Instance Operations", count: 45, icon: Server },
    { action: "User Management", count: 12, icon: User },
    { action: "Security Changes", count: 8, icon: Shield },
    { action: "Network Operations", count: 23, icon: Network },
    { action: "Storage Operations", count: 18, icon: Database },
    { action: "System Configuration", count: 6, icon: Settings }
  ]

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = filterType === "all" || log.resourceType === filterType
    const matchesSeverity = filterSeverity === "all" || log.severity === filterSeverity
    
    return matchesSearch && matchesType && matchesSeverity
  })

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'instance': return Server
      case 'user': return User
      case 'security': return Shield
      case 'network': return Network
      case 'storage': return Database
      case 'system': return Settings
      default: return Settings
    }
  }

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
      case 'success': return 'success'
      case 'blocked': return 'destructive'
      case 'failed': return 'destructive'
      default: return 'default'
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Audit Logs</h1>
          <p className="text-muted-foreground">Track system activities and security events</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Events</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Events</p>
                <p className="text-2xl font-bold text-destructive">8</p>
              </div>
              <Shield className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold text-success">15</p>
              </div>
              <User className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Failed Attempts</p>
                <p className="text-2xl font-bold text-warning">23</p>
              </div>
              <Eye className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Summary */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Activity Summary - Last {dateRange}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {activitySummary.map((activity) => {
              const Icon = activity.icon
              return (
                <div key={activity.action} className="p-4 bg-background/50 rounded-lg text-center">
                  <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-sm font-medium mb-1">{activity.action}</div>
                  <div className="text-2xl font-bold text-primary">{activity.count}</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="bg-gradient-card shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Resource Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="instance">Instances</SelectItem>
                <SelectItem value="user">Users</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="network">Network</SelectItem>
                <SelectItem value="storage">Storage</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[120px]">
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
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-primary" />
            Audit Logs ({filteredLogs.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead className="text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => {
                const ResourceIcon = getResourceIcon(log.resourceType)
                return (
                  <TableRow key={log.id} className="hover:bg-background/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <div className="text-sm">
                          <div>{log.timestamp.split(' ')[0]}</div>
                          <div className="text-muted-foreground">{log.timestamp.split(' ')[1]}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{log.user}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <ResourceIcon className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{log.action}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm font-medium">{log.resource}</div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {log.resourceType}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getSeverityColor(log.severity) as any} className="text-xs">
                        {log.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(log.status) as any} className="text-xs">
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                    <TableCell className="text-right">
                      <div className="text-sm text-muted-foreground max-w-xs truncate">
                        {log.details}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
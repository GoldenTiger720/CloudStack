import { useState } from "react"
import { StatusIndicator } from "@/components/dashboard/StatusIndicator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Shield, 
  Plus,
  Search,
  MoreVertical,
  Lock,
  Unlock,
  Settings,
  Trash2,
  Edit,
  Eye,
  AlertTriangle,
  CheckCircle,
  Network
} from "lucide-react"

export default function Security() {
  const [searchTerm, setSearchTerm] = useState("")

  const securityGroups = [
    {
      id: "sg-1a2b3c4d",
      name: "web-servers",
      description: "Security group for web server instances",
      status: "active",
      instances: 8,
      rules: [
        { type: "inbound", protocol: "HTTP", port: "80", source: "0.0.0.0/0" },
        { type: "inbound", protocol: "HTTPS", port: "443", source: "0.0.0.0/0" },
        { type: "inbound", protocol: "SSH", port: "22", source: "10.0.0.0/8" }
      ],
      created: "2024-01-15",
      modified: "2024-02-10"
    },
    {
      id: "sg-2b3c4d5e",
      name: "database-tier",
      description: "Database servers security group",
      status: "active",
      instances: 3,
      rules: [
        { type: "inbound", protocol: "MySQL", port: "3306", source: "sg-1a2b3c4d" },
        { type: "inbound", protocol: "SSH", port: "22", source: "10.0.0.0/8" }
      ],
      created: "2024-01-18",
      modified: "2024-02-05"
    },
    {
      id: "sg-3c4d5e6f",
      name: "load-balancers",
      description: "Load balancer security group",
      status: "active",
      instances: 2,
      rules: [
        { type: "inbound", protocol: "HTTP", port: "80", source: "0.0.0.0/0" },
        { type: "inbound", protocol: "HTTPS", port: "443", source: "0.0.0.0/0" }
      ],
      created: "2024-01-20",
      modified: "2024-01-25"
    },
    {
      id: "sg-4d5e6f7g",
      name: "monitoring",
      description: "Monitoring and logging services",
      status: "inactive",
      instances: 0,
      rules: [
        { type: "inbound", protocol: "Custom", port: "9090", source: "10.0.0.0/8" },
        { type: "inbound", protocol: "Custom", port: "3000", source: "10.0.0.0/8" }
      ],
      created: "2024-02-01",
      modified: "2024-02-01"
    },
    {
      id: "sg-5e6f7g8h",
      name: "development",
      description: "Development environment security group",
      status: "warning",
      instances: 5,
      rules: [
        { type: "inbound", protocol: "All", port: "All", source: "0.0.0.0/0" },
        { type: "outbound", protocol: "All", port: "All", source: "0.0.0.0/0" }
      ],
      created: "2024-02-05",
      modified: "2024-02-14"
    }
  ]

  const securityAlerts = [
    {
      id: "alert-1",
      severity: "high",
      title: "Overly Permissive Rule Detected",
      description: "Security group 'development' allows all traffic from anywhere",
      group: "development",
      time: "2 hours ago"
    },
    {
      id: "alert-2",
      severity: "medium",
      title: "Unused Security Group",
      description: "Security group 'monitoring' has no attached instances",
      group: "monitoring",
      time: "1 day ago"
    },
    {
      id: "alert-3",
      severity: "low",
      title: "Rule Modification",
      description: "Security group 'web-servers' rules were updated",
      group: "web-servers",
      time: "3 days ago"
    }
  ]

  const filteredGroups = securityGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRuleCount = (rules: any[]) => {
    const inbound = rules.filter(r => r.type === 'inbound').length
    const outbound = rules.filter(r => r.type === 'outbound').length
    return { inbound, outbound, total: rules.length }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Security Groups</h1>
          <p className="text-muted-foreground">Manage firewall rules and network security</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow">
          <Plus className="w-4 h-4 mr-2" />
          Create Security Group
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Security Groups</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Shield className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Rules</p>
                <p className="text-2xl font-bold text-success">248</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Security Alerts</p>
                <p className="text-2xl font-bold text-destructive">3</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Protected Instances</p>
                <p className="text-2xl font-bold text-primary">18</p>
              </div>
              <Lock className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Alerts */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Security Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {securityAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.severity === 'high' ? 'bg-destructive' : 
                  alert.severity === 'medium' ? 'bg-warning' : 'bg-primary'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{alert.title}</span>
                    <Badge variant="outline" className="text-xs">{alert.group}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">{alert.description}</div>
                  <div className="text-xs text-muted-foreground">{alert.time}</div>
                </div>
                <Badge variant={
                  alert.severity === 'high' ? 'destructive' : 
                  alert.severity === 'medium' ? 'outline' : 'secondary'
                } className="text-xs">
                  {alert.severity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card className="bg-gradient-card shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search security groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter by Status</Button>
            <Button variant="outline">Sort</Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Groups Table */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Security Groups ({filteredGroups.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Rules</TableHead>
                <TableHead>Instances</TableHead>
                <TableHead>Modified</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGroups.map((group) => {
                const ruleCount = getRuleCount(group.rules)
                return (
                  <TableRow key={group.id} className="hover:bg-background/50">
                    <TableCell>
                      <div>
                        <div className="font-medium">{group.name}</div>
                        <div className="text-sm text-muted-foreground">{group.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusIndicator status={group.status as any} />
                    </TableCell>
                    <TableCell className="text-sm max-w-xs truncate">
                      {group.description}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          In: {ruleCount.inbound}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Out: {ruleCount.outbound}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Network className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{group.instances}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{group.modified}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card border">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Rules
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Rules
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Settings className="w-4 h-4 mr-2" />
                            Configure
                          </DropdownMenuItem>
                          {group.status === 'active' ? (
                            <DropdownMenuItem>
                              <Unlock className="w-4 h-4 mr-2" />
                              Disable
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>
                              <Lock className="w-4 h-4 mr-2" />
                              Enable
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Rules Preview for Selected Group */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Rules Preview - web-servers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-success" />
                Inbound Rules
              </h4>
              <div className="space-y-2">
                {securityGroups[0].rules.filter(r => r.type === 'inbound').map((rule, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-background/30 rounded text-sm">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{rule.protocol}</Badge>
                      <span className="font-mono">{rule.port}</span>
                      <span className="text-muted-foreground">from</span>
                      <span className="font-mono">{rule.source}</span>
                    </div>
                    <Badge variant="secondary">Allow</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
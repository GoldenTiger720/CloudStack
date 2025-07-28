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
  Server, 
  Plus,
  Search,
  MoreVertical,
  Play,
  Square,
  RotateCcw,
  Trash2,
  Settings
} from "lucide-react"
import { useTranslation } from "react-i18next"

export default function Instances() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState("")

  const instances = [
    {
      id: "i-1a2b3c4d",
      name: "web-server-01",
      status: "running",
      type: "m1.large",
      image: "Ubuntu 20.04 LTS",
      ip: "192.168.1.10",
      uptime: "5d 12h",
      cpu: "2 vCPUs",
      memory: "8 GB",
      storage: "80 GB"
    },
    {
      id: "i-2b3c4d5e",
      name: "db-primary",
      status: "running", 
      type: "m1.xlarge",
      image: "CentOS 8",
      ip: "192.168.1.20",
      uptime: "12d 8h",
      cpu: "4 vCPUs",
      memory: "16 GB",
      storage: "160 GB"
    },
    {
      id: "i-3c4d5e6f",
      name: "worker-node-03",
      status: "stopped",
      type: "m1.medium",
      image: "Ubuntu 18.04 LTS",
      ip: "192.168.1.30",
      uptime: "-",
      cpu: "2 vCPUs",
      memory: "4 GB",
      storage: "40 GB"
    },
    {
      id: "i-4d5e6f7g",
      name: "cache-redis",
      status: "pending",
      type: "m1.small",
      image: "Redis 6.2",
      ip: "192.168.1.40",
      uptime: "-",
      cpu: "1 vCPU",
      memory: "2 GB",
      storage: "20 GB"
    },
    {
      id: "i-5e6f7g8h",
      name: "api-gateway",
      status: "error",
      type: "m1.large",
      image: "Ubuntu 20.04 LTS",
      ip: "192.168.1.50",
      uptime: "-",
      cpu: "2 vCPUs",
      memory: "8 GB",
      storage: "80 GB"
    }
  ]

  const filteredInstances = instances.filter(instance =>
    instance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    instance.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('pages.instances.title')}</h1>
          <p className="text-muted-foreground">{t('pages.instances.subtitle')}</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow">
          <Plus className="w-4 h-4 mr-2" />
          Launch Instance
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Instances</p>
                <p className="text-2xl font-bold">142</p>
              </div>
              <Server className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Running</p>
                <p className="text-2xl font-bold text-success">128</p>
              </div>
              <Play className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Stopped</p>
                <p className="text-2xl font-bold text-muted-foreground">12</p>
              </div>
              <Square className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Issues</p>
                <p className="text-2xl font-bold text-destructive">2</p>
              </div>
              <Settings className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-gradient-card shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search instances..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Sort</Button>
          </div>
        </CardContent>
      </Card>

      {/* Instances Table */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5 text-primary" />
            Instances ({filteredInstances.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Uptime</TableHead>
                <TableHead>Resources</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInstances.map((instance) => (
                <TableRow key={instance.id} className="hover:bg-background/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{instance.name}</div>
                      <div className="text-sm text-muted-foreground">{instance.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusIndicator status={instance.status as any} />
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{instance.type}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{instance.image}</TableCell>
                  <TableCell className="font-mono text-sm">{instance.ip}</TableCell>
                  <TableCell className="text-sm">{instance.uptime}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{instance.cpu}</div>
                      <div className="text-muted-foreground">{instance.memory} • {instance.storage}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border">
                        <DropdownMenuItem>
                          <Play className="w-4 h-4 mr-2" />
                          Start
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Square className="w-4 h-4 mr-2" />
                          Stop
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Restart
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="w-4 h-4 mr-2" />
                          Configure
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
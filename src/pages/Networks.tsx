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
  Network, 
  Plus,
  Search,
  MoreVertical,
  Globe,
  Shield,
  Settings,
  Trash2,
  Edit,
  Router,
  Wifi
} from "lucide-react"

export default function Networks() {
  const [searchTerm, setSearchTerm] = useState("")

  const networks = [
    {
      id: "net-1a2b3c4d",
      name: "production-vpc",
      status: "active",
      type: "Virtual Private Cloud",
      subnet: "10.0.0.0/16",
      gateway: "10.0.0.1",
      instances: 42,
      region: "us-east-1",
      created: "2024-01-15"
    },
    {
      id: "net-2b3c4d5e",
      name: "staging-network",
      status: "active",
      type: "Public Network",
      subnet: "192.168.1.0/24",
      gateway: "192.168.1.1",
      instances: 8,
      region: "us-east-1",
      created: "2024-02-01"
    },
    {
      id: "net-3c4d5e6f",
      name: "dev-subnet",
      status: "inactive",
      type: "Private Network",
      subnet: "172.16.0.0/24",
      gateway: "172.16.0.1",
      instances: 0,
      region: "us-west-2",
      created: "2024-01-28"
    },
    {
      id: "net-4d5e6f7g",
      name: "dmz-network",
      status: "active",
      type: "DMZ Network",
      subnet: "203.0.113.0/24",
      gateway: "203.0.113.1",
      instances: 5,
      region: "us-east-1",
      created: "2024-02-10"
    },
    {
      id: "net-5e6f7g8h",
      name: "backup-network",
      status: "maintenance",
      type: "Storage Network",
      subnet: "10.1.0.0/24",
      gateway: "10.1.0.1",
      instances: 12,
      region: "us-west-2",
      created: "2024-01-20"
    }
  ]

  const filteredNetworks = networks.filter(network =>
    network.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    network.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Networks</h1>
          <p className="text-muted-foreground">Manage your virtual networks and subnets</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow">
          <Plus className="w-4 h-4 mr-2" />
          Create Network
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Networks</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Network className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-success">20</p>
              </div>
              <Globe className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Private</p>
                <p className="text-2xl font-bold text-warning">15</p>
              </div>
              <Shield className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Connected Instances</p>
                <p className="text-2xl font-bold text-primary">67</p>
              </div>
              <Router className="w-8 h-8 text-primary" />
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
                placeholder="Search networks..."
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

      {/* Networks Table */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="w-5 h-5 text-primary" />
            Networks ({filteredNetworks.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Subnet</TableHead>
                <TableHead>Gateway</TableHead>
                <TableHead>Instances</TableHead>
                <TableHead>Region</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNetworks.map((network) => (
                <TableRow key={network.id} className="hover:bg-background/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{network.name}</div>
                      <div className="text-sm text-muted-foreground">{network.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusIndicator status={network.status as any} />
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{network.type}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{network.subnet}</TableCell>
                  <TableCell className="font-mono text-sm">{network.gateway}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{network.instances}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{network.region}</Badge>
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
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="w-4 h-4 mr-2" />
                          Configure
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Router className="w-4 h-4 mr-2" />
                          Routing Rules
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="w-4 h-4 mr-2" />
                          Security Groups
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
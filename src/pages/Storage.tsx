import { useState } from "react"
import { StatusIndicator } from "@/components/dashboard/StatusIndicator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
  HardDrive, 
  Plus,
  Search,
  MoreVertical,
  Database,
  Archive,
  Settings,
  Trash2,
  Edit,
  Copy,
  Download
} from "lucide-react"

export default function Storage() {
  const [searchTerm, setSearchTerm] = useState("")

  const volumes = [
    {
      id: "vol-1a2b3c4d",
      name: "web-server-root",
      status: "attached",
      type: "SSD",
      size: "100 GB",
      used: "68 GB",
      usage: 68,
      instance: "web-server-01",
      encrypted: true,
      created: "2024-01-15",
      region: "us-east-1"
    },
    {
      id: "vol-2b3c4d5e",
      name: "database-storage",
      status: "attached",
      type: "SSD",
      size: "500 GB",
      used: "245 GB",
      usage: 49,
      instance: "db-primary",
      encrypted: true,
      created: "2024-01-18",
      region: "us-east-1"
    },
    {
      id: "vol-3c4d5e6f",
      name: "backup-volume",
      status: "available",
      type: "HDD",
      size: "1 TB",
      used: "0 GB",
      usage: 0,
      instance: null,
      encrypted: false,
      created: "2024-02-01",
      region: "us-west-2"
    },
    {
      id: "vol-4d5e6f7g",
      name: "logs-storage",
      status: "attached",
      type: "SSD",
      size: "200 GB",
      used: "89 GB",
      usage: 44,
      instance: "log-server",
      encrypted: true,
      created: "2024-01-25",
      region: "us-east-1"
    },
    {
      id: "vol-5e6f7g8h",
      name: "temp-storage",
      status: "error",
      type: "HDD",
      size: "50 GB",
      used: "12 GB",
      usage: 24,
      instance: null,
      encrypted: false,
      created: "2024-02-05",
      region: "us-west-2"
    }
  ]

  const snapshots = [
    {
      id: "snap-1a2b3c4d",
      name: "web-server-backup-daily",
      volume: "web-server-root",
      size: "68 GB",
      created: "2024-02-15 08:00",
      status: "completed"
    },
    {
      id: "snap-2b3c4d5e",
      name: "database-backup-weekly",
      volume: "database-storage",
      size: "245 GB",
      created: "2024-02-14 02:00",
      status: "completed"
    },
    {
      id: "snap-3c4d5e6f",
      name: "logs-backup-monthly",
      volume: "logs-storage",
      size: "89 GB",
      created: "2024-02-13 23:30",
      status: "in_progress"
    }
  ]

  const filteredVolumes = volumes.filter(volume =>
    volume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    volume.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalStorage = volumes.reduce((acc, vol) => acc + parseInt(vol.size.replace(/[^\d]/g, '')), 0)
  const usedStorage = volumes.reduce((acc, vol) => acc + parseInt(vol.used.replace(/[^\d]/g, '')), 0)
  const storageUsage = Math.round((usedStorage / totalStorage) * 100)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Storage</h1>
          <p className="text-muted-foreground">Manage volumes, snapshots, and storage resources</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Archive className="w-4 h-4 mr-2" />
            Create Snapshot
          </Button>
          <Button className="bg-gradient-primary hover:shadow-glow">
            <Plus className="w-4 h-4 mr-2" />
            Create Volume
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Storage</p>
                <p className="text-2xl font-bold">{(totalStorage / 1000).toFixed(1)} TB</p>
              </div>
              <HardDrive className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Used Storage</p>
                <p className="text-2xl font-bold text-warning">{usedStorage} GB</p>
              </div>
              <Database className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Volumes</p>
                <p className="text-2xl font-bold text-success">{volumes.length}</p>
              </div>
              <HardDrive className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Snapshots</p>
                <p className="text-2xl font-bold text-primary">{snapshots.length}</p>
              </div>
              <Archive className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Storage Usage Overview */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            Storage Usage Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Usage</span>
              <span className="text-sm text-muted-foreground">{usedStorage} GB / {(totalStorage / 1000).toFixed(1)} TB</span>
            </div>
            <Progress value={storageUsage} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Available: {((totalStorage - usedStorage) / 1000).toFixed(1)} TB</span>
              <span>{storageUsage}% used</span>
            </div>
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
                placeholder="Search volumes..."
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

      {/* Volumes Table */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-primary" />
            Volumes ({filteredVolumes.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Instance</TableHead>
                <TableHead>Encrypted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVolumes.map((volume) => (
                <TableRow key={volume.id} className="hover:bg-background/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{volume.name}</div>
                      <div className="text-sm text-muted-foreground">{volume.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusIndicator status={volume.status as any} />
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{volume.type}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{volume.size}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{volume.used}</span>
                        <span className="text-muted-foreground">{volume.usage}%</span>
                      </div>
                      <Progress value={volume.usage} className="h-1" />
                    </div>
                  </TableCell>
                  <TableCell>
                    {volume.instance ? (
                      <Badge variant="secondary">{volume.instance}</Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">Not attached</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={volume.encrypted ? "default" : "outline"}>
                      {volume.encrypted ? "Yes" : "No"}
                    </Badge>
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
                          <Copy className="w-4 h-4 mr-2" />
                          Create Snapshot
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="w-4 h-4 mr-2" />
                          Configure
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Attach/Detach
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

      {/* Snapshots Table */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Archive className="w-5 h-5 text-primary" />
            Recent Snapshots ({snapshots.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Source Volume</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {snapshots.map((snapshot) => (
                <TableRow key={snapshot.id} className="hover:bg-background/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{snapshot.name}</div>
                      <div className="text-sm text-muted-foreground">{snapshot.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{snapshot.volume}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{snapshot.size}</TableCell>
                  <TableCell className="text-sm">{snapshot.created}</TableCell>
                  <TableCell>
                    <StatusIndicator status={snapshot.status as any} />
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
                          <Copy className="w-4 h-4 mr-2" />
                          Create Volume
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download
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
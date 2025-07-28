import { useState } from "react"
import { StatusIndicator } from "@/components/dashboard/StatusIndicator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
  Users, 
  Plus,
  Search,
  MoreVertical,
  UserCheck,
  Shield,
  Settings,
  Trash2,
  Edit,
  Key,
  Clock,
  Crown
} from "lucide-react"

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const users = [
    {
      id: "user-1a2b3c4d",
      name: "John Anderson",
      email: "john.anderson@company.com",
      username: "janderson",
      role: "Administrator",
      status: "active",
      lastLogin: "2024-02-15 14:30",
      created: "2024-01-15",
      permissions: ["full_access", "user_management", "system_config"],
      projects: 8
    },
    {
      id: "user-2b3c4d5e",
      name: "Sarah Chen",
      email: "sarah.chen@company.com",
      username: "schen",
      role: "Project Manager",
      status: "active",
      lastLogin: "2024-02-15 16:45",
      created: "2024-01-20",
      permissions: ["project_access", "instance_management", "network_read"],
      projects: 3
    },
    {
      id: "user-3c4d5e6f",
      name: "Michael Rodriguez",
      email: "m.rodriguez@company.com",
      username: "mrodriguez",
      role: "Developer",
      status: "inactive",
      lastLogin: "2024-02-10 09:15",
      created: "2024-01-25",
      permissions: ["instance_read", "storage_read"],
      projects: 2
    },
    {
      id: "user-4d5e6f7g",
      name: "Emma Thompson",
      email: "emma.t@company.com",
      username: "ethompson",
      role: "Security Analyst",
      status: "active",
      lastLogin: "2024-02-15 11:20",
      created: "2024-02-01",
      permissions: ["security_management", "audit_access", "monitoring_read"],
      projects: 5
    },
    {
      id: "user-5e6f7g8h",
      name: "David Kim",
      email: "david.kim@company.com",
      username: "dkim",
      role: "Viewer",
      status: "pending",
      lastLogin: "Never",
      created: "2024-02-14",
      permissions: ["read_only"],
      projects: 0
    }
  ]

  const roles = [
    {
      name: "Administrator",
      count: 2,
      color: "destructive",
      permissions: ["Full system access", "User management", "System configuration"]
    },
    {
      name: "Project Manager",
      count: 3,
      color: "default",
      permissions: ["Project management", "Instance control", "Network access"]
    },
    {
      name: "Developer",
      count: 8,
      color: "secondary",
      permissions: ["Instance access", "Storage access", "Limited network"]
    },
    {
      name: "Security Analyst",
      count: 2,
      color: "outline",
      permissions: ["Security management", "Audit logs", "Monitoring"]
    },
    {
      name: "Viewer",
      count: 3,
      color: "outline",
      permissions: ["Read-only access"]
    }
  ]

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Users & Roles</h1>
          <p className="text-muted-foreground">Manage user accounts and permissions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Shield className="w-4 h-4 mr-2" />
            Manage Roles
          </Button>
          <Button className="bg-gradient-primary hover:shadow-glow">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">18</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
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
              <UserCheck className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Roles</p>
                <p className="text-2xl font-bold text-warning">5</p>
              </div>
              <Shield className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-muted-foreground">3</p>
              </div>
              <Clock className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Roles Overview */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-primary" />
            Roles Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {roles.map((role) => (
              <div key={role.name} className="p-4 bg-background/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={role.color as any}>{role.name}</Badge>
                  <span className="text-sm font-medium">{role.count}</span>
                </div>
                <div className="space-y-1">
                  {role.permissions.map((permission, index) => (
                    <div key={index} className="text-xs text-muted-foreground">
                      • {permission}
                    </div>
                  ))}
                </div>
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
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter by Role</Button>
            <Button variant="outline">Filter by Status</Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Users ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-background/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs bg-gradient-primary text-white">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                        <div className="text-xs text-muted-foreground">@{user.username}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      user.role === 'Administrator' ? 'destructive' :
                      user.role === 'Project Manager' ? 'default' :
                      user.role === 'Security Analyst' ? 'outline' : 'secondary'
                    }>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <StatusIndicator status={user.status as any} />
                  </TableCell>
                  <TableCell className="text-sm">
                    {user.lastLogin === "Never" ? (
                      <span className="text-muted-foreground">Never</span>
                    ) : (
                      user.lastLogin
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{user.projects}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{user.created}</TableCell>
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
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Key className="w-4 h-4 mr-2" />
                          Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="w-4 h-4 mr-2" />
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="w-4 h-4 mr-2" />
                          Permissions
                        </DropdownMenuItem>
                        {user.status === 'active' ? (
                          <DropdownMenuItem className="text-warning">
                            <Clock className="w-4 h-4 mr-2" />
                            Suspend
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="text-success">
                            <UserCheck className="w-4 h-4 mr-2" />
                            Activate
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
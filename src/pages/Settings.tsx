import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { 
  Settings as SettingsIcon, 
  Save,
  RefreshCw,
  Shield,
  Bell,
  Database,
  Network,
  Server,
  Users,
  Key,
  Globe,
  Mail,
  Smartphone,
  AlertTriangle,
  CheckCircle,
  Info
} from "lucide-react"

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    security: true,
    maintenance: false,
    billing: true
  })

  const [systemConfig, setSystemConfig] = useState({
    timezone: "UTC",
    language: "en",
    theme: "light",
    sessionTimeout: "30",
    maxInstances: "100",
    autoBackup: true,
    logRetention: "90"
  })

  const configSections = [
    {
      title: "System Configuration",
      icon: Server,
      description: "Core system settings and preferences",
      settings: [
        { key: "System Timezone", value: "UTC", status: "configured" },
        { key: "Default Language", value: "English", status: "configured" },
        { key: "Session Timeout", value: "30 minutes", status: "configured" },
        { key: "Max Instances per User", value: "100", status: "configured" }
      ]
    },
    {
      title: "Network Configuration",
      icon: Network,
      description: "Network and connectivity settings",
      settings: [
        { key: "DNS Servers", value: "8.8.8.8, 8.8.4.4", status: "configured" },
        { key: "Default Gateway", value: "10.0.0.1", status: "configured" },
        { key: "DHCP Range", value: "10.0.0.100-200", status: "configured" },
        { key: "Load Balancer", value: "Enabled", status: "active" }
      ]
    },
    {
      title: "Security Settings",
      icon: Shield,
      description: "Security policies and authentication",
      settings: [
        { key: "Two-Factor Authentication", value: "Required", status: "active" },
        { key: "Password Policy", value: "Strong", status: "configured" },
        { key: "Failed Login Threshold", value: "5 attempts", status: "configured" },
        { key: "SSL Certificate", value: "Valid until 2025-03-15", status: "warning" }
      ]
    },
    {
      title: "Storage Configuration",
      icon: Database,
      description: "Storage and backup settings",
      settings: [
        { key: "Default Storage Type", value: "SSD", status: "configured" },
        { key: "Auto Backup", value: "Enabled", status: "active" },
        { key: "Backup Retention", value: "90 days", status: "configured" },
        { key: "Encryption", value: "AES-256", status: "active" }
      ]
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle
      case 'warning': return AlertTriangle
      case 'configured': return Info
      default: return Info
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success'
      case 'warning': return 'outline'
      case 'configured': return 'secondary'
      default: return 'default'
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Configure system preferences and options</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button className="bg-gradient-primary hover:shadow-glow">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Configuration Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {configSections.map((section) => {
          const Icon = section.icon
          const activeSettings = section.settings.filter(s => s.status === 'active').length
          const warningSettings = section.settings.filter(s => s.status === 'warning').length
          
          return (
            <Card key={section.title} className="bg-gradient-card shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-medium text-sm">{section.title}</h3>
                    <p className="text-xs text-muted-foreground">{section.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    <Badge variant="secondary" className="text-xs">
                      {section.settings.length} settings
                    </Badge>
                    {warningSettings > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {warningSettings} warnings
                      </Badge>
                    )}
                  </div>
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5 text-primary" />
                System Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="timezone">System Timezone</Label>
                  <Select value={systemConfig.timezone} onValueChange={(value) => 
                    setSystemConfig(prev => ({ ...prev, timezone: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="Europe/London">London</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Default Language</Label>
                  <Select value={systemConfig.language} onValueChange={(value) => 
                    setSystemConfig(prev => ({ ...prev, language: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    value={systemConfig.sessionTimeout}
                    onChange={(e) => setSystemConfig(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-instances">Max Instances per User</Label>
                  <Input
                    id="max-instances"
                    type="number"
                    value={systemConfig.maxInstances}
                    onChange={(e) => setSystemConfig(prev => ({ ...prev, maxInstances: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                <div>
                  <Label htmlFor="auto-backup">Automatic Backups</Label>
                  <p className="text-sm text-muted-foreground">Enable automatic daily backups</p>
                </div>
                <Switch
                  id="auto-backup"
                  checked={systemConfig.autoBackup}
                  onCheckedChange={(checked) => setSystemConfig(prev => ({ ...prev, autoBackup: checked }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Security & Authentication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for all users</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                  <div>
                    <Label>Force HTTPS</Label>
                    <p className="text-sm text-muted-foreground">Redirect all traffic to HTTPS</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                  <div>
                    <Label>IP Allowlist</Label>
                    <p className="text-sm text-muted-foreground">Restrict access by IP address</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="password-policy">Password Policy</Label>
                  <Select defaultValue="strong">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic (8+ chars)</SelectItem>
                      <SelectItem value="strong">Strong (12+ chars, mixed)</SelectItem>
                      <SelectItem value="very-strong">Very Strong (16+ chars, symbols)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-attempts">Failed Login Threshold</Label>
                  <Input id="login-attempts" type="number" defaultValue="5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, sms: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Browser push notifications</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <Label>Security Alerts</Label>
                      <p className="text-sm text-muted-foreground">Critical security notifications</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.security}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, security: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Settings */}
        <TabsContent value="integrations" className="space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                External Integrations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                  <div>
                    <Label>LDAP Authentication</Label>
                    <p className="text-sm text-muted-foreground">Connect to LDAP directory</p>
                  </div>
                  <Badge variant="outline">Not Configured</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                  <div>
                    <Label>SAML SSO</Label>
                    <p className="text-sm text-muted-foreground">Single Sign-On integration</p>
                  </div>
                  <Badge variant="secondary">Configured</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                  <div>
                    <Label>Webhook Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send events to external systems</p>
                  </div>
                  <Badge variant="secondary">3 Active</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input
                  id="webhook-url"
                  placeholder="https://your-webhook-endpoint.com/hooks"
                  type="url"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5 text-primary" />
                Advanced Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-config">API Configuration</Label>
                  <Textarea
                    id="api-config"
                    placeholder="Enter JSON configuration..."
                    className="min-h-[100px] font-mono text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="log-level">Log Level</Label>
                    <Select defaultValue="info">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="debug">Debug</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warn">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="log-retention">Log Retention (days)</Label>
                    <Input
                      id="log-retention"
                      type="number"
                      value={systemConfig.logRetention}
                      onChange={(e) => setSystemConfig(prev => ({ ...prev, logRetention: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <Label className="text-destructive">Danger Zone</Label>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  These actions are irreversible. Please proceed with caution.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Reset All Settings
                  </Button>
                  <Button variant="destructive" size="sm">
                    Factory Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
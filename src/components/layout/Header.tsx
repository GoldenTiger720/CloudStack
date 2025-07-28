import { Bell, Search, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { LanguageSelector } from "@/components/ui/language-selector"
import { useTranslation } from "react-i18next"

export function Header() {
  const { t } = useTranslation()
  
  return (
    <header className="h-16 border-b bg-card/80 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="hover:bg-secondary/60" />
        
        {/* Search */}
        <div className="relative w-96 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder={t('common.searchResources', 'Search resources...')} 
            className="pl-10 bg-background/60 border-border/60 focus:bg-background"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Language Selector */}
        <LanguageSelector />
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative hover:bg-secondary/60">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-card border">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start p-4">
              <div className="font-medium text-sm">High CPU Usage</div>
              <div className="text-xs text-muted-foreground">Instance web-server-01 is at 95% CPU</div>
              <div className="text-xs text-muted-foreground mt-1">2 minutes ago</div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start p-4">
              <div className="font-medium text-sm">Storage Alert</div>
              <div className="text-xs text-muted-foreground">Volume /dev/sdb is 90% full</div>
              <div className="text-xs text-muted-foreground mt-1">5 minutes ago</div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start p-4">
              <div className="font-medium text-sm">Network Issue</div>
              <div className="text-xs text-muted-foreground">Network latency spike detected</div>
              <div className="text-xs text-muted-foreground mt-1">10 minutes ago</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-secondary/60">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-sm font-medium">John Admin</div>
                <div className="text-xs text-muted-foreground">Administrator</div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card border">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>API Keys</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Moon, Sun, Mail, Lock, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  const handleNotificationToggle = (checked: boolean) => {
    toast.success(checked ? "Notifications enabled! 🔔" : "Notifications disabled 🔕");
  };

  const handleEmailToggle = (checked: boolean) => {
    toast.success(checked ? "Email updates enabled! ✉️" : "Email updates disabled 📪");
  };

  return (
    <div className="min-h-screen bg-background pt-16 pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6 space-x-2 sticky top-16 z-10 bg-background/80 backdrop-blur-sm py-2">
          <Link to="/" className={navigationMenuTriggerStyle()}>
            Home
          </Link>
          <Link to="/reactions" className={navigationMenuTriggerStyle()}>
            Feed
          </Link>
          <Link to="/my-reactions" className={navigationMenuTriggerStyle()}>
            My Reactions
          </Link>
          <Link to="/settings" className={navigationMenuTriggerStyle({ className: "bg-accent/50" })}>
            Settings
          </Link>
        </div>
        
        <Card className="mb-8 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-2xl">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                {theme === "dark" ? <Moon className="text-blue-500" /> : <Sun className="text-amber-500" />}
                <div>
                  <h3 className="font-medium">Dark Mode</h3>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark theme
                  </p>
                </div>
              </div>
              <Switch 
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
              />
            </div>
            
            <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <svg className="text-green-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"></path>
                  <polyline points="15,9 18,9 18,11"></polyline>
                  <path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2v0"></path>
                  <line x1="6" y1="10" x2="6" y2="10"></line>
                </svg>
                <div>
                  <h3 className="font-medium">Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Enable notifications for new reactions
                  </p>
                </div>
              </div>
              <Switch defaultChecked onCheckedChange={handleNotificationToggle} />
            </div>
            
            <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <Mail className="text-purple-500" />
                <div>
                  <h3 className="font-medium">Email Updates</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive email updates about activity
                  </p>
                </div>
              </div>
              <Switch onCheckedChange={handleEmailToggle} />
            </div>
            
            <div className="pt-4">
              <h3 className="font-medium mb-2">Account</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => toast.success("Email settings will be available soon!")}>
                  <Mail className="mr-2" size={16} />
                  Change Email
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => toast.success("Password settings will be available soon!")}>
                  <Lock className="mr-2" size={16} />
                  Change Password
                </Button>
                <Button variant="destructive" className="w-full justify-start" onClick={() => toast.error("Account deletion is disabled in this demo")}>
                  <AlertTriangle className="mr-2" size={16} />
                  Delete Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              ReactFact v1.1.0
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              © 2025 ReactFact. All rights reserved.
            </p>
            <div className="mt-4 text-center">
              <Button variant="ghost" className="text-primary animate-pulse" onClick={() => toast.success("✨ You found an easter egg! ✨")}>
                Click for a surprise
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;

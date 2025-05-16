
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background pt-16 pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6 space-x-2">
          <Link to="/" className={navigationMenuTriggerStyle()}>
            Home
          </Link>
          <Link to="/reactions" className={navigationMenuTriggerStyle()}>
            Feed
          </Link>
          <Link to="/settings" className={navigationMenuTriggerStyle({ className: "bg-accent/50" })}>
            Settings
          </Link>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Dark Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark theme
                </p>
              </div>
              <Switch 
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Enable notifications for new reactions
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Email Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Receive email updates about activity
                </p>
              </div>
              <Switch />
            </div>
            
            <div className="pt-4">
              <h3 className="font-medium mb-2">Account</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Change Email
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  Delete Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              ReactFact v1.0.0
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              © 2025 ReactFact. All rights reserved.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;

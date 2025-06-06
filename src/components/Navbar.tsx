
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageSquare, User, Settings, LogOut, Bell } from "lucide-react";
import { toast } from "sonner";

interface NavbarProps {
  onOpenAuthModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenAuthModal }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [notification, setNotification] = useState(false);
  
  const handleNotificationClick = () => {
    toast.success("Pas de nouvelles notifications!");
    setNotification(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 glass">
      <div className="container flex items-center justify-between h-full px-4">
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ReactFact
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative" 
              onClick={handleNotificationClick}
            >
              <Bell size={20} />
              {notification && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </Button>
          )}
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 bg-muted/50 hover:bg-muted">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.username} />
                    <AvatarFallback>{user?.username?.substring(0, 2).toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to="/profile">
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2" size={16} />
                    Profil
                  </DropdownMenuItem>
                </Link>
                <Link to="/my-reactions">
                  <DropdownMenuItem className="cursor-pointer">
                    <MessageSquare className="mr-2" size={16} />
                    Mes Réactions
                  </DropdownMenuItem>
                </Link>
                <Link to="/settings">
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2" size={16} />
                    Paramètres
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  <LogOut className="mr-2" size={16} />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={onOpenAuthModal} className="bg-primary hover:bg-primary/90 animate-pulse-light">
              Se connecter
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

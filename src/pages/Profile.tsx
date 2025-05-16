
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const profileImages = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=profile1",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=profile2",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=profile3",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=profile4",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=profile5",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=profile6",
];

const Profile = () => {
  const { user, login } = useAuth();
  const [username, setUsername] = useState(user?.username || "");
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  
  const handleAvatarSelect = (avatarUrl: string) => {
    setSelectedAvatar(avatarUrl);
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Normally we would upload the file to a server
      // For now we'll just create a local URL
      const imageUrl = URL.createObjectURL(file);
      setSelectedAvatar(imageUrl);
    }
  };
  
  const handleSaveChanges = () => {
    if (user && username.trim()) {
      login(username.trim(), user.email);
      toast.success("Profile updated successfully!");
    } else {
      toast.error("Please enter a valid username");
    }
  };
  
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
          <Link to="/profile" className={navigationMenuTriggerStyle({ className: "bg-accent/50" })}>
            Profile
          </Link>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">My Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 items-center sm:items-start">
              <div className="flex flex-col items-center space-y-2">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={selectedAvatar} alt="Profile" />
                  <AvatarFallback>{username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                  Upload Avatar
                </Button>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*" 
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium mb-1">
                    Username
                  </label>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
                
                <Button onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Choose from preset avatars</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                {profileImages.map((avatar, index) => (
                  <div 
                    key={index} 
                    className={`cursor-pointer p-2 rounded-md ${selectedAvatar === avatar ? 'bg-accent' : 'bg-background hover:bg-muted'}`}
                    onClick={() => handleAvatarSelect(avatar)}
                  >
                    <Avatar className="w-16 h-16 mx-auto">
                      <AvatarImage src={avatar} alt={`Avatar ${index + 1}`} />
                      <AvatarFallback>AV</AvatarFallback>
                    </Avatar>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="friends" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="friends">Friends</TabsTrigger>
            <TabsTrigger value="requests">Friend Requests</TabsTrigger>
          </TabsList>
          <TabsContent value="friends" className="bg-card rounded-md p-4">
            <h3 className="text-lg font-medium mb-4">My Friends</h3>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-muted-foreground text-center">
                      You don't have any friends yet. Add friends to connect!
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      Find Friends
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="requests" className="bg-card rounded-md p-4">
            <h3 className="text-lg font-medium mb-4">Friend Requests</h3>
            <p className="text-muted-foreground text-center">
              No pending friend requests.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;

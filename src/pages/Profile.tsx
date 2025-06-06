
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
import { User, Camera, Upload, Sparkles, Settings } from "lucide-react";

const profileImages = [
  "https://api.dicebear.com/7.x/fun-emoji/svg?seed=profile1",
  "https://api.dicebear.com/7.x/fun-emoji/svg?seed=profile2",
  "https://api.dicebear.com/7.x/fun-emoji/svg?seed=profile3",
  "https://api.dicebear.com/7.x/miniavs/svg?seed=profile4",
  "https://api.dicebear.com/7.x/miniavs/svg?seed=profile5",
  "https://api.dicebear.com/7.x/miniavs/svg?seed=profile6",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=profile7",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=profile8",
  "https://api.dicebear.com/7.x/bottts/svg?seed=profile9",
  "https://api.dicebear.com/7.x/bottts/svg?seed=profile10",
];

const funnyUsernames = [
  "FactMaster3000",
  "KnowledgeNinja",
  "ReactionRockstar",
  "WisdomWhisperer",
  "TriviaTitan",
  "FactFinder"
];

const Profile = () => {
  const { user, login } = useAuth();
  const [username, setUsername] = useState(user?.username || "");
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || "");
  const [showConfetti, setShowConfetti] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  
  const handleAvatarSelect = (avatarUrl: string) => {
    setSelectedAvatar(avatarUrl);
    toast.success("Excellent choix! Cet avatar vous va bien! 😎");
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Normally we would upload the file to a server
      // For now we'll just create a local URL
      const imageUrl = URL.createObjectURL(file);
      setSelectedAvatar(imageUrl);
      toast.success("Avatar personnalisé téléchargé! 📸");
    }
  };
  
  const handleSaveChanges = () => {
    if (user && username.trim()) {
      // Fix: Pass a placeholder password as the third argument
      login(username.trim(), user.email || "", "");
      toast.success("Profil mis à jour avec succès! ✨");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      toast.error("Veuillez entrer un nom d'utilisateur valide");
    }
  };
  
  const generateRandomUsername = () => {
    const random = Math.floor(Math.random() * funnyUsernames.length);
    setUsername(funnyUsernames[random]);
    toast.success("Nom d'utilisateur aléatoire généré! 🎲");
  };
  
  return (
    <div className="min-h-screen bg-background pt-20">
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute top-0 left-1/4 animate-fall text-5xl">🎉</div>
          <div className="absolute top-0 left-1/2 animate-fall-delay text-5xl">✨</div>
          <div className="absolute top-0 right-1/4 animate-fall-delay-2 text-5xl">🎊</div>
          <div className="absolute top-0 left-1/3 animate-fall-delay-3 text-5xl">🌟</div>
          <div className="absolute top-0 right-1/3 animate-fall text-5xl">🎈</div>
        </div>
      )}
    
      <div className="container mx-auto px-4 py-2 mb-8">
        <div className="sticky top-16 z-10 bg-background/80 backdrop-blur-sm py-2 mb-6">
          <div className="flex items-center space-x-2">
            <Link to="/" className={navigationMenuTriggerStyle()}>
              Accueil
            </Link>
            <Link to="/reactions" className={navigationMenuTriggerStyle()}>
              Feed
            </Link>
            <Link to="/my-reactions" className={navigationMenuTriggerStyle()}>
              Mes Réactions
            </Link>
            <Link to="/profile" className={navigationMenuTriggerStyle({ className: "bg-accent/50" })}>
              Profil
            </Link>
            <Link to="/settings" className={navigationMenuTriggerStyle()}>
              <Settings size={16} className="mr-1" />
              Paramètres
            </Link>
          </div>
        </div>
        
        <Card className="mb-8 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <User className="text-primary" />
              Mon Profil
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 items-center sm:items-start">
              <div className="flex flex-col items-center space-y-2">
                <Avatar className="w-24 h-24 ring-2 ring-primary ring-offset-2 ring-offset-background hover:scale-105 transition-transform">
                  <AvatarImage src={selectedAvatar} alt="Profile" />
                  <AvatarFallback className="bg-primary/20">{username ? username.substring(0, 2).toUpperCase() : "U"}</AvatarFallback>
                </Avatar>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="flex gap-2 items-center">
                    <Upload size={16} />
                    Upload
                  </Button>
                  <Button variant="secondary" onClick={() => toast.success("Fonctionnalité de photo à venir!")} className="flex gap-2 items-center">
                    <Camera size={16} />
                    Photo
                  </Button>
                </div>
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
                    Nom d'utilisateur
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="username"
                      placeholder="Entrez votre nom d'utilisateur"
                      value={username}
                      onChange={handleUsernameChange}
                      className="flex-1"
                    />
                    <Button variant="ghost" size="icon" onClick={generateRandomUsername}>
                      <Sparkles size={16} />
                    </Button>
                  </div>
                </div>
                
                <Button onClick={handleSaveChanges} className="w-full sm:w-auto">
                  Enregistrer les modifications
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Choisissez parmi les avatars prédéfinis</h3>
              <ScrollArea className="h-[200px] pr-4">
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                  {profileImages.map((avatar, index) => (
                    <div 
                      key={index} 
                      className={`cursor-pointer p-2 rounded-md transition-all ${selectedAvatar === avatar 
                        ? 'bg-primary/20 scale-105 ring-2 ring-primary ring-offset-2' 
                        : 'bg-background hover:bg-muted hover:scale-105'}`}
                      onClick={() => handleAvatarSelect(avatar)}
                    >
                      <Avatar className="w-16 h-16 mx-auto">
                        <AvatarImage src={avatar} alt={`Avatar ${index + 1}`} />
                        <AvatarFallback>AV</AvatarFallback>
                      </Avatar>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="friends" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="friends">Amis</TabsTrigger>
            <TabsTrigger value="requests">Demandes d'amis</TabsTrigger>
          </TabsList>
          <TabsContent value="friends" className="bg-card rounded-md p-4">
            <h3 className="text-lg font-medium mb-4">Mes Amis</h3>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center space-y-4">
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                      </div>
                      <p className="text-muted-foreground">
                        Vous n'avez pas encore d'amis. Ajoutez des amis pour vous connecter!
                      </p>
                      <Button className="w-full mt-4" variant="outline" onClick={() => toast.success("Recherche d'amis à venir!")}>
                        Trouver des amis
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="requests" className="bg-card rounded-md p-4">
            <h3 className="text-lg font-medium mb-4">Demandes d'amis</h3>
            <div className="text-center space-y-4">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <p className="text-muted-foreground">
                Aucune demande d'ami en attente.
              </p>
              <Button className="w-full mt-2" variant="outline" onClick={() => toast.success("Démonstration de demande d'ami à venir!")}>
                Envoyer une demande test
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;

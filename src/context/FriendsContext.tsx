
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export type Friend = {
  id: string;
  username: string;
  avatar?: string;
  status: "accepted" | "pending" | "requested";
};

interface FriendsContextProps {
  friends: Friend[];
  pendingRequests: Friend[];
  sentRequests: Friend[];
  addFriend: (userId: string) => void;
  acceptFriendRequest: (userId: string) => void;
  rejectFriendRequest: (userId: string) => void;
  removeFriend: (userId: string) => void;
}

const FriendsContext = createContext<FriendsContextProps | undefined>(undefined);

export const FriendsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [pendingRequests, setPendingRequests] = useState<Friend[]>([]);
  const [sentRequests, setSentRequests] = useState<Friend[]>([]);
  
  // Load friends from localStorage on mount
  useEffect(() => {
    if (user) {
      const storedFriends = localStorage.getItem(`friends_${user.id}`);
      const storedPending = localStorage.getItem(`pending_requests_${user.id}`);
      const storedSent = localStorage.getItem(`sent_requests_${user.id}`);
      
      if (storedFriends) setFriends(JSON.parse(storedFriends));
      if (storedPending) setPendingRequests(JSON.parse(storedPending));
      if (storedSent) setSentRequests(JSON.parse(storedSent));
    }
  }, [user]);
  
  // Save friends to localStorage when they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`friends_${user.id}`, JSON.stringify(friends));
      localStorage.setItem(`pending_requests_${user.id}`, JSON.stringify(pendingRequests));
      localStorage.setItem(`sent_requests_${user.id}`, JSON.stringify(sentRequests));
    }
  }, [user, friends, pendingRequests, sentRequests]);
  
  const addFriend = (userId: string) => {
    // In a real app, we would send an API request here
    // For now we'll simulate adding a friend request
    const newRequest: Friend = {
      id: userId,
      username: `user_${userId.substring(0, 6)}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
      status: "requested"
    };
    
    setSentRequests(prev => [...prev, newRequest]);
  };
  
  const acceptFriendRequest = (userId: string) => {
    const request = pendingRequests.find(r => r.id === userId);
    if (request) {
      const acceptedFriend: Friend = {
        ...request,
        status: "accepted"
      };
      
      setFriends(prev => [...prev, acceptedFriend]);
      setPendingRequests(prev => prev.filter(r => r.id !== userId));
    }
  };
  
  const rejectFriendRequest = (userId: string) => {
    setPendingRequests(prev => prev.filter(r => r.id !== userId));
  };
  
  const removeFriend = (userId: string) => {
    setFriends(prev => prev.filter(friend => friend.id !== userId));
  };

  return (
    <FriendsContext.Provider
      value={{
        friends,
        pendingRequests,
        sentRequests,
        addFriend,
        acceptFriendRequest,
        rejectFriendRequest,
        removeFriend,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
};

export const useFriends = (): FriendsContextProps => {
  const context = useContext(FriendsContext);
  if (!context) {
    throw new Error("useFriends must be used within a FriendsProvider");
  }
  return context;
};

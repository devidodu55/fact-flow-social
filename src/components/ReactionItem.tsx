
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Reaction } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

interface ReactionItemProps {
  reaction: Reaction;
}

const ReactionItem: React.FC<ReactionItemProps> = ({ reaction }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(reaction.likes || 0);
  const [showShare, setShowShare] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleShare = () => {
    setShowShare(!showShare);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://example.com/reaction/${reaction.id}`);
    toast.success("Link copied to clipboard!");
    setShowShare(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={reaction.userAvatar} alt={reaction.userName} />
          <AvatarFallback>
            {reaction.userName.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{reaction.userName}</span>
              <span className="text-muted-foreground text-xs ml-2">
                {formatDistanceToNow(new Date(reaction.createdAt), { addSuffix: true })}
              </span>
            </div>
          </div>
          
          <p className="text-sm">{reaction.text}</p>
          
          {reaction.gifUrl && (
            <div className="mt-2 rounded-md overflow-hidden border border-border">
              <img
                src={reaction.gifUrl}
                alt="GIF"
                className="w-full max-h-80 object-cover"
              />
            </div>
          )}
          
          <div className="flex items-center space-x-2 pt-2">
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-full px-3 gap-1 ${liked ? "text-red-500 hover:text-red-500 hover:bg-red-50" : ""}`}
              onClick={handleLike}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
              </svg>
              {likes > 0 && <span>{likes}</span>}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full px-3 gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              {reaction.comments > 0 && <span>{reaction.comments}</span>}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full px-3"
              onClick={handleShare}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
            </Button>
          </div>
          
          {showShare && (
            <div className="mt-2 p-2 bg-muted rounded-md">
              <Button variant="outline" size="sm" onClick={handleCopyLink} className="w-full">
                Copy Link
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReactionItem;

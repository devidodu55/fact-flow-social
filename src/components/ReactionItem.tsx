
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Reaction } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { MessageSquare, Heart, Share2, ArrowRight } from "lucide-react";

interface ReactionItemProps {
  reaction: Reaction;
  showReplyButton?: boolean;
}

const ReactionItem: React.FC<ReactionItemProps> = ({ reaction, showReplyButton = true }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(reaction.likes || 0);
  const [showShare, setShowShare] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
    
    // Add some fun feedback
    if (!liked) {
      toast.success("You liked this reaction! 🎉");
    }
  };

  const handleShare = () => {
    setShowShare(!showShare);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://example.com/reaction/${reaction.id}`);
    toast.success("Link copied to clipboard! 📋");
    setShowShare(false);
  };
  
  const handleReply = () => {
    setIsReplying(!isReplying);
  };
  
  const submitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyText.trim()) {
      toast.success("Reply posted! 💬");
      setReplyText("");
      setIsReplying(false);
    } else {
      toast.error("Please enter a reply");
    }
  };

  return (
    <div className="space-y-3 hover:bg-accent/10 p-2 rounded-lg transition-colors">
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10 animate-in">
          <AvatarImage src={reaction.userAvatar} alt={reaction.username} />
          <AvatarFallback>
            {reaction.username && reaction.username.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{reaction.username}</span>
              <span className="text-muted-foreground text-xs ml-2">
                {formatDistanceToNow(new Date(reaction.createdAt), { addSuffix: true })}
              </span>
            </div>
          </div>
          
          <p className="text-sm">{reaction.text}</p>
          
          {reaction.gifUrl && (
            <div className="mt-2 rounded-md overflow-hidden border border-border hover:scale-[1.01] transition-transform">
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
              className={`rounded-full px-3 gap-1 ${liked ? "text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-500" : ""}`}
              onClick={handleLike}
            >
              <Heart 
                size={16} 
                className={liked ? "fill-current" : ""} 
              />
              {likes > 0 && <span>{likes}</span>}
            </Button>
            
            {showReplyButton && (
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full px-3 gap-1 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={handleReply}
              >
                <MessageSquare size={16} />
                {reaction.comments && reaction.comments.length > 0 && (
                  <span>{reaction.comments.length}</span>
                )}
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full px-3 hover:bg-green-50 dark:hover:bg-green-900/20"
              onClick={handleShare}
            >
              <Share2 size={16} />
            </Button>
          </div>
          
          {showShare && (
            <div className="mt-2 p-2 bg-muted rounded-md animate-in slide-in-from-bottom-2 duration-200">
              <Button variant="outline" size="sm" onClick={handleCopyLink} className="w-full">
                Copy Link
              </Button>
            </div>
          )}
          
          {isReplying && (
            <form onSubmit={submitReply} className="mt-3 space-y-2 bg-muted p-2 rounded-md animate-in slide-in-from-bottom-2">
              <textarea 
                className="w-full p-2 rounded-md border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Write your reply..."
                rows={2}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsReplying(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  size="sm"
                >
                  Reply
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReactionItem;

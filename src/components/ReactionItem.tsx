
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import GifSelector from "./GifSelector";
import { Reaction, Comment } from "@/lib/mockData";

interface ReactionItemProps {
  reaction: Reaction;
}

const ReactionItem: React.FC<ReactionItemProps> = ({ reaction }) => {
  const { user, isAuthenticated } = useAuth();
  const [isLiked, setIsLiked] = useState(reaction.isLiked || false);
  const [likeCount, setLikeCount] = useState(reaction.likes);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>(reaction.comments);
  const [showComments, setShowComments] = useState(false);
  const [showGifSelector, setShowGifSelector] = useState(false);
  const [commentGifUrl, setCommentGifUrl] = useState<string | undefined>(undefined);

  const handleLike = () => {
    if (!isAuthenticated || !user) return;
    
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleSelectGif = (url: string) => {
    setCommentGifUrl(url);
    setShowGifSelector(false);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || (!commentText.trim() && !commentGifUrl)) return;
    
    const newComment: Comment = {
      id: `c-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      reactionId: reaction.id,
      userId: user.id,
      username: user.username,
      userAvatar: user.avatar,
      text: commentText.trim(),
      gifUrl: commentGifUrl,
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
    };
    
    setComments((prevComments) => [...prevComments, newComment]);
    setCommentText("");
    setCommentGifUrl(undefined);
    setShowCommentForm(false);
    setShowComments(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) {
      return `${diffMins} min${diffMins === 1 ? '' : 's'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    } else if (diffDays < 30) {
      return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarImage src={reaction.userAvatar} alt={reaction.username} />
            <AvatarFallback>{reaction.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <p className="font-medium">{reaction.username}</p>
              <span className="text-xs text-muted-foreground">
                {formatDate(reaction.createdAt)}
              </span>
            </div>
            {reaction.text && <p className="mt-1">{reaction.text}</p>}
          </div>
        </div>

        {reaction.gifUrl && (
          <div className="mt-2 rounded-lg overflow-hidden max-h-96 flex justify-center">
            <img
              src={reaction.gifUrl}
              alt="GIF"
              className="max-w-full object-contain"
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="px-4 py-3 border-t flex justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`gap-2 ${isLiked ? "text-primary" : ""}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 10v12"></path>
              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
            </svg>
            {likeCount}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowCommentForm(true);
              if (!showComments && comments.length > 0) {
                setShowComments(true);
              }
            }}
            className="gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            {comments.length > 0 ? comments.length : "Reply"}
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowComments(!showComments)}
          className="gap-2"
          disabled={comments.length === 0}
        >
          {showComments ? "Hide replies" : "Show replies"}
        </Button>
      </CardFooter>

      {/* Comments section */}
      {showComments && comments.length > 0 && (
        <div className="px-4 py-2 bg-secondary/50">
          <div className="pl-8 space-y-3">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-2 py-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={comment.userAvatar} alt={comment.username} />
                  <AvatarFallback>{comment.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{comment.username}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm">{comment.text}</p>
                  {comment.gifUrl && (
                    <div className="mt-1 rounded-lg overflow-hidden max-h-60 flex justify-start">
                      <img
                        src={comment.gifUrl}
                        alt="GIF"
                        className="max-w-full object-contain max-h-60"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comment form */}
      {showCommentForm && !showGifSelector && (
        <div className="px-4 py-3 bg-secondary/50">
          <form onSubmit={handleSubmitComment} className="pl-8 space-y-3">
            <Textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a reply..."
              className="min-h-[60px]"
            />
            
            {commentGifUrl && (
              <div className="relative">
                <img 
                  src={commentGifUrl} 
                  alt="Selected GIF" 
                  className="rounded-md max-h-[100px] object-contain"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setCommentGifUrl(undefined)}
                  className="absolute top-1 right-1 rounded-full bg-background/80 hover:bg-background"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </Button>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowGifSelector(true)}
                className="gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                  <path d="M14 9h2"></path>
                  <path d="M14 13h2"></path>
                  <path d="M9 9h1"></path>
                  <path d="M6 15h12"></path>
                  <path d="M9 13h1"></path>
                </svg>
                GIF
              </Button>
              
              <div className="space-x-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowCommentForm(false);
                    setCommentText("");
                    setCommentGifUrl(undefined);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={!commentText.trim() && !commentGifUrl}
                >
                  Reply
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
      
      {/* GIF selector */}
      {showCommentForm && showGifSelector && (
        <div className="px-4 py-3 bg-secondary/50">
          <div className="pl-8">
            <GifSelector
              onSelectGif={handleSelectGif}
              onCancel={() => setShowGifSelector(false)}
            />
          </div>
        </div>
      )}
    </Card>
  );
};

export default ReactionItem;

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageSquare, User, Calendar } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { toast } from 'sonner';
import { Comment } from '@/lib/api/types';
import { useData } from '@/contexts/DataContext';

const PostComments = () => {
  const { slug } = useParams<{ slug: string }>();
  const { post } = useData();
  
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !content) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (!post?._id) {
      toast.error('Cannot identify post');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await apiClient.post(API_ENDPOINTS.COMMENTS, {
        post_id: post._id,
        name,
        email,
        content
      });
      
      if (response.status === 201) {
        toast.success('Comment submitted for review');
        // Add comment to local state but mark as pending
        const newComment: Comment = {
          ...response.data,
          _id: response.data._id || `temp-${Date.now()}`,
          created_at: new Date().toISOString(),
          status: 'pending'
        };
        
        setComments(prev => [...prev, newComment]);
        
        // Reset form
        setName('');
        setEmail('');
        setContent('');
      } else {
        throw new Error('Failed to submit comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error('Failed to submit comment. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container max-w-4xl px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <MessageSquare className="mr-2 h-5 w-5" />
        Comments
      </h2>
      
      {comments.length > 0 ? (
        <div className="mb-8 space-y-6">
          {comments.map((comment) => (
            <div 
              key={comment._id} 
              className={`border rounded-md p-4 ${
                comment.status !== 'approved' ? 'bg-muted/50 border-dashed' : ''
              }`}
            >
              {comment.status !== 'approved' && (
                <p className="text-xs text-muted-foreground mb-2">
                  Your comment is awaiting moderation.
                </p>
              )}
              <p className="mb-3">{comment.content}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="flex items-center mr-4">
                  <User className="h-3.5 w-3.5 mr-1" />
                  <span>{comment.name}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  <span>
                    {new Date(comment.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground mb-8">
          No comments yet. Be the first to leave a comment!
        </p>
      )}
      
      <div className="border rounded-md p-6">
        <h3 className="text-xl font-semibold mb-4">Leave a Comment</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Your email will not be published
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea 
              id="comment" 
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full md:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Post Comment'}
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Comments are moderated and will appear once approved.
          </p>
        </form>
      </div>
    </div>
  );
};

export default PostComments;

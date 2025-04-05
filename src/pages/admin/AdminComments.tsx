
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, MessageSquare } from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { Comment } from '@/lib/api/types';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

const AdminComments = () => {
  const { comments, updateComment } = useData();
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filter comments based on current filter
  const filteredComments = comments.filter(comment => {
    if (filter === 'all') return true;
    return comment.status === filter;
  });

  const getPostTitle = (postId: string) => {
    // In a real app, this would fetch from posts or be in the comments data
    return `Post #${postId}`;
  };

  const getCommentExcerpt = (content: string, maxLength = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const handleApprove = async (comment: Comment) => {
    setIsLoading(true);
    try {
      await apiClient.put(API_ENDPOINTS.APPROVE_COMMENT(comment._id));
      updateComment(comment._id, 'approved');
      toast.success('Comment approved');
    } catch (error: any) {
      console.error('Error approving comment:', error);
      toast.error(error.message || 'Failed to approve comment');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async (comment: Comment) => {
    setIsLoading(true);
    try {
      await apiClient.put(API_ENDPOINTS.REJECT_COMMENT(comment._id));
      updateComment(comment._id, 'rejected');
      toast.success('Comment rejected');
    } catch (error: any) {
      console.error('Error rejecting comment:', error);
      toast.error(error.message || 'Failed to reject comment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Comments</h1>
      
      <div className="flex space-x-2 mb-6">
        <Button 
          variant={filter === 'all' ? 'default' : 'outline'} 
          onClick={() => setFilter('all')}
        >
          All ({comments.length})
        </Button>
        <Button 
          variant={filter === 'pending' ? 'default' : 'outline'} 
          onClick={() => setFilter('pending')}
        >
          Pending ({comments.filter(c => c.status === 'pending').length})
        </Button>
        <Button 
          variant={filter === 'approved' ? 'default' : 'outline'} 
          onClick={() => setFilter('approved')}
        >
          Approved ({comments.filter(c => c.status === 'approved').length})
        </Button>
        <Button 
          variant={filter === 'rejected' ? 'default' : 'outline'} 
          onClick={() => setFilter('rejected')}
        >
          Rejected ({comments.filter(c => c.status === 'rejected').length})
        </Button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Comments ({filteredComments.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Author</TableHead>
                    <TableHead>Post</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredComments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        No comments found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredComments.map((comment) => (
                      <TableRow key={comment._id}>
                        <TableCell className="font-medium">
                          {comment.user_name}
                        </TableCell>
                        <TableCell>
                          {getPostTitle(comment.post_id)}
                        </TableCell>
                        <TableCell>
                          <button
                            className="text-left hover:underline"
                            onClick={() => setSelectedComment(comment)}
                          >
                            {getCommentExcerpt(comment.content)}
                          </button>
                        </TableCell>
                        <TableCell>
                          {new Date(comment.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              comment.status === 'approved'
                                ? 'bg-green-100 text-green-800'
                                : comment.status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {comment.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {comment.status !== 'approved' && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleApprove(comment)}
                                disabled={isLoading}
                              >
                                <Check className="h-4 w-4 text-green-500" />
                              </Button>
                            )}
                            {comment.status !== 'rejected' && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleReject(comment)}
                                disabled={isLoading}
                              >
                                <X className="h-4 w-4 text-red-500" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Comment Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedComment ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Author</h3>
                    <p>{selectedComment.user_name}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Post</h3>
                    <p>{getPostTitle(selectedComment.post_id)}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Date</h3>
                    <p>
                      {new Date(selectedComment.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Status</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        selectedComment.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : selectedComment.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {selectedComment.status}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Comment</h3>
                    <p className="whitespace-pre-wrap">{selectedComment.content}</p>
                  </div>
                  
                  <div className="flex space-x-2 pt-4">
                    {selectedComment.status !== 'approved' && (
                      <Button
                        onClick={() => handleApprove(selectedComment)}
                        disabled={isLoading}
                        className="flex-1"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                    )}
                    {selectedComment.status !== 'rejected' && (
                      <Button
                        variant="destructive"
                        onClick={() => handleReject(selectedComment)}
                        disabled={isLoading}
                        className="flex-1"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Select a comment to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminComments;
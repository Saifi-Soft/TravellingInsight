
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { toast } from '@/hooks/use-toast';
import { Ban, Trash2, Edit, CalendarPlus, CalendarClock, MessageSquare, MessageSquareX } from 'lucide-react';

// Mock data for demonstration
const comments = [
  {
    id: 1,
    author: "Emma Wilson",
    content: "What's your favorite hidden gem in Europe?",
    date: "2 days ago",
    blocked: false
  },
  {
    id: 2,
    author: "David Chen",
    content: "I'm planning a trip to Southeast Asia next month.",
    date: "5 days ago",
    blocked: false
  },
  {
    id: 3,
    author: "Sarah Johnson",
    content: "Solo female travel safety tips?",
    date: "1 week ago",
    blocked: true
  }
];

const users = [
  {
    id: 1,
    name: "Emma Wilson",
    email: "emma@example.com",
    joined: "Apr 15, 2023",
    status: "Active",
    blocked: false
  },
  {
    id: 2,
    name: "David Chen",
    email: "david@example.com",
    joined: "Jun 3, 2023",
    status: "Active",
    blocked: false
  },
  {
    id: 3,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    joined: "Feb 12, 2023",
    status: "Blocked",
    blocked: true
  }
];

const events = [
  {
    id: 1,
    title: "Virtual Photography Workshop",
    date: "June 15, 2023",
    time: "7:00 PM - 9:00 PM EST",
    location: "Online (Zoom)",
    attendees: 156,
    status: "Upcoming"
  },
  {
    id: 2,
    title: "New York City Travelers Meetup",
    date: "July 8, 2023",
    time: "6:30 PM - 9:30 PM",
    location: "The Explorers Club, Manhattan",
    attendees: 48,
    status: "Upcoming"
  },
  {
    id: 3,
    title: "Sustainable Travel Webinar",
    date: "May 22, 2023",
    time: "12:00 PM - 1:30 PM EST",
    location: "Online (Zoom)",
    attendees: 213,
    status: "Completed"
  }
];

const AdminCommunity = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [isOnlineEvent, setIsOnlineEvent] = useState(false);
  const [zoomLink, setZoomLink] = useState('');

  const handleToggleUserBlock = (userId: number) => {
    // In a real app, this would call an API to block/unblock the user
    toast({
      title: "User status updated",
      description: "The user's status has been updated successfully.",
    });
  };

  const handleDeleteComment = (commentId: number) => {
    // In a real app, this would call an API to delete the comment
    toast({
      title: "Comment deleted",
      description: "The comment has been deleted successfully.",
    });
  };

  const handleToggleCommentBlock = (commentId: number) => {
    // In a real app, this would call an API to block/unblock the comment
    toast({
      title: "Comment status updated",
      description: "The comment has been hidden/shown successfully.",
    });
  };

  const handleCreateEvent = () => {
    // Validate the form
    if (!eventTitle || !eventDescription || !eventTime || !selectedDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would call an API to create the event
    toast({
      title: "Event created",
      description: "The event has been scheduled successfully.",
    });
    
    // Reset form and close dialog
    setEventTitle('');
    setEventDescription('');
    setEventTime('');
    setEventLocation('');
    setIsOnlineEvent(false);
    setZoomLink('');
    setShowEventDialog(false);
  };

  const handleDeleteEvent = (eventId: number) => {
    // In a real app, this would call an API to delete the event
    toast({
      title: "Event deleted",
      description: "The event has been deleted successfully.",
    });
  };

  return (
    <AdminLayout title="Community Management">
      <Tabs defaultValue="comments" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="comments">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Author</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comments.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell className="font-medium">{comment.author}</TableCell>
                    <TableCell>{comment.content}</TableCell>
                    <TableCell>{comment.date}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${comment.blocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {comment.blocked ? 'Hidden' : 'Visible'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleToggleCommentBlock(comment.id)}
                        >
                          {comment.blocked ? <MessageSquare className="h-4 w-4" /> : <MessageSquareX className="h-4 w-4" />}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.joined}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${user.blocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleToggleUserBlock(user.id)}
                        className={user.blocked ? "text-green-500 hover:text-green-700" : "text-red-500 hover:text-red-700"}
                      >
                        <Ban className="h-4 w-4 mr-2" />
                        {user.blocked ? 'Unblock' : 'Block'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="events">
          <div className="mb-4 flex justify-end">
            <Button onClick={() => setShowEventDialog(true)}>
              <CalendarPlus className="h-4 w-4 mr-2" />
              Schedule New Event
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Attendees</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>{event.date}<br/>{event.time}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>{event.attendees}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${event.status === 'Completed' ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'}`}>
                        {event.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteEvent(event.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Schedule New Event</DialogTitle>
                <DialogDescription>
                  Create a new event for the community. Fill in the details below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Input
                      placeholder="Event Title"
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Event Description"
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Select Date</h4>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="border rounded-md"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 text-sm font-medium">Event Time</h4>
                      <Input
                        placeholder="e.g., 7:00 PM - 9:00 PM EST"
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="online-event" 
                        checked={isOnlineEvent}
                        onCheckedChange={(checked) => {
                          setIsOnlineEvent(checked === true);
                          if (checked !== true) {
                            setZoomLink('');
                          }
                        }}
                      />
                      <label
                        htmlFor="online-event"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        This is an online event
                      </label>
                    </div>
                    
                    {isOnlineEvent ? (
                      <div>
                        <Input
                          placeholder="Zoom or meeting link"
                          value={zoomLink}
                          onChange={(e) => setZoomLink(e.target.value)}
                        />
                      </div>
                    ) : (
                      <div>
                        <Input
                          placeholder="Physical location"
                          value={eventLocation}
                          onChange={(e) => setEventLocation(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowEventDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateEvent}>
                  Schedule Event
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminCommunity;

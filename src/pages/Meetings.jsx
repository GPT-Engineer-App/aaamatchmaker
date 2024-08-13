import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { useDiscoveryMeetingsForProfile } from "../integrations/supabase";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Meetings = () => {
  const profileId = "7f4c2fb8-d3e6-4671-b45e-f2ffb76a1d12";
  const { data: meetings, isLoading, error } = useDiscoveryMeetingsForProfile(profileId);

  if (isLoading) {
    return (
      <Card className="h-full bg-white/80 backdrop-blur-sm border-none shadow-lg">
        <CardHeader>
          <CardTitle><Skeleton className="h-8 w-3/4" /></CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </CardContent>
      </Card>
    );
  }
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Card className="h-full bg-white/80 backdrop-blur-sm border-none shadow-lg overflow-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-indigo-700">Upcoming Meetings</CardTitle>
      </CardHeader>
      <CardContent>
        {meetings && meetings.length > 0 ? (
          meetings.map((meeting) => (
            <UpcomingDiscoveryCall key={meeting.meeting_id} meeting={meeting} />
          ))
        ) : (
          <Alert variant="warning" className="mb-6 bg-yellow-100 border-yellow-400">
            <AlertDescription className="text-yellow-700">
              No upcoming discovery calls. Matches will be generated after the first Discovery Call.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

const UpcomingDiscoveryCall = ({ meeting }) => {
  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMMM d, yyyy 'at' h:mm a");
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-purple-600">{meeting.meeting_title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="font-semibold">Date:</p>
            <p className="bg-gray-100 rounded-md px-3 py-2">{formatDate(meeting.event_start_time)}</p>
          </div>
          <div>
            <p className="font-semibold">Location:</p>
            <p className="bg-gray-100 rounded-md px-3 py-2">{meeting.meeting_timezone}</p>
          </div>
          <div>
            <p className="font-semibold">Meeting Link:</p>
            <a href={meeting.meeting_url} target="_blank" rel="noopener noreferrer" className="bg-gray-100 rounded-md px-3 py-2 text-blue-500 hover:underline block">
              Join Meeting
            </a>
          </div>
          <div>
            <p className="font-semibold">Host:</p>
            <p className="bg-gray-100 rounded-md px-2 py-1">{meeting.host_email}</p>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Button variant="outline" className="w-full sm:w-auto text-red-500 border-red-500 hover:bg-red-50" onClick={() => window.open(meeting.cancel_url, '_blank')}>
              Cancel
            </Button>
            <Button variant="outline" className="w-full sm:w-auto text-blue-500 border-blue-500 hover:bg-blue-50" onClick={() => window.open(meeting.reschedule_url, '_blank')}>
              Reschedule
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Meetings;

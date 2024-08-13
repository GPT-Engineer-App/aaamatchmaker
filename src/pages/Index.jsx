import MatchList from "../components/organisms/MatchList";
import { useMatchmakerProfile, useUserMatchesWithDetailsForProfile, useRealtimeData } from "../integrations/supabase";
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const profileId = "7f4c2fb8-d3e6-4671-b45e-f2ffb76a1d12";
  const { data: profile, isLoading: profileLoading, error: profileError } = useMatchmakerProfile(profileId);
  const { data: userMatches, isLoading: matchesLoading, error: matchesError, refetch } = useUserMatchesWithDetailsForProfile(profileId);
  const realtimeData = useRealtimeData();

  React.useEffect(() => {
    if (realtimeData && (realtimeData.eventType === 'INSERT' || realtimeData.eventType === 'UPDATE')) {
      refetch();
    }
  }, [realtimeData, refetch]);

  if (profileLoading || matchesLoading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
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
  if (profileError) return <div>Error loading profile: {profileError.message}</div>;
  if (matchesError) return <div>Error loading matches: {matchesError.message}</div>;
  if (!profile) return <div>No profile found</div>;
  if (!userMatches) return <div>No matches found</div>;

  const processedMatches = userMatches.map(match => ({
    name: match.matched_profile.name,
    country: "🌍",
    experience: match.experience_level || "Not specified",
    matchScore: match.matching_score,
    matchReason: match.explanation,
    potentialCollaboration: match.potential_collaboration,
    complimentarySkills: match.complementary_skills ? match.complementary_skills.join(", ") : "Not specified",
    sharedInterests: match.shared_interests ? match.shared_interests.join(", ") : "Not specified",
    communicationCompatibility: match.communication_compatibility,
    geographicalSynergy: match.geographical_synergy,
    industry: match.matched_profile.industry,
    imageUrl: match.matched_profile.image_url,
    keySkills: match.matched_profile.key_skills ? match.matched_profile.key_skills.join(", ") : "Not specified",
  }));

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-indigo-700">Top Matches</CardTitle>
      </CardHeader>
      <CardContent>
        <MatchList matches={processedMatches} />
      </CardContent>
    </Card>
  );
};

export default Index;

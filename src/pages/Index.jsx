import MatchList from "../components/organisms/MatchList";
import { useMatchmakerProfile, useUserMatchesWithDetailsForProfile, useRealtimeData } from "../integrations/supabase";
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const profileId = "7f4c2fb8-d3e6-4671-b45e-f2ffb76a1d12";
  const { data: profile, isLoading: profileLoading, error: profileError } = useMatchmakerProfile(profileId);
  const { data: userMatches, isLoading: matchesLoading, error: matchesError, refetch } = useUserMatchesWithDetailsForProfile(profileId);
  const realtimeData = useRealtimeData();

  React.useEffect(() => {
    if (realtimeData && (realtimeData.eventType === 'INSERT' || realtimeData.eventType === 'UPDATE')) {
      // Refetch the data when we receive a real-time update
      refetch();
    }
  }, [realtimeData, refetch]);

  if (profileLoading || matchesLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }
  if (profileError) return <div>Error loading profile: {profileError.message}</div>;
  if (matchesError) return <div>Error loading matches: {matchesError.message}</div>;
  if (!profile) return <div>No profile found</div>;
  if (!userMatches) return <div>No matches found</div>;

  const processedMatches = userMatches.map(match => ({
    name: match.matched_profile.name,
    country: "🌍", // You might want to add a country field to your matches
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
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">Top Matches</h1>
      <MatchList matches={processedMatches} />
    </div>
  );
};

export default Index;

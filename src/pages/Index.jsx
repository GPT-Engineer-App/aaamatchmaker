import MatchList from "../components/organisms/MatchList";
import { useMatchmakerProfile, useUserMatchesWithDetailsForProfile, useRealtimeData } from "../integrations/supabase";
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-lg p-6 md:p-8"
    >
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8 flex items-center">
        <Sparkles className="mr-2 text-yellow-400" />
        Top Matches
      </h1>
      <MatchList matches={processedMatches} />
    </motion.div>
  );
};

export default Index;

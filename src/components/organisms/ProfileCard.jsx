import React from 'react';
import ProfileHeader from "../molecules/ProfileHeader";
import ProfileSection from "../molecules/ProfileSection";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, MessageSquare } from "lucide-react";

const ProfileCard = ({ profile }) => {
  if (!profile) return null;

  return (
    <Card className="h-full overflow-auto bg-white/80 backdrop-blur-sm border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-indigo-700">Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ProfileHeader 
          name={profile.name} 
          tagline={profile.career_stage} 
          imageUrl={profile.image_url} 
        />

        <ProfileSectionContent title="Business Goals" items={profile.business_goals} />
        <ProfileSectionContent title="Key Skills" items={profile.key_skills} />
        <ProfileSectionContent title="Interests" items={profile.interests} />
        <ProfileSectionContent title="Hobbies" items={profile.hobbies} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem icon={<MessageSquare className="w-5 h-5" />} title="Communication" content={profile.preferred_communication} />
          <InfoItem icon={<MapPin className="w-5 h-5" />} title="Location" content={profile.location} />
          <InfoItem icon={<Briefcase className="w-5 h-5" />} title="Industry" content={profile.industry} />
        </div>
      </CardContent>
    </Card>
  );
};

const ProfileSectionContent = ({ title, items }) => (
  <div>
    <h3 className="font-semibold text-lg mb-2 text-indigo-600">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <Badge key={index} variant="secondary" className="bg-indigo-100 text-indigo-700">
          {item}
        </Badge>
      ))}
    </div>
  </div>
);

const InfoItem = ({ icon, title, content }) => (
  <div className="flex items-center space-x-2">
    {icon}
    <span className="font-medium text-gray-700">{title}:</span>
    <span className="text-gray-600">{content}</span>
  </div>
);

export default ProfileCard;

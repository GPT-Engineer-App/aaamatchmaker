import React from 'react';
import ProfileHeader from "../molecules/ProfileHeader";
import ProfileSection from "../molecules/ProfileSection";

const ProfileCard = ({ profile }) => {
  if (!profile) return null;

  const renderGrid = (items, gridCols = 2) => (
    <div className={`grid grid-cols-${gridCols} gap-2`}>
      {items.map((item, index) => (
        <span key={index} className="bg-gray-100 rounded-md px-3 py-2 text-sm">
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className="h-full bg-white rounded-lg shadow-md p-4 md:p-6 overflow-auto">
      <h1 className="text-3xl font-bold text-purple-600 mb-6 font-quicksand">Your Profile</h1>
      
      <ProfileHeader 
        name={profile.name} 
        tagline={profile.career_stage} 
        imageUrl={profile.image_url} 
      />

      <div className="grid grid-cols-2 gap-4 mb-4">
        <ProfileSection title="Business Goals">
          {profile.business_goals.map((goal, index) => (
            <React.Fragment key={index}>{goal}</React.Fragment>
          ))}
        </ProfileSection>
        <ProfileSection title="Key Skills">
          {profile.key_skills.map((skill, index) => (
            <React.Fragment key={index}>{skill}</React.Fragment>
          ))}
        </ProfileSection>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <ProfileSection title="Interests">
          {profile.interests.map((interest, index) => (
            <React.Fragment key={index}>{interest}</React.Fragment>
          ))}
        </ProfileSection>
        <ProfileSection title="Hobbies">
          {profile.hobbies.map((hobby, index) => (
            <React.Fragment key={index}>{hobby}</React.Fragment>
          ))}
        </ProfileSection>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ProfileSection title="Communication Preferences">
          {profile.preferred_communication}
        </ProfileSection>
        <ProfileSection title="Location">
          {profile.location}
        </ProfileSection>
      </div>

      <div className="mt-4">
        <ProfileSection title="Industry">
          {profile.industry}
        </ProfileSection>
      </div>
    </div>
  );
};

export default ProfileCard;

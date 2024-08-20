import ProfileCard from "../organisms/ProfileCard";
import { useMatchmakerProfile } from "../../integrations/supabase";
import { Skeleton } from "@/components/ui/skeleton";

const Layout = ({ children }) => {
  const profileId = "7f4c2fb8-d3e6-4671-b45e-f2ffb76a1d12";
  const { data: profile, isLoading: profileLoading, error: profileError } = useMatchmakerProfile(profileId);
  const { data: aaaUser, isLoading: aaaUserLoading, error: aaaUserError } = useAAAUser(profileId);

  if (profileLoading || aaaUserLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-[40%]">
            <Skeleton className="h-[600px] w-full" />
          </div>
          <div className="w-full lg:w-[60%]">
            <Skeleton className="h-[600px] w-full" />
          </div>
        </div>
      </div>
    );
  }
  if (profileError) return <div>Error loading profile: {profileError.message}</div>;
  if (aaaUserError) return <div>Error loading user data: {aaaUserError.message}</div>;
  if (!profile) return <div>No profile found</div>;
  if (!aaaUser) return <div>No user data found</div>;

  const combinedProfile = {
    ...profile,
    image_url: aaaUser.image_url || "/placeholder.svg"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-[40%] mb-4 lg:mb-0">
          <ProfileCard profile={combinedProfile} />
        </div>
        <div className="w-full lg:w-[60%]">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
import ProfileCard from "../organisms/ProfileCard";
import { useMatchmakerProfile } from "../../integrations/supabase";
import { Skeleton } from "@/components/ui/skeleton";

const Layout = ({ children }) => {
  const profileId = "7f4c2fb8-d3e6-4671-b45e-f2ffb76a1d12";
  const { data: profile, isLoading, error } = useMatchmakerProfile(profileId);

  if (isLoading) {
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
  if (error) return <div>Error: {error.message}</div>;
  if (!profile) return <div>No profile found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-[40%] mb-4 lg:mb-0">
          <ProfileCard profile={profile} />
        </div>
        <div className="w-full lg:w-[60%]">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
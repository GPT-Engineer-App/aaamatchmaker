import ProfileCard from "../organisms/ProfileCard";
import { useMatchmakerProfile } from "../../integrations/supabase";
import { Skeleton } from "@/components/ui/skeleton";

const Layout = ({ children }) => {
  const profileId = "7f4c2fb8-d3e6-4671-b45e-f2ffb76a1d12";
  const { data: profile, isLoading, error } = useMatchmakerProfile(profileId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="flex h-full">
          <div className="w-[40%] mr-4">
            <Skeleton className="h-[600px] w-full rounded-lg" />
          </div>
          <div className="w-[60%]">
            <Skeleton className="h-[600px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }
  if (error) return <div>Error: {error.message}</div>;
  if (!profile) return <div>No profile found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="flex flex-col md:flex-row h-full gap-6">
        <div className="w-full md:w-[40%]">
          <ProfileCard profile={profile} />
        </div>
        <div className="w-full md:w-[60%]">{children}</div>
      </div>
    </div>
  );
};

export default Layout;

import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### discovery_meetings

| name               | type                     | format                  | required |
|--------------------|--------------------------|-------------------------|----------|
| meeting_id         | uuid                     | uuid                    | true     |
| guest_profile_id   | uuid                     | uuid                    | false    |
| host_user_id       | uuid                     | uuid                    | true     |
| meeting_title      | text                     | string                  | true     |
| meeting_timezone   | text                     | string                  | true     |
| event_start_time   | timestamp with time zone | string                  | true     |
| event_end_time     | timestamp with time zone | string                  | true     |
| meeting_url        | text                     | string                  | true     |
| reschedule_url     | text                     | string                  | false    |
| cancel_url         | text                     | string                  | false    |
| meeting_status     | text                     | string                  | false    |
| created_at         | timestamp with time zone | string                  | false    |
| updated_at         | timestamp with time zone | string                  | false    |
| guest_user_id      | uuid                     | uuid                    | true     |

### aaa_users

| name                         | type                     | format                  | required |
|------------------------------|--------------------------|-------------------------|----------|
| user_id                      | uuid                     | uuid                    | true     |
| linkedin_url                 | text                     | string                  | false    |
| image_url                    | text                     | string                  | false    |
| name                         | text                     | string                  | true     |
| company_name                 | text                     | string                  | false    |
| company_website              | text                     | string                  | false    |
| company_linkedin             | text                     | string                  | false    |
| job_title                    | text                     | string                  | false    |
| current_title                | text                     | string                  | false    |
| main_email                   | text                     | string                  | false    |
| secondary_email              | text                     | string                  | false    |
| phone_number                 | text                     | string                  | false    |
| location                     | text                     | string                  | false    |
| industry                     | text                     | string                  | false    |
| areas_of_expertise           | text[]                   | array                   | false    |
| skills                       | text[]                   | array                   | false    |
| key_projects                 | text[]                   | array                   | false    |
| ai_technologies_used         | text[]                   | array                   | false    |
| business_goals               | text[]                   | array                   | false    |
| challenges_faced             | text[]                   | array                   | false    |
| interests                    | text[]                   | array                   | false    |
| networking_notes             | text                     | string                  | false    |
| partnership_potential        | text                     | string                  | false    |
| aaa_advice                   | text                     | string                  | false    |
| follow_up_actions            | text                     | string                  | false    |
| job_history                  | text[]                   | array                   | false    |
| education                    | text[]                   | array                   | false    |
| ai_solution_offerings        | text                     | string                  | false    |
| target_market                | text                     | string                  | false    |
| revenue_model                | text                     | string                  | false    |
| team_size                    | text                     | string                  | false    |
| funding_status               | text                     | string                  | false    |
| tech_stack                   | text[]                   | array                   | false    |
| data_privacy_approach        | text                     | string                  | false    |
| scalability_strategy         | text                     | string                  | false    |
| competitive_advantage        | text                     | string                  | false    |
| potential_collaboration_areas| text[]                   | array                   | false    |
| next_milestones              | text                     | string                  | false    |
| personal_motivation          | text                     | string                  | false    |
| networking_preferences       | text                     | string                  | false    |
| content_creation             | text                     | string                  | false    |
| community_involvement        | text                     | string                  | false    |
| mentoring_interests          | text                     | string                  | false    |
| skills_to_acquire            | text[]                   | array                   | false    |
| resources_needed             | text                     | string                  | false    |
| success_metrics              | text                     | string                  | false    |
| long_term_vision             | text                     | string                  | false    |
| experienced_roadblocks       | text                     | string                  | false    |
| best_practices               | text                     | string                  | false    |
| career_stage                 | text                     | string                  | false    |
| preferred_communication      | text                     | string                  | false    |
| additional_data              | jsonb                    | object                  | false    |
| created_at                   | timestamp with time zone | string                  | false    |
| updated_at                   | timestamp with time zone | string                  | false    |
| first_name                   | text                     | string                  | false    |
| last_name                    | text                     | string                  | false    |
| member_profile_url           | text                     | string                  | false    |
| current_focus                | text                     | string                  | false    |
| about_myself                 | text                     | string                  | false    |

### user_matches

| name                        | type                     | format                  | required |
|-----------------------------|--------------------------|-------------------------|----------|
| match_id                    | uuid                     | uuid                    | true     |
| profile_id                  | uuid                     | uuid                    | true     |
| matched_profile_id          | uuid                     | uuid                    | true     |
| matching_score              | numeric                  | number                  | false    |
| explanation                 | text                     | string                  | false    |
| complementary_skills        | text[]                   | array                   | false    |
| potential_collaboration     | text                     | string                  | false    |
| shared_interests            | text[]                   | array                   | false    |
| geographical_synergy        | text                     | string                  | false    |
| experience_level            | text                     | string                  | false    |
| communication_compatibility | text                     | string                  | false    |
| created_at                  | timestamp with time zone | string                  | false    |
| updated_at                  | timestamp with time zone | string                  | false    |

### user_feedback

| name                           | type                     | format                  | required |
|--------------------------------|--------------------------|-------------------------|----------|
| id                             | uuid                     | uuid                    | true     |
| user_id                        | uuid                     | uuid                    | false    |
| last_meeting_id                | uuid                     | uuid                    | false    |
| feedback_type                  | text                     | string                  | true     |
| content                        | text                     | string                  | false    |
| media_url                      | text                     | string                  | false    |
| transcript                     | text                     | string                  | false    |
| highlight                      | text                     | string                  | false    |
| rating                         | integer                  | number                  | false    |
| is_testimonial                 | boolean                  | boolean                 | false    |
| linkedin_recommendation_url    | text                     | string                  | false    |
| linkedin_recommendation_clicks | integer                  | number                  | false    |
| created_at                     | timestamp with time zone | string                  | false    |
| updated_at                     | timestamp with time zone | string                  | false    |

### matchmaker_profiles

| name                     | type                     | format                  | required |
|--------------------------|--------------------------|-------------------------|----------|
| profile_id               | uuid                     | uuid                    | true     |
| user_id                  | uuid                     | uuid                    | true     |
| name                     | text                     | string                  | true     |
| key_skills               | text[]                   | array                   | false    |
| industry                 | text                     | string                  | false    |
| business_goals           | text[]                   | array                   | false    |
| interests                | text[]                   | array                   | false    |
| location                 | text                     | string                  | false    |
| hobbies                  | text[]                   | array                   | false    |
| career_stage             | text                     | string                  | false    |
| preferred_communication  | text                     | string                  | false    |
| created_at               | timestamp with time zone | string                  | false    |
| updated_at               | timestamp with time zone | string                  | false    |

*/

// Discovery Meetings
export const useDiscoveryMeetings = () => useQuery({
    queryKey: ['discovery_meetings'],
    queryFn: () => fromSupabase(supabase.from('discovery_meetings').select('*'))
});

export const useDiscoveryMeeting = (meetingId) => useQuery({
    queryKey: ['discovery_meetings', meetingId],
    queryFn: () => fromSupabase(supabase.from('discovery_meetings').select('*').eq('meeting_id', meetingId).single())
});

export const useAddDiscoveryMeeting = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newMeeting) => fromSupabase(supabase.from('discovery_meetings').insert([newMeeting])),
        onSuccess: () => {
            queryClient.invalidateQueries('discovery_meetings');
        },
    });
};

export const useUpdateDiscoveryMeeting = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ meetingId, updates }) => fromSupabase(supabase.from('discovery_meetings').update(updates).eq('meeting_id', meetingId)),
        onSuccess: () => {
            queryClient.invalidateQueries('discovery_meetings');
        },
    });
};

export const useDeleteDiscoveryMeeting = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (meetingId) => fromSupabase(supabase.from('discovery_meetings').delete().eq('meeting_id', meetingId)),
        onSuccess: () => {
            queryClient.invalidateQueries('discovery_meetings');
        },
    });
};

// AAA Users
export const useAAAUsers = () => useQuery({
    queryKey: ['aaa_users'],
    queryFn: () => fromSupabase(supabase.from('aaa_users').select('*'))
});

export const useAAAUser = (userId) => useQuery({
    queryKey: ['aaa_users', userId],
    queryFn: () => fromSupabase(supabase.from('aaa_users').select('*').eq('user_id', userId).single())
});

export const useAddAAAUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUser) => fromSupabase(supabase.from('aaa_users').insert([newUser])),
        onSuccess: () => {
            queryClient.invalidateQueries('aaa_users');
        },
    });
};

export const useUpdateAAAUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, updates }) => fromSupabase(supabase.from('aaa_users').update(updates).eq('user_id', userId)),
        onSuccess: () => {
            queryClient.invalidateQueries('aaa_users');
        },
    });
};

export const useDeleteAAAUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId) => fromSupabase(supabase.from('aaa_users').delete().eq('user_id', userId)),
        onSuccess: () => {
            queryClient.invalidateQueries('aaa_users');
        },
    });
};

// User Matches
export const useUserMatches = () => useQuery({
    queryKey: ['user_matches'],
    queryFn: () => fromSupabase(supabase.from('user_matches').select('*'))
});

export const useUserMatch = (matchId) => useQuery({
    queryKey: ['user_matches', matchId],
    queryFn: () => fromSupabase(supabase.from('user_matches').select('*').eq('match_id', matchId).single())
});

export const useAddUserMatch = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newMatch) => fromSupabase(supabase.from('user_matches').insert([newMatch])),
        onSuccess: () => {
            queryClient.invalidateQueries('user_matches');
        },
    });
};

export const useUpdateUserMatch = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ matchId, updates }) => fromSupabase(supabase.from('user_matches').update(updates).eq('match_id', matchId)),
        onSuccess: () => {
            queryClient.invalidateQueries('user_matches');
        },
    });
};

export const useDeleteUserMatch = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (matchId) => fromSupabase(supabase.from('user_matches').delete().eq('match_id', matchId)),
        onSuccess: () => {
            queryClient.invalidateQueries('user_matches');
        },
    });
};

// User Feedback
export const useUserFeedback = () => useQuery({
    queryKey: ['user_feedback'],
    queryFn: () => fromSupabase(supabase.from('user_feedback').select('*'))
});

export const useUserFeedbackItem = (feedbackId) => useQuery({
    queryKey: ['user_feedback', feedbackId],
    queryFn: () => fromSupabase(supabase.from('user_feedback').select('*').eq('id', feedbackId).single())
});

export const useAddUserFeedback = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newFeedback) => fromSupabase(supabase.from('user_feedback').insert([newFeedback])),
        onSuccess: () => {
            queryClient.invalidateQueries('user_feedback');
        },
    });
};

export const useUpdateUserFeedback = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ feedbackId, updates }) => fromSupabase(supabase.from('user_feedback').update(updates).eq('id', feedbackId)),
        onSuccess: () => {
            queryClient.invalidateQueries('user_feedback');
        },
    });
};

export const useDeleteUserFeedback = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (feedbackId) => fromSupabase(supabase.from('user_feedback').delete().eq('id', feedbackId)),
        onSuccess: () => {
            queryClient.invalidateQueries('user_feedback');
        },
    });
};

// Matchmaker Profiles
export const useMatchmakerProfiles = () => useQuery({
    queryKey: ['matchmaker_profiles'],
    queryFn: () => fromSupabase(supabase.from('matchmaker_profiles').select('*'))
});

export const useMatchmakerProfile = (profileId) => useQuery({
    queryKey: ['matchmaker_profiles', profileId],
    queryFn: () => fromSupabase(supabase.from('matchmaker_profiles').select('*').eq('profile_id', profileId).single())
});

export const useAddMatchmakerProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newProfile) => fromSupabase(supabase.from('matchmaker_profiles').insert([newProfile])),
        onSuccess: () => {
            queryClient.invalidateQueries('matchmaker_profiles');
        },
    });
};

export const useUpdateMatchmakerProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ profileId, updates }) => fromSupabase(supabase.from('matchmaker_profiles').update(updates).eq('profile_id', profileId)),
        onSuccess: () => {
            queryClient.invalidateQueries('matchmaker_profiles');
        },
    });
};

export const useDeleteMatchmakerProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (profileId) => fromSupabase(supabase.from('matchmaker_profiles').delete().eq('profile_id', profileId)),
        onSuccess: () => {
            queryClient.invalidateQueries('matchmaker_profiles');
        },
    });
};

// Additional hooks for specific use cases
export const useDiscoveryMeetingsForProfile = (profileId) => useQuery({
    queryKey: ['discovery_meetings', profileId],
    queryFn: () => fromSupabase(supabase.from('discovery_meetings').select('*').eq('guest_profile_id', profileId))
});

export const useUserMatchesWithDetailsForProfile = (profileId) => useQuery({
    queryKey: ['user_matches_with_details', profileId],
    queryFn: () => fromSupabase(supabase
        .from('user_matches')
        .select(`
            *,
            matched_profile:matchmaker_profiles!matched_profile_id (*)
        `)
        .eq('profile_id', profileId)
    )
});

// Real-time subscription hook
export const useRealtimeData = () => {
    const [realtimeData, setRealtimeData] = React.useState(null);

    React.useEffect(() => {
        const subscription = supabase
            .channel('table-db-changes')
            .on('postgres_changes', { event: '*', schema: 'public' }, (payload) => {
                setRealtimeData(payload);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    return realtimeData;
};
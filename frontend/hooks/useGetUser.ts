import useSWR from "swr";
const fetcher = (url: any) => fetch(url).then((res) => res.json());
export default function useGetUser(userId?: string): { userData?: { status: boolean, data: any }; userDataLoading: boolean; userDataError: boolean, mutate: () => void } {
    const { data, error, isLoading, mutate } = useSWR(userId ? `/api/users?id=${userId}` : null, fetcher,
        {
            shouldRetryOnError: true,
            revalidateOnMount: true,
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            refreshWhenHidden: true,
            refreshWhenOffline: true
        }
    );
    return {
        mutate: mutate,
        userData: data,
        userDataLoading: isLoading,
        userDataError: error,
    };
}
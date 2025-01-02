import useSWR from "swr";
import type { IUserData } from '@/types'
const fetcher = (url: any) => fetch(url).then((res) => res.json());
export default function useGetUser(userId?: string): { userData?: { status: boolean, data: IUserData }; userDataLoading: boolean; userDataError: boolean, mutate: () => void } {
    const { data, error, isLoading, mutate } = useSWR(userId ? `/api/user?id=${userId}` : null, fetcher,
        {
            shouldRetryOnError: true,
            revalidateOnMount: true,
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            refreshWhenHidden: true,
            refreshWhenOffline: true,
            refreshInterval: 5000
        }
    );
    return {
        mutate: mutate,
        userData: data,
        userDataLoading: isLoading,
        userDataError: error,
    };
}
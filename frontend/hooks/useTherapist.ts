import useSWR from "swr";
import type { ITherapist } from '@/types'
const fetcher = (url: any) => fetch(url).then((res) => res.json());
export default function useTherapist(props?: { limit?: 20, skip?: 0 }): { therapist?: { status: boolean, data: ITherapist[] }; therapistLoading: boolean; therapistError: boolean, mutate: () => void } {
    const { data, error, isLoading, mutate } = useSWR(`/api/users/therapist?skip=${props?.skip ?? 0}&limi=${props?.limit ?? 20}`, fetcher,
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
        therapist: data,
        therapistLoading: isLoading,
        therapistError: error,
    };
}
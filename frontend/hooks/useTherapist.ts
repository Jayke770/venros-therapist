import useSWR from "swr";
import type { ITherapist } from '@/types'
import queryString from "query-string"
const fetcher = (url: any) => fetch(url).then((res) => res.json());
export default function useTherapist(props?: { limit?: 20, skip?: 0, search?: string }): { therapist?: { status: boolean, data: ITherapist[] }; therapistLoading: boolean; therapistError: boolean, mutate: () => void } {
    let query: { [key: string]: string | number } = { skip: 0, limit: 20 }
    if (props?.skip) query['skip'] = props.skip
    if (props?.limit) query['limit'] = props.limit
    if (props?.search) query['search'] = props.search
    const { data, error, isLoading, mutate } = useSWR(`/api/users/therapist?${queryString.stringify(query)}`, fetcher,
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
import useSWR from "swr";
import type { ILanguages } from '@/types'
const fetcher = (url: any) => fetch(url).then((res) => res.json());
export default function useLanguages(): { languages?: ILanguages[]; languagesLoading: boolean; languagesError: boolean, mutate: () => void } {
    const { data, error, isLoading, mutate } = useSWR('/assets/languages.json', fetcher,
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
        languages: data,
        languagesLoading: isLoading,
        languagesError: error,
    };
}
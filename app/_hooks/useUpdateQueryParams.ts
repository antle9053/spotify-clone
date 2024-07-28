import { useSearchParams, useRouter, usePathname } from "next/navigation";

type QueryParams = {
  [key: string]: string | number | boolean | undefined;
};

const useUpdateQueryParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const updateQueryParams = (params: QueryParams) => {
    const currentQueryParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        currentQueryParams.set(key, String(value));
      } else {
        currentQueryParams.delete(key);
      }
    });

    router.push(`${pathname}?${currentQueryParams.toString()}`);
  };

  const getQueryParams = () => {
    const params: QueryParams = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  };

  return { updateQueryParams, queryParams: getQueryParams() };
};

export default useUpdateQueryParams;

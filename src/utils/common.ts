import useSWRMutation from "swr/mutation";

export const useOrder = () => {
// https://eb863a74-7a4e-4daf-9540-d2db8470c18e.mock.pstmn.io/marketplace/orders/
    const {data, error, isMutating, trigger, reset} = useSWRMutation(
        `https://testhm.free.beeceptor.com/orders/`,
        fetcher,
    );

    return {
        order: data,
        isMutating,
        isError: error,
        trigger,
        reset
    }
}

const fetcher = (url: string, {arg}: { arg: { id: string } }) => {
    console.log(url);
    console.log(arg);
    console.log(url + arg?.id);
    return fetch(url + arg?.id).then((res) => {
        return res.json()
    })
}
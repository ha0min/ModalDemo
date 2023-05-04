import useSWRMutation from "swr/mutation";

export const useOrder = () => {
// https://eb863a74-7a4e-4daf-9540-d2db8470c18e.mock.pstmn.io/marketplace/orders/
    const {data, error, isMutating, trigger, reset} = useSWRMutation(
        `https://eb863a74-7a4e-4daf-9540-d2db8470c18e.mock.pstmn.io/marketplace/orders/`,
        fetcher,
    );

    return {
        orderData: data,
        isOrderMutating: isMutating,
        isOrderError: error,
        orderTrigger: trigger,
        orderReset: reset
    }
}

const fetcher = async (url: string, {arg}: { arg: { id: string } }) => {
    console.log('fetch dest:', url + arg?.id);
    return fetch(url + arg?.id).then((res) => {
        return res.json()
    })
}

export const useDecision = () => {
    const {data, error, isMutating, trigger, reset} = useSWRMutation(
        `https://eb863a74-7a4e-4daf-9540-d2db8470c18e.mock.pstmn.io/marketplace/orders/`,
        sendRequest,
    );

    return {
        decisionData: data,
        isDecisionError: error,
        decisionTrigger: trigger,
        isDecisionMutating: isMutating,
        decisionReset: reset
    }
}
const sendRequest = async (url: string, {arg}: { arg: { id: string, decision: string } }) => {
    console.log('fetch dest:', url + arg?.id + '/' + arg?.decision);
    return fetch(url + arg?.id + '/' + arg?.decision, {
        method: 'POST',
    }).then(async (res) => {
            if (!res.ok) {
                throw Error('Error');
            }
            const text = await res.text();
            // 如果响应内容为空字符串，返回null；否则尝试解析JSON
            return text.length === 0 ? null : JSON.parse(text);
        }
    )
}

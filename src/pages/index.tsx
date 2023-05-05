import {message, ConfigProvider, Layout, Space, Input} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDecision, useOrder} from "@/utils/common";
import {OrderData} from "@/compiler/types";
import {OrderModal} from "@/components/order-modal";
import {Typography} from "antd";
import {primaryColor, secondaryColor} from "@/styles/colors";
import {BlockButton} from "@/components/common/block-button";
import {ProCard} from "@ant-design/pro-components";

const {Title, Text} = Typography;

const {Header, Content, Footer} = Layout;

const DataLoadEveryTimeModal = () => {
    const [open, setOpen] = useState(false);
    const [orderData, setOrderData] = useState<OrderData | null>(null);
    const {isOrderMutating, isOrderError, orderTrigger, orderReset} = useOrder();
    const {isDecisionMutating, decisionTrigger, decisionReset} = useDecision();
    const [isAcceptPosting, setIsAcceptPosting] = useState(false);
    const [isRejectPosting, setIsRejectPosting] = useState(false);
    const [inputId, setInputId] = useState('');
    const [isDecisionPost, setIsDecisionPost] = useState(false);

    const loadData = () => {
        orderTrigger({id: inputId})
            .then((order) => {
                console.log(order);

                const {
                    model,
                    manufactureYear,
                    condition,
                    images,
                } = order.listing;

                const extractedData = {
                    requestId: inputId,
                    brandName: model.brand.displayName,
                    modelName: model.displayName,
                    manufactureYear,
                    condition,
                    imageUrl: images[0].image.url,
                    salePriceCents: order.salePriceCents,
                    commissionRateBips: order.commissionRateBips,
                    sellerFeeCents: order.sellerFeeCents,
                    payoutAmountCents: order.payoutAmountCents,
                };

                console.log('extractedData', extractedData);

                setOrderData(extractedData);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const showModal = () => {
        setOpen(true);
        loadData();
    };

    const setClose = () => {
        setOpen(false);
        orderReset();
        decisionReset();
    }

    const onAcceptClick = (e: React.MouseEvent<HTMLElement>) => {
        console.log('handleOk', e);
        setIsAcceptPosting(true);
        decisionTrigger({id: inputId, decision: 'accept'})
            .then((res) => {
                    console.log('res', res);
                    setIsDecisionPost(true);
                    message.success('Order accepted successfully.');
                }
            )
            .catch((err) => {
                console.log('err', err);
                message.error('Order accept failed, please try again.');
            })
            .finally(() => {
                setIsAcceptPosting(false)
                setClose();
            });
    }


    const onDeclineClick = (e: React.MouseEvent<HTMLElement>) => {
        console.log('handleOk', e);
        setIsRejectPosting(true);
        decisionTrigger({id: inputId, decision: 'decline'})
            .then((res) => {
                    console.log('res', res);
                    setIsDecisionPost(true);
                    message.success('Order declined successfully.');
                }
            )
            .catch((err) => {
                console.log('err', err);
                message.error('Order decline failed, please try again.');
            })
            .finally(() => {
                setIsRejectPosting(false);
                setClose();
            });
    }


    return (
        <div>
            <Space direction="vertical" size="large">
                <Text>Input the order id(endpoint id): </Text>
                <Input
                    placeholder="Basic usage"
                    defaultValue={'123'}
                    onChange={(e) => {
                        setInputId(e.target.value);
                        setIsDecisionPost(false);
                    }}
                />
                <BlockButton
                    type='primary'
                    onClick={showModal}
                    disabled={isDecisionPost}
                    text={'Open Modal'}
                />
            </Space>

            <OrderModal
                open={open}
                orderData={orderData}
                onAcceptClick={onAcceptClick}
                onDeclineClick={onDeclineClick}
                isAcceptPosting={isAcceptPosting}
                isRejectPosting={isRejectPosting}
                isOrderError={isOrderError}
                isOrderMutating={isOrderMutating}
                onModalClose={() => setClose()}
            />
        </div>
    )
}

const DataPreloadModal = () => {
    const [open, setOpen] = useState(false);
    const [orderData, setOrderData] = useState<OrderData | null>(null);
    const {isOrderMutating, isOrderError, orderTrigger, orderReset} = useOrder();
    const {isDecisionMutating, decisionTrigger, decisionReset} = useDecision();
    const [isAcceptPosting, setIsAcceptPosting] = useState(false);
    const [isRejectPosting, setIsRejectPosting] = useState(false);
    const [isDecisionPost, setIsDecisionPost] = useState(false);

    const inputId = '123';
    const loadData = () => {
        orderTrigger({id: inputId})
            .then((order) => {
                console.log(order);

                const {
                    model,
                    manufactureYear,
                    condition,
                    images,
                } = order.listing;

                const extractedData = {
                    requestId: inputId,
                    brandName: model.brand.displayName,
                    modelName: model.displayName,
                    manufactureYear,
                    condition,
                    imageUrl: images[0].image.url,
                    salePriceCents: order.salePriceCents,
                    commissionRateBips: order.commissionRateBips,
                    sellerFeeCents: order.sellerFeeCents,
                    payoutAmountCents: order.payoutAmountCents,
                };

                console.log('extractedData', extractedData);

                setOrderData(extractedData);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const showModal = () => {
        setOpen(true);
    };

    const setClose = () => {
        setOpen(false);
    }

    const onAcceptClick = (e: React.MouseEvent<HTMLElement>) => {
        console.log('handleOk', e);
        setIsAcceptPosting(true);
        decisionTrigger({id: inputId, decision: 'accept'})
            .then((res) => {
                    console.log('res', res);
                    setIsDecisionPost(true);
                    message.success('Order accepted successfully.');
                }
            )
            .catch((err) => {
                console.log('err', err);
                message.error('Order accept failed, please try again.');
            })
            .finally(() => {
                setIsAcceptPosting(false)
                setClose();
            });
    }


    const onDeclineClick = (e: React.MouseEvent<HTMLElement>) => {
        console.log('handleOk', e);
        setIsRejectPosting(true);
        decisionTrigger({id: inputId, decision: 'decline'})
            .then((res) => {
                    console.log('res', res);
                    setIsDecisionPost(true);
                    message.success('Order declined successfully.');
                }
            )
            .catch((err) => {
                console.log('err', err);
                message.error('Order decline failed, please try again.');
            })
            .finally(() => {
                setIsRejectPosting(false);
                setClose();
            });
    }

    useEffect(() => {
        loadData(); // preload the data
    }, []);

    return (
        <div>
            <Space direction="vertical" size="large">
                <Text>Preload the order id: 123</Text>

                <BlockButton
                    disabled={isDecisionPost}
                    type='primary'
                    onClick={showModal}
                    text={'Open Data Preloaded Modal'}
                    disable={isOrderMutating}
                />
            </Space>
            <OrderModal
                open={open}
                orderData={orderData}
                onAcceptClick={onAcceptClick}
                onDeclineClick={onDeclineClick}
                isAcceptPosting={isAcceptPosting}
                isRejectPosting={isRejectPosting}
                isOrderError={isOrderError}
                isOrderMutating={isOrderMutating}
                onModalClose={() => setClose()}
            />
        </div>
    )
}

export default function Home() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: primaryColor,
                    colorTextSecondary: secondaryColor,
                },
            }}
        >
            <Layout className="layout">
                <Header
                    style={{
                        backgroundColor: primaryColor,
                    }}
                >
                    <Title level={3} style={{color: 'white'}}>Modal Demo</Title>
                </Header>
                <Content style={{
                    padding: '0 50px',
                    minHeight: '500px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <ProCard gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                        <ProCard title={'Data Preload Modal'} colSpan={12} layout="center" bordered>
                            <DataPreloadModal/>
                        </ProCard>
                        <ProCard colSpan={12} title={'Data Load Everytime Modal'} layout="center" bordered>
                            <DataLoadEveryTimeModal/>
                        </ProCard>
                    </ProCard>
                </Content>
                <Footer style={{textAlign: 'center'}}>Haomin Cheng</Footer>
            </Layout>
        </ConfigProvider>
    )
}

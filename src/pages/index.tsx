import {Button, message, ConfigProvider, Layout, Space, Input} from 'antd';
import React, {useState} from 'react';
import {useDecision, useOrder} from "@/utils/common";
import {OrderData} from "@/compiler/types";
import {OrderModal} from "@/components/order-modal";
import {Typography} from "antd";
import {primaryColor, secondaryColor} from "@/styles/colors";
import {BlockButton} from "@/components/common/block-button";

const {Title,Text} = Typography;

const {Header, Content, Footer} = Layout;

export default function Home() {
    const [open, setOpen] = useState(false);
    const [orderData, setOrderData] = useState<OrderData | null>(null);
    const {isOrderMutating, isOrderError, orderTrigger, orderReset} = useOrder();
    const {isDecisionMutating, decisionTrigger, decisionReset} = useDecision();
    const [isAcceptPosting, setIsAcceptPosting] = useState(false);
    const [isRejectPosting, setIsRejectPosting] = useState(false);
    const [inputId, setInputId] = useState('');

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
                    requestId: '123',
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

    const onAcceptClick = (e: React.MouseEvent<HTMLElement>) => {
        console.log('handleOk', e);
        setIsAcceptPosting(true);
        decisionTrigger({id: inputId, decision: 'accept'})
            .then((res) => {
                    console.log('res', res);

                    message.success('Order accepted successfully.');
                }
            )
            .catch((err) => {
                console.log('err', err);
                message.error('Order accept failed, please try again.');
            })
            .finally(() => {
                setIsAcceptPosting(false)
                setOpen(false);
                orderReset();
                decisionReset();
            });
    }


    const onDeclineClick = (e: React.MouseEvent<HTMLElement>) => {
        console.log('handleOk', e);
        setIsRejectPosting(true);
        decisionTrigger({id: inputId, decision: 'decline'})
            .then((res) => {
                    console.log('res', res);
                    message.success('Order declined successfully.');
                }
            )
            .catch((err) => {
                console.log('err', err);
                message.error('Order decline failed, please try again.');
            })
            .finally(() => {
                setIsRejectPosting(false);
                setOpen(false);
                orderReset();
                decisionReset();
            });
    }


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
                    <Space direction="vertical" size="large">
                        <Text>Input the order id(endpoint id): </Text>
                        <Input
                            placeholder="Basic usage"
                            defaultValue={'123'}
                            onChange={(e) => setInputId(e.target.value)}
                        />
                        <BlockButton
                            type='primary'
                            onClick={showModal}
                            text={'Open Modal'}
                        />
                    </Space>
                </Content>
                <Footer style={{textAlign: 'center'}}>Haomin Cheng</Footer>
            </Layout>
            <OrderModal
                open={open}
                orderData={orderData}
                onAcceptClick={onAcceptClick}
                onDeclineClick={onDeclineClick}
                isAcceptPosting={isAcceptPosting}
                isRejectPosting={isRejectPosting}
                isOrderError={isOrderError}
                isOrderMutating={isOrderMutating}
                onModalClose={() => setOpen(false)}
            />
        </ConfigProvider>
    )
}

import {Button, Col, Modal, Row, Skeleton, Alert, message, ConfigProvider} from 'antd';
import React, {useState} from 'react';
import {CloseOutlined} from '@ant-design/icons';
import {useDecision, useOrder} from "@/utils/common";
import {OrderData} from "@/compiler/types";
import {OrderModal} from "@/components/order-modal";

export default function Home() {
    const [open, setOpen] = useState(false);
    const [orderData, setOrderData] = useState<OrderData | null>(null);
    const {isOrderMutating, isOrderError, orderTrigger, orderReset} = useOrder();
    const {isDecisionMutating, decisionTrigger, decisionReset} = useDecision();
    const [isAcceptPosting, setIsAcceptPosting] = useState(false);
    const [isRejectPosting, setIsRejectPosting] = useState(false);

    const loadData = () => {
        orderTrigger({id: '123'})
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
        decisionTrigger({id: '123', decision: 'accept'})
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
        decisionTrigger({id: '123', decision: 'decline'})
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
                    colorPrimary: '#1a3a32',
                },
            }}
        >
            <div
            >
                <Button type='primary' onClick={showModal}>
                    Open Modal
                </Button>
                <Modal
                    title={null}
                    footer={null}
                    width={'64%'}
                    open={open}
                    closable={false}
                >
                    <Row justify={'end'}>
                        <Col>
                            <Button
                                type='text'
                                shape='circle'
                                icon={<CloseOutlined/>}
                                onClick={onDeclineClick}
                            />
                        </Col>
                    </Row>
                    <Skeleton active={true} loading={isOrderMutating}>
                        {
                            isOrderError ? (
                                <Alert
                                    message='Error'
                                    description='Error while loading data'
                                    type='error'
                                    showIcon
                                />
                            ) : <OrderModal
                                orderData={orderData}
                                handleOk={onAcceptClick}
                                handleCancel={onDeclineClick}
                                isAcceptPosting={isAcceptPosting}
                                isRejectPosting={isRejectPosting}
                            />
                        }
                    </Skeleton>
                </Modal>
            </div>
        </ConfigProvider>
    )
}

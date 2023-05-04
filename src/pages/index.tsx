import {Button, Col, Modal, Row, Skeleton, Alert} from 'antd';
import React, {useState} from 'react';
import {CloseOutlined} from '@ant-design/icons';
import {useOrder} from "@/utils/common";
import {OrderData} from "@/compiler/types";
import {OrderModal} from "@/components/order-modal";

export default function Home() {
    const [open, setOpen] = useState(false);
    const [orderData, setOrderData] = useState<OrderData | null>(null);
    const {isMutating, isError, trigger, reset} = useOrder();
    const [isAcceptPosting, setIsAcceptPosting] = useState(false);
    const [isRejectPosting, setIsRejectPosting] = useState(false);

    const loadData = () => {
        trigger({id: '123'})
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

    const handleOk = (e: React.MouseEvent<HTMLElement>) => {
        setIsAcceptPosting(true);
        console.log(e);

        setTimeout(() => {
            setIsAcceptPosting(false);
            setOpen(false);
        }, 3000);
    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        setIsRejectPosting(true);
        setTimeout(() => {
            setIsRejectPosting(false);
            setOpen(false);
        }, 3000);
        console.log(e);
        reset();
    };

    return (
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
                            onClick={handleCancel}
                        />
                    </Col>
                </Row>
                <Skeleton active={true} loading={isMutating}>
                    {
                        isError ? (
                            <Alert
                                message='Error'
                                description='Error while loading data'
                                type='error'
                                showIcon
                            />
                        ) : <OrderModal
                                orderData={orderData}
                                handleOk={handleOk}
                                handleCancel={handleCancel}
                                isAcceptPosting={isAcceptPosting}
                                isRejectPosting={isRejectPosting}
                            />
                    }
                </Skeleton>
            </Modal>
        </div>
    )
}

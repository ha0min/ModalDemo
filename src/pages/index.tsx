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
        console.log(e);
        setOpen(false);
    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        console.log(e);
        reset();
        setOpen(false);
    };

    return (
        <div
        >
            <Button type='primary' onClick={showModal}>
                Open Modal with customized button props
            </Button>
            <Modal
                title={null}
                footer={null}
                width={'64%'}
                open={open}
                closable={false}
                okButtonProps={{disabled: true}}
                cancelButtonProps={{disabled: true}}
            >
                <Row
                    justify={'end'}
                >
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
                    {isError ? (
                        <Alert
                            message='Error'
                            description='Error while loading data'
                            type='error'
                            showIcon
                            />
                    ) :   <OrderModal orderData={orderData}/>

                    }
                </Skeleton>
            </Modal>
        </div>
    )
}

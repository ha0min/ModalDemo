import {Alert, Button, Col, Modal, Row, Skeleton, Typography} from "antd";
import React from "react";
import {OrderData} from "@/compiler/types";
import {InfoBox} from "@/components/order-modal/info-box";
import {DecisionBox} from "@/components/order-modal/decision-box";
import {CloseOutlined} from "@ant-design/icons";


interface ModalProps {
    orderData: OrderData | null,
    onAcceptClick: (e: React.MouseEvent<HTMLElement>) => void,
    onDeclineClick: (e: React.MouseEvent<HTMLElement>) => void,
    isAcceptPosting: boolean,
    isRejectPosting: boolean,
    isOrderError: boolean,
    isOrderMutating: boolean,
    onModalClose: () => void,
    open: boolean,
}

interface OrderModalContentProps extends Pick<ModalProps,
    'onAcceptClick' | 'onDeclineClick' | 'isAcceptPosting' | 'isRejectPosting' | 'orderData'> {
}

const OrderModalContent = (props: OrderModalContentProps) => {
    return (
        <div>
            <Row>
                <Col
                    xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}
                >
                    <DecisionBox
                        handleOk={props.onAcceptClick}
                        handleCancel={props.onDeclineClick}
                        isAcceptPosting={props.isAcceptPosting}
                        isRejectPosting={props.isRejectPosting}
                    />
                </Col>
                <Col
                    xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}
                >
                    <InfoBox
                        orderData={props.orderData}
                    />
                </Col>
            </Row>
        </div>
    )
}


export const OrderModal = (props:ModalProps) => {
    return (
        <Modal
            title={null}
            footer={null}
            width={'64%'}
            open={props.open}
            maskClosable={true}
            closable={false}
            onCancel={props.onModalClose}
        >
            <Row justify={'end'}>
                <Col>
                    <Button
                        type='text'
                        shape='circle'
                        icon={<CloseOutlined/>}
                        onClick={props.onModalClose}
                    />
                </Col>
            </Row>
            <Skeleton active={true} loading={props.isOrderMutating}>
                {
                    props?.isOrderError ? (
                        <Alert
                            message='Error'
                            description='Error while loading data'
                            type='error'
                            showIcon
                        />
                    ) : <OrderModalContent
                        orderData={props.orderData}
                        onAcceptClick={props.onAcceptClick}
                        onDeclineClick={props.onDeclineClick}
                        isAcceptPosting={props.isAcceptPosting}
                        isRejectPosting={props.isRejectPosting}
                    />
                }
            </Skeleton>
        </Modal>
    )
}
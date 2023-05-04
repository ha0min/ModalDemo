import {Alert, Button, Col, Modal, Row, Skeleton, Typography} from "antd";
import React from "react";
import {OrderData} from "@/compiler/types";
import {RightPart} from "@/components/order-modal/right-part";
import {LeftPart} from "@/components/order-modal/left-part";
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
                    span={12}
                >
                    <LeftPart
                        handleOk={props.onAcceptClick}
                        handleCancel={props.onDeclineClick}
                        isAcceptPosting={props.isAcceptPosting}
                        isRejectPosting={props.isRejectPosting}
                    />
                </Col>
                <Col
                    span={12}
                >
                    <RightPart
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
            closable={false}
        >
            <Row justify={'end'}>
                <Col>
                    <Button
                        type='text'
                        shape='circle'
                        icon={<CloseOutlined/>}
                        onClick={props.onDeclineClick}
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
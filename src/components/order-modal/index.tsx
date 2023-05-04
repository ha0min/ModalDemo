import {Col, Row, Typography} from "antd";
import React from "react";
import {OrderData} from "@/compiler/types";
import {RightPart} from "@/components/order-modal/right-part";
import {LeftPart} from "@/components/order-modal/left-part";


interface ModalProps {
    orderData: OrderData | null,
    handleOk: (e: React.MouseEvent<HTMLElement>) => void,
    handleCancel: (e: React.MouseEvent<HTMLElement>) => void,
    isAcceptPosting: boolean,
    isRejectPosting: boolean,
}

export const OrderModal = (props: ModalProps) => {
    return (
        <div>
            <Row>
                <Col
                    span={12}
                >
                    <LeftPart
                        handleOk={props.handleOk}
                        handleCancel={props.handleCancel}
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
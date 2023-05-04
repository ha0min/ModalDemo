import {Col, Row, Typography} from "antd";
import React from "react";
import {OrderData} from "@/compiler/types";
import {RightPart} from "@/components/order-modal/right-part";
import {LeftPart} from "@/components/order-modal/left-part";


interface ModalProps {
    orderData: OrderData | null,
}

export const OrderModal = (props: ModalProps) => {
    return (
        <div>
            <Row>
                <Col
                    span={12}
                >
                    <LeftPart/>
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
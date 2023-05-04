import {RoundContainer} from "@/components/common/round-container";
import {Col, Row, Typography} from "antd";
import {BlockButton} from "@/components/common/block-button";
import React from "react";

const {Title, Paragraph, Text} = Typography;

interface LeftPartProps {
    handleOk: (e: React.MouseEvent<HTMLElement>) => void,
    handleCancel: (e: React.MouseEvent<HTMLElement>) => void,
    isAcceptPosting: boolean,
    isRejectPosting: boolean,
}

export const LeftPart = (props: LeftPartProps) => {
    return (
        <RoundContainer>
            <Row>
                <Col span={24}>
                    <Text type={'secondary'} style={{fontSize:'18px'}}>CONGRATS!</Text>
                </Col>
            </Row>
            <Row
                style={{marginBottom: '20%'}}
            >
                <Col span={24}>
                    <Title level={2}>
                        Your watch sold!
                    </Title>
                </Col>
                <Col span={24}>
                    <Paragraph type='secondary'>
                        You have 1 business day to accept the sale.
                    </Paragraph>
                    <Paragraph type='secondary'>
                        If you do not accept, it will be automatically rejected.
                    </Paragraph>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <BlockButton
                        type={'primary'}
                        text={'Accept sale'}
                        loading={props.isAcceptPosting}
                        onClick={props.handleOk}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <BlockButton
                        type={'text'}
                        text={'Reject sale'}
                        loading={props.isRejectPosting}
                        onClick={props.handleCancel}
                    />
                </Col>
            </Row>
        </RoundContainer>
    )
}
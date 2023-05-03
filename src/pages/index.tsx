import {Button, Col, Modal, Row, Image, Typography, Avatar, Divider, Statistic} from "antd";
import React, {useState} from "react";
import {CloseOutlined} from '@ant-design/icons';

const {Title, Text} = Typography;

const BlockButton = (props: any) => {
    return (
        <Button
            style={{height: "56px", borderRadius: "18px"}}
            type={props?.type}
            block={true}
            onClick={props?.onClick}
            {...props}
        >
            {props.text}
        </Button>
    )
}

const LeftPart = () => {


    return (
        <div>
            <Row>
                <Col span={24}>
                    <Text>CONGRATS!</Text>
                </Col>
            </Row>
            <Row
                style={{marginBottom: "30px"}}
            >
                <Col span={24}>
                    <Title level={2}>
                        Your watch sold!
                    </Title>
                </Col>
                <Col span={24}>
                    <Text type="secondary">
                        You have 1 business day to accept the sale.<br/>
                        If you do not accept, it will be automatically rejected.
                    </Text>
                </Col>
            </Row>

            <Row justify={"center"} gutter={[12, 10]}>
                <Col span={24}>
                    <BlockButton
                        type={"primary"}
                        text={"Accept sale"}
                    />
                </Col>

                <Col span={24}>
                    <BlockButton
                        type={"text"}
                        text={"Reject sale"}
                    />
                </Col>
            </Row>
        </div>
    )
}

const RightPart = () => {

    return (
        <div>
            <Row>
                <Divider/>
            </Row>
            <Row>
                <Col span={18}>
                    <Row>
                        <Text>
                            Brand name
                        </Text>
                    </Row>
                    <Row>
                        <Text>
                            Condition / Year
                        </Text>
                    </Row>
                </Col>
                <Col span={4}>
                    <Avatar
                        alt={"image"}
                        shape={"square"}
                        size={80}
                        draggable={false}
                        src={"https://getbezel.mo.cloudinary.net/production/32616290-d113-4a7b-9a07-53734b746e0c.png?tx=f_auto,c_limit,w_1080,q_auto"}
                    />
                </Col>
            </Row>
            <Row>
                <Divider/>
            </Row>
            <Row justify={"space-between"}>
                <Col span={12}>
                    <Text>
                        Selling Price
                    </Text>
                </Col>
                <Col span={12}>
                    <Text>
                        $17,945.00
                    </Text>
                </Col>
            </Row>
            <Row justify={"space-between"}>
                <Col span={12}>
                    <Text>
                        Level 1 Commision(6.5%)
                    </Text>
                </Col>
                <Col span={12}>
                    <Text>
                        $1,556.75
                    </Text>
                </Col>
            </Row>
            <Row justify={"space-between"}>
                <Col span={12}>
                    <Text>
                        Seller fee
                    </Text>
                </Col>
                <Col span={12}>
                    <Statistic
                        prefix={<Text>$</Text>}
                        precision={2}
                        value={15}
                        valueStyle={{fontSize:"14px"}}
                    />
                </Col>
            </Row>
            <Row justify={"space-between"}>
                <Col span={12}>
                    <Text>
                        Insured Shipping
                    </Text>
                </Col>
                <Col span={12}>
                    <Text>
                        Free
                    </Text>
                </Col>
            </Row>
            <Row justify={"space-between"}>
                <Col span={12}>
                    <Text>
                        Bezel authentication
                    </Text>
                </Col>
                <Col span={12}>
                    <Text>
                        Free
                    </Text>
                </Col>
            </Row>
            <Row>
                <Divider/>
            </Row>
            <Row justify={"space-between"}>
                <Col span={12}>
                    <Text>
                        Earinings
                    </Text>
                </Col>
                <Col span={12}>
                    <Text>
                        $22,378.25
                    </Text>
                </Col>
            </Row>
        </div>
    );
}

export default function Home() {
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = (e: React.MouseEvent<HTMLElement>) => {
        console.log(e);
        setOpen(false);
    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        console.log(e);
        setOpen(false);
    };

    return (
        <main
        >
            <Button type="primary" onClick={showModal}>
                Open Modal with customized button props
            </Button>
            <Modal
                title={null}
                footer={null}
                width={"50%"}
                open={open}
                closable={false}
                okButtonProps={{disabled: true}}
                cancelButtonProps={{disabled: true}}
            >
                <Row
                    justify={"end"}
                >
                    <Col>
                        <Button
                            type="text"
                            shape="circle"
                            icon={<CloseOutlined/>}
                            onClick={(e) => handleCancel(e)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col
                        span={12}
                    >
                        <LeftPart/>
                    </Col>
                    <Col
                        span={12}
                    >
                        <RightPart/>
                    </Col>
                </Row>
            </Modal>
        </main>
    )
}

import Image from 'next/image'
import {Inter} from 'next/font/google'
import {Button, Col, Modal, Row, Space, Typography} from "antd";
import {useState} from "react";
import {CloseOutlined} from '@ant-design/icons';

const inter = Inter({subsets: ['latin']})

const BlockButton = (props: any) => {
    return (
        <Button
            style={{height:"56px", borderRadius:"18px"}}
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
    const {Title, Text} = Typography;


    return (
        <div>
            <Row>
                <Col span={24}>
                    <Text>CONGRATS!</Text>
                </Col>
            </Row>
            <Row
                style={{marginBottom:"30px"}}
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
                        right
                    </Col>
                </Row>
            </Modal>
        </main>
    )
}

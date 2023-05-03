import Image from 'next/image'
import {Inter} from 'next/font/google'
import {Button, Col, Modal, Row, Space, Typography} from "antd";
import {useState} from "react";
import {CloseOutlined} from '@ant-design/icons';

const inter = Inter({subsets: ['latin']})



const LeftPart = () => {
    const {Title, Text} = Typography;
    return (
        <div>
                <Row>
                    <Col span={24}>
                        <Title level={4}>CONGRATS!</Title>
                    </Col>
                </Row>
                <Row>
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
                <Row justify={"center"} gutter={[12,20]}>
                    <Col span={24}>
                        <Button type={"primary"} shape={"round"} block={true} height={"15px"}>
                            Accept sale
                        </Button>
                    </Col>

                    <Col span={24}>
                        <Button type={"text"} shape={"round"} block={true}>
                            Reject sale
                        </Button>
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

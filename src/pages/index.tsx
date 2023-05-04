import {Button, Col, Modal, Row, Typography, Avatar, Divider, Statistic, Space, Skeleton} from 'antd';
import React, {useState} from 'react';
import {CloseOutlined} from '@ant-design/icons';
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const {Title, Paragraph, Text} = Typography;

const BlockButton = (props: any) => {
    return (
        <Button
            style={{height: '56px', borderRadius: '18px'}}
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
        <RoundContainer>
            <Row>
                <Col span={24}>
                    <Text>CONGRATS!</Text>
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
                    />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <BlockButton
                        type={'text'}
                        text={'Reject sale'}
                    />
                </Col>
            </Row>
        </RoundContainer>
    )
}

interface RoundContainerProps {
    backgroundColor?: string;
    style?: React.CSSProperties;
}

const RoundContainer = <T extends RoundContainerProps>(props: React.PropsWithChildren<T>) => {
    const containerStyle = {
        padding: '20px 14px 20px 14px',
        margin: '0px 10px',
        borderRadius: '18px',
        backgroundColor: props.backgroundColor || 'transparent',
        ...props.style
    };

    return (
        <div className="round-container" style={containerStyle}>
            {props.children}
        </div>
    )
}

const Money = (props: {
    value: number
}) => {
    return (
        <Statistic
            prefix={<Text>$</Text>}
            precision={2}
            value={props.value}
            valueStyle={{fontSize: '14px'}}
        />
    )
}

interface StatisticRowProps {
    text: string;
    value: number;
    placeholder?: string;
}

const StatisticRow = (props: StatisticRowProps) => {
    return (
        <Row justify={'space-between'}>
            <Col>
                <Text>
                    {props.text}
                </Text>
            </Col>
            <Col>
                {props.value !== 0 ? (
                    <Money value={props.value}/>
                ) : (
                    <Text>{props.placeholder}</Text>
                )}
            </Col>
        </Row>
    )
}

StatisticRow.defaultProps = {
    placeholder: "Free",
};


const RightPart = () => {
    return (
        <RoundContainer
            backgroundColor={"#F6F4F1"}
        >
            <Divider/>
            <Row>
                <Col span={18}>
                    <Space
                        direction={'vertical'}
                    >
                        <Text>
                            Patek Philippe
                        </Text>
                        <Text>
                            NEW / 1900
                        </Text>
                    </Space>
                </Col>
                <Col span={4}>
                    <Avatar
                        alt={'image'}
                        shape={'square'}
                        size={{xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100}}
                        draggable={false}
                        src={'https://getbezel.mo.cloudinary.net/production/32616290-d113-4a7b-9a07-53734b746e0c.png?tx=f_auto,c_limit,w_1080,q_auto'}
                    />
                </Col>
            </Row>
            <Divider/>
            <StatisticRow text={"Selling Price"} value={1777777945}/>
            <StatisticRow text={"Level 1 Commision(6.5%)"} value={1556.75}/>

            <StatisticRow text={'Seller fee'} value={15}/>
            <StatisticRow text={'Insured Shipping'} value={0}/>
            <StatisticRow text={'Bezel authentication'} value={0}/>
            <Divider/>
            <StatisticRow text={'Earnings'} value={22378.25}/>

        </RoundContainer>
    );
}

interface ModalProps {
    handleCancel: (e: React.MouseEvent<HTMLElement>) => void;
}

const ModalData = (props: ModalProps) => {
    return (
        <div>
            <Row
                justify={'end'}
            >
                <Col>
                    <Button
                        type='text'
                        shape='circle'
                        icon={<CloseOutlined/>}
                        onClick={props.handleCancel}
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
        </div>
    )
}

interface OrderProps {
    listing: {
        model: {
            brand: {
                displayName: string;
            };
            displayName: string;
        };
        manufactureYear: number;
        condition: string;
        images: {
            image: {
                url: string;
            };
        }[];
    };
    salePriceCents: number;
    commissionRateBips: number;
    sellerFeeCents: number;
    payoutAmountCents: number;
}

const useOrder = () => {
    const {data, error, isMutating, trigger} = useSWRMutation(
        `https://eb863a74-7a4e-4daf-9540-d2db8470c18e.mock.pstmn.io/marketplace/orders/`,
        fetcher,
    );

    return {
        order: data,
        isMutating,
        isError: error,
        trigger
    }
}

const fetcher = (url: string, {arg}: { arg: { id: string } }) => {
    console.log(url);
    console.log(arg);
    console.log(url + arg?.id);
    return fetch(url + arg?.id).then((res) => {
        return res.json()
    })
}

export default function Home() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);

    const {order, isMutating, isError, trigger} = useOrder();

    const loadData = () => {

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
                <Skeleton active={true} loading={isMutating}>
                    <ModalData handleCancel={handleCancel}/>
                </Skeleton>
            </Modal>
        </div>
    )
}

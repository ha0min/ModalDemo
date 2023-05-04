import {Button, Col, Modal, Row, Typography, Avatar, Divider, Statistic, Space, Skeleton, Alert} from 'antd';
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

interface MoneyProps {
    value: number | undefined;
    color?: string;
}

const Money = (props: MoneyProps) => {
    return (
        <Statistic
            prefix={<Text style={{color:props.color}}>$</Text>}
            precision={2}
            value={props.value}
            valueStyle={{fontSize: '14px', color:props.color}}
        />
    )
}

interface StatisticRowProps {
    text: string;
    value: number | undefined;
    placeholder?: string;
    color?: string;
}

const StatisticRow = ({value=99999, ...props}: StatisticRowProps) => {
    return (
        <Row
            justify={'space-between'}
            style={{marginBottom: '8px'}}
        >
            <Col>
                <Text style={{color:props.color}}>
                    {props.text}
                </Text>
            </Col>
            <Col>
                {value !== 0 ? (
                    <Money color={props.color} value={value}/>
                ) : (
                    <Text style={{color:props.color}}>{props.placeholder}</Text>
                )}
            </Col>
        </Row>
    )
}

StatisticRow.defaultProps = {
    placeholder: "Free",
};

interface RightPartProps {
    orderData: OrderData | null;
}

const RightPart = ({orderData, ...props}: RightPartProps) => {
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
                        <Text style={{fontSize:'20px'}}>
                            {orderData?.brandName} {orderData?.modelName}
                        </Text>
                        <Text type={'secondary'}>
                            {orderData?.condition} / {orderData?.manufactureYear}
                        </Text>
                    </Space>
                </Col>
                <Col span={4}>
                    <Avatar
                        alt={'image'}
                        shape={'square'}
                        size={{xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100}}
                        draggable={false}
                        src={orderData?.imageUrl}
                    />
                </Col>
            </Row>
            <Divider/>
            <StatisticRow
                text={"Selling Price"}
                value={orderData?.salePriceCents && orderData.salePriceCents / 100}
                color={'#788681'}
            />
            <StatisticRow
                text={`Level 1 Commission(${(orderData?.commissionRateBips || 0) / 100}%)`}
                value={
                    orderData?.salePriceCents && orderData?.commissionRateBips &&
                    ((orderData.salePriceCents/100 || 0) * (orderData.commissionRateBips/10000 || 0))
                }
            />

            <StatisticRow text={'Seller fee'} value={orderData?.sellerFeeCents && orderData.sellerFeeCents / 100}/>
            <StatisticRow text={'Insured Shipping'} value={orderData?.insuredShipping || 0}/>
            <StatisticRow text={'Bezel authentication'} value={orderData?.authentication  || 0}/>
            <Divider/>
            <StatisticRow
                text={'Earnings'}
                value={
                    orderData?.salePriceCents && orderData?.commissionRateBips && orderData?.sellerFeeCents &&
                    orderData.salePriceCents / 100 -
                    (orderData.salePriceCents / 100 * orderData.commissionRateBips / 10000) -
                    orderData.sellerFeeCents / 100
                    - (orderData.insuredShipping || 0)
                    - (orderData.authentication || 0)
                }
            />

        </RoundContainer>
    );
}

interface ModalProps {
    orderData: OrderData | null,
}

const ModalData = (props: ModalProps) => {
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

const useOrder = () => {
// https://eb863a74-7a4e-4daf-9540-d2db8470c18e.mock.pstmn.io/marketplace/orders/
    const {data, error, isMutating, trigger, reset} = useSWRMutation(
        `https://testhm.free.beeceptor.com/orders/`,
        fetcher,
    );

    return {
        order: data,
        isMutating,
        isError: error,
        trigger,
        reset
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

interface OrderData {
    brandName: string;
    modelName: string;
    manufactureYear: number;
    condition: string;
    imageUrl: string;
    salePriceCents: number;
    commissionRateBips: number;
    sellerFeeCents: number;
    payoutAmountCents: number;
    insuredShipping?: number;
    authentication?: number;

}

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
                    ) :   <ModalData orderData={orderData}/>

                    }
                </Skeleton>
            </Modal>
        </div>
    )
}

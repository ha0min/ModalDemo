import React from "react";
import {Typography} from "antd";
import {RoundContainer} from "@/components/common/round-container";
import {Avatar, Col, Divider, Row, Space} from "antd";
import {Money} from "@/components/common/money";
import {StatisticRow} from "@/components/common/statistic-row";
import {OrderData} from "@/compiler/types";
import {highlightColor, primaryColor, secondaryColor} from "@/styles/colors";

const {Text} = Typography;
interface InfoBoxProps {
    orderData: OrderData | null;
}

export const InfoBox = ({orderData, ...props}: InfoBoxProps) => {
    return (
        <RoundContainer
            backgroundColor={"#F6F4F1"}
            style={{paddingLeft: '30px', paddingRight: '30px'}}
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
            <Divider style={{margin:'16px 0px'}}/>
            <Row
                justify={'space-between'}
                style={{marginBottom: '5px'}}
            >
                <Col>
                    <Text>
                        Selling Price
                    </Text>
                </Col>
                <Col>
                    {orderData?.salePriceCents && orderData.salePriceCents / 100 !== 0 ? (
                        <Money color={highlightColor} value={orderData.salePriceCents / 100}/>
                    ) : (
                        <Text style={{color:highlightColor}}>error</Text>
                    )}
                </Col>
            </Row>
            <StatisticRow
                text={`Level 1 Commission(${(orderData?.commissionRateBips || 0) / 100}%)`}
                value={
                    orderData?.salePriceCents && orderData?.commissionRateBips &&
                    ((orderData.salePriceCents/100 || 0) * (orderData.commissionRateBips/10000 || 0))
                }
                color={secondaryColor}
            />

            <StatisticRow text={'Seller fee'}
                          value={orderData?.sellerFeeCents && orderData.sellerFeeCents / 100} color={secondaryColor}/>
            <StatisticRow text={'Insured Shipping'}
                          value={orderData?.insuredShipping || 0} color={secondaryColor}/>
            <StatisticRow text={'Bezel authentication'}
                          value={orderData?.authentication  || 0} color={highlightColor}/>
            <Divider style={{marginBottom:'16px'}}/>
            <StatisticRow
                color={primaryColor}
                text={'Earnings'}
                value={
                    orderData?.payoutAmountCents && orderData.payoutAmountCents / 100 || 9999
                }
            />

        </RoundContainer>
    );
}
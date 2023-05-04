import {Col, Row} from "antd";
import React from "react";
import {Typography} from "antd";
import {Money} from "@/components/common/money";

const {Text} = Typography;

interface StatisticRowProps {
    text: string;
    value: number | undefined;
    placeholder?: string;
    color?: string;
}

export const StatisticRow = ({value=99999, ...props}: StatisticRowProps) => {
    return (
        <Row
            justify={'space-between'}
            style={{marginBottom: '5px'}}
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
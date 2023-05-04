import {Statistic} from "antd";
import React from "react";
import {Typography} from "antd";

const {Text} = Typography;

interface MoneyProps {
    value: number | undefined;
    color?: string;
}

export const Money = (props: MoneyProps) => {
    return (
        <Statistic
            prefix={<Text style={{color:props?.color}}>$</Text>}
            precision={2}
            value={props.value}
            valueStyle={{fontSize: '14px', color:props.color}}
        />
    )
}

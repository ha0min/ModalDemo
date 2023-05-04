import {Statistic} from "antd";
import Text from "antd/es/typography/Text";
import React from "react";

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

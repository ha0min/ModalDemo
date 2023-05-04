import {Button} from "antd";
import React from "react";

export const BlockButton = (props: any) => {
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
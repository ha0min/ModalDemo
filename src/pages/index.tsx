import Image from 'next/image'
import {Inter} from 'next/font/google'
import {Button, Col, Modal, Row} from "antd";
import {useState} from "react";
import {CloseOutlined} from '@ant-design/icons';

const inter = Inter({subsets: ['latin']})

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
                open={open}
                closable={false}
                okButtonProps={{ disabled: true }}
                cancelButtonProps={{ disabled: true }}
            >

            </Modal>
        </main>
    )
}

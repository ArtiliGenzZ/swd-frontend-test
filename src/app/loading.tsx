import React from 'react';
import { Spin, Flex } from 'antd';

export default function Loading() {
    return (
        <Flex justify="center" align="center" vertical gap="middle" style={{ height: '100vh', width: '100%' }}>
            {/* Uses Ant Design Spinner */}
            <Spin size="large" />
        </Flex>

    );
}
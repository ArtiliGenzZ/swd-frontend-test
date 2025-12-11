"use client"
import React from 'react'
import styles from '@/styles/layoutandstyle.module.scss'
import { Flex, Row, Col, Divider } from 'antd'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { movePosition, moveShapeLeft, moveShapeRight, shuffleShapes } from '@/store/features/shapeSlice'
import { useTranslation } from 'react-i18next'

const LayoutAndStyle = () => {
    const { t } = useTranslation()
    const shapes = useAppSelector((state) => state.shape.shapes);   
    const position = useAppSelector((state) => state.shape.position);
    const dispatch = useAppDispatch();
    const halfOfShapes = Math.floor(shapes.length / 2);
    const rows = [
        shapes.slice(0, halfOfShapes),          
        shapes.slice(halfOfShapes, shapes.length) 
    ];

    return (
        <div className={styles.layoutandstyle_container}>
            {/* Control Buttons */}
            <Row gutter={[16, 8]} justify="center">
                {/*Move Shape Left*/}
                <Col span={7}>
                    <div className={styles.normal_card} onClick={() => dispatch(moveShapeLeft())}>
                        <div className={styles.triangle}></div>
                        <span className={styles.label}>{t("MoveShape")}</span>    
                    </div>
                </Col>

                {/*Move Position*/}
                <Col span={10}>
                    <div className={styles.big_card} onClick={() => dispatch(movePosition())}>
                        <div className={`${styles.triangle} ${styles.up}`}></div>
                        <div className={`${styles.triangle} ${styles.down}`}></div>
                        <span className={styles.label}>{t("MovePosition")}</span>
                    </div>
                </Col>

                {/*Move Shape Right*/}
                <Col span={7}>
                    <div className={styles.normal_card} onClick={() => dispatch(moveShapeRight())}>
                        <div className={`${styles.triangle} ${styles.right}`}></div>
                        <span className={styles.label}>{t("MoveShape")}</span>
                    </div>
                </Col>
            </Row>
            
            {/* Divider Line */}
            <Divider variant="solid" style={{ borderColor: '#858585', margin: '40px 0' }} />

            {/* Shapes Row*/}
            <Flex vertical gap={16}>
                {rows.map((rowShapes, rowIndex) => {
                    const isTopRow = rowIndex === 0;
                    const isBottomRow = rowIndex === 1;
                    return (
                        <Row gutter={[16, 16]} key={rowIndex}>
                            <Col span={3}></Col>
                            {isTopRow && position === "up" || isBottomRow && position === "down" ? <Col span={3}></Col> : null}
                            {rowShapes.map((shape, i) => (
                                <Col span={6} key={`${shape}-${i}`}>
                                    <div className={styles.normal_card} onClick={() => dispatch(shuffleShapes())}>
                                        <div className={styles[shape]}></div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    );
                })}
            </Flex>

        </div>
    )
}

export default LayoutAndStyle
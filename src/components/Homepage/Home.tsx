"use client"
import React from 'react'
import { Flex, Card } from 'antd'
import styles from '@/styles/home.module.scss'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

const Home = () => {
    const { t } = useTranslation()
    return (
        <Flex
          justify="center"
          align="center"
          gap={20}
          style={{ height: '90vh'}}
        >
            <Link href="/layout-style" className={styles.card}>
                <h5>{t("TestTitle", {count: 1})}</h5>
                <p>{t("LayoutHeader")}</p> 
            </Link>
            <Link href="/" className={styles.card}>
                <h5>{t("TestTitle", {count: 2})}</h5>
                <p>{t("ConnectApi")}</p> 
            </Link>
            <Link href="/forms" className={styles.card}>
                <h5>{t("TestTitle", {count: 3})}</h5>
                <p>{t("FormHeader")}</p> 
            </Link>
        </Flex>
    )
}

export default Home
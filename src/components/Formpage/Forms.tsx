"use client"
import React, { useEffect } from 'react'
import { Flex, Button, Row, Col, Form, Input, Select, DatePicker, Radio } from 'antd'
import styles from '@/styles/form.module.scss'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import CitizenIdInput from './CitizenIdInput'
import { addData, clearForm, updateData, FormValues } from '@/store/features/formSlice'
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';


const Forms = () => {
    const { t, i18n } = useTranslation()
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const formData = useAppSelector((state) => state.form.formData);

    //Fill an editing data form
    useEffect(() => {
        if (formData && formData.id) {
            //Convert String Date -> Dayjs
            const preparedData = {
                ...formData,
                birthday: dayjs(formData.birthday),
            };
            form.setFieldsValue(preparedData);
        }
    }, [formData, form])

    const onSubmit = (values: FormValues) => {
        const dataProcess = {
            ...values,
            birthday: values.birthday.toISOString(),
        }
        if (formData) {
            const dataOnEdit = { id: formData.id, ...dataProcess }
            dispatch(updateData(dataOnEdit));
            alert("User Updated");
            dispatch(clearForm());
            form.resetFields();
        } else {
            const dataOnAdd = { id: uuidv4(), ...dataProcess }
            dispatch(addData(dataOnAdd));
            alert("User Added");
            form.resetFields();
        }

    };

    const cleanForm = () => {
        if (formData) {
            dispatch(clearForm())
        }
        form.resetFields();
    }

    //Revalidate form when language change after the error has displayed
    useEffect(() => {
        const fieldsWithErrors = form.getFieldsError()
            .filter(({ errors }) => errors.length > 0)
            .map(({ name }) => name);

        if (fieldsWithErrors.length > 0) {
            form.validateFields(fieldsWithErrors);
        }
    }, [i18n.language, form]);

    return (
        <div className={styles.form_container}>

            {/* == Home Button Link */}
            <Link href="/" className={styles.home_btn}>{t("HomeTitle")}</Link>
            {/* == Github Rollback Testing One */}
            {/* == Main Form == */}
            <Form form={form} className={styles.form_content} onFinish={onSubmit}>

                { /* Firstname and Lastname */}
                <Row gutter={8}>
                    { /* Title */}
                    <Col span={5}>
                        <Form.Item
                            label={t("TitleLabel")}
                            name="title"
                            rules={[{ required: true, message: t("TitleErr") }]}
                        >
                            <Select
                                placeholder={t("TitleLabel")}
                                options={[
                                    { value: 'mr', label: t("MrLabel") },
                                    { value: 'mrs', label: t("MrsLabel") },
                                    { value: 'ms', label: t("MsLabel") },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    { /* Firstname */}
                    <Col span={9}>
                        <Form.Item
                            label={t("Firstname")}
                            name="firstname"
                            rules={[{ required: true, message: t("FirstnameErr") }]}
                        >
                            <Input
                            />
                        </Form.Item>
                    </Col>
                    { /* Lastname */}
                    <Col span={10}>
                        <Form.Item
                            label={t("Lastname")}
                            name="lastname"
                            rules={[{ required: true, message: t("LastnameErr") }]}
                        >
                            <Input
                            />
                        </Form.Item>
                    </Col>
                </Row>
                {/* == Github Rollback Testing One */}
                {/* Birthday and Nationality */}
                <Row gutter={8}>
                    {/* Birthday */}
                    <Col span={6}>
                        <Form.Item
                            label={t("Birthday")}
                            name="birthday"
                            rules={[{ required: true, message: t("BirthdayErr") }]}
                        >
                            <DatePicker placeholder={t("DateHolder")} format="DD-MM-YYYY" />
                        </Form.Item>
                    </Col>
                    {/* nationality */}
                    <Col span={10}>
                        <Form.Item
                            label={t("Nationality")}
                            name="nationality"
                            rules={[{ required: true, message: t("NationalityErr") }]}
                        >
                            <Select
                                placeholder={t("Nationality")}
                                options={[
                                    { value: 1, label: t('ThaiNationality') },
                                    { value: 2, label: t('AmericanNationality') },
                                    { value: 3, label: t('FrenchNationality') },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Citizen ID */}
                <Row>
                    <Col span={20}>
                        <Form.Item
                            label={t("CitizenId")}
                            name="citizenId"
                            rules={[{ len: 13, message: t("CitizenLenErr") }]}
                        >
                            <CitizenIdInput />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Gender */}
                <Row>
                    <Col span={20}>
                        <Form.Item
                            label={t("Gender")}
                            name="gender"
                            rules={[{ required: true, message: t("GenderErr") }]}
                        >
                            <Radio.Group
                                name="radiogroup"
                                options={[
                                    { value: 1, label: t('Male') },
                                    { value: 2, label: t('Female') },
                                    { value: 3, label: t('Other') }
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Mobile Phone number */}
                <Row>
                    <Col span={20}>
                        <Flex align="" gap={20}>
                            <Form.Item
                                label={t("MobilePhone")}
                                name="countryCode"
                                rules={[{ required: true, message: t("CountryCodeErr") }]}
                                style={{ width: '40%' }}
                            >
                                <Select
                                    placeholder={t("CountryCode")}
                                    options={[
                                        { value: '+66', label: '🇹🇭 +66' },
                                        { value: '+1', label: '🇺🇸 +1' },
                                        { value: '+33', label: '🇫🇷 +33' },
                                    ]}

                                />
                            </Form.Item>
                            <span>-</span>
                            <Form.Item
                                name="mobilePhone"
                                getValueFromEvent={(e) => e.target.value.replace(/\D/g, '')}
                                rules={[{ required: true, message: t("MobilePhoneErr") }]}
                                style={{ width: '60%' }}
                            >
                                <Input maxLength={10} />
                            </Form.Item>
                        </Flex>
                    </Col>
                </Row>

                {/* Passport No. */}
                <Row>
                    <Col span={10}>
                        <Form.Item
                            label={t("PassportNo")}
                            name="passportNumber"
                            getValueFromEvent={(e) => e.target.value.replace(/\D/g, '')}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Expected Salary , Action Buttons  */}
                <Row gutter={32}>
                    {/* Expected Salary */}
                    <Col span={10}>
                        <Form.Item
                            label={t("ExpectedSalary")}
                            name="expectedSalary"
                            getValueFromEvent={(e) =>
                                e.target.value.replace(/\D/g, '')
                            }
                            getValueProps={(value) => {
                                return {
                                    value: value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
                                }
                            }}
                            rules={[{ required: true, message: t("ExpectedSalaryErr") }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    {/* Action Buttons */}
                    <Col span={13} style={{ display: 'flex', justifyContent: 'center', gap: '4rem' }}>
                        <Button onClick={() => cleanForm()}>{t("CleanButton")}</Button>
                        <Button htmlType="submit">{t("SubmitButton")}</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default Forms
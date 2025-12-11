"use client"
import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Table, Space } from 'antd'
import { CheckboxProps, TableProps, TableColumnsType } from 'antd'
import { Flex } from 'antd'
import { useAppSelector , useAppDispatch } from '@/store/hook'
import { deleteData, editData } from '@/store/features/formSlice'
import { useTranslation } from 'react-i18next'

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
    id: string;
    firstname: string;
    lastname: string;
    mobilePhone: string;
    countryCode: string;
    gender: number;
    nationality: number;
}

const FormTable = () => {
    const { t } = useTranslation();
    const [isMounted, setIsMounted] = useState(false);
    const [checkedList, setCheckedList] = useState<React.Key[]>([]);
    const dataSource = useAppSelector((state) => state.form.storedData);
    const dispatch = useAppDispatch();
    const columns: TableColumnsType<DataType> = [
        {
            title: t("Name"),
            key: 'name',
            render: (record) => `${record.firstname} ${record.lastname}`,
            sorter: (a, b) => a.firstname.localeCompare(b.firstname)
        },
        {
            title: t("Gender"),
            dataIndex: 'gender',
            sorter: (a, b) => a.gender - b.gender,
            render: (text) => {
                return (
                    <span>
                        {text === 1 ? t("Male") : text === 2 ? t("Female") : t("Other")}
                    </span>
                );
            }
        },
        {
            title: t("MobilePhone"),
            key: 'mobilePhone',
            render: (record) => `${record.countryCode} ${record.mobilePhone}`,
            sorter: (a, b) => a.mobilePhone.localeCompare(b.mobilePhone)
        },
        {
            title: t("Nationality"),
            dataIndex: 'nationality',
            sorter: (a, b) => a.nationality - b.nationality,
            render: (text) => {
                return (
                    <span>
                        {text === 1 ? t("ThaiNationality") : text === 2 ? t("AmericanNationality") : text === 3 ? t("FrenchNationality") : t("OtherNationality")}
                    </span>
                );
            }
        },
        {
            title: t("Manage"),
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <a onClick={() => onEdit(record.id)}>{t("Edit") }</a>
                    <a onClick={() => onDelete(record.id)}>{t("Delete")}</a>
                </Space>
            ),
        }
    ];

    // Checklist functions
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setCheckedList(newSelectedRowKeys);
    };
    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys: checkedList,
        onChange: onSelectChange,
    };
    const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
        setCheckedList(e.target.checked ? dataSource.map((item) => item.id) : []);
    };
    
    const onDelete = (ids: React.Key | React.Key[]) => {
        dispatch(deleteData(ids as string[]));
        alert(`Data Deleted`);
        setCheckedList([]);
    };

    const onEdit = (id: string) => {
        dispatch(editData(id));
    };
    
    //Hydration issue prevention
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return null;
    }
    
    
    return (
        <Flex gap="middle" vertical style={{ margin: '2rem' }}>
            <Flex gap="middle" align="center">
                <Checkbox onChange={onCheckAllChange} checked={checkedList.length === dataSource.length && dataSource.length > 0}>
                    {t("SelectAll")}
                </Checkbox>
                <Button onClick={() => onDelete(checkedList)}>{t("Delete")}</Button>
            </Flex>
            <Table<DataType>
              rowKey={(record) => record.id}
              rowSelection={rowSelection} 
              columns={columns} 
              dataSource={dataSource}
              pagination={{ 
                pageSize: 5,
                position: ['topRight'],
                itemRender: (_, type, originalElement) => {
                    if (type === 'prev') {
                        return <a>{t("Prev")}</a>;
                    }
                    if (type === 'next') {
                        return <a>{t("Next")}</a>;
                    }
                    return originalElement;
                },
              }}
            />
        </Flex>
    )
}

export default FormTable
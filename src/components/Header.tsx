"use client";
import React, { useEffect } from 'react'
import { Flex, Select } from 'antd';
import styles from "@/styles/header.module.scss";
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '@/store/hook';
import { setLanguage } from '@/store/features/languageSlice';
import { usePathname } from 'next/navigation';

const Header = () => {
	const { t, i18n } = useTranslation()
	const dispatch = useAppDispatch();
	const pathname = usePathname();

	// Dynamic Header Title
	const headerTitle = () => {
		switch (pathname) {
			case "/forms":
				return t("FormHeader");
			case "/layout-style":
				return t("LayoutHeader");
			default:
				return "";
		}
	}

	const { currentLanguage } = useAppSelector((state) => state.language)
	const languageList = [
		{ value: "en", label: t("EnglishLabel") },
		{ value: "th", label: t("ThaiLabel") }
	]
	// Function: language change handler
	const handleChange = (value: string) => {
		dispatch(setLanguage(value))
		i18n.changeLanguage(value)
	}

	//=== Sync Redux value with i18n on load to prevent mismatch ===
	useEffect(() => {
		if (currentLanguage !== i18n.language) {
			i18n.changeLanguage(currentLanguage);
		}
	}, [currentLanguage, i18n]);

	return (
		<div className={styles.header}>
			<Flex
			  justify="space-between"
			  align="flex-start"
			>
				{/* Header Menu */}
				<h2>{headerTitle()}</h2>

				{/* Language Selection Combobox */}
				<Select
					className={styles.language_select}
					value={currentLanguage}
					options={languageList}
					onChange={(value) => handleChange(value)}
				/>
			</Flex>
		</div>
		// <div className={styles.header}>
		// 	<Select
		// 		placeholder="Select"
		// 		className={styles.language_select}
		// 		value={currentLanguage}
		// 		options={languageList}
		// 		onChange={(value) => handleChange(value)}
		// 	/>
		// </div>
	)
}
export default Header
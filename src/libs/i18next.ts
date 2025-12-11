import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    resources: {
        en: {
            translation: {
                "EnglishLabel": "EN",
                "ThaiLabel": "TH",
                "HomeTitle": "Home",
                "LayoutHeader": "Layout & Style",
                "ConnectApi": "Connect API",
                "FormHeader": "Form & Table",
                "TestTitle": "Test {{count}}",

                //Form
                "TitleLabel": "Title",
                "MrLabel": "Mr",
                "MrsLabel": "Mrs",
                "MsLabel": "Ms",
                "Name": "Name",
                "Firstname": "Firstname",
                "Lastname": "Lastname",
                "Birthday": "Birthday",
                "DateHolder": "mm/dd/yyyy",
                "Nationality": "Nationality",
                "ThaiNationality": "Thai",
                "AmericanNationality": "American",
                "FrenchNationality": "French",
                "CitizenId": "CitizenID",
                "Gender": "Gender",
                "Male": "Male",
                "Female": "Female",
                "Other": "Other",
                "MobilePhone": "Mobile Phone",
                "CountryCode": "Country Code",
                "PassportNo": "Passport No",
                "ExpectedSalary": "Expected Salary",
                "SubmitButton": "Submit",
                "CleanButton": "Clean",
                "Delete": "DELETE",
                "Edit": "EDIT",
                "SelectAll": "Select All",
                "Prev" : "PREV",
                "Next": "NEXT",
                "Manage": "Manage",

                //Error Message
                "TitleErr": "Title is required",
                "FirstnameErr": "Please input your Firstname",
                "LastnameErr": "Please input your Lastname",
                "BirthdayErr": "Please select your Birthday",
                "NationalityErr": "Please select your Nationality",
                "CitizenIdErr": "Please input your CitizenId",
                "CitizenLenErr": "CitizenId must be 13 characters long",
                "GenderErr": "Please select your Gender",
                "MobilePhoneErr": "Please input your MobilePhone",
                "CountryCodeErr": "Please select your CountryCode",
                "PassportNoErr": "Please input your PassportNo",
                "ExpectedSalaryErr": "Please input your ExpectedSalary",

                //Layout
                "MoveShape": "Move shape",
                "MovePosition": "Move position"
            }
        },
        th: {
            translation: {
                "EnglishLabel": "อังกฤษ",
                "ThaiLabel": "ไทย",
                "HomeTitle": "หน้าแรก",
                "LayoutHeader": "การจัดการหน้าเว็บ",
                "ConnectApi": "การเชื่อมต่อ API",
                "FormHeader": "การจัดการหน้าฟอร์ม",
                "TestTitle": "แบบทดสอบที่ {{count}}",

                //Form
                "TitleLabel": "คำนำหน้า",
                "MrLabel": "นาย",
                "MrsLabel": "นาง",
                "MsLabel": "นางสาว",
                "Name": "ชื่อ",
                "Firstname": "ชื่อจริง",
                "Lastname": "นามสกุล",
                "Birthday": "วันเกิด",
                "DateHolder": "ดด/วว/ปปปป",
                "Nationality": "สัญชาติ",
                "ThaiNationality": "ไทย",
                "AmericanNationality": "อเมริกัน",
                "FrenchNationality": "ฝรั่งเศส",
                "CitizenId": "เลขบัตรประชาชน",
                "Gender": "เพศ",
                "Male": "ชาย",
                "Female": "หญิง",
                "Other": "อื่นๆ",
                "MobilePhone": "หมายเลขโทรศัพท์มือถือ",
                "CountryCode": "รหัสประเทศ",
                "PassportNo": "หนังสือเดินทาง",
                "ExpectedSalary": "เงินเดือนที่คาดหวัง",
                "SubmitButton": "ส่งข้อมูล",
                "CleanButton": "ล้างข้อมูล",
                "Delete": "ลบข้อมูล",
                "Edit": "แก้ไขข้อมูล",
                "SelectAll": "เลือกทั้งหมด",
                "Prev": "ก่อนหน้า",
                "Next": "ถัดไป",
                "Manage": "จัดการ",

                //Error Message
                "TitleErr": "กรุณาเลือกคำนำหน้าชื่อ",
                "FirstnameErr": "กรุณากรอกชื่อ",
                "LastnameErr": "กรุณากรอกนามสกุล",
                "BirthdayErr": "กรุณาเลือกวันเกิด",
                "NationalityErr": "กรุณาเลือกสัญชาติ",
                "CitizenIdErr": "กรุณากรอกเลขบัตรประชาชน",
                "CitizenLenErr": "เลขบัตรประชาชนต้องมี 13 หลัก",
                "GenderErr": "กรุณาเลือกเพศ",
                "MobilePhoneErr": "กรุณากรอกหมายเลขโทรศัพท์มือถือ",
                "CountryCodeErr": "กรุณาเลือกรหัสประเทศ",
                "PassportNoErr": "กรุณากรอกหนังสือเดินทาง",
                "ExpectedSalaryErr": "กรุณากรอกเงินเดือนที่คาดหวัง",

                //Layout 
                "MoveShape": "เลื่อนรูปแบบ",
                "MovePosition": "เปลี่ยนตำแหน่ง"
            }
        }
    }
})

export default i18next
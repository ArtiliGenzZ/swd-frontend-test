import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Data {
    id: string;
    title: string;          // e.g., "mr", "mrs", "ms"
    firstname: string;
    lastname: string;
    birthday: string;       // ISO 8601 Format: "2025-12-01T17:00:00.000Z"
    nationality: number;    // e.g., "th", "usa"
    citizenId: string;      // 13-digit string
    gender: number;         // 1: Male, 2: Female, 3: Other
    countryCode: string;    // Dialing code prefix e.g. "th", "en"
    mobilePhone: string;    // 10-digit string
    passportNumber: string;
    expectedSalary: string; // Note: Kept as string to match your JSON input
}
interface FormData {
    formData: Data | null;
    storedData: Data[];
    isEditing: boolean;
}

const fetchInLocalStorage = () => {
    if (typeof window !== 'undefined') { 
        const fetchedData = localStorage.getItem('formData');
        if (fetchedData) {
            return JSON.parse(fetchedData);
        }
    }
    return [];
}
const storeInLocalStorage = (data: Data[]) => {
    localStorage.setItem('formData', JSON.stringify(data));
}

const initialState: FormData = {
    formData: null,
    storedData: fetchInLocalStorage(),
    isEditing: false,
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        addData: (state, action: PayloadAction<Data>) => {
            state.storedData.push(action.payload);
            if (typeof window !== 'undefined') {
                storeInLocalStorage(state.storedData)
            }
        },
        deleteData: (state, action: PayloadAction<string | string[]>) => {
            state.storedData = state.storedData.filter((item) => !action.payload.includes(item.id));
            if (typeof window !== 'undefined') { 
                storeInLocalStorage(state.storedData)
            }
        },
        editData: (state, action: PayloadAction<string>) => {
            const foundData = state.storedData.find((item) => item.id === action.payload);
            if (foundData) {
                state.formData = foundData;
                state.isEditing = true;
            } else { 
                alert(`Data not found`);
            }
        },
        updateData: (state, action: PayloadAction<Data>) => {
            state.storedData = state.storedData.map((item) => item.id === action.payload.id ? action.payload : item);
            if (typeof window !== 'undefined') { 
                storeInLocalStorage(state.storedData)
            }
        },
        clearForm: (state) => {
            state.formData = null;
            state.isEditing = false;
        }

    }
})

export const { addData, deleteData, editData, updateData, clearForm } = formSlice.actions
export default formSlice.reducer

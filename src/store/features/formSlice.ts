import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DataFormType {
    id: string;
    title: string;         
    firstname: string;
    lastname: string;
    birthday: string | null;       
    nationality: number;    
    citizenId: string;      
    gender: number;         
    countryCode: string;    
    mobilePhone: string;    
    passportNumber: string;
    expectedSalary: string; 
}
interface FormData {
    formData: DataFormType | null;
    storedData: DataFormType[];
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
const storeInLocalStorage = (data: DataFormType[]) => {
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
        addData: (state, action: PayloadAction<DataFormType>) => {
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
        updateData: (state, action: PayloadAction<DataFormType>) => {
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

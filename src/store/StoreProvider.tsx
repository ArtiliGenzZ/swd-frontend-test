"use client"
import { Provider } from "react-redux"
import { store , AppStore } from "./store"
import { useRef } from "react"

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const storeRef = useRef<AppStore>();
    if (!storeRef.current) {
        storeRef.current = store();
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}

export default StoreProvider
import { create } from "zustand"

interface EditColorModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

const useEditColorModal = create<EditColorModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useEditColorModal
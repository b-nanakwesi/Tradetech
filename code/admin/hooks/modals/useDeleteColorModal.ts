import { create } from "zustand"

interface DeleteColorModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

const useDeleteColorModal = create<DeleteColorModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useDeleteColorModal
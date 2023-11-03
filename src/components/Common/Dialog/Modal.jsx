import * as Dialog from '@radix-ui/react-dialog'

import CloseButton from '../Buttons/CloseButton'

export default function Modal({ open, onOpenChange, children }) {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            {children}
        </Dialog.Root>
    )
}

function ModalContent({ children }) {
    return (
        <Dialog.Portal>
            <Dialog.Overlay
                className="bg-black/0.5 fixed top-0 left-0 right-0 bottom-0 grid items-center overflow-y-auto z-50">
                <Dialog.Content
                    className="max-w-full pointer-events-auto">
                    <div className="p-6 fixed top-0 right-0 z-[100]">
                        <Dialog.Close className="cursor-pointer">
                            <CloseButton />
                        </Dialog.Close>
                    </div>
                    {children}
                </Dialog.Content>
            </Dialog.Overlay>
        </Dialog.Portal>
    )
}

Modal.Button = Dialog.Trigger
Modal.Close = Dialog.Close
Modal.Content = ModalContent

import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  error?: boolean;
};

export const Modal = (props: Props) => {
  const { open, setOpen, children, error } = props;

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      role="alertdialog"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content alignItems="center">
            <Dialog.Header>
              {error ? (
                <Dialog.Title color="red">{children}</Dialog.Title>
              ) : (
                <Dialog.Title>{children}</Dialog.Title>
              )}
            </Dialog.Header>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

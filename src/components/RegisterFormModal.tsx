import {
  Button,
  Dialog,
  Field,
  Flex,
  Input,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { Control, Controller } from "react-hook-form";
import { Inputs } from "../types/interfaces";
import { FormEventHandler, useRef } from "react";

type Props = {
  control: Control<Inputs> | undefined;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export const RegisterFormModal = (props: Props) => {
  const { control, onSubmit } = props;
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <Dialog.Root initialFocusEl={() => ref.current}>
        <Dialog.Trigger asChild>
          <Button variant="outline" backgroundColor="teal.500" color="white">
            新規登録
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title fontSize="2xl">新規登録</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body pb="4">
                <form onSubmit={onSubmit}>
                  <Stack width="100%" gap="4px">
                    <Controller
                      name="title"
                      rules={{ required: "内容の入力は必須です" }}
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field.Root invalid={!!fieldState.error}>
                          <Field.Label>学習内容</Field.Label>
                          <Input
                            type="text"
                            placeholder="例：数学"
                            {...field}
                            value={field.value || ""}
                          />
                          {fieldState.error && (
                            <Field.ErrorText>
                              {fieldState.error.message}
                            </Field.ErrorText>
                          )}
                        </Field.Root>
                      )}
                    />

                    <Controller
                      name="time"
                      rules={{
                        required: "時間の入力は必須です",
                        min: {
                          value: 1,
                          message: "1時間以上を入力してください",
                        },
                      }}
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field.Root invalid={!!fieldState.error}>
                          <Field.Label>学習時間</Field.Label>
                          <Input
                            type="number"
                            placeholder="例：2 (時間)"
                            {...field}
                            value={field.value || ""}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                          {fieldState.error && (
                            <Field.ErrorText>
                              {fieldState.error.message}
                            </Field.ErrorText>
                          )}
                        </Field.Root>
                      )}
                    />
                    <Flex gap="4px">
                      <Button type="submit" backgroundColor="teal.500">
                        登録
                      </Button>
                      <Dialog.ActionTrigger asChild>
                        <Button variant="outline">戻る</Button>
                      </Dialog.ActionTrigger>
                    </Flex>
                  </Stack>
                </form>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

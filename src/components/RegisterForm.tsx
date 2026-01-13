import { Button, Field, Input, Stack } from "@chakra-ui/react";
import { Control, Controller, FieldValues, useForm } from "react-hook-form";
import { Inputs } from "../types/interfaces";
import { FormEventHandler } from "react";

type Props = {
  control: Control<Inputs> | undefined;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export const RegisterForm = (props: Props) => {
  const { control, onSubmit } = props;
  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" maxW="sm">
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
                backgroundColor="white"
              />
              {fieldState.error && (
                <Field.ErrorText>{fieldState.error.message}</Field.ErrorText>
              )}
            </Field.Root>
          )}
        />

        <Controller
          name="time"
          rules={{
            required: "時間の入力は必須です",
            min: { value: 1, message: "1時間以上を入力してください" },
          }}
          control={control}
          render={({ field, fieldState }) => (
            <Field.Root invalid={!!fieldState.error}>
              <Field.Label>学習時間</Field.Label>
              <Input
                type="number"
                placeholder="例：2 (時間)"
                backgroundColor="white"
                {...field}
                value={field.value || ""}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
              {fieldState.error && (
                <Field.ErrorText>{fieldState.error.message}</Field.ErrorText>
              )}
            </Field.Root>
          )}
        />
        <Button type="submit">登録</Button>
      </Stack>
    </form>
  );
};

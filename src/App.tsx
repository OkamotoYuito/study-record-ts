import { Box, Flex, Heading, Separator, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Inputs, record } from "./types/interfaces";
import { RegisterForm } from "./components/RegisterForm";
import { Loading } from "./components/Loading";
import { Modal } from "./components/Modal";
import { useRecords } from "./hooks/useRecords";
import { RecordList } from "./components/RecordList";

function App() {
  const [successOpen, setSuccessOpen] = useState<boolean>(false);
  const [errorOpen, setErrorOpen] = useState<boolean>(false);
  const { records, isLoading, error, addRecord, deleteRecord } = useRecords();

  const totalTime = records.reduce(
    (total, item) => total + (item.time || 0),
    0
  );

  const onClickRegister: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      await addRecord(data.title, data.time);
      reset();
      setSuccessOpen(true);
    } catch (e) {
      console.log("登録失敗, e");
      setErrorOpen(true);
    }
  };

  const defaultValues = {
    title: "",
    time: 0,
  };

  const { control, handleSubmit, reset, watch } = useForm<Inputs>({
    defaultValues,
    mode: "onChange",
  });

  const title = watch("title");
  const time = watch("time");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessOpen(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [successOpen]);

  useEffect(() => {
    if (error) setErrorOpen(true);
  }, [error]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Stack
        p="5"
        direction="column"
        alignItems="center"
        minH="100vh"
        w="100vw"
      >
        <Heading fontSize="3xl" textAlign="center" padding="10px">
          Study Record with TypeScript
        </Heading>
        <Box
          p="30px"
          backgroundColor="gray.100"
          w={["100%", "400px"]}
          rounded="2xl"
        >
          <RegisterForm
            control={control}
            onSubmit={handleSubmit(onClickRegister)}
          />

          <div style={{ paddingTop: "5px" }}>
            <Text>入力されている学習内容：{title}</Text>
            <Text>入力されている学習時間：{time}</Text>
          </div>
          <div>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              paddingTop="5px"
            >
              <Heading fontSize="xl">記録一覧</Heading>
              <Text fontSize="lg" fontWeight="semibold">
                合計時間：{totalTime}時間
              </Text>
            </Flex>

            <ul>
              {records.map((record) => (
                <RecordList
                  key={record.id}
                  record={record}
                  deleteRecord={deleteRecord}
                />
              ))}
              <Separator />
            </ul>
          </div>
        </Box>
      </Stack>

      <Modal open={successOpen} setOpen={setSuccessOpen}>
        ✅️ 正常に登録されました
      </Modal>
      <Modal open={errorOpen} setOpen={setErrorOpen} error={errorOpen}>
        ❌️ エラーが発生しました
      </Modal>
    </>
  );
}

export default App;

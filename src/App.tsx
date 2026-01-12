import {
  Button,
  Center,
  Heading,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchRecords, supabase } from "./server/fetchRecords";
import { Modal } from "./components/modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { Inputs, record } from "./types/interfaces";
import { RegisterForm } from "./components/RegisterForm";
import { Loading } from "./components/Loading";

function App() {
  const [records, setRecords] = useState<record[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const totalTime = records.reduce(
    (total, item) => total + (item.time || 0),
    0
  );

  const onClickRegister: SubmitHandler<Inputs> = async () => {
    const { error } = await supabase
      .from("study-record")
      .insert({ time, title });
    if (error) {
      console.log("Error register error:", error);
      setLoading(false);
    } else {
      setOpen(true);
      loadRecords();
      reset();
    }
  };

  const onClickDelete = async (id: string) => {
    setLoading(true);
    const { error } = await supabase.from("study-record").delete().eq("id", id);
    if (error) {
      console.log("Error delete error:", error);
      setLoading(false);
    } else {
      loadRecords();
    }
  };

  const loadRecords = async () => {
    try {
      setLoading(true);
      const data = await fetchRecords();
      if (data) {
        setRecords(data);
      }
    } finally {
      setLoading(false);
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
    loadRecords();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 1500);
  }, [open]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Stack p="5" alignItems="center">
        <Heading fontSize="3xl" textAlign="center" padding="10px">
          Study Record with TypeScript
        </Heading>
        <RegisterForm
          control={control}
          onSubmit={handleSubmit(onClickRegister)}
        />

        <div>
          <Text>入力されている学習内容：{title}</Text>
          <Text>入力されている学習時間：{time}</Text>
        </div>
        <div>
          <Heading>記録一覧</Heading>
          <ul>
            {records.map((record) => (
              <li key={record.id}>
                {record.title}：{record.time}時間
                <Button
                  onClick={() => onClickDelete(record.id)}
                  size="xs"
                  variant="outline"
                  rounded="md"
                >
                  x
                </Button>
              </li>
            ))}
          </ul>
          <Text>合計時間：{totalTime}時間</Text>
        </div>
      </Stack>
      <Modal open={open} setOpen={setOpen}>
        ✅️ 正常に登録されました
      </Modal>
    </>
  );
}

export default App;

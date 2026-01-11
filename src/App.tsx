import { Button, Field, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchRecords, supabase } from "./server/fetchRecords";

export type record = {
  created_at: string | null;
  id: string;
  time: number | null;
  title: string | null;
};

function App() {
  const [title, setTitle] = useState<string>("");
  const [time, setTime] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [records, setRecords] = useState<record[]>([]);

  const totalTime = records.reduce(
    (total, item) => total + (item.time || 0),
    0
  );

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(Number(e.target.value));
  };

  const onClickRegister = async () => {
    checkError();
    const { error } = await supabase
      .from("study-record")
      .insert({ time, title });

    console.log("supabase");
  };

  const onClickDelete = () => {};

  const checkError = () => {
    if (title === "" || time <= 0) {
      setError(true);
    }
  };

  useEffect(() => {
    const loadRecords = async () => {
      try {
        const data = await fetchRecords();
        if (data) {
          setRecords(data);
        }
      } finally {
      }
    };
    loadRecords();
  }, []);

  return (
    <>
      <Stack p="5">
        <Heading fontSize="3xl" textAlign="center" padding="10px">
          Study Record with TypeScript
        </Heading>
        <form onSubmit={onClickRegister}>
          <Stack gap="4" align="flex-start" maxW="sm">
            <Field.Root>
              <Field.Label>学習内容</Field.Label>
              <Input placeholder="例：数学" onChange={onChangeTitle} />
              <Field.ErrorText></Field.ErrorText>
            </Field.Root>

            <Field.Root>
              <Field.Label>学習時間</Field.Label>
              <Input placeholder="例：2 (2時間)" onChange={onChangeTime} />
              <Field.ErrorText></Field.ErrorText>
            </Field.Root>

            <Button type="submit">登録</Button>
          </Stack>
        </form>
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
                  onClick={onClickDelete}
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
    </>
  );
}

export default App;

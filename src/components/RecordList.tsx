import { Button, Flex, Separator } from "@chakra-ui/react";
import { record } from "../types/interfaces";

type Props = {
  record: record;
  deleteRecord: (id: string) => Promise<void>;
};

export const RecordList = (props: Props) => {
  const { record, deleteRecord } = props;

  return (
    <li>
      <Separator />
      <Flex justifyContent="space-between" alignItems="center" py="5px">
        {record.title}：{record.time}時間
        <Button
          onClick={() => deleteRecord(record.id)}
          size="xs"
          variant="outline"
          rounded="md"
          color="white"
          backgroundColor="red.600"
          _hover={{ backgroundColor: "red.700" }}
        >
          削除
        </Button>
      </Flex>
    </li>
  );
};

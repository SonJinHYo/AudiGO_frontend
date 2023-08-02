import { VStack, Text, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { useState } from "react";

export default function Home() {
  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContentVisibility = () => {
    setIsContentVisible((prev) => !prev);
  };
  return (
    <VStack justify="center">
      <VStack
        align="center"
        justify="center"
        display={isContentVisible ? "block" : "none"}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: isContentVisible ? 1 : 0,
            y: isContentVisible ? 0 : -10,
          }}
          transition={{ duration: 0.7 }}
        >
          <VStack mt={40} fontStyle="normal" fontSize="xl">
            <Text> "교수님 말이 빠르시니까.." </Text>
            <Text> "강사님 진도가 빨라서 이해가 어려우니까.."</Text>
            <Text> "이 회의 내용은 중요하니까.."</Text>
            <Text> "이 사람이 사기치는거 같으니까.."</Text>
            <Text>.</Text>
            <Text>.</Text>
            <Text>.</Text>
            <Text>.</Text>
            <Text align="center" my="250px" fontSize="3xl">
              녹음을 해야겠다!
            </Text>
            <Text>.</Text>
            <Text>.</Text>
            <Text>.</Text>
            <Text>.</Text>
            <Text my="200px" fontSize="3xl">
              녹음한걸 듣긴 듣는데...
            </Text>
            <Text>.</Text>
            <Text>.</Text>
            <Text>.</Text>
            <Text>.</Text>
            <Text> '이걸 언제 다 듣고있지..?' </Text>
            <Text> '중요 포인트 부분만 필요한데'</Text>
            <Text mb="100px">
              '녹음 내용 요약하면서 자료로 만들어야하는데 귀찮다...'
            </Text>
            <Text>.</Text>
            <Text>.</Text>
            <Text>.</Text>
            <Text>.</Text>
            <Text mt="100px" fontSize="4xl" fontWeight="bold">
              그냥 Audigo 써야겠다
            </Text>
          </VStack>
        </motion.div>
      </VStack>

      <Button my={4} onClick={toggleContentVisibility}>
        {isContentVisible ? "완전히 이해했어요!" : "Audigo가 필요한 이유"}
      </Button>
    </VStack>
  );
}

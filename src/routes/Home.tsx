import { VStack, Text, Button, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { useState } from "react";

export default function Home() {
  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContentVisibility = () => {
    setIsContentVisible((prev) => !prev);
  };
  return (
    <>
      <VStack justify="center">
        <Button
          my={4}
          onClick={toggleContentVisibility}
          display={isContentVisible ? "none" : "block"}
        >
          Audigo가 필요할 때
        </Button>
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

        <Button
          my={4}
          onClick={toggleContentVisibility}
          display={isContentVisible ? "block" : "none"}
        >
          완전히 이해했어요!
        </Button>
      </VStack>
      <VStack mx="20" mt="20" align="start">
        <Heading fontSize="6xl">Audigo</Heading>
        <VStack fontSize="lg" w="70%">
          <Text mt="5">
            Audigo는 AWS에서 개발한 고성능 음성 인식 기능을 사용해서 오디오에서
            스크립트 텍스트를 추출하고 스크립트의 원본과 내용이 다듬어진
            스크립트를 제공합니다!
          </Text>
          {/* <Text mt="10">
            물론 고성능이라도 화자나 주변 환경으로인해 부정확한 부분이 생길 수도
            있고 스크립트가 너무 길어서 필요한 부분을 찾기 여전히 어려울 수 있는
            문제가 있습니다.
          </Text> */}
        </VStack>
      </VStack>
    </>
  );
}

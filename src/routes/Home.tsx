import { VStack, Text, Button, Heading, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { useState } from "react";

export default function Home() {
  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContentVisibility = () => {
    setIsContentVisible((prev) => !prev);
  };
  return (
    <>
      {/* <VStack justify="center">
        <Button
          my={4}
          onClick={toggleContentVisibility}
          display={isContentVisible ? "none" : "block"}
        >
          Audigo는
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
      </VStack> */}
      <VStack p="10" align="start">
        <Button
          mt="24"
          onClick={toggleContentVisibility}
          w="260px"
          h="76px"
          fontSize="52"
          fontWeight="bold"
          // display={isContentVisible ? "none" : "block"}
        >
          Audigo
        </Button>
        <VStack display={isContentVisible ? "block" : "none"}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: isContentVisible ? 1 : 0,
              y: isContentVisible ? 0 : -10,
            }}
            transition={{ duration: 0.5 }}
            style={{ overflow: "hidden" }}
          >
            <VStack align="start" fontStyle="normal" fontSize="xl">
              <VStack pl="10" w="60%" my="12" align="start">
                <Text mb="8">
                  ' 오디오 파일만 올려도 정확하고 필요한 내용만 담긴 스크립트를
                  받으면 어떨까? ' 라는 생각으로 만든 서비스입니다.
                </Text>
                <Text mb="8">
                  AWS(Amazon Web Service)에서 지속적으로 개발중인 고성능 음성
                  인식 기능을 사용해서 오디오에서 스크립트 텍스트를 추출하고,
                  스크립트의 원본과 Audigo는 이를 바탕으로 내용이 다듬어진
                  스크립트를 제공합니다.
                </Text>
                <Text>
                  오디오와 함께 등록한 단어와 정확도가 낮게 나온 단어를
                  표시해줍니다. 이후 다시 제출하여 새로운 스크립트를 얻을 수
                  있습니다. (사용방법에서 자세한 설명이 제공됩니다.)
                </Text>
              </VStack>
              <Heading mb="10px" fontSize="52" mt="28">
                Audigo Point
              </Heading>
              <VStack
                pl="10"
                fontStyle="normal"
                fontSize="xl"
                w="60%"
                my="8"
                align="start"
              >
                <Text>
                  AWS뿐만 아니라 다양한 음성 인식 기술이 존재하지만, 화자나 주변
                  환경으로인해 부정확한 부분이 생길 수도 있고 스크립트가 너무
                  길어서 필요한 부분을 찾기 여전히 어려울 수 있는 문제가
                  있습니다.
                </Text>
                <Text my="8">
                  여러 음성 인식 어플이 많지만 Audigo는 좀 더 정확한 스크립트를
                  저장하기 위해 만들었습니다. AI기능을 통해 정리된 스크립트와
                  요약본까지 받아볼 수 있습니다.
                </Text>
                <Text>
                  최종적으로 수정된 원본 스크립트, 문장을 정리해준 스크립트,
                  요약본 스크립트까지 총 3개의 스크립트를 제공합니다!
                </Text>
              </VStack>
            </VStack>
          </motion.div>
        </VStack>

        {/* <Button
          my={4}
          onClick={toggleContentVisibility}
          display={isContentVisible ? "block" : "none"}
        >
          닫기
        </Button> */}
      </VStack>
      <VStack mt="10" mx="20" align="start">
        <Heading mb="10px" fontSize="44">
          사용방법
        </Heading>
        <Box p="4" fontSize="18">
          <Heading fontSize="24" mb="8">
            1. 로그인
          </Heading>
          <Text ml="12" mb="4">
            우측 상단의 버튼을 통해 로그인을 합니다.
          </Text>
          <Text ml="12">
            (현재 카카오톡을 통한 로그인 기능만 제공되고 있습니다.)
          </Text>
        </Box>
        <Box p="4" fontSize="18" my="12">
          <Heading fontSize="24" mb="8">
            2. 스크립트 생성 페이지 이동
          </Heading>
          <Text ml="12">
            로그인을 하면 (빈) 프로필 사진이 표시됩니다. 클릭 후 Create Script를
            클릭합니다.
          </Text>
        </Box>

        <Box p="4" fontSize="18" my="12">
          <Heading fontSize="24" mb="8">
            3. 오디오 파일, 키워드 등록
          </Heading>
          <Text ml="12" mb="4">
            오디오 파일 유형을 확인하여 업로드합니다.
          </Text>
          <Text ml="12">
            이 때, 오디오 내용 중 잘 표시되었으면 하는 키워드를 추가해줍니다.
          </Text>
        </Box>
        <Box p="4" fontSize="18" my="12">
          <Heading fontSize="24" mb="8">
            4. 1차 스크립트 확인 후 수정{" "}
          </Heading>
          <Text ml="12" mb="4">
            음성 인식을 통해 제공된 스크립트와 정리 작업을 거친 스크립트가
            제공되고, 정확도가 낮은 단어와 앞서 등록한 키워드가 표시됩니다.
          </Text>
          <Text ml="12" mb="4">
            같이 두 스크립트를 바탕으로 단어들을 수정하여 다시 제출합니다.
          </Text>
          <Text ml="12">
            (오디오 길이와 스크립트 길이에 따라 로딩 시간이 길어질 수 있습니다!)
          </Text>
        </Box>
        <Box p="4" fontSize="18">
          <Heading fontSize="24" mb="8">
            5. My Script 페이지에서 확인{" "}
          </Heading>
          <Text ml="12">
            스크립트 작업이 끝나면 My Scripts 페이지로 이동됩니다. My Scripts
            페이지에서 생성해온 스크립트를 확인해 볼 수 있습니다.
          </Text>
        </Box>

        <Box h="200px"></Box>
      </VStack>
    </>
  );
}

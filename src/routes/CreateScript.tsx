import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  VStack,
  Text,
  HStack,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateScript, uploadAudio } from "../api";
import ProtectedPage from "../components/ProtectedPage";
import { IForm, ICharecter } from "../types";
import { useNavigate } from "react-router-dom";

export default function CreateScript() {
  const { register, handleSubmit, watch, reset } = useForm<IForm>();

  const [words, setWords] = useState<Set<string>>(new Set()); // 단어 배열 상태 초기화
  const [inputValue, setInputValue] = useState<string>(""); // 입력 상자의 상태 초기화
  const [flag, setFlag] = useState(false);
  const [originScript, setOriginScript] = useState<string>("");
  const [modifiedScript, setModifiedScript] = useState<string>("");
  const [charecters, setCharecters] = useState<ICharecter[]>([]);
  const [audioPk, setAudioPk] = useState<number>(0);

  const navigate = useNavigate();

  interface IResult {
    origin_script: string;
    modified_script: string;
    charecters: ICharecter[];
    audio_pk: number;
  }
  const uploadAudioMutation = useMutation(uploadAudio, {
    onSuccess: (result: IResult) => {
      setOriginScript(result.origin_script);
      setModifiedScript(result.modified_script);
      setCharecters(result.charecters);
      setAudioPk(result.audio_pk);
      setFlag(true);
    },
  });

  const updateScriptMutation = useMutation(updateScript, {
    onSuccess: (data: any) => {
      navigate("/users/me");
    },
  });

  // 단어 추가 함수
  const addWord = () => {
    if (inputValue.trim() !== "") {
      setWords((prevWords) => new Set(prevWords).add(inputValue.trim())); // 기존 Set에 새로운 단어 추가
      setInputValue(""); // 입력 상자 초기화
    }
  };

  const onSubmit = (data: IForm) => {
    const { file, title } = data;

    uploadAudioMutation.mutate({ file, title });
  };

  const onFinalSubmit = (data: ICharecter[]) => {
    updateScriptMutation.mutate({ charecters: data, audioPk: audioPk });
  };

  const removeWord = (word: string) => {
    const updatedSet = new Set(words);
    updatedSet.delete(word);
    setWords(updatedSet);
  };

  const [editingCharecter, setEditingCharecter] = useState<ICharecter | null>(
    null
  );
  const [editedContent, setEditedContent] = useState("");

  const handleEditClick = (charecter: ICharecter) => {
    setEditingCharecter(charecter);
    setEditedContent(charecter.alternatives[0].content);
  };

  const handleSaveClick = () => {
    if (editingCharecter) {
      const updatedCharecters = charecters.map((c: any) =>
        c === editingCharecter
          ? {
              ...c,
              alternatives: [{ ...c.alternatives[0], content: editedContent }],
            }
          : c
      );
      setCharecters(updatedCharecters);
      setEditingCharecter(null);
      setEditedContent("");
    }
  };
  const handleCloseModal = () => {
    setEditingCharecter(null);
    setEditedContent("");
  };

  const handleReceiveFinalScript = () => {
    // charecters 데이터를 임의의 API로 보내기 위해 submitCharectersToAPI 함수 호출
    onFinalSubmit(charecters);
  };
  return (
    <ProtectedPage>
      {/* <Helmet>
            <title>Get Blur Image</title>
          </Helmet> */}

      {flag ? (
        <VStack align="center">
          <Flex w="100%" my={20} mx={10} fontStyle="italic">
            <Box w="8%"></Box>

            <Box
              w="40%"
              h="600px"
              overflow="auto"
              border="1px solid #ccc"
              p="4"
            >
              <Heading mb="5" size="md">
                원본 스크립트
              </Heading>
              <Text>{originScript}</Text>
            </Box>
            <Box w="4%"></Box>
            <Box
              w="40%"
              h="600px"
              overflow="auto"
              border="1px solid #ccc"
              p="4"
            >
              <Heading mb="5" size="md">
                수정 스크립트
              </Heading>
              <Text>{modifiedScript}</Text>
            </Box>
            <Box w="8%"></Box>
          </Flex>
          <Heading alignContent="center" mt="100px">
            추가 수정하기
          </Heading>
          <Text mt={6} fontSize="lg">
            빨간색은 정확도가 낮게 나온 단어, 초록색은 중요 단어 리스트의
            단어입니다.
          </Text>
          <Text fontSize="lg">
            위 스크립트에서 수정된 부분이 어색한 경우 해당 부분만 추가로 직접
            수정하면 더 좋은 스크립트를 얻을 수 있습니다.
          </Text>
          <Text fontSize="lg">
            단어를 클릭하면 수정을 할 수 있습니다. 수정 후 제대로 된 스크립트를
            받아보세요!
          </Text>
          <HStack w="90%" mt="80px">
            <VStack w="45%" mt={8}>
              <Box
                w="100%"
                h="300px"
                overflow="auto"
                border="1px solid #ccc"
                p="4"
              >
                <Heading mb="5" size="md">
                  원본 스크립트
                </Heading>
                <Text>{originScript}</Text>
              </Box>
              <Box
                w="100%"
                h="300px"
                overflow="auto"
                border="1px solid #ccc"
                p="4"
              >
                <Heading mb="5" size="md">
                  수정 스크립트
                </Heading>
                <Text>{modifiedScript}</Text>
              </Box>
            </VStack>
            <Box w="5%"></Box>

            <Box
              w="45%"
              h="608px"
              overflow="auto"
              border="1px solid #ccc"
              p="4"
              mt={8}
            >
              <Heading mb="5" size="md">
                원본 스크립트 수정하기
              </Heading>
              {charecters.map((charecter: ICharecter) => (
                <Button
                  key={charecter?.start_time}
                  colorScheme={
                    parseFloat(charecter.alternatives[0].confidence) <= 0.8 &&
                    charecter.type === "pronunciation"
                      ? "red"
                      : Array.from(words).some((word) =>
                          charecter.alternatives[0].content.includes(word)
                        )
                      ? "teal"
                      : "gray"
                  }
                  m={0.5}
                  p={1}
                  onClick={() => handleEditClick(charecter)}
                >
                  {charecter.alternatives[0].content}
                </Button>
              ))}
              <Modal
                isOpen={editingCharecter !== null}
                onClose={handleCloseModal}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>수정하기</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Input
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      placeholder="수정할 내용 입력"
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="teal" onClick={handleSaveClick}>
                      저장하기
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
          </HStack>
          <Button
            colorScheme="facebook"
            mt="150px"
            size="lg"
            w="50%"
            h="70px"
            fontSize="2xl"
            onClick={handleReceiveFinalScript} // '최종 스크립트 받기' 버튼 클릭 시 이벤트 처리
          >
            최종 스크립트 받기
          </Button>
        </VStack>
      ) : (
        <>
          <Box
            pb={40}
            mt={10}
            px={{
              base: 10,
              lg: 40,
            }}
          >
            <Container>
              <Heading textAlign={"center"}>Upload File</Heading>
              <Text mt={5} fontSize={14} textAlign={"center"}>
                가능한 파일 유형을 확인하세요!
              </Text>
              <Text fontSize={14} textAlign={"center"}>
                [ mp3, mp4, wav, flac, amr, ogg, webm ]
              </Text>

              <VStack
                as="form"
                onSubmit={handleSubmit(onSubmit)}
                spacing={5}
                mt={10}
              >
                <FormControl>
                  <Input
                    {...register("file")}
                    type="file"
                    accept=".mp3, .mp4, .wav, .flac, .amr, .ogg, .webm"
                    required
                  />
                </FormControl>
                <FormControl>
                  <Input
                    {...register("title")}
                    type="text"
                    placeholder="Script Title"
                    required
                  />
                </FormControl>
                <VStack>
                  <GridItem fontStyle={"italic"}>중요 단어 리스트</GridItem>
                  <Box>
                    {Array.from(words)?.map((word: string) => (
                      <Button
                        key={word}
                        value={word}
                        onClick={() => removeWord(word)}
                        m={2}
                      >
                        {word}
                      </Button>
                    ))}
                  </Box>
                  <FormControl>
                    <HStack>
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        type="text"
                        placeholder="단어를 입력하세요."
                      />
                      <Button onClick={addWord} colorScheme="teal">
                        추가
                      </Button>
                    </HStack>
                  </FormControl>
                </VStack>
                <Button
                  isLoading={uploadAudioMutation.isLoading}
                  type="submit"
                  w="full"
                  colorScheme={"teal"}
                  mt="10"
                >
                  Submit
                </Button>
              </VStack>
            </Container>
          </Box>
        </>
      )}
      <Box h="200px"></Box>
    </ProtectedPage>
  );
}

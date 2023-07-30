import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  useToast,
  VStack,
  Text,
  useBoolean,
  useQuery,
  HStack,
  Highlight,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { uploadAudio } from "../api";
import ProtectedPage from "../components/ProtectedPage";

//   import { createPhoto, getUploadURL, uploadImage } from "../api";
//   import ProtectedPage from "../components/ProtectedPage";
//   import ViewPhoto from "../components/ViewPhoto";
//   import { Helmet } from "react-helmet";

interface IForm {
  file: FileList;
  title: string;
  myWords: string;
}

interface IUploadURLResponse {
  id: string;
  uploadURL: string;
}

interface IScriptInfo {
  origin_script: string;
  modified_script: string;
  charecters: Array<ICharecter>;
  audio_pk: number;
  audio_src: string;
}

interface ICharecter {
  start_time: string;
  end_time: string;
  alternatives: Array<IAlternative>;
  type: string;
}

interface IAlternative {
  confidence: string;
  content: string;
}

export default function CreateScript() {
  const { register, handleSubmit, watch, reset } = useForm<IForm>();

  const { userPk } = useParams();
  const toast = useToast();
  const [words, setWords] = useState<Set<string>>(new Set()); // 단어 배열 상태 초기화
  const [inputValue, setInputValue] = useState<string>(""); // 입력 상자의 상태 초기화
  const [flag, setFlag] = useState(false);
  const [originScript, setOriginScript] = useState<string>("");
  const [modifiedScript, setModifiedScript] = useState<string>("");
  const [charecters, setCharecters] = useState<ICharecter[]>([]);

  // 단어 추가 함수
  const addWord = () => {
    if (inputValue.trim() !== "") {
      setWords((prevWords) => new Set(prevWords).add(inputValue.trim())); // 기존 Set에 새로운 단어 추가
      setInputValue(""); // 입력 상자 초기화
    }
  };

  const uploadAudioMutation = useMutation(uploadAudio, {
    onSuccess: (result: any) => {
      setOriginScript(result.origin_script);
      setModifiedScript(result.modified_script);
      setCharecters(result.charecters);
      setFlag(true);
      console.log(result.charecters);
    },
  });

  const onSubmit = (data: IForm) => {
    const wordsArray = Array.from(words);
    const myWordJson = JSON.stringify(wordsArray);
    data.myWords = myWordJson;
    const { file, title, myWords } = data;

    uploadAudioMutation.mutate({ file, title, myWords });
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
  return (
    <ProtectedPage>
      {/* <Helmet>
            <title>Get Blur Image</title>
          </Helmet> */}

      {/* {createPhotoMutation.isSuccess ? ( */}
      {flag ? (
        //   <ViewPhoto imageUrl={imageUrl} />
        <>
          <HStack
            my={20}
            mx={10}
            spacing={10}
            fontStyle="italic"
            alignItems="center"
          >
            <Box
              w="800px"
              h="600px"
              overflow="auto"
              border="1px solid #ccc"
              p="4"
            >
              <Heading mb="5" size="md">
                원본 스크립트
              </Heading>
              <Highlight
                query={""}
                styles={{ px: "2", py: "1", rounded: "full", bg: "red.100" }}
              >
                {originScript}
              </Highlight>
            </Box>
            <Box
              w="800px"
              h="600px"
              overflow="auto"
              border="1px solid #ccc"
              p="4"
            >
              <Heading mb="5" size="md">
                수정 스크립트
              </Heading>
              <Highlight
                query={"이미지"}
                styles={{ px: "2", py: "1", rounded: "full", bg: "red.100" }}
              >
                {modifiedScript}
              </Highlight>
            </Box>
          </HStack>
          <VStack>
            <Heading alignContent="center">추가 수정하기</Heading>
            <Text mt={6}>
              빨간색은 정확도가 낮게 나온 단어, 초록색은 중요 단어 리스트의
              단어입니다.
            </Text>
            <Text>
              단어를 클릭하면 오디오 재생 및 수정을 할 수 있습니다. 수정 후
              제대로 된 스크립트를 받아보세요!
            </Text>
            <Box
              w="800px"
              h="600px"
              overflow="auto"
              border="1px solid #ccc"
              p="4"
            >
              <Heading mb="5" size="md">
                수정 스크립트
              </Heading>
              {charecters.map((charecter: ICharecter) => (
                <Button
                  key={charecter.start_time}
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
          </VStack>
        </>
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
    </ProtectedPage>
  );
}

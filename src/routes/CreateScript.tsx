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
  const [flag, setFlag] = useState(false);
  const [originScript, setOriginScript] = useState("");
  const [modifiedScript, setModifiedScript] = useState("");
  const [charecters, setCharecters] = useState<any>({});

  // const createPhotoMutation = useMutation(createPhoto, {
  //   onSuccess: (data) => {
  //     toast({
  //       status: "success",
  //       title: "Image uploaded",
  //       isClosable: true,
  //       position: "bottom-right",
  //     });
  //   },
  // });
  const uploadAudioMutation = useMutation(uploadAudio, {
    onSuccess: (result: any) => {
      setOriginScript(result.origin_script);
      setModifiedScript(result.modified_script);
      setCharecters(result.charecters);
      setFlag(true);
      // if (userPk) {
      //   setImageUrl(`${result.variants[0]}`);
      //   createPhotoMutation.mutate({
      //     description: "from react",
      //     file: `https://imagedelivery.net/QuZC_XPqQ0puEDGDCfsphg/${result.id}/public`,
      //     userPk,
      //   });
      // }
    },
  });
  // const uploadURLMutation = useMutation(getUploadURL, {
  //   onSuccess: (data: IUploadURLResponse) => {
  //     uploadImageMutation.mutate({
  //       uploadURL: data.uploadURL,
  //       file: watch("file"),
  //     });
  //   },
  // });
  const onSubmit = (data: IForm) => {
    const { file, title } = data;
    uploadAudioMutation.mutate({ file, title });
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
          <HStack my={20} mx={10} spacing={10} fontStyle="italic">
            <Box
              w="800px"
              h="600px"
              overflow="auto"
              border="1px solid #ccc"
              p="4"
            >
              <Heading size="md">원본 스크립트</Heading>
              <Text mt="5">{originScript}</Text>
            </Box>
            <Box
              w="800px"
              h="600px"
              overflow="auto"
              border="1px solid #ccc"
              p="4"
            >
              <Heading size="md">수정 스크립트</Heading>
              <Text mt="5">{modifiedScript}</Text>
            </Box>
          </HStack>
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
                <Button
                  isLoading={uploadAudioMutation.isLoading}
                  type="submit"
                  w="full"
                  colorScheme={"teal"}
                >
                  Upload File
                </Button>
              </VStack>
            </Container>
          </Box>
        </>
      )}
    </ProtectedPage>
  );
}

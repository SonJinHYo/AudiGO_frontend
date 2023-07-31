import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getMyScripts } from "../api";
import { IAudio, IUserData } from "../types";

export default function MyInfo() {
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [selectedAudio, setSelectedAudio] = useState<IAudio | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  useEffect(() => {
    // API 호출하여 데이터 가져오기
    getMyScripts()
      .then((data) => {
        setUserData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // 모달 열기 함수
  const handleOpenModal = (audio: IAudio) => {
    setSelectedAudio(audio);
    setIsModalOpen(true);
  };
  // 모달 닫기 함수
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <VStack w="100%">
      <Heading my={10}>My Script List</Heading>
      <SimpleGrid
        w="80%"
        m={8}
        spacing={10}
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      >
        {userData?.audios?.map((audio) => (
          <Card>
            <CardHeader>
              <Heading size="md"> {audio.script_title}</Heading>
            </CardHeader>
            <CardBody overflow="auto">
              <Text>
                {audio.modified_script.length > 100
                  ? `${audio.modified_script.slice(0, 97)}...`
                  : audio.modified_script}
              </Text>
            </CardBody>
            <CardFooter>
              <Button onClick={() => handleOpenModal(audio)}> View Here</Button>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent maxW="800px" p={1} mt={20} mx={3}>
          <ModalHeader>{selectedAudio?.script_title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Flex flexDir="column" flex="1" pr={4}>
                <Heading size="md" mb={4}>
                  Original Script
                </Heading>
                <Text>{selectedAudio?.origin_script}</Text>
              </Flex>
              <Flex flexDir="column" flex="1" pl={4}>
                <Heading size="md" mb={4}>
                  Modified Script
                </Heading>
                <Text>{selectedAudio?.modified_script}</Text>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
}

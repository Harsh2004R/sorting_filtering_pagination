


import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Center,
  Select,
  Text,
  Button,
  Stack,
} from "@chakra-ui/react";
import {
  Pagination,
  usePagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator
} from "@ajna/pagination";


import {
  FiArrowRight,
  FiArrowLeft,
} from 'react-icons/fi';


const Fetch_Api = async (pageSize, offset) => {
  return await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`
  ).then(async (res) => await res.json());
};

const Page = () => {
  // states
  const [pokemonsTotal, setPokemonsTotal] = useState(undefined);
  const [pokemons, setPokemons] = useState([]);

  // constants
  const outerLimit = 1;
  const innerLimit = 1;

  const {
    pages,
    pagesCount,
    offset,
    currentPage,
    setCurrentPage,
    setIsDisabled,
    isDisabled,
    pageSize,
    setPageSize
  } = usePagination({
    total: pokemonsTotal,
    limits: {
      outer: outerLimit,
      inner: innerLimit
    },
    initialState: {
      pageSize: 5,
      isDisabled: false,
      currentPage: 1
    }
  });

  useEffect(() => {
    Fetch_Api(pageSize, offset)
      .then((pokemons) => {
        setPokemonsTotal(pokemons.count);
        setPokemons(pokemons.results);
      })
      .catch((error) => console.log("App =>", error));
  }, [currentPage, pageSize, offset]);

  // handlers
  const handlePageChange = (nextPage) => {
    // -> request new data using the page number
    setCurrentPage(nextPage);
    console.log("request new data with ->", nextPage);
  };

  const handlePageSizeChange = (event) => {
    const pageSize = Number(event.target.value);

    setPageSize(pageSize);
  };

  const handleDisableClick = () => {
    setIsDisabled((oldState) => !oldState);
  };

  return (

    <>
      <Box w="100%" h="auto" bg="#000000" pt="20px" pb="20px"><Text textAlign={"center"} fontSize={{ base: "xxl", md: "25px" }} color="#69F0AE" >Pagination with Chakra Ui</Text></Box>
      <Box display={"flex"} w="100%" h={{ base: "91.5vh", md: "91vh" }} justifyContent={"center"} alignItems={"center"} bg="#000000">
        <Box w="100%" h="auto" bg="#212121" m="auto">



          <Stack p={5}
          >
            <Pagination

              pagesCount={pagesCount}
              currentPage={currentPage}
              isDisabled={isDisabled}
              onPageChange={handlePageChange}
            >
              <PaginationContainer
                // border="1px solid red"
                align="center"
                justify="space-between"
                p={1}
                w="full"
              >
                <PaginationPrevious
                  // border={"1px solid red"}
                  w={5}
                  h={5}
                  _hover={{
                    bg: "#69F0AE"
                  }}
                  bg="#fff"
                  onClick={() =>
                    console.log(
                      "Im executing my own function along with Previous component functionality"
                    )
                  }
                >
                  <FiArrowLeft fontSize={"lg"} />
                </PaginationPrevious>
                <PaginationPageGroup
                  // border={"1px solid red"}

                  isInline
                  align="center"
                  separator={
                    <PaginationSeparator
                      // border={"1px solid yellow"}
                      onClick={() =>
                        console.log(
                          "Im executing my own function along with Separator component functionality"
                        )
                      }
                      bg="blue.300"
                      fontSize="sm"
                      w={5}
                      h={5}
                      jumpSize={11}
                    />
                  }
                >
                  {pages.map((page) => (
                    <PaginationPage
                      //  border={"1px solid red"}
                      w={5}
                      h={5}
                      bg="red.300"
                      key={`pagination_page_${page}`}
                      page={page}
                      onClick={() =>
                        console.log(
                          "Im executing my own function along with Page component functionality"
                        )
                      }
                      fontSize="sm"
                      _hover={{
                        bg: "green.300"
                      }}
                      _current={{
                        bg: "green.300",
                        fontSize: "sm",
                        w: 6
                      }}
                    />
                  ))}
                </PaginationPageGroup>
                <PaginationNext
                  w={5}
                  h={5}
                  _hover={{
                    bg: "#69F0AE"
                  }}
                  bg="#fff"
                  onClick={() =>
                    console.log(
                      "Im executing my own function along with Next component functionality"
                    )
                  }
                >
                  <FiArrowRight fontSize={"lg"} />
                </PaginationNext>
              </PaginationContainer>
            </Pagination>
            <Center m="auto" w={{ base: "70%", md: "25%" }}>
              <Button
                w={{ base: "55%", md: "45%" }}
                _hover={{
                  bg: "#abb8c3"
                }}

                bg="#69F0AE"
                onClick={handleDisableClick}
                fontSize={{ base: "12px", md: "14px" }}
              >
                Disable ON/OFF
              </Button>
              <Select ml={3} color="#abb8c3" onChange={handlePageSizeChange} w={40}>
                <option value="10" >10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </Select>
            </Center>
            <Grid
              gap={3}
              mt={20}
              px={{ base: "0%", md: "20%" }}
              templateColumns="repeat(5, 1fr)"
              templateRows="repeat(2, 1fr)"
            >
              {pokemons?.map(({ name }) => (
                <Center key={name} bg="blue.200" fontSize={{ base: "10px", md: "lg" }} w={{ base: "50px", md: "100px" }} m="auto" >
                  <Text>{name}</Text>
                </Center>
              ))}
            </Grid>
          </Stack>


        </Box>
      </Box>
    </>
  );
};
export default Page;
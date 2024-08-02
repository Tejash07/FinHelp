import React from 'react';
import LeftDrawer from '../ProfilePage/LeftDrawer';
import RightBarFaq from './RightBarFaq';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Flex,
  chakra,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

const FaqItem = ({ question, answer }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.post('https://finhelpbackend.onrender.com/api/v1/user/authcheck' , {
          token: localStorage.getItem("token"),
        });
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          navigate('/login');
        }
      } catch (error) {

        console.log("catch block" , error);
        
      }
    };
    checkAuth();
  }, [navigate]);

  if (!isAuthenticated) {
    return null; 
  }
  return (
    <AccordionItem
      borderColor="gray.200"
      _dark={{
        borderColor: 'gray.700',
      }}
    >
      {({ isExpanded }) => (
        <>
          <AccordionButton>
            <Box flex="1" textAlign="left" ml={0}>
              <Flex alignItems="center" minH={12}>
                <Box ml={0}>
                  <chakra.dt
                    fontSize="lg"
                    fontWeight="medium"
                    lineHeight="6"
                    color="white"
                    _dark={{
                      color: 'white',
                    }}
                  >
                    {question}
                  </chakra.dt>
                </Box>
              </Flex>
            </Box>
            {isExpanded ? (
              <MinusIcon
                fontSize="12px"
                color="white"
                _dark={{
                  color: 'white',
                }}
              />
            ) : (
              <AddIcon
                fontSize="12px"
                color="white"
                _dark={{
                  color: 'white',
                }}
              />
            )}
          </AccordionButton>
          <AccordionPanel pb={4}>
            <chakra.dd
              mt={2}
              color="white"
              _dark={{
                color: 'gray.300',
              }}
            >
              {answer}
            </chakra.dd>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};

const FaqPage = () => {
  const textColor = useColorModeValue('gray.900', 'gray.100');

  return (
    <div className="min-h-screen bg-[#13161F] flex overflow-hidden">
      <div className="w-1/5"> 
        <LeftDrawer />
      </div>
      <div className="w-3/5 flex flex-col justify-center items-center px-4 overflow-hidden">
        <Flex
          bg="#1B2030"
          _dark={{
            bg: 'gray.600',
          }}
          justifyContent="center"
          alignItems="center"
          height="80vh"
          width="100%"
          py={5}
          overflow="hidden"
        >
          <Box
            bg={'#1B2030'}
            _dark={{
              bg: 'gray.900',
            }}
            rounded="xl"
            shadow="base"
            w="100%"
            p={6}
            maxW="7xl"
            h="100%"
            overflowY="auto"
          >
            <Box textAlign="center">
              <chakra.h2
                mt={2}
                fontSize={{
                  base: '3xl',
                  sm: '4xl',
                }}
                lineHeight="8"
                fontWeight="extrabold"
                letterSpacing="tight"
                color="white"
                _dark={{
                  color: 'gray.100',
                }}
              >
                Frequently Asked Questions
              </chakra.h2>
              <chakra.p
                mt={4}
                maxW="2xl"
                fontSize="xl"
                mx="auto"
                color="white"
                _dark={{
                  color: 'gray.300',
                }}
              >
                Unlocking Financial Clarity: Navigate Your Stock Queries Here!
              </chakra.p>
            </Box>

            <Box mt={8}>
              <Accordion allowMultiple>
                <FaqItem
                  question="Does FINCALCI guarantee the stated returns on my investment?"
                  answer="Our platform leverages historical data of specific stocks, analyzing their past performance and behaviors within given time periods. While this approach provides valuable insights, it is important to note that it is not infallible and cannot guarantee future stock behavior predictions. The inherent volatility and myriad influencing factors in the stock market mean that predictions based solely on historical data can only offer a limited perspective. Therefore, users should exercise caution and consider multiple factors when making investment decisions, as past performance is not always indicative of future results. 
                  "
                />
                <FaqItem
                  question="Why I am not able to see live Stock price and chart of NSE."
                  answer="Currently, we provide live stock prices and charts for the NYSE, NASDAQ, and DJI. We are actively working on expanding our services to include data for the NSE. "
                />
                <FaqItem
                  question="How can I contact customer support?"
                  answer="You can contact our customer support team via email at tejashpati2003@gmail.com or call us at (123) 456-7890. Our support team is available Monday through Friday, 9 AM to 6 PM."
                />
                <FaqItem
                  question="Are there any hidden charges?"
                  answer="No,there is no hidden charges. It's absolutely free of cost. "
                />
                
                <FaqItem
                  question="How do I cancel my account?"
                  answer="You can cancel your account by contacting customer support. Our customer support team is available to assist you with the cancellation process, provide necessary information on data retention, and ensure that your exit is as smooth as possible."
                />
              </Accordion>
              <Box mt={6} textAlign="center">
                <Text
                  fontSize="lg"
                  color="white"
                  _dark={{
                    color: 'gray.400',
                  }}
                  mb={2}
                >
                  Have more questions?
                </Text>
                <Link
                  href="mailto:tejash.pati2003@gmail.com"
                  isExternal
                  fontSize="lg"
                  color="yellow"
                  textDecoration="underline"
                  _dark={{
                    color: 'white',
                  }}
                  fontWeight="medium"
                  _hover={{
                    color:"#60B0E5"
                  }}
                >
                  Write to us!
                </Link>
              </Box>
            </Box>
          </Box>
        </Flex>
      </div>
      <div className="absolute top-0 right-0 -mt-6"> 
        <RightBarFaq />
      </div>
    </div>
  );
};

export default FaqPage;

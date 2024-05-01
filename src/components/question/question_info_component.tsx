import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Form } from '../../styles/CreateQuestion';
import VideoThumbnail from "../public/url_to_image";
import { NextTo, Prev, Question, VideoThumbnailContainer } from '../../styles/QuestionInfo';
import { QuestionContainer } from "../../styles/QuestionInfo";
import { ListContainer, SliderContainer, TextContainer } from "../../styles/Public";
import { FaArrowAltCircleLeft,  FaArrowAltCircleRight,  FaChevronRight } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

// QuestionComponent의 props에 대한 타입 정의
interface QuestionComponentProps {
    videoUrl: string;
    quizSetId:string | undefined;
}

interface Choice {
    choiceId: number;
    content: string;
}

interface Question_ {
    choice: Choice[];
    commentary:string;
    instruction:string;
    popupTime:string;
}


// 옵션 객체에 대한 타입 정의

// React component for displaying questions
const QuestionInfoComponent = ({ videoUrl, quizSetId }: QuestionComponentProps) => {

    const [data, setData] = useState<Question_[] | undefined>(undefined);
    useEffect(() => {
        function deleteCookie(name:string){
          document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
        const fetchData = async () => {

          
          try {
            //192.168.0.143
            const response = await axios.get(`http://localhost:3000/api/quizsets/${quizSetId}/quizzes?commentary=${true}&answer=${false}`, {
              headers: {
                'Authorization': `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")}`
              },
            });
  
            deleteCookie('token');
            document.cookie = `token=${response.data.token}; expires=${response.data.expire}`;
            console.log(response);
            setData(response.data);

          } catch (error) {
            console.error('Error:', error);
          }
        };
  
        fetchData();
      }, [quizSetId]);





    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const goToNext = () => {
        const nextIndex = currentImageIndex === 0?
        (data ? data.length - 1 : 0 ) : currentImageIndex + 1;
        setCurrentImageIndex(nextIndex);
    };

    const goToPrev = () => {
        const prevIndex = currentImageIndex === 0 ? 
            (data ? data.length - 1 : 0) : currentImageIndex - 1;
        setCurrentImageIndex(prevIndex);
    };

    // const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) =>(
    //     <span {...props}>{children}</span>
    //   );
    const settings = {
        dots: true,
        infinite: data && data.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: 			//오른쪽 화살표
        // <SlickButtonFix>
          <NextTo />
        // {/* </SlickButtonFix> */}
        ,
        prevArrow: 			//왼쪽 화살표
            // <SlickButtonFix>
            <Prev />
            // </SlickButtonFix>
        
    };
    return (
        <Form>
            <SliderContainer>
                <VideoThumbnailContainer>
                    <VideoThumbnail imageUrl={videoUrl} />
                </VideoThumbnailContainer>
                
                <Slider {...settings}> 
                
                {data && data.map((question, index) => (
                <QuestionContainer key={index}>
                    <TextContainer>시간: {question.popupTime}</TextContainer>
                    <TextContainer>문제: {question.commentary}</TextContainer>
                    <Question key={index}>
                        {question && question.choice && question.choice.map((choice, choiceIndex) => (
                            <TextContainer key={choiceIndex}>{choice.content}</TextContainer>
                        ))}
                    </Question>
                </QuestionContainer>
            ))}
                </Slider>

                {/* Custom arrows
                <LeftArrow onClick={goToPrev}><FaArrowAltCircleLeft /></LeftArrow>
                <RightArrow onClick={goToNext}><FaArrowAltCircleRight /></RightArrow> */}
            </SliderContainer>
        </Form>
    );
};

export default QuestionInfoComponent;

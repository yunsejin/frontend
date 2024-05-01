import React, { useEffect, useState } from 'react';
import { Content, NavContainer, PageBackGround, PageFooter  } from '../styles/Public';
import NavBar from '../components/public/navbar_default'
import SidebarOptions from '../components/board/select_option';
import WorkbookCard from '../components/board/workbook_card';
import axios from 'axios';
import Pagination from '../components/board/pagenation';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Card {
  createdAt: string;
  memberNickname: string;
  quizSetTitle: string;
  quizSetId: number;
  recommendationCount: number;
  subLectureTitle: string;
  subLectureUrl:string;
}


const WorkBook: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    // oauth extention
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    

    
    
        useEffect(() => {
          function deleteCookie(name:string){
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          }
          const fetchData = async () => {

            
            try {
              //192.168.0.143
              const response = await axios.get('http://localhost:3000/api/quizsets/', {
                headers: {
                  'Authorization': `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")}`
                },
              });
  
              deleteCookie('token'); 
              document.cookie = `token=${response.data.token}; expires=${response.data.expire}`;
    
              setCards(response.data)
            } catch (error) {
              console.error('Error:', error);
            }
          };
    
          fetchData();
        }, [navigate]);
      // response 데이터를 잘 가져와서 아래의 const에 넣어야됨.
        const currentItems = cards.slice(indexOfFirstItem, indexOfLastItem);
        const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
        const renderWorkbookCards = () => {
          return currentItems.map((card, index) => (
            <WorkbookCard
            key={index}
            createdAt={card.createdAt}
            memberNickname={card.memberNickname}
            quizSetTitle={card.quizSetTitle}
            quizSetId={card.quizSetId}
            recommendationCount={card.recommendationCount}
            subLectureTitle={card.subLectureTitle}
            subLectureUrl={card.subLectureUrl}
            />
          )); 
        }

  return (
    
    <>
    <NavBar /> 
    <NavContainer>
    </NavContainer>
    <PageBackGround>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <SidebarOptions/> 
      <Content>
        {renderWorkbookCards()}
      </Content>
      </motion.div>
      <PageFooter>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={cards.length}
          paginate={paginate}
          currentPage={currentPage}
        />
</PageFooter>
</PageBackGround>
    </>
  );
};

export default WorkBook;
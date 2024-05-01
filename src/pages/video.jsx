
import NavBar_main_jsx from '../components/public/navbar_main_jsx';
import {Mission1} from '../components/video/Mission1';
import "../styles/css/video.css"
import React, {useEffect} from 'react';


const Video = () => {   

  useEffect(() => {
    // 컴포넌트가 마운트된 후 실행될 코드
    Mission1();

    console.log('컴포넌트가 마운트되었습니다.');
    const video_box = document.querySelector('#video_box');
    const containers = document.querySelector('#containers');
    video_box.appendChild(containers);

    const webcamButton = document.querySelector('#webcamButton');
    const video_footer = document.querySelector('#video_footer');
    video_footer.appendChild(webcamButton);

    // 선택적으로 컴포넌트가 언마운트될 때 실행될 코드를 반환할 수 있습니다.
    return () => {
      console.log('컴포넌트가 언마운트되었습니다.');
    }
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행됨

   
  return (
    
    <>
    <NavBar_main_jsx></NavBar_main_jsx>
    <div id = "container">
      <div id="nav_copy">네비게이션 높이만큼 밀어내기용</div>

          <div id="align">
            <div id='title'>제목</div>
            <div id='video_box'></div>
            <div id="video_footer">비디오정보
            </div>
          </div>

      </div>

    </>
  )

 

}

export default Video;
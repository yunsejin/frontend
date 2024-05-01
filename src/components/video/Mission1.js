import vision from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";
export function Mission1(){
        const { FaceLandmarker, FilesetResolver} = vision;
        let faceLandmarker;
        let runningMode = "IMAGE";
        let enableWebcamButton;
        let webcamRunning = false;
        const videoWidth = 300;
        async function createFaceLandmarker() {
            const filesetResolver = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm");
            faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
                baseOptions: {
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
                    delegate: "GPU"
                },
                outputFaceBlendshapes: true,
                runningMode,
                numFaces: 1
            });
        }
        createFaceLandmarker();
        // HTML 요소를 동적으로 생성하는 함수
        function createHTMLElements() {
            const body = document.body;
            // 버튼 생성
            const webcamButton = document.createElement('button');
            webcamButton.id = 'webcamButton';
            webcamButton.innerText = 'ENABLE WEBCAM';
            body.appendChild(webcamButton);
            // 비디오와 캔버스를 포함할 div 생성
            const container = document.createElement('div');
            container.id = 'containers';
    
            body.appendChild(container);

            
            // 비디오 요소 생성
            const video = document.createElement('video');
            video.id = 'webcam';
            video.autoplay = true;
            video.playsInline = true; // iOS에서 인라인 재생을 위한 속성
            container.appendChild(video);
            // 캔버스 요소 생성
            const canvas = document.createElement('canvas');
            canvas.id = 'output_canvas';

            // container.appendChild(canvas);
            return { webcamButton, video, canvas };
        }
        const { webcamButton, video, canvas } = createHTMLElements();
        const canvasElement = canvas;
        const canvasCtx = canvasElement.getContext('2d');
        enableWebcamButton = webcamButton; // 이전에 정의한 enableWebcamButton 변수를 업데이트합니다.
        function hasGetUserMedia() {
            return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
        }
        if (hasGetUserMedia()) {
            enableWebcamButton.addEventListener('click', enableCam);
        } else {
            console.warn('getUserMedia() is not supported by your browser');
        }
        function enableCam(event) {
            if (!faceLandmarker) {
                console.log("Wait! faceLandmarker not loaded yet.");
                return;
            }
            if (webcamRunning === true) {
                webcamRunning = false;
                enableWebcamButton.innerText = "ENABLE PREDICTIONS";
            }
            else {
                webcamRunning = true;
                enableWebcamButton.innerText = "DISABLE PREDICTIONS";
            }
            const constraints = {
                video: true
            };
            navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
                video.srcObject = stream;
                video.addEventListener("loadeddata", predictWebcam);
            });
        }
        let lastVideoTime = -1;
        let results = undefined;
        async function predictWebcam() {
            // video.style.width = '100px';
            // video.style.height = '100px';
            

            if (runningMode === "IMAGE") {
                runningMode = "VIDEO";
                await faceLandmarker.setOptions({ runningMode: runningMode });
            }
            let startTimeMs = performance.now();

            // 비디오 프레임 연속 촬영 
            if (lastVideoTime !== video.currentTime) {
                lastVideoTime = video.currentTime;
                results = faceLandmarker.detectForVideo(video, startTimeMs);
            }
            if (webcamRunning === true) {
                window.requestAnimationFrame(predictWebcam);
                checkBlinks(results.faceBlendshapes);
            }
        }
        // 전역 변수 설정
        let isSleeping = false; // 현재 자고 있는지 여부
        let sleepStart = null; // 자기 시작한 시간
        let sleepDuration = 0; // 잔 시간
        let sleepCount = 0; // 잔 횟수
        let faceNotRecognizedStart = null; // 얼굴 인식이 안될 때 시작 시간
        function checkBlinks(blendShapes) {
            const currentTime = new Date();
            // 얼굴 인식이 안되는 경우
            if (!blendShapes[0]){
                if (faceNotRecognizedStart === null) {
                    faceNotRecognizedStart = currentTime;
                }
                // 얼굴 인식이 실패한 시간 계산
                const faceNotRecognizedDuration = (currentTime - faceNotRecognizedStart) / 1000;
                // 얼굴 인식이 안되고 2초 이상 지났을 때
                    if (isSleeping){
                        console.log('졸다가 인식 안됨');
                    } else {
                        console.log('자리이탈');
                    }
                return;
            }
            // 얼굴 인식이 되는 경우, 얼굴 인식이 안됐던 시간 초기화
            faceNotRecognizedStart = null;
            // 얼굴 인식이 되는 경우
            if (blendShapes[0].categories[9].score > 0.4500 && blendShapes[0].categories[10].score > 0.4500) {
                // 눈을 감았을 경우
                if (!isSleeping) {
                    // 자는 상태가 아니라면 자는 상태로 변경하고 현재 시간 기록
                    isSleeping = true;
                    sleepStart = currentTime;
                    console.log('눈감음');
                }
            } else {
                // 눈을 뜬 경우
                if (isSleeping) {
                    // 이전에 눈을 감았다가 지금 눈을 뜬 경우
                    sleepDuration = (currentTime - sleepStart) / 1000;
                    if (sleepDuration >= 3) {
                        // 3초 이상 눈을 감았다면, 잔 것으로 간주
                console.log(`자기 시작한 시간: ${sleepStart.toLocaleTimeString()}, 깬 시간: ${currentTime.toLocaleTimeString()}`);
                sleepCount++;
                console.log(`잔 횟수: ${sleepCount}`);
            }
            isSleeping = false;
        }
    }

}
return <></>
}

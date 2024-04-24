// Account.tsx
import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId = "YOUR_CLIENT_ID.apps.googleusercontent.com"; // 구글 클라이언트 ID

const Account: React.FC = () => {
  const onSuccess = (response: any) => {
    console.log('로그인 성공:', response.profileObj); // 로그인 성공시 호출
  };

  const onFailure = (response: any) => {
    console.error('로그인 실패:', response); // 로그인 실패시 호출
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
};

export default Account;

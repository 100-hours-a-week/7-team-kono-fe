import kakaoLogin from '../assets/images/kakao_login_medium_narrow.png';
import konoLogo from '../assets/kono_logo.svg';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={konoLogo} alt="kono logo" className="w-64 mb-0" />
      <p className="text-center text-sm mt-0">
        코인 놀이터 <strong>코노</strong>에서 실전 감각을 키워보세요!
      </p>
      <button>
        <img src={kakaoLogin} alt="kakao login" className="w-48 mt-32" />
      </button>
    </div>
  );
};

export default Login;

import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">페이지를 찾을 수 없습니다</p>
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium"
          onClick={() => navigate('/')}
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}

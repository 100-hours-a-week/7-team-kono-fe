import { useState } from 'react';
import Header from '../components/layout/Header';

interface User {
  id: number;
  name: string;
  profileCoin: string;
  profitRate: number;
  rank: number;
}

type RankingPeriod = '일간' | '전체';

export default function Ranking() {
  const [activePeriod, setActivePeriod] = useState<RankingPeriod>('일간');

  // 코인 심볼 목록 (프로필 이미지용)
  const coinSymbols = [
    'BTC',
    'ETH',
    'XRP',
    'ADA',
    'SOL',
    'DOGE',
    'DOT',
    'AVAX',
    'MATIC',
    'LINK',
  ];

  // 랭킹 유저 목 데이터
  const [users] = useState<User[]>([
    {
      id: 1,
      name: '비트코인왕',
      profileCoin: coinSymbols[0],
      profitRate: 32.12,
      rank: 1,
    },
    {
      id: 2,
      name: '이더리움마스터',
      profileCoin: coinSymbols[1],
      profitRate: 27.54,
      rank: 2,
    },
    {
      id: 3,
      name: '알트코인헌터',
      profileCoin: coinSymbols[2],
      profitRate: 21.89,
      rank: 3,
    },
    {
      id: 4,
      name: '코인고래',
      profileCoin: coinSymbols[3],
      profitRate: 19.32,
      rank: 4,
    },
    {
      id: 5,
      name: '다이아몬드핸즈',
      profileCoin: coinSymbols[4],
      profitRate: 17.45,
      rank: 5,
    },
    {
      id: 6,
      name: '투더문',
      profileCoin: coinSymbols[5],
      profitRate: 15.21,
      rank: 6,
    },
    {
      id: 7,
      name: '홀더맨',
      profileCoin: coinSymbols[6],
      profitRate: 13.76,
      rank: 7,
    },
    {
      id: 8,
      name: '트레이더김',
      profileCoin: coinSymbols[7],
      profitRate: 12.43,
      rank: 8,
    },
    {
      id: 9,
      name: '코인박사',
      profileCoin: coinSymbols[8],
      profitRate: 11.87,
      rank: 9,
    },
    {
      id: 10,
      name: '블록체인러버',
      profileCoin: coinSymbols[9],
      profitRate: 9.65,
      rank: 10,
    },
    {
      id: 11,
      name: '나',
      profileCoin: coinSymbols[2],
      profitRate: 4.32,
      rank: 87,
    },
  ]);

  // 상위 3명과 나머지 유저 분리
  const topUsers = users.filter((user) => user.rank <= 3);
  const otherUsers = users.filter((user) => user.rank > 3);

  // 내 랭킹 찾기
  const myRanking = users.find((user) => user.name === '나');

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="랭킹" />

      {/* 기간 선택 탭 */}
      <div className="mx-4 flex border-b bg-white sticky top-0 z-10 rounded-t-xl dark:bg-gray-800 dark:text-white dark:border-gray-700">
        {(['일간', '전체'] as RankingPeriod[]).map((period) => (
          <button
            key={period}
            className={`flex-1 py-3 text-center ${
              activePeriod === period
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-500'
            }`}
            onClick={() => setActivePeriod(period)}
          >
            {period}
          </button>
        ))}
      </div>

      {/* 상위 3명 */}
      <div className="bg-white p-4 py-6 rounded-b-xl mb-2 dark:bg-gray-800 dark:text-white mx-4">
        <div className="flex justify-around items-end">
          {/* 2등 */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={`https://static.upbit.com/logos/${topUsers[1]?.profileCoin}.png`}
                alt={topUsers[1]?.name}
                className="w-16 h-16 rounded-full border-2 border-gray-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://via.placeholder.com/64';
                }}
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold">
                2
              </div>
            </div>
            <div className="mt-2 font-medium">{topUsers[1]?.name}</div>
            <div className="text-red-500">
              +{topUsers[1]?.profitRate.toFixed(2)}%
            </div>
          </div>

          {/* 1등 */}
          <div className="flex flex-col items-center -mt-4 ">
            <div className="relative">
              <img
                src={`https://static.upbit.com/logos/${topUsers[0]?.profileCoin}.png`}
                alt={topUsers[0]?.name}
                className="w-20 h-20 rounded-full border-2 border-yellow-400"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://via.placeholder.com/80';
                }}
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-lg font-bold">
                1
              </div>
            </div>
            <div className="mt-2 font-medium">{topUsers[0]?.name}</div>
            <div className="text-red-500">
              +{topUsers[0]?.profitRate.toFixed(2)}%
            </div>
          </div>

          {/* 3등 */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={`https://static.upbit.com/logos/${topUsers[2]?.profileCoin}.png`}
                alt={topUsers[2]?.name}
                className="w-16 h-16 rounded-full border-2 border-orange-400"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://via.placeholder.com/64';
                }}
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-lg font-bold">
                3
              </div>
            </div>
            <div className="mt-2 font-medium">{topUsers[2]?.name}</div>
            <div className="text-red-500">
              +{topUsers[2]?.profitRate.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>

      {/* 랭킹 기간 정보 */}
      <div className="bg-white p-4 border-b rounded-t-xl dark:bg-gray-800 dark:text-white mx-4 dark:border-gray-600">
        <div className="text-gray-500 text-sm dark:text-gray-400">
          {activePeriod === '일간' && '2025년 3월 17일 기준'}
          {activePeriod === '전체' && '가입일부터 현재까지'}
        </div>
      </div>

      {/* 나머지 랭킹 */}
      <div className="flex-1 bg-white rounded-b-xl dark:bg-gray-800 dark:text-white mx-4">
        {otherUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center p-4 border-b dark:border-gray-700"
          >
            <div className="w-8 text-center font-bold mr-4">{user.rank}</div>
            <img
              src={`https://static.upbit.com/logos/${user.profileCoin}.png`}
              alt={user.name}
              className="w-12 h-12 rounded-full mr-4"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://via.placeholder.com/48';
              }}
            />
            <div className="flex-1">
              <div className="font-medium">{user.name}</div>
            </div>
            <div className="text-red-500">+{user.profitRate.toFixed(2)}%</div>
          </div>
        ))}
      </div>

      {/* 내 랭킹 */}
      {myRanking && (
        <div className="sticky bottom-16 rounded-xl min-w-[430px] mx-auto bg-white border-t p-4 shadow-md dark:bg-gray-800 dark:text-white dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-8 text-center font-bold mr-4">
              {myRanking.rank}
            </div>
            <img
              src={`https://static.upbit.com/logos/${myRanking.profileCoin}.png`}
              alt={myRanking.name}
              className="w-12 h-12 rounded-full mr-4"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://via.placeholder.com/48';
              }}
            />
            <div className="flex-1">
              <div className="font-medium">{myRanking.name}</div>
            </div>
            <div className="text-red-500">
              +{myRanking.profitRate.toFixed(2)}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

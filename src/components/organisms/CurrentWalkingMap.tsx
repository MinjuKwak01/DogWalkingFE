import KakaoMap from '../molecules/KakaoMap';
import { CaretLeft } from '@phosphor-icons/react';
import * as S from '../../styles/organisms/CurrentWalkingMap';
import { useMutation } from 'react-query';
import { walkingStart, walkingEnd } from '../../apis/walking';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CurrentWalkingMap = () => {
  // 웹 워커 생성
  // const worker = new Worker('locationWorker.js');
  const navigate = useNavigate();
  const matchingId = 1;
  const user = 'dogOwner';
  const walkStatus = 'ACTIVATE';
  const buttonInnerText =
    walkStatus === 'ACTIVATE' ? '산책 종료하기' : '산책 시작하기';

  const { mutate: mutateWalkingStart } = useMutation({
    mutationFn: walkingStart,
  });

  const { mutate: mutateWalkingEnd } = useMutation({
    mutationFn: walkingEnd,
  });

  const onClickBackCursor = () => {
    // TODO: BackCursor 클릭시 채팅방 페이지로 이동 기능 추가
  };

  // const startLocationUpdate = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         // 웹 워커에 위치 데이터 전송
  //         sendToLocationToWorker(matchingId, latitude, longitude);
  //       },
  //       (err) => {
  //         console.error('Error getting user location:', err);
  //       },
  //     );
  //   } else {
  //     console.error('Geolocation is not supported');
  //   }
  // };

  // 산책 종료 버튼 클릭 시 clearInterval을 통해 업데이트 중지
  const stopLocationUpdate = (intervalId: any) => {
    clearInterval(intervalId);
  };

  // const sendToLocationToWorker = (
  //   matchingId: number,
  //   lat: number,
  //   lng: number,
  // ) => {
  //   worker.postMessage({
  //     matchingId,
  //     lat,
  //     lng,
  //   });
  // };

  const handleClickButton = () => {
    // let intervalId: any;
    // if (walkStatus === 'ACTIVATE') {
    //   mutateWalkingEnd(matchingId, {
    //     onSuccess: (res) => {
    //       // 산책 종료 알림 보내기
    //       alert('산책을 종료합니다!');
    //       stopLocationUpdate(intervalId);
    //       navigate('/review', {
    //         state: {
    //           memberId: res.data.response.memberId,
    //           receiveMemberId: res.data.response.receiveMemberId,
    //         },
    //       });
    //     },
    //     onError: (error: any) => {
    //       alert(error.response.message);
    //     },
    //   });
    // } else {
    //   mutateWalkingStart(matchingId, {
    //     onSuccess: () => {
    //       // 산책 시작 알림 보내기
    //       alert('산책을 시작합니다!');
    //       // 알바생이 산책 시작 버튼을 클릭하면 알바생 위치를 웹 워커를 통해 실시간 업데이트
    //       intervalId = setInterval(startLocationUpdate, 5000); // 5초마다 업데이트
    //     },
    //     onError: (error: any) => {
    //       alert(error.response.message);
    //     },
    //   });
    // }
  };

  return (
    <S.Container>
      <S.BackCursor onClick={onClickBackCursor}>
        <CaretLeft size={30} color="black" />
      </S.BackCursor>
      <KakaoMap user={user} matchingId={matchingId} />
      <S.BottomBox>
        {user === 'dogOwner' ? (
          <S.Button onClick={onClickBackCursor}>메세지 보내기</S.Button>
        ) : (
          <S.Button onClick={handleClickButton}>{buttonInnerText}</S.Button>
        )}
      </S.BottomBox>
    </S.Container>
  );
};

export default CurrentWalkingMap;
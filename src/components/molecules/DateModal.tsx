import { PropsWithChildren } from 'react';
import * as S from '../../styles/molecules/DateModal';
import { CaretLeft } from '@phosphor-icons/react';
import dayjs, { Dayjs } from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import React from 'react';

type ModalDefaultType = {
  onClickToggleModal: () => void;
  setStartEndTimes: (
    startTime: string | undefined,
    endTime: string | undefined,
  ) => void;
};

export default function DateModal({
  onClickToggleModal,
  setStartEndTimes,
}: PropsWithChildren<ModalDefaultType>) {
  const today = dayjs();
  const [startTime, setStartTime] = React.useState<Dayjs | null>(today);
  const [endTime, setEndTime] = React.useState<Dayjs | null>(today);

  const handleRegister = () => {
    const isoStartTime = startTime?.toISOString();
    const isoEndTime = endTime?.toISOString();

    if (startTime && endTime && startTime.isAfter(endTime)) {
      alert('시작 시간은 종료 시간보다 빨라야 합니다.');
      return;
    }
    setStartEndTimes(isoStartTime, isoEndTime);
    onClickToggleModal();
  };

  return (
    <S.ModalContainer>
      <S.DialogBox>
        <S.MainContainer>
          <S.TopBanner>
            <CaretLeft />
            <div>&nbsp;</div>
            <span>일정 추가</span>
          </S.TopBanner>
          <>
            <div>
              <S.StartContainer>
                <span className="title">시작 시간</span>
                <div className="date">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="산책 시작시간"
                      value={startTime}
                      onChange={(startTime) => setStartTime(startTime)}
                      disablePast
                      slotProps={{ textField: { size: 'small' } }}
                    />
                  </LocalizationProvider>
                </div>
                <div className="middle"> 부터 </div>
              </S.StartContainer>
              <S.EndContainer>
                <span className="title">종료 시간</span>
                <div className="date">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="산책 종료시간"
                      value={endTime}
                      onChange={(endTime) => setEndTime(endTime)}
                      disablePast
                      slotProps={{ textField: { size: 'small' } }}
                    />
                  </LocalizationProvider>
                </div>
                <div className="middle"> 까지 </div>
              </S.EndContainer>
            </div>
            <S.Button onClick={handleRegister}> 등록 </S.Button>
          </>
        </S.MainContainer>
      </S.DialogBox>
      <S.Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </S.ModalContainer>
  );
}

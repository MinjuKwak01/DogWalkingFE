import styled from 'styled-components';

export const Container = styled.div`
  //컨테이너 전체
  border-radius: 15px;
  cursor: pointer;
  padding: 0.7rem; // 네모칸 안쪽 여백
  margin: 1rem 0rem; // 네모칸 바깥 여백
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05); // 그림자

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonWrapper = styled.div`
  // 버튼들을 우측으로 정렬
  display: flex;
  flex-direction: column;
`;

export const AcceptButton = styled.button`
  font-size: 0.8rem;
  color: white;
  background-color: #f6ba26;
  border: none;
  border-radius: 5px;
  margin-bottom: 0.15rem; /* 버튼 사이의 간격 조절 */
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export const RejectButton = styled.button`
  font-size: 0.8rem;
  color: red;
  background-color: white;
  border: 1px solid #f6ba26;
  border-radius: 5px;
  margin-top: 0.15rem; /* 버튼 사이의 간격 조절 */
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export const ProfileImgWrapper = styled.div`
  //강아지 이미지
  margin-right: 0.6rem;
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 27px;
  margin-right: 1.1rem;
  color: black;
`;

export const InfoWrapper = styled.div`
  // 닉네임, 자격증, 경험을 묶는 div
  color: black;
`;

export const ListTitle = styled.div`
  font-size: 0.8rem;
`;

export const TextWrapper = styled.div`
  // 닉네임, 자격증, 경험 사이 간격
  line-height: 1.5rem;
`;

export const UserInfo = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

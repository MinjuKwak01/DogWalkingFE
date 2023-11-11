import { CaretLeft } from '@phosphor-icons/react';
import * as S from '../../styles/atoms/DescriptionBoxTitle';
import { useNavigate } from 'react-router-dom';

type DescriptionBoxTitleProps = {
  title: string;
};

const DescriptionBoxTitle = ({ title }: DescriptionBoxTitleProps) => {
  const navigate = useNavigate();

  const handleBackNav = () => {
    navigate(-1);
  };

  return (
    <S.PayTitle>
      <CaretLeft className="back__icon" size={32} onClick={handleBackNav} />
      {title}
    </S.PayTitle>
  );
};

export default DescriptionBoxTitle;

import Image from '../atoms/Image';
import TagBox from '../atoms/TagBox';
import { GenderMale, GenderFemale } from '@phosphor-icons/react';
import * as S from '../../styles/molecules/ListItem';
import kakaoLocation from '../../utils/kakaoLocation';
import { useEffect, useState } from 'react';

interface Dog {
  name: string;
  sex: string;
  breed: string;
  image: string;
  age: number;
}

type ListItemProps = {
  dog: Dog;
  title: string;
  dog_bowl: number;
  lat: number;
  lng: number;
  onClick: () => void;
};

const ListItem = ({
  dog,
  title,
  dog_bowl,
  onClick,
  lat,
  lng,
}: ListItemProps) => {
  const { name, sex, breed, image, age } = dog;
  const [locate, setLocate] = useState('');

  useEffect(() => {
    const getLocate = async () => {
      try {
        const locate = await kakaoLocation({ lat, lng });
        setLocate(
          locate?.data.documents[0].address_name ||
            '사용자 설정 주소가 잘못되었습니다.',
        );
      } catch (error: any) {
        setLocate('사용자 설정 주소가 잘못되었습니다.');
      }
    };

    getLocate();
  }, []);

  return (
    <S.Container onClick={onClick}>
      <S.ListProfileImgWrapper>
        <Image
          src={image ? image : '/images/default_profile.png'} // 임시 이미지 설정
          alt="공고글 프로필 이미지"
          size="4"
        />
      </S.ListProfileImgWrapper>
      <span>
        <S.ListLocationWrapper>
          <TagBox
            innerText={locate}
            color="#f84514"
            backColor="transparent"
            className="notification__location"
          />
        </S.ListLocationWrapper>
        <S.TextWrapper>
          <S.ListTitle>{title}</S.ListTitle>
          <div>
            <S.ListDogText>
              {name} {age}살&nbsp;
              {sex === '수컷' ? (
                <GenderMale size={18} color="#50c8f0" />
              ) : (
                <GenderFemale size={18} color="#fc7cb4" />
              )}
              <span className="dog__breed">{breed}</span>
              <span className="dog__bowl">{dog_bowl}%</span>
              <img src="/images/dog-bowl.png" alt="개밥그릇" />
            </S.ListDogText>
          </div>
        </S.TextWrapper>
      </span>
    </S.Container>
  );
};

export default ListItem;

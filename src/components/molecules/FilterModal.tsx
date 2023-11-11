import React, { useRef, useCallback } from 'react';
import { CaretLeft } from '@phosphor-icons/react';
import * as S from '../../styles/molecules/FilterModal';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import Image from '../atoms/Image';
import TagBox from '../atoms/TagBox';
import { dogSize, dogBreed } from '../../utils/dogFilter';

type Filter = {
  size: string[];
  breed: string[];
};

type FilterModalProps = {
  setModalOpen: (value: boolean) => void;
  selectedFilter: Filter;
  setSelectedFilter: React.Dispatch<React.SetStateAction<Filter>>;
  handleFilterAdap: () => void;
};

// 검색 창의 필터 아이콘 클릭 시 나타나는 모달
const FilterModal = ({
  setModalOpen,
  selectedFilter,
  setSelectedFilter,
  handleFilterAdap,
}: FilterModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // 모달 바깥 클릭 시 모달 닫기
  useOnClickOutside(ref, () => setModalOpen(false));

  // 선택한 필터 저장
  const handleFilterSelect = useCallback(
    (filterKey: keyof Filter, filterName: string) => {
      // 이미 배열에 저장되어 있는 filter 값인 경우 배열에서 제거
      const updatedFilter = { ...selectedFilter };
      if (selectedFilter[filterKey].includes(filterName)) {
        updatedFilter[filterKey] = updatedFilter[filterKey].filter(
          (name) => name !== filterName,
        );
      } else {
        // 배열에 저장되어 있지 않은 filter 값이 경우 배열에 추가
        updatedFilter[filterKey].push(filterName);
      }
      setSelectedFilter(updatedFilter);
    },
    [selectedFilter],
  );

  return (
    <S.Container role="presentation">
      <S.ModalWrapper ref={ref}>
        <S.Modal>
          <S.ModalHeader>
            <CaretLeft
              size={20}
              onClick={() => setModalOpen(false)}
              className="modal__header-icon"
            />
            필터
          </S.ModalHeader>
          <S.DogSizeWrapper>
            <S.DogTitle>견종 사이즈</S.DogTitle>
            <S.DogSizeContent>
              {dogSize.map((size) => (
                <TagBox
                  key={size.id}
                  innerText={size.name}
                  size="1"
                  color={
                    selectedFilter['size'].includes(size.name)
                      ? 'white'
                      : '#455154'
                  }
                  borderColor="#D6CFA5"
                  backColor={`${
                    selectedFilter['size'].includes(size.name)
                      ? '#f84514'
                      : 'white'
                  }`}
                  className="dog-size__tag"
                  onClick={() => handleFilterSelect('size', size.name)}
                />
              ))}
            </S.DogSizeContent>
          </S.DogSizeWrapper>
          <S.DogBreedWrapper>
            <S.DogTitle>
              견종
              <span>
                <Image src="/images/dog_logo.png" alt="강아지 로고" />
              </span>
            </S.DogTitle>
            <S.DogBreedContent>
              {dogBreed.map((breed) => (
                <TagBox
                  key={breed.id}
                  innerText={breed.name}
                  size="1"
                  color={
                    selectedFilter['breed'].includes(breed.name)
                      ? 'white'
                      : '#455154'
                  }
                  borderColor="#D6CFA5"
                  className="dog-breed__tag"
                  backColor={`${
                    selectedFilter['breed'].includes(breed.name)
                      ? '#f84514'
                      : 'white'
                  }`}
                  onClick={() => handleFilterSelect('breed', breed.name)}
                />
              ))}
            </S.DogBreedContent>
          </S.DogBreedWrapper>
          <S.FilterAdapButton
            className="filter__button"
            onClick={handleFilterAdap}
          >
            필터 적용
          </S.FilterAdapButton>
        </S.Modal>
      </S.ModalWrapper>
    </S.Container>
  );
};

export default React.memo(FilterModal);

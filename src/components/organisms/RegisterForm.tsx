import InputGroup from '../molecules/InputGroup';
import useAuthInput from '../../hooks/useAuthInput';
import * as Form from '../../styles/organisms/UserInputForm';
import Footer from '../atoms/Footer';
import LinkText from '../atoms/LinkText';
import * as Link from '../../styles/atoms/Link';
import { useNavigate } from 'react-router-dom';
import { register } from '../../apis/user';
import React, { useState } from 'react';
import Msg from '../atoms/Msg';
import PageLoading from '../atoms/PageLoading';
import { motion } from 'framer-motion';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { value, handleOnChange, handleOnCheck, invalidCheck } = useAuthInput({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const registerReq = () => {
    setIsLoading(true);
    register({
      email: value.email,
      password: value.password,
      nickname: value.username,
    })
      .then(() => {
        setIsLoading(false);
        setError('');
        // alert('회원가입 완료!\n 로그인이 필요합니다.');
        alert('회원가입 완료!');
        navigate('/onboard');
      })
      .catch((error) => {
        setIsLoading(false);
        if (error?.status) {
          switch (error.status) {
            case 400:
              setError(error.data.error.message);
              break;
            default:
              setError(error.data.error.message);
          }
        } else {
          registerReq();
        }
      });

    // msw 테스트용
    // fetch('/api/member/signup/error').then((res) => console.log('res', res));
    // alert('회원가입 완료!\n 로그인이 필요합니다.');
    // navigate('/signin');
  };

  const isValid = Object.values(invalidCheck).every((value) => value === true);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} // 입장 시 초기 상태
        animate={{ opacity: 1 }} // 입장 시 최종 상태
        transition={{ duration: 0.3 }}
      >
        <Form.Container>
          <Form.Title>회원가입</Form.Title>
          <div className="welcome__text">환영합니다!</div>
          <Form.Box onSubmit={handleFormSubmit}>
            <InputGroup
              id="username"
              name="username"
              type="text"
              placeholder="이름"
              label="이름"
              value={value.username}
              onChange={handleOnChange}
              onBlur={() => handleOnCheck('username', value.username)}
              invalid={invalidCheck}
              className="username"
            />
            <InputGroup
              id="email"
              name="email"
              type="email"
              placeholder="이메일"
              label="이메일"
              value={value.email}
              onChange={handleOnChange}
              onBlur={() => handleOnCheck('email', value.email)}
              invalid={invalidCheck}
              className="email"
            />
            <InputGroup
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호"
              label="비밀번호"
              value={value.password}
              onChange={handleOnChange}
              onBlur={() => handleOnCheck('password', value.password)}
              invalid={invalidCheck}
              className="password"
            />
            <InputGroup
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              placeholder="비밀번호 확인"
              label="비밀번호 확인"
              value={value.passwordConfirm}
              onChange={handleOnChange}
              onBlur={() =>
                handleOnCheck('passwordConfirm', value.passwordConfirm)
              }
              invalid={invalidCheck}
              className="passwordConfirm"
            />
            {error !== '' ? (
              <Msg message={error} className="login-error" />
            ) : null}
            <Form.Button
              onClick={() => {
                // api 회원 가입 요청
                registerReq();
              }}
              disabled={!isValid}
            >
              회원가입
            </Form.Button>
            <Link.TextContainer>
              <LinkText to="/signin" text="로그인" className="login__text" />
            </Link.TextContainer>
          </Form.Box>
        </Form.Container>
        <Footer />
        {isLoading ? <PageLoading /> : null}
      </motion.div>
    </>
  );
};

export default React.memo(RegisterForm);

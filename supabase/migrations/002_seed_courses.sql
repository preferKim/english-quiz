-- ============================================
-- Courses 초기 데이터
-- ============================================

INSERT INTO courses (subject, course_code, course_name, category, difficulty, display_order) VALUES
-- 영어
('english', 'english_easy', '🐣 영어 병아리반', 'level', 'easy', 1),
('english', 'english_medium', '🐰 영어 토끼반', 'level', 'medium', 2),
('english', 'english_hard', '🐯 영어 호랑이반', 'level', 'hard', 3),

-- 국어
('korean', 'korean_chosung', '🔤 초성퀴즈', 'quiz', 'easy', 1),
('korean', 'korean_grammar', '📚 문법', 'grammar', 'medium', 2),
('korean', 'korean_literature', '📖 문학용어', 'vocabulary', 'medium', 3),
('korean', 'korean_spelling', '✏️ 맞춤법', 'quiz', 'easy', 4),
('korean', 'korean_spacing', '📝 띄어쓰기', 'quiz', 'easy', 5),

-- 수학 (정승제 45강)
('math', 'math_seungje_01', '01강 분모가 같은 분수의 덧셈과 뺄셈, 약수의 뜻', 'seungje', NULL, 1),
('math', 'math_seungje_02', '02강 약수의 개수와 약수의 총합, 배수의 뜻', 'seungje', NULL, 2),
('math', 'math_seungje_03', '03강 최대공약수와 최소공배수', 'seungje', NULL, 3),
('math', 'math_seungje_04', '04강 통분과 약분, 역수의 뜻', 'seungje', NULL, 4),
('math', 'math_seungje_05', '05강 소수의 덧셈, 뺄셈, 곱셈, 나눗셈(1)', 'seungje', NULL, 5),
('math', 'math_seungje_06', '06강 소수의 덧셈, 뺄셈, 곱셈, 나눗셈(2)', 'seungje', NULL, 6),
('math', 'math_seungje_07', '07강 최대공약수와 최소공배수', 'seungje', NULL, 7),
('math', 'math_seungje_08', '08강 양수와 음수', 'seungje', NULL, 8),
('math', 'math_seungje_09', '09강 정수와 유리수의 덧셈', 'seungje', NULL, 9),
('math', 'math_seungje_10', '10강 정수와 유리수의 곱셈', 'seungje', NULL, 10),
('math', 'math_seungje_11', '11강 유한소수, 무한소수, 순환소수', 'seungje', NULL, 11),
('math', 'math_seungje_12', '12강 제곱근의 뜻(1)', 'seungje', NULL, 12),
('math', 'math_seungje_13', '13강 제곱근의 뜻(2)', 'seungje', NULL, 13),
('math', 'math_seungje_14', '14강 실수의 대소관계, 제곱근의 곱셈과 나눗셈', 'seungje', NULL, 14),
('math', 'math_seungje_15', '15강 분모의 유리화, 제곱근의 덧셈과 뺄셈', 'seungje', NULL, 15),
('math', 'math_seungje_16', '16강 복소수의 뜻, 복소수의 사칙연산', 'seungje', NULL, 16),
('math', 'math_seungje_17', '17강 켤레복소수', 'seungje', NULL, 17),
('math', 'math_seungje_18', '18강 다항식의 뜻, 분배법칙', 'seungje', NULL, 18),
('math', 'math_seungje_19', '19강 동류항, 지수법칙', 'seungje', NULL, 19),
('math', 'math_seungje_20', '20강 단항식의 곱셈과 나눗셈', 'seungje', NULL, 20),
('math', 'math_seungje_21', '21강 일차식의 곱셈과 나눗셈', 'seungje', NULL, 21),
('math', 'math_seungje_22', '22강 곱셈공식(1) - 중학과정', 'seungje', NULL, 22),
('math', 'math_seungje_23', '23강 곱셈공식(2) - 고등과정', 'seungje', NULL, 23),
('math', 'math_seungje_24', '24강 식 변형 공식 4가지', 'seungje', NULL, 24),
('math', 'math_seungje_25', '25강 인수분해(1) - 완전제곱식', 'seungje', NULL, 25),
('math', 'math_seungje_26', '26강 인수분해(2) - 합과 차, 합과 곱', 'seungje', NULL, 26),
('math', 'math_seungje_27', '27강 인수분해(3) - 공식으로 인수분해', 'seungje', NULL, 27),
('math', 'math_seungje_28', '28강 인수분해(4) - 복이차식의 인수분해', 'seungje', NULL, 28),
('math', 'math_seungje_29', '29강 인수분해(5) - 여러 문자로 이루어진 식의 인수분해', 'seungje', NULL, 29),
('math', 'math_seungje_30', '30강 인수분해(6) - 항등식과 미정계수법', 'seungje', NULL, 30),
('math', 'math_seungje_31', '31강 인수분해(7) - 나머지 정리, 조립제법', 'seungje', NULL, 31),
('math', 'math_seungje_32', '32강 인수분해(8) - 인수정리, 초가식의 인수분해(1,2)', 'seungje', NULL, 32),
('math', 'math_seungje_33', '33강 등식의 성질', 'seungje', NULL, 33),
('math', 'math_seungje_34', '34강 일차방정식의 풀이', 'seungje', NULL, 34),
('math', 'math_seungje_35', '35강 연립방정식의 풀이', 'seungje', NULL, 35),
('math', 'math_seungje_36', '36강 연립방정식의 활용', 'seungje', NULL, 36),
('math', 'math_seungje_37', '37강 이차방정식의 풀이', 'seungje', NULL, 37),
('math', 'math_seungje_38', '38강 이차방정식의 근의 공식, 판별식', 'seungje', NULL, 38),
('math', 'math_seungje_39', '39강 근과 계수와의 관계', 'seungje', NULL, 39),
('math', 'math_seungje_40', '40강 실근의 부호, 고차방정식, 연립방정식', 'seungje', NULL, 40),
('math', 'math_seungje_41', '41강 일차부등식의 풀이', 'seungje', NULL, 41),
('math', 'math_seungje_42', '42강 연립부등식, 절댓값 부등식', 'seungje', NULL, 42),
('math', 'math_seungje_43', '43강 연립부등식의 활용', 'seungje', NULL, 43),
('math', 'math_seungje_44', '44강 이차부등식의 풀이', 'seungje', NULL, 44),
('math', 'math_seungje_45', '45강 절대 부등식', 'seungje', NULL, 45),

-- 수학 (단계별) - 1. 수와 연산
('math', 'math_level_1_elementary', '1. 수와 연산 [초등] - 자연수, 분수, 소수, 사칙연산', 'level', 'elementary', 50),
('math', 'math_level_1_middle', '1. 수와 연산 [중등] - 정수, 유리수, 실수, 제곱근, 비례식', 'level', 'middle', 51),
('math', 'math_level_1_high', '1. 수와 연산 [고등] - 복소수, 지수와 로그', 'level', 'high', 52),

-- 수학 (단계별) - 2. 문자와 식
('math', 'math_level_2_elementary', '2. 문자와 식 [초등] - 수의 규칙, 미지의 수, 식의 표현', 'level', 'elementary', 53),
('math', 'math_level_2_middle', '2. 문자와 식 [중등] - 일차방정식, 부등식, 다항식 연산', 'level', 'middle', 54),
('math', 'math_level_2_high', '2. 문자와 식 [고등] - 다항식의 연산, 방정식과 부등식, 행렬, 명제', 'level', 'high', 55),

-- 수학 (단계별) - 3. 함수
('math', 'math_level_3_elementary', '3. 함수 [초등] - 규칙과 대응, 비와 비율', 'level', 'elementary', 56),
('math', 'math_level_3_middle', '3. 함수 [중등] - 일차함수, 이차함수', 'level', 'middle', 57),
('math', 'math_level_3_high', '3. 함수 [고등] - 지수·로그·삼각함수, 수열, 극한', 'level', 'high', 58),

-- 수학 (단계별) - 4. 기하
('math', 'math_level_4_elementary', '4. 기하 [초등] - 평면/입체도형의 성질, 합동', 'level', 'elementary', 59),
('math', 'math_level_4_middle', '4. 기하 [중등] - 피타고라스, 삼각비, 원의 성질, 공간좌표', 'level', 'middle', 60),
('math', 'math_level_4_high', '4. 기하 [고등] - 도형의 방정식, 벡터', 'level', 'high', 61),

-- 수학 (단계별) - 5. 확률과 통계
('math', 'math_level_5_elementary', '5. 확률과 통계 [초등] - 표와 그래프, 평균, 가능성', 'level', 'elementary', 62),
('math', 'math_level_5_middle', '5. 확률과 통계 [중등] - 경우의 수, 확률, 대푯값', 'level', 'middle', 63),
('math', 'math_level_5_high', '5. 확률과 통계 [고등] - 순열과 조합, 확률분포, 통계적 추정', 'level', 'high', 64),

-- 사회
('social', 'social_easy', '🏛️ 사회 쉬움', 'level', 'easy', 1),
('social', 'social_medium', '🏛️ 사회 보통', 'level', 'medium', 2),
('social', 'social_hard', '🏛️ 사회 어려움', 'level', 'hard', 3),

-- 과학
('science', 'science_easy', '🔬 과학 쉬움', 'level', 'easy', 1),
('science', 'science_medium', '🔬 과학 보통', 'level', 'medium', 2),
('science', 'science_hard', '🔬 과학 어려움', 'level', 'hard', 3)

ON CONFLICT (course_code) DO NOTHING;

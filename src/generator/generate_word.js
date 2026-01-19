const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

// 여기에 사용 중인 Gemini API 키를 넣으세요
const API_KEY = "YOUR_GEMINI_API_KEY"; 
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getModel({ model: "gemini-pro" });

// 타겟 설정 (초등: elementary, 중등: middle, 고등: high)
const TARGET_CATEGORY = "elementary"; 
const START_LEVEL = 1;
const END_LEVEL = 10;
const ITEMS_PER_LEVEL = 100;

async function generateWords(level) {
  const prompt = `
    역할: 당신은 영어 교육 전문가이자 데이터 엔지니어입니다.
    목표: ${TARGET_CATEGORY} (초등) 수준의 영어 단어 데이터를 생성하세요.
    
    요구사항:
    1. 레벨: 전체 1~10레벨 중 'Level ${level}'에 해당하는 난이도.
    2. 개수: 정확히 ${ITEMS_PER_LEVEL}개의 단어.
    3. 포맷: 유효한 JSON Array 형태.
    4. 필드 구성:
       - english: 영어 단어
       - korean: 한국어 뜻 (대표 뜻 1~2개)
       - level: ${level} (숫자형)
       - example: 해당 단어가 포함된 쉬운 예문 (영어)
       - pronunciation: IPA 발음 기호 (예: /kæt/)
       - example_meaning: 예문 해석 (한국어)
       - group: 단어의 범주 (예: 동물, 음식, 학교, 감정, 추상명사, 경제 등)
    
    출력 형식 예시:
    [
      { "english": "apple", "korean": "사과", "level": ${level}, "example": "...", "pronunciation": "...", "example_meaning": "...", "group": "..." }
    ]
    
    주의: 
    - 마크다운(backticks) 없이 순수 JSON 텍스트만 출력하세요.
    - 중복된 단어 없이 다양한 범주를 포함하세요.
  `;

  try {
    console.log(`[Level ${level}] 데이터 생성 중...`);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // 혹시 마크다운이 포함될 경우 제거
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    // JSON 파싱 확인
    const json = JSON.parse(text);
    
    // 파일 저장
    const fileName = `${TARGET_CATEGORY}_level_${level}.json`;
    fs.writeFileSync(fileName, JSON.stringify(json, null, 2));
    console.log(`✅ [Level ${level}] 저장 완료: ${fileName} (${json.length}개)`);

  } catch (error) {
    console.error(`❌ [Level ${level}] 생성 실패:`, error.message);
    // 실패 시 재시도 로직을 추가하거나 수동으로 다시 실행
  }
}

async function runBatch() {
  console.log(`=== ${TARGET_CATEGORY} 단어 생성 시작 ===`);
  for (let i = START_LEVEL; i <= END_LEVEL; i++) {
    await generateWords(i);
    // API 속도 제한 방지를 위한 딜레이 (필요시 조정)
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  console.log("=== 모든 작업 완료 ===");
}

runBatch();
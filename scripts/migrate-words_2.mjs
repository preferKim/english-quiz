/**
 * JSON 데이터 → Supabase DB 마이그레이션 스크립트 (Part 2)
 * 
 * 기존 migrate-words.mjs에서 처리하지 않은 나머지 파일들을 마이그레이션합니다.
 * 
 * 사용법:
 *   node scripts/migrate-words_2.mjs
 * 
 * 환경 변수 필요:
 *   VITE_SUPABASE_URL - Supabase 프로젝트 URL
 *   SUPABASE_SERVICE_ROLE_KEY - Service Role Key (Supabase Dashboard에서 확인)
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env 파일 직접 파싱 (dotenv 없이)
function loadEnv() {
    const envPath = path.join(__dirname, '../.env');
    const envLocalPath = path.join(__dirname, '../.env.local');

    const env = {};

    [envPath, envLocalPath].forEach(filePath => {
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            content.split('\n').forEach(line => {
                const trimmed = line.trim();
                if (trimmed && !trimmed.startsWith('#')) {
                    const [key, ...valueParts] = trimmed.split('=');
                    if (key && valueParts.length > 0) {
                        env[key.trim()] = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
                    }
                }
            });
        }
    });

    return env;
}

const envVars = loadEnv();
const supabaseUrl = envVars.VITE_SUPABASE_URL;
const supabaseServiceKey = envVars.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ 환경 변수가 설정되지 않았습니다.');
    console.error('   VITE_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY 를 확인하세요.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// 마이그레이션할 파일 목록
const MIGRATIONS = [
    // 국어 - 초성퀴즈
    {
        file: 'korean_chosung_easy.json',
        courseCode: 'korean_chosung',
        subject: 'korean',
        type: 'chosung',
        keyFn: (item, idx) => `chosung_${idx + 1}`,
        levelFn: (item) => item.level || 1,
        questionFn: (item) => `${item.chosung} (${item.category})`,
        answerFn: (item) => item.answer
    },

    // 국어 - 맞춤법
    {
        file: 'korean_spelling_easy.json',
        courseCode: 'korean_spelling',
        subject: 'korean',
        type: 'spelling',
        keyFn: (item, idx) => `spelling_${idx + 1}`,
        levelFn: (item) => item.difficulty || 1,
        questionFn: (item) => item.question,
        answerFn: (item) => item.answer
    },

    // 국어 - 띄어쓰기
    {
        file: 'korean_spacing_easy.json',
        courseCode: 'korean_spacing',
        subject: 'korean',
        type: 'spacing',
        keyFn: (item, idx) => `spacing_${idx + 1}`,
        levelFn: (item) => {
            const diffMap = { '초급': 1, '중급': 2, '고급': 3 };
            return diffMap[item.difficulty] || 1;
        },
        questionFn: (item) => item.question,
        answerFn: (item) => item.answer
    },

    // 국어 - 문학용어
    {
        file: 'korean_literary_terms.json',
        courseCode: 'korean_literature',
        subject: 'korean',
        type: 'literary_term',
        keyFn: (item, idx) => `lit_term_${idx + 1}`,
        levelFn: () => 2, // 중간 난이도
        questionFn: (item) => item.term,
        answerFn: (item) => item.description
    },

    // 국어 - 문법 용어
    {
        file: 'korean_grammar_terms.json',
        courseCode: 'korean_grammar',
        subject: 'korean',
        type: 'grammar_term',
        keyFn: (item, idx) => `grammar_term_${idx + 1}`,
        levelFn: () => 2,
        questionFn: (item) => item.term || item.name,
        answerFn: (item) => item.description || item.definition
    },

    // 사회 - 쉬움
    {
        file: 'social_easy.json',
        courseCode: 'social_easy',
        subject: 'social',
        type: 'quiz',
        isWrapped: true, // { questions: [...] } 형태
        keyFn: (item, idx) => `social_easy_q${item.questionNumber || idx + 1}`,
        levelFn: () => 1,
        questionFn: (item) => item.question,
        answerFn: (item) => {
            const correct = item.answerOptions?.find(opt => opt.isCorrect);
            return correct?.text || '';
        }
    },

    // 사회 - 보통
    {
        file: 'social_medium.json',
        courseCode: 'social_medium',
        subject: 'social',
        type: 'quiz',
        isWrapped: true,
        keyFn: (item, idx) => `social_medium_q${item.questionNumber || idx + 1}`,
        levelFn: () => 2,
        questionFn: (item) => item.question,
        answerFn: (item) => {
            const correct = item.answerOptions?.find(opt => opt.isCorrect);
            return correct?.text || '';
        }
    },

    // 사회 - 어려움
    {
        file: 'social_hard.json',
        courseCode: 'social_hard',
        subject: 'social',
        type: 'quiz',
        isWrapped: true,
        keyFn: (item, idx) => `social_hard_q${item.questionNumber || idx + 1}`,
        levelFn: () => 3,
        questionFn: (item) => item.question,
        answerFn: (item) => {
            const correct = item.answerOptions?.find(opt => opt.isCorrect);
            return correct?.text || '';
        }
    },

    // 과학 - 쉬움
    {
        file: 'science_easy.json',
        courseCode: 'science_easy',
        subject: 'science',
        type: 'quiz',
        isWrapped: true,
        keyFn: (item, idx) => `science_easy_q${item.questionNumber || idx + 1}`,
        levelFn: () => 1,
        questionFn: (item) => item.question,
        answerFn: (item) => {
            const correct = item.answerOptions?.find(opt => opt.isCorrect);
            return correct?.text || '';
        }
    },

    // 과학 - 보통
    {
        file: 'science_medium.json',
        courseCode: 'science_medium',
        subject: 'science',
        type: 'quiz',
        isWrapped: true,
        keyFn: (item, idx) => `science_medium_q${item.questionNumber || idx + 1}`,
        levelFn: () => 2,
        questionFn: (item) => item.question,
        answerFn: (item) => {
            const correct = item.answerOptions?.find(opt => opt.isCorrect);
            return correct?.text || '';
        }
    },

    // 과학 - 어려움
    {
        file: 'science_hard.json',
        courseCode: 'science_hard',
        subject: 'science',
        type: 'quiz',
        isWrapped: true,
        keyFn: (item, idx) => `science_hard_q${item.questionNumber || idx + 1}`,
        levelFn: () => 3,
        questionFn: (item) => item.question,
        answerFn: (item) => {
            const correct = item.answerOptions?.find(opt => opt.isCorrect);
            return correct?.text || '';
        }
    },

    // 수학 - 단계별 (easy, medium, hard)
    {
        file: 'math_easy.json',
        courseCode: null, // 동적
        subject: 'math',
        type: 'math_problem',
        keyFn: (item, idx) => `math_level${item.level || 1}_q${idx + 1}`,
        levelFn: (item) => 1,
        questionFn: (item) => item.problem || item.question,
        answerFn: (item) => item.answer,
        courseCodeFn: (item) => `math_level_${item.level || 1}_elementary`
    },

    {
        file: 'math_medium.json',
        courseCode: null,
        subject: 'math',
        type: 'math_problem',
        keyFn: (item, idx) => `math_level${item.level || 2}_q${idx + 1}`,
        levelFn: (item) => 2,
        questionFn: (item) => item.problem || item.question,
        answerFn: (item) => item.answer,
        courseCodeFn: (item) => `math_level_${item.level || 2}_middle`
    },

    {
        file: 'math_hard.json',
        courseCode: null,
        subject: 'math',
        type: 'math_problem',
        keyFn: (item, idx) => `math_level${item.level || 3}_q${idx + 1}`,
        levelFn: (item) => 3,
        questionFn: (item) => item.problem || item.question,
        answerFn: (item) => item.answer,
        courseCodeFn: (item) => `math_level_${item.level || 3}_high`
    },
];

async function migrateFile(config) {
    const { file, courseCode, subject, type, keyFn, levelFn, questionFn, answerFn, courseCodeFn, isWrapped } = config;
    const filePath = path.join(__dirname, '../public/words', file);

    // 파일 존재 확인
    if (!fs.existsSync(filePath)) {
        console.warn(`⚠️ 파일을 찾을 수 없음: ${file}`);
        return;
    }

    console.log(`📂 Loading ${file}...`);
    const rawData = fs.readFileSync(filePath, 'utf-8');
    let data = JSON.parse(rawData);

    // { questions: [...] } 형태인 경우 추출
    if (isWrapped && data.questions) {
        data = data.questions;
    }

    if (!Array.isArray(data)) {
        console.warn(`⚠️ ${file}은 배열이 아닙니다.`);
        return;
    }

    // 데이터 변환
    const words = data.map((item, index) => ({
        subject,
        course_code: courseCodeFn ? courseCodeFn(item) : courseCode,
        item_key: keyFn(item, index),
        item_type: type,
        level: levelFn(item),
        content: item,
        question_text: questionFn(item),
        answer_text: answerFn(item),
        display_order: index + 1,
        is_active: true
    }));

    console.log(`   📝 총 ${words.length}개 항목 변환 완료`);

    // Batch upsert (500개씩)
    const BATCH_SIZE = 500;
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < words.length; i += BATCH_SIZE) {
        const batch = words.slice(i, i + BATCH_SIZE);

        const { data: result, error } = await supabase
            .from('words')
            .upsert(batch, {
                onConflict: 'course_code,item_key',
                ignoreDuplicates: false
            });

        if (error) {
            console.error(`   ❌ 배치 ${Math.floor(i / BATCH_SIZE) + 1} 오류:`, error.message);
            errorCount += batch.length;
        } else {
            successCount += batch.length;
        }
    }

    console.log(`   ✅ ${file}: ${successCount}개 성공, ${errorCount}개 실패`);
}

async function updateCourseTotals() {
    console.log('\n📊 과정별 항목 수 업데이트 중...');

    // course_code별 카운트
    const { data: counts, error } = await supabase
        .from('words')
        .select('course_code')
        .then(async ({ data }) => {
            const countMap = {};
            data?.forEach(item => {
                countMap[item.course_code] = (countMap[item.course_code] || 0) + 1;
            });
            return { data: countMap, error: null };
        });

    if (error) {
        console.error('❌ 카운트 조회 실패:', error);
        return;
    }

    // courses 테이블 업데이트
    for (const [courseCode, total] of Object.entries(counts || {})) {
        await supabase
            .from('courses')
            .update({ total_items: total })
            .eq('course_code', courseCode);
    }

    console.log('✅ 과정별 항목 수 업데이트 완료');
}

async function main() {
    console.log('🚀 마이그레이션 (Part 2) 시작\n');
    console.log(`   Supabase URL: ${supabaseUrl}`);
    console.log(`   대상 파일: ${MIGRATIONS.length}개`);
    console.log('');

    for (const config of MIGRATIONS) {
        await migrateFile(config);
    }

    await updateCourseTotals();

    console.log('\n🎉 마이그레이션 완료!');
}

main().catch(console.error);

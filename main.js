const firebaseConfig = {
  apiKey: "AIzaSyC1ReelpKjcjbMz_0wYZt1hslbmOxDEyMI",
  authDomain: "mwmw-273aa.firebaseapp.com",
  projectId: "mwmw-273aa",
  storageBucket: "mwmw-273aa.firebasestorage.app",
  messagingSenderId: "510760075011",
  appId: "1:510760075011:web:59ab9f624a96da807cf336",
  measurementId: "G-GGG8L2JBWX"
};

// Use Firebase Compat API for local file:// protocol
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('custom-cursor');
    const stones = document.querySelectorAll('.stone');
    const sun = document.querySelector('.sun');

    // Cloud Cursor Movement
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Sun Parallax
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        sun.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    // Scroll Logic: Overlap and Scale
    const container = document.querySelector('.container');
    const animateStones = () => {
        const scrolled = window.pageYOffset;
        const viewportCenter = window.innerHeight / 2;

        // Keep the mask fixed relative to the viewport
        container.style.webkitMaskPosition = `0 ${scrolled}px`;
        container.style.maskPosition = `0 ${scrolled}px`;

        stones.forEach((stone, index) => {
            const rect = stone.getBoundingClientRect();
            const stoneCenter = rect.top + rect.height / 2;
            const distance = viewportCenter - stoneCenter;
            
            // Calculate scale based on distance to center
            const scale = 1 + Math.max(0, (1 - Math.abs(distance) / viewportCenter) * 0.1);
            
            // Subtle rotation based on scroll speed or position
            const rotation = (distance * 0.01);

            // Apply transforms (keeping the margin stacking)
            // The negative margin in CSS handles the basic stacking.
            // We add a bit of parallax here.
            const parallax = distance * 0.05;
            
            // We only apply the scale if NOT hovered (CSS hover takes precedence)
            if (!stone.matches(':hover')) {
                stone.style.transform = `scale(${scale}) translateY(${parallax}px) rotate(${rotation}deg)`;
            } else {
                stone.style.transform = ''; // Clear inline style so CSS animation works
            }
        });

        requestAnimationFrame(animateStones);
    };

    animateStones();

    // Gallery Logic
    const galleryOverlay = document.getElementById('gallery-overlay');
    const galleryImg = document.getElementById('gallery-img');
    const pageInfo = document.getElementById('page-info');
    const backBtn = document.getElementById('back-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Components for info modal
    const infoOverlay = document.getElementById('info-overlay');
    const infoCloseBtn = document.getElementById('info-close-btn');
    const infoTitle = document.getElementById('info-title');
    const infoSynopsis = document.getElementById('info-synopsis');
    const infoTagsContainer = document.getElementById('info-tags-container');
    const infoBadge = document.getElementById('info-badge');
    const infoGenreMedium = document.getElementById('info-genre-medium');
    const infoAgeBadge = document.getElementById('info-age-badge');
    const infoRatingVal = document.getElementById('info-rating-val');

    // New split gallery sidebar components
    const galleryContentWrapper = document.getElementById('gallery-content-wrapper');
    const sidebarTitle = document.getElementById('sidebar-title');
    const sidebarSynopsis = document.getElementById('sidebar-synopsis');
    const sidebarTags = document.getElementById('sidebar-tags');
    const moreBtn = document.getElementById('more-btn');
    const sidebarBadge = document.getElementById('sidebar-badge');
    const sidebarGenreMedium = document.getElementById('sidebar-genre-medium');
    const sidebarAgeBadge = document.getElementById('sidebar-age-badge');
    const sidebarRatingVal = document.getElementById('sidebar-rating-val');
    const sidebarStars = document.getElementById('sidebar-stars');
    const sidebarFavBtn = document.getElementById('sidebar-fav-btn');

    // Stone data map containing specific gallery assets and descriptions
    const stoneData = {
        'hero': {
            hasInfo: true,
            items: [
                {
                    image: 'onepiece_group.png',
                    title: '원피스',
                    synopsis: '어렸을 적 악마의 열매를 먹고 몸이 맘대로 늘어나는 고무 인간이 돼버린 주인공 루피. 그러나 해적왕이 꿈인 루피는 그 열매를 먹은 대가로 수영을 할 수 없다. 해적왕이 꿈인 소년이 수영을 할 수가 없다니 꿈을 접어야 할까. 루피는 수영을 못한다면 물에 안 빠지면 된다며 자신의 꿈을 향해 전진한다. 해적왕 골드로저가 남긴 보물 원피스를 차지하기 위해 수 많은 사람들이 바다로 뛰어드는 대해적 시대를 배경으로 세계지도를 그리려는 항해사 \'나미\', 최고의 검객을 꿈꾸는 \'조로\', 기적의 바다 오올 블루를 찾는 주방장 \'상디\', 코가 파랗다는 이유로 동료들에게 버려진 사슴인간 ‘쵸파’ 이렇게 다섯 인물들의 파란만장한 모험 이야기가 펼쳐진다.',
                    tags: ['#우정', '#성장', '#배틀', '#이능력', '#판타지', '#액션', '#모험', '#바다', '#섬', '#만화 원작', '#코미디'],
                    genres: '판타지·액션·모험',
                    medium: 'TVA',
                    age: '12',
                    rating: '4.7',
                    rankBadge: '라프텔 인기 TOP 10'
                },
                {
                    image: 'frieren.png',
                    title: '장송의 프리렌',
                    synopsis: '마왕을 쓰러뜨리고 세상을 구한 용사 일행의 이야기가 끝난 \'그 후\'의 세계를 그리는 판타지 작품입니다. 천 년 이상을 사는 엘프 마법사 \'프리렌\'은 인간과 비교할 수 없이 긴 수명을 지니고 있습니다. 함께 모험했던 인간 용사 힘멜이 노환으로 세상을 떠난 뒤, 프리렌은 자신이 동료들을 더 깊이 이해하려 노력하지 않았음을 뒤늦게 후회하게 됩니다. 이를 계기로 프리렌은 인간을 이해하기 위한 새로운 여행을 떠나게 되며, 과거와 현재가 교차하는 여정을 통해 추억과 시간의 의미를 깨달아가는 과정을 담고 있습니다.',
                    tags: ['#판타지', '#드라마', '#모험', '#감동적인', '#마법', '#후일담', '#어드벤처'],
                    genres: '판타지·모험·드라마',
                    medium: 'TVA',
                    age: '15',
                    rating: '4.9',
                    rankBadge: '라프텔 평점 1위'
                },
                {
                    image: 'demonslayer.png',
                    title: '귀멸의 칼날',
                    synopsis: '다이쇼 시대, 숯을 팔며 생계를 이어가던 소년 \'카마도 탄지로\'는 어느 날 도깨비에게 가족을 몰살당합니다. 유일하게 살아남으나 도깨비로 변해버린 여동생 \'네즈코\'를 인간으로 되돌리고 가족의 복수를 하기 위해, 탄지로는 귀살대에 입대하여 목숨을 건 혈투를 시작합니다.',
                    tags: ['#판타지', '#액션', '#시대물', '#소년만화', '#도깨비', '#가족애', '#성장'],
                    genres: '판타지·액션·시대물',
                    medium: 'TVA',
                    age: '19',
                    rating: '4.8',
                    rankBadge: '최고 인기 추천작'
                },
                {
                    image: 'jujutsukaisen.jpg',
                    title: '주술회전',
                    synopsis: '경이로운 신체 능력을 가진 고등학생 \'이타도리 유지\'는 어느 날 학교에 잠들어 있던 특급 주물 \'료멘스쿠나\'의 손가락을 삼키게 됩니다. 저주의 왕을 몸에 품게 된 유지는 주술사들을 양성하는 \'주술고전\'에 입학하여, 인류를 위협하는 저주들과 싸우며 자신의 운명과 마주합니다.',
                    tags: ['#판타지', '#액션', '#다크 판타지', '#현대 판타지', '#능력물', '#배틀물'],
                    genres: '판타지·액션·학원',
                    medium: 'TVA',
                    age: '19',
                    rating: '4.8',
                    rankBadge: '인기 액션 화제작'
                },
                {
                    image: 'attackontitan.png',
                    title: '진격의 거인',
                    synopsis: '100여 년 전, 정체를 알 수 없는 거인들이 나타나 인류를 멸종 위기로 몰아넣었습니다. 살아남은 인류는 50m 높이의 거대한 벽을 쌓고 그 안에서 평화를 유지하며 살아가지만, 어느 날 갑자기 나타난 \'초대형 거인\'에 의해 벽이 파괴되면서 다시금 거인들의 습격을 받게 됩니다. 어머니가 거인에게 잡아먹히는 참혹한 광경을 눈앞에서 목격한 주인공 \'엘런 예거\'는 모든 거인을 구축하겠다고 맹세하며 조사병단에 입단해 처절한 싸움을 시작하게 됩니다.',
                    tags: ['#판타지', '#액션', '#다크 판타지', '#생존', '#거인', '#조사병단', '#명작'],
                    genres: '판타지·액션·스릴러',
                    medium: 'TVA',
                    age: '19',
                    rating: '4.9',
                    rankBadge: '역대 명작 추천작'
                },
                {
                    image: 'chainsawman.png',
                    title: '체인소 맨',
                    synopsis: '온갖 악마가 도사리는 세계, 빚더미에 앉은 소년 \'덴지\'는 악마 \'포치타\'와 함께 데빌헌터로 일하며 근근이 살아갑니다. 그러던 어느 날 배신을 당해 죽음을 맞이하지만, 포치타와 계약하여 심장을 공유하게 된 덴지는 몸을 톱날로 바꾸는 \'체인소맨\'으로 변신해 악마를 사냥합니다.',
                    tags: ['#판타지', '#액션', '#다크 판타지', '#현대 판타지', '#데빌헌터', '#피카레스크'],
                    genres: '판타지·액션·고어',
                    medium: 'TVA',
                    age: '19',
                    rating: '4.7',
                    rankBadge: '트렌디 다크판타지'
                },
                {
                    image: 'deathnote.png',
                    title: '데스노트',
                    synopsis: '이름이 적힌 사람은 죽는 사신(死神)의 공책 \'데스노트\'. 법과 정의의 한계를 느끼던 천재 고등학생 \'야가미 라이토\'는 우연히 이 노트를 줍고, 세상의 범죄자들을 처단해 새로운 이상향의 신이 되기로 결심합니다. 범죄자들의 의문사가 늘어가자 세계적인 명탐정 \'L\'이 수사에 착수하고, 두 천재는 서로의 정체를 밝혀내기 위해 치열한 두뇌 싸움과 숨 막히는 추리전을 시작합니다.',
                    tags: ['#판타지', '#스릴러', '#추리물', '#두뇌싸움', '#사신', '#다크 판타지', '#명작'],
                    genres: '판타지·스릴러·추리',
                    medium: 'TVA',
                    age: '15',
                    rating: '4.9',
                    rankBadge: '역대 최고 스릴러'
                },
                {
                    image: 'myheroacademia.png',
                    title: '나의 히어로 아카데미아',
                    synopsis: '인류의 80%가 개성이라는 초능력을 가진 초인 사회. 아무런 초능력이 없는 \'무개성\' 소년 \'미도리야 이즈쿠\'는 평화의 상징이자 넘버원 히어로인 \'올마이트\'를 동경하며 히어로가 되기를 꿈꿉니다. 올마이트는 이즈쿠의 뜨거운 히어로 정신을 알아보고 자신의 개성 \'원 포 올\'을 물려주게 되고, 이즈쿠는 최고의 히어로 육성 학교인 유에이 고등학교에 입학해 동료들과 함께 성장하며 빌런들과 맞서 싸웁니다.',
                    tags: ['#판타지', '#액션', '#히어로', '#초능력', '#성장물', '#학원물', '#열혈물'],
                    genres: '판타지·액션·히어로',
                    medium: 'TVA',
                    age: '15',
                    rating: '4.8',
                    rankBadge: '인기 히어로 학원물'
                },
                {
                    image: 'fullmetalalchemist.png',
                    title: '강철의 연금술사',
                    synopsis: '연금술이 고도로 발달한 세계. 어린 시절 죽은 어머니를 되살리기 위해 연금술 최대의 금기인 \'인체연성\'을 시도한 엘릭 형제. 하지만 연성은 실패하고 형 \'에드워드 엘릭\'은 왼쪽 다리와 오른팔을, 동생 \'알폰스 엘릭\'은 영혼을 제외한 온몸을 잃게 됩니다. 잃어버린 몸을 되찾기 위해 전설 속 연금술 증폭기인 \'현자의 돌\'을 찾아 떠나는 두 형제의 거대하고 감동적인 모험담입니다.',
                    tags: ['#판타지', '#액션', '#연금술', '#형제애', '#모험', '#다크 판타지', '#올타임 명작'],
                    genres: '판타지·액션·모험',
                    medium: 'TVA',
                    age: '19',
                    rating: '4.9',
                    rankBadge: '역대 평점 1위 명작'
                },
                {
                    image: 'bleach.png',
                    title: '블리치',
                    synopsis: '유령을 볼 수 있는 평범한(?) 고등학생 \'쿠로사키 이치고\'. 어느 날 스스로를 사신(死神)이라 부르는 소녀 \'쿠치키 루키아\'를 만나게 되고, 인간을 습격하는 악령 \'호로\'로부터 가족을 구하기 위해 사신의 힘을 양도받아 대행 임무를 수행하게 됩니다. 소울 소사이어티와 현세를 배경으로 거대한 참백도를 휘두르며 동료들과 함께 강대한 적들과 맞서는 스타일리시한 배틀 액션 만화입니다.',
                    tags: ['#판타지', '#액션', '#사신', '#배틀물', '#능력물', '#현대 판타지', '#스타일리시'],
                    genres: '판타지·액션·배틀',
                    medium: 'TVA',
                    age: '15',
                    rating: '4.7',
                    rankBadge: '원나블 레전드 액션'
                },
                {
                    image: 'naruto.png',
                    title: '나루토',
                    synopsis: '나뭇잎 마을의 문제아 소년 \'우즈마키 나루토\'. 몸속에 마을을 멸망의 위기로 몰고 갔던 전설의 괴수 \'구미호\'가 봉인되어 있다는 이유로 마을 사람들에게 외면당해 왔습니다. 하지만 나루토는 굴하지 않고 마을 최고의 닌자인 \'호카게\'가 되겠다는 꿈을 향해 달립니다. 동료 사스케, 사쿠라와 함께 닌자로서 훈련과 미션을 수행하며, 소중한 동료들을 지키고 평화를 위해 성장해 나가는 닌자 대서사시입니다.',
                    tags: ['#판타지', '#액션', '#닌자', '#동료애', '#성장물', '#우정', '#올타임 레전드'],
                    genres: '판타지·액션·닌자',
                    medium: 'TVA',
                    age: '12',
                    rating: '4.9',
                    rankBadge: '전설적인 닌자 애니'
                },
                {
                    image: 'onepunchman.png',
                    title: '원펀맨',
                    synopsis: '너무나도 강해서 그 어떤 강적이라도 단 한 방(One Punch)에 끝장내 버리는 취미로 히어로를 하는 남자 \'사이타마\'. 머리카락이 모두 빠질 정도의 혹독한 훈련 끝에 압도적인 힘을 손에 넣었지만, 너무 쉽게 적을 물리치는 바람에 긴장감도 성취감도 잃어버리고 무료한 일상을 보냅니다. 개성 넘치는 괴수들과 히어로 협회원들 사이에서 진정한 강함과 히어로의 자격을 보여주는 통쾌한 먼치킨 액션 코미디물입니다.',
                    tags: ['#판타지', '#액션', '#코미디', '#히어로', '#먼치킨', '#시원한타격감', '#액션작화'],
                    genres: '판타지·액션·코미디',
                    medium: 'TVA',
                    age: '15',
                    rating: '4.8',
                    rankBadge: '타격감 원탑 액션작'
                },
                {
                    image: 'reborn.png',
                    title: '가정교사 히트맨 리본',
                    synopsis: '공부도 운동도 못해 학교에서 \'허접 츠나\'로 불리는 중학생 \'사와다 츠나요시\'. 어느 날 이탈리아에서 온 꼬마 아기 일류 히트맨 \'리본\'이 그의 가정교사로 찾아옵니다. 리본의 진짜 정체는 츠나를 세계적인 마피아 가문 \'봉고레\'의 10대 보스로 키우기 위해 온 전설적인 히트맨! 리본이 쏜 \'필살탄\'의 힘과 의리로 뭉친 동료들과 함께 츠나는 다가오는 위협들을 헤쳐나가는 리더로 점차 성장해 나갑니다.',
                    tags: ['#판타지', '#액션', '#마피아', '#성장물', '#능력물', '#학원물', '#우정'],
                    genres: '판타지·액션·학원',
                    medium: 'TVA',
                    age: '15',
                    rating: '4.6',
                    rankBadge: '추억의 레전드 판타지'
                },
                {
                    image: 'rezero.png',
                    title: 'Re:제로부터 시작하는<br>이세계 생활',
                    synopsis: '편의점에서 돌아오던 평범한 청년 \'나츠키 스바루\'는 갑자기 이세계로 소환됩니다. 아무런 능력도 없이 낯선 세계에 던져진 스바루는 은발의 미소녀 \'에밀리아\'에게 도움을 받습니다. 하지만 그날 밤, 두 사람은 의문의 습격자에게 살해당하고 맙니다. 그런데 스바루는 죽음의 직전으로 되돌아가는 \'사망귀환\'이라는 능력을 갖고 있었습니다. 소중한 사람들을 지키기 위해 혼자서 몇 번이고 죽음을 반복하며 나아가는 스바루의 처절하고도 뜨거운 이세계 생존기가 펼쳐집니다.',
                    tags: ['#판타지', '#이세계', '#다크 판타지', '#루프물', '#성장물', '#드라마', '#액션'],
                    genres: '판타지·이세계·드라마',
                    medium: 'TVA',
                    age: '15',
                    rating: '4.8',
                    rankBadge: '이세계 명작 1위'
                },
                {
                    image: 'tensura.png',
                    title: '전생했더니 슬라임이었던<br>건에 대하여',
                    synopsis: '37세의 평범한 회사원 \'미카미 사토루\'는 어느 날 갑작스러운 사고로 사망하고, 눈을 뜨니 이세계의 최약체 몬스터인 \'슬라임\'으로 환생해 있습니다. 하지만 스바루는 유니크 스킬 \'포식자\'와 현자 \'라파엘\'의 힘을 얻어 다양한 능력을 흡수하고 성장합니다. \'리무루 템페스트\'라는 이름을 얻은 그는 개성 넘치는 몬스터 동료들과 함께 종족을 초월한 공생의 나라를 세워나갑니다. 최강의 슬라임이 벌이는 유쾌하고 통쾌한 이세계 건국 판타지입니다.',
                    tags: ['#판타지', '#이세계', '#먼치킨', '#성장물', '#전생물', '#국가건설', '#코미디'],
                    genres: '판타지·이세계·먼치킨',
                    medium: 'TVA',
                    age: '15',
                    rating: '4.7',
                    rankBadge: '이세계 전생물 인기 1위'
                },
                {
                    image: 'hxh.png',
                    title: '헌터X헌터',
                    synopsis: '전설적인 헌터인 아버지를 찾아 떠나는 소년 \'곤 프릭스\'. 헌터 시험을 통해 운명적으로 만난 \'킬루아\', \'쿠라피카\', \'레오리오\'와 함께 다양한 모험을 펼쳐나갑니다. 살아있는 세계에서 죽을 것 같은 흥분을 쫓는 킬루아와 일족의 복수를 꿈꾸는 쿠라피카, 그리고 의사를 꿈꾸는 레오리오까지. 각자의 목표를 향해 나아가는 네 소년의 성장과 우정, 그리고 숨 막히는 배틀이 어우러진 불후의 명작입니다. 넨(念) 능력 시스템의 정교한 묘사와 깊이 있는 캐릭터들로 수많은 팬들의 사랑을 받고 있습니다.',
                    tags: ['#판타지', '#액션', '#성장물', '#우정', '#배틀물', '#능력물', '#올타임 명작'],
                    genres: '판타지·액션·모험',
                    medium: 'TVA',
                    age: '15',
                    rating: '4.9',
                    rankBadge: '역대 소년 만화 명작'
                }
            ]
        },
        'about': {
            hasInfo: true,
            items: [
                {
                    image: 'spyxfamily.png',
                    title: '스파이 패밀리',
                    synopsis: '세계 각국이 물밑에서 치열한 정보전을 펼치는 시대, 스파이 \'황혼\'은 위장 가족을 만들어 명문 학교에 잠입하라는 지령을 받습니다. 그는 고아원에서 타인의 마음을 읽는 초능력자 소녀 \'아냐\'를 양녀로 삼고, 정체를 숨긴 암살자 \'요르\'와 계약 결혼을 맺어 가짜 가족을 이룹니다. 서로의 정체를 숨긴 채 시작된 세 사람의 위태롭고도 따뜻한 코믹 일상이 펼쳐집니다.',
                    tags: ['#코미디', '#일상', '#액션', '#가족애', '#초능력', '#스파이', '#암살자', '#힐링물'],
                    genres: '코미디·일상·액션',
                    medium: 'TVA',
                    age: '12',
                    rating: '4.8',
                    rankBadge: '최고 인기 추천작'
                },
                {
                    image: 'bocchitherock.jpg',
                    title: '봇치 더 록!',
                    synopsis: '극도로 낯가림이 심해 외톨이로 지내던 여고생 \'고토 히토리\'. 그녀는 인터넷에서 \'기타 히어로\'라는 이름으로 화려한 연주 영상을 올리며 활동하고 있었습니다. 어느 날 놀이터에서 홀로 기타 가방을 메고 있던 히토리는 결속 밴드의 드러머 \'이지치 니지카\'를 만나 임시 기타리스트로 밴드에 합류하게 됩니다. 소심한 외톨이 소녀가 개성 넘치는 동료들과 함께 음악을 통해 성장하고 소통해 나가는 청춘 코미디물입니다.',
                    tags: ['#코미디', '#일상', '#음악', '#밴드', '#성장물', '#외톨이', '#학원물'],
                    genres: '코미디·일상·학원',
                    medium: 'TVA',
                    age: '12',
                    rating: '4.9',
                    rankBadge: '라프텔 평점 1위'
                },
                {
                    image: 'saikikusuo.png',
                    title: '사이키 쿠스오의 재난',
                    synopsis: '텔레파시, 염력, 투시 등 온갖 초능력을 태어날 때부터 자유자재로 다루는 고등학생 \'사이키 쿠스오\'. 평범한 삶과 평온한 일상을 최우선으로 생각하는 그는 초능력을 숨긴 채 조용히 살아가려 애씁니다. 하지만 그의 주변에는 매번 상상을 초월하는 독특하고 개성 넘치는 반 친구들이 꼬이게 되고, 쿠스오는 이들이 벌이는 소동에 휘말려 초능력으로 수습하느라 하루도 조용할 날이 없는 재난 같은 나날을 보냅니다.',
                    tags: ['#코미디', '#일상', '#초능력', '#개그물', '#옴니버스', '#학원물', '#먼치킨'],
                    genres: '코미디·일상·학원',
                    medium: 'TVA',
                    age: '15',
                    rating: '4.8',
                    rankBadge: '추천 개그 애니'
                },
                {
                    image: 'gintama.png',
                    title: '은혼',
                    synopsis: '외계인의 침략으로 에도 막부가 무너지고 사무라이가 쓸모없어진 시대. 단 하나의 규칙도 없이 자유롭게 사는 \'사카타 긴토키\'는 할부로 산 점포에서 \'만사옥(なんでも屋)\'을 차리고 이런저런 의뢰를 받아 생계를 꾸립니다. 겉으로는 매사 귀찮아하는 천연계 백발 사무라이지만, 과거 유신지사로 활약했던 압도적인 전투력을 숨기고 있습니다. 신선조와의 마찰, 외계 세력과의 싸움, 동료와의 우정을 코미디와 진지함이 넘나드는 연출로 그려낸 국민 개그 액션물입니다.',
                    tags: ['#코미디', '#액션', '#SF', '#시대물', '#개그물', '#사무라이', '#우정', '#은하계'],
                    genres: '코미디·액션·SF',
                    medium: 'TVA',
                    age: '15',
                    rating: '4.9',
                    rankBadge: '국민 개그 액션 레전드'
                },
                {
                    image: 'assassinationclassroom.jpg',
                    title: '암살교실',
                    synopsis: '달의 70%를 파괴하고 다음 목표로 지구를 지목한 정체불명의 초생명체. 정부는 그 생명체와 특이한 협상을 맺게 됩니다. 문제아들을 모아놓은 나기사 키(3학년 E반) 담임을 1년간 맡는 대신, 그 1년 안에 학생들 손에 죽을 수 있도록 허락한다는 것. 학생들은 매일 선생님을 암살하려 하지만 번번이 실패하고, 그 과정에서 누구보다도 진심으로 학생들을 가르치는 코로 선생에게 점점 마음을 열어가는 감동과 유머가 공존하는 작품입니다.',
                    tags: ['#코미디', '#액션', '#학원물', '#성장물', '#우정', '#선생님', '#암살'],
                    genres: '코미디·액션·학원',
                    medium: 'TVA',
                    age: '15',
                    rating: '4.8',
                    rankBadge: '감동 학원 명작'
                },
                {
                    image: 'keroro.png',
                    title: '케로로 중사',
                    synopsis: '지구 침략을 위해 보내진 케론성(星) 침략부대의 소대장 \'케로로 중사\'와 그의 부하들. 하지만 상황이 어긋나 지구인 \'히나타\' 남매에게 발각되고, 케로로는 히나타 가에 얹혀살며 가사를 분담하는 신세가 됩니다. 지구 침략을 꿈꾸면서도 건담 프라모델에 빠지고 지구인들과 어울려 일상을 보내는 케로로와 개성 넘치는 부하들의 유쾌하고 엉뚱한 SF 코미디 일상물입니다.',
                    tags: ['#코미디', '#일상', '#SF', '#개그물', '#외계인', '#가족물', '#옴니버스'],
                    genres: '코미디·일상·SF',
                    medium: 'TVA',
                    age: '12',
                    rating: '4.6',
                    rankBadge: '추억의 어린이 애니'
                },
                {
                    image: 'umaruchan.png',
                    title: '건어물 여동생 우마루짱',
                    synopsis: '밖에서는 누구나 반하는 완벽한 미소녀 고등학생 \'도마 우마루\'. 공부도 잘하고 운동도 잘하는 완벽한 외모의 그녀, 하지만 집에 돌아와 현관 앞에서 햄스터 망토를 두르는 순간 치비 버전으로 돌변! 오빠를 졸라 콜라와 감자칩을 먹으며 게임과 만화에 탐닉하는 완벽한 \'건어물\' 생활을 즐깁니다. 완벽한 겉모습과 집에서의 황당한 민낯의 격차가 만들어내는 유쾌한 일상 코미디입니다.',
                    tags: ['#코미디', '#일상', '#힐링물', '#오빠', '#게임', '#오타쿠', '#치비'],
                    genres: '코미디·일상·힐링',
                    medium: 'TVA',
                    age: '12',
                    rating: '4.5',
                    rankBadge: '힐링 일상 코미디'
                }
            ]
        },
        'departments': {
            hasInfo: true,
            items: [
                {
                    image: 'haikyuu.png',
                    title: '하이큐!!',
                    synopsis: '배구를 향한 열정으로 가득 찬 소년 \'히나타 쇼요\'는 중학교 시절 \'작은 거인\'에게 감명 받아 배구부에 들어갑니다. 비록 단 한 번의 시합만 하고 졸업했지만 카라스노 고교 배구부에 입학하고, 그곳에서 천재 세터 \'카게야마 토비오\'와 운명적으로 만나게 됩니다. 처음엔 서로 으르렁거리던 두 사람이지만, 이내 최강의 콤비가 되어 전국 최고를 향한 도전을 시작합니다.',
                    tags: ['#스포츠', '#배구', '#청춘', '#성장물', '#팀워크', '#열혈물', '#학원물'],
                    genres: '스포츠·청춘·성장',
                    medium: 'TVA',
                    age: '12',
                    rating: '4.9',
                    rankBadge: '스포츠 애니 역대 1위'
                },
                {
                    image: 'kuroko.png',
                    title: '쿠로코의 농구',
                    synopsis: '\'기적의 세대\'라 불리는 최강 중학교 농구부 출신 선수들이 각지의 고교로 흩어진 후, 그 그림자 같은 존재였던 \'쿠로코 테츠야\'가 신인 에이스 \'카가미 타이가\'와 함께 새로운 팀을 이끌며 \'기적의 세대\'를 하나씩 꺾어나가는 이야기입니다. 압도적인 능력을 가진 각 캐릭터들의 개성 넘치는 대결이 스포츠 배틀물의 재미를 극대화합니다.',
                    tags: ['#스포츠', '#농구', '#능력물', '#배틀물', '#우정', '#성장물', '#학원물'],
                    genres: '스포츠·농구·배틀',
                    medium: 'TVA',
                    age: '12',
                    rating: '4.8',
                    rankBadge: '인기 스포츠 배틀물'
                },
                {
                    image: 'slamdunk.png',
                    title: '슬램덩크',
                    synopsis: '농구를 전혀 모르는 문제아 \'강백호\'는 짝사랑하는 소녀 \'채소연\'의 말 한마디에 농구를 시작합니다. 타고난 신체 능력으로 빠르게 성장하는 강백호는 북산 고교 농구부에서 \'서태웅\', \'채치수\' 등과 함께 전국 제패를 향한 여정을 걷습니다. 코믹한 요소와 뜨거운 농구 장면이 절묘하게 어우러진, 시대를 초월한 스포츠 만화의 역대급 명작입니다.',
                    tags: ['#스포츠', '#농구', '#성장물', '#우정', '#열혈물', '#코미디', '#올타임 명작'],
                    genres: '스포츠·농구·성장',
                    medium: 'TVA',
                    age: '12',
                    rating: '4.9',
                    rankBadge: '역대 스포츠 최고 명작'
                },
                {
                    image: 'bluelock.png',
                    title: '블루 록',
                    synopsis: '일본 축구가 세계의 벽을 뛰어넘기 위해 300명의 고교 스트라이커를 한 건물에 가두고 단 한 명의 천하제일 에고이스트 스트라이커를 선발하는 프로젝트 \'블루 록\'. 평범한 스트라이커 \'이사기 요이치\'는 이 기묘한 선발 프로그램에 참가하며 자신만의 축구 스타일과 에고를 각성시켜 나갑니다. 치열한 생존 경쟁 속에서 성장하는 스트라이커들의 이야기가 펼쳐집니다.',
                    tags: ['#스포츠', '#축구', '#생존게임', '#성장물', '#배틀물', '#에고이즘', '#이능력'],
                    genres: '스포츠·축구·성장',
                    medium: 'TVA',
                    age: '15',
                    rating: '4.8',
                    rankBadge: '트렌디 축구 애니'
                },
                {
                    image: 'aceofdiamond.png',
                    title: '다이아몬드 에이스',
                    synopsis: '뛰어난 구종을 가지고 있지만 제구력이 없는 투수 \'사와무라 에이지\'는 도쿄의 명문 세이도 고교 야구부에 스카우트됩니다. 엄청난 재능을 가진 동료들 사이에서 에이스 넘버를 쟁취하기 위한 치열한 노력과 성장의 이야기가 펼쳐집니다. 구체적이고 현실적인 야구 묘사와 개성 넘치는 캐릭터들이 매력적인 야구 애니의 명작입니다.',
                    tags: ['#스포츠', '#야구', '#성장물', '#청춘', '#팀워크', '#열혈물', '#학원물'],
                    genres: '스포츠·야구·성장',
                    medium: 'TVA',
                    age: '12',
                    rating: '4.7',
                    rankBadge: '야구 애니 추천작'
                },
                {
                    image: 'chihayafuru.png',
                    title: '치하야후루',
                    synopsis: '어릴 때 카루타 선수 \'아라타\'를 만나 카루타의 매력에 빠진 소녀 \'아야세 치하야\'. 중학교 때 아라타와 헤어진 뒤에도 카루타를 향한 열정을 잃지 않고, 고등학교에 입학해 소꿉친구 \'마치다 타이치\'와 함께 카루타부를 창설합니다. 백인일수(百人一首) 카루타를 소재로 한 청춘 스포츠물로, 섬세한 감정 묘사와 박력 넘치는 경기 장면이 돋보이는 명작입니다. 전통 카드 게임을 둘러싼 청춘과 사랑, 우정의 이야기가 아름답게 펼쳐집니다.',
                    tags: ['#스포츠', '#카루타', '#청춘', '#로맨스', '#성장물', '#우정', '#학원물', '#시詩'],
                    genres: '스포츠·청춘·로맨스',
                    medium: 'TVA',
                    age: '12',
                    rating: '4.9',
                    rankBadge: '스포츠 로맨스 명작'
                },
                {
                    image: 'yurionice.png',
                    title: '유리!!! on ICE',
                    synopsis: '세계 선수권에서 최하위를 기록하고 은퇴를 고민하던 일본의 피겨스케이팅 선수 \'카츠키 유리\'. 유리의 연기에 반한 세계 챔피언 \'빅토르 니키포로프\'가 갑자기 일본으로 날아와 그의 코치를 자처합니다. 두 사람의 인연을 중심으로 각국의 개성 넘치는 스케이터들과 벌이는 그랑프리 시리즈의 여정을 그립니다. 아름다운 빙판 위의 연기와 선수들의 진심 어린 성장이 감동적으로 담겨 있습니다.',
                    tags: ['#스포츠', '#피겨스케이팅', '#성장물', '#BL', '#청춘', '#드라마', '#감동적인'],
                    genres: '스포츠·피겨·드라마',
                    medium: 'TVA',
                    age: '15',
                    rating: '4.8',
                    rankBadge: '피겨 스포츠 애니 1위'
                }
            ]
        },
        'portfolio': {
            hasInfo: true,
            items: [
                {
                    image: 'kaguyasama.png',
                    title: '카구야 님은 고백받고 싶어',
                    synopsis: '명문 수치인 학원의 학생회 회장 \'시로가네 미유키\'와 부회장 \'시노미야 카구야\'. 서로에게 강하게 이끌리고 있음에도 불구하고, 자존심이 너무 강해 먼저 고백하지 못하는 두 천재. 이들은 상대방으로부터 고백을 받아내기 위해 고도의 두뇌 싸움과 연애 공방전을 펼치기 시작합니다. 매화 기발한 심리전과 개성 있는 학생회 멤버들의 일상이 어우러진 러브 코미디 명작입니다.',
                    tags: ['#코미디', '#로맨스', '#일상', '#학원물', '#럽코', '#두뇌싸움', '#심리전'],
                    genres: '코미디·로맨스·학원',
                    medium: 'TVA',
                    age: '15',
                    rating: '4.9',
                    rankBadge: '인기 러브코미디'
                },
                {
                    image: 'toradora.png',
                    title: '토라도라!',
                    synopsis: '겉모습은 무섭지만 사실 순한 소년 \'타이가 료지\'와 작은 체구에 사나운 성격의 소녀 \'아이사카 타이가\'. 서로의 짝사랑을 이루어주기 위해 협력하던 두 사람은 함께 시간을 보내며 점차 진심을 깨달아 가기 시작합니다. 오해와 질투, 솔직하지 못한 감정들이 뒤엉키며 달콤 쌉싸름하게 펼쳐지는 청춘 러브코미디의 명작입니다. 섬세한 감정 묘사와 매력적인 캐릭터들로 로맨스 애니의 정점으로 손꼽힙니다.',
                    tags: ['#로맨스', '#코미디', '#청춘', '#학원물', '#럽코', '#성장물', '#감동적인'],
                    genres: '로맨스·코미디·청춘',
                    medium: 'TVA',
                    age: '15',
                    rating: '4.9',
                    rankBadge: '로맨스 애니 역대 1위'
                },
                {
                    image: 'horimiya.png',
                    title: '호리미야',
                    synopsis: '학교에서는 완벽한 인기 소녀지만 집에서는 가사와 남동생 돌봄에 바쁜 \'호리 쿄코\'. 학교에서는 어둡고 존재감 없는 \'미야무라 이즈미\'는 사실 귀걸이와 문신으로 가득한 다른 면을 숨기고 있습니다. 우연히 서로의 비밀을 알게 된 두 사람은 점차 가까워지며 순수하고 설레는 사랑을 키워나갑니다. 학교 안팎에서 다른 모습을 가진 두 주인공의 자연스럽고 따뜻한 연애를 담은 로맨스 명작입니다.',
                    tags: ['#로맨스', '#학원물', '#일상', '#청춘', '#순정', '#코미디', '#힐링물'],
                    genres: '로맨스·일상·청춘',
                    medium: 'TVA',
                    age: '15',
                    rating: '4.8',
                    rankBadge: '설레는 순정 로맨스'
                },
                {
                    image: 'anohana.png',
                    title: '그 날 본 꽃의 이름을<br>우리는 아직 모른다',
                    synopsis: '어린 시절 소꿉친구들과의 사고로 갑자기 세상을 떠난 \'혼마 메이코(멘마)\'. 몇 년이 지난 후, 은둔하며 살던 \'진탄\'앞에 멘마의 유령이 나타납니다. 뿔뿔이 흩어졌던 소꿉친구들이 다시 모여 멘마의 소원을 이루어주기 위해 함께하면서, 서로 오해하고 미뤄두었던 감정들을 마주하게 됩니다. 잊지 못할 그리움과 슬픔, 그리고 사랑이 뒤섞인 눈물 없이 볼 수 없는 감동 로맨스입니다.',
                    tags: ['#로맨스', '#드라마', '#감동적인', '#청춘', '#우정', '#그리움', '#명작'],
                    genres: '로맨스·드라마·감동',
                    medium: 'TVA',
                    age: '15',
                    rating: '4.9',
                    rankBadge: '최고의 감동 로맨스'
                },
                {
                    image: 'shigatsu.png',
                    title: '4월은 너의 거짓말',
                    synopsis: '천재 피아니스트였지만 어머니의 죽음 이후 건반 소리가 들리지 않게 된 소년 \'아리마 코세이\'. 무채색처럼 변해버린 그의 일상에 바이올리니스트 \'미야조노 카오리\'가 혜성처럼 나타납니다. 자유롭고 화려하게 연주하는 카오리와 함께하며 코세이는 다시 음악을 마주하게 됩니다. 음악과 청춘, 그리고 애잔한 사랑이 아름답게 교차하는, 보는 내내 눈물이 멈추지 않는 감동의 명작입니다.',
                    tags: ['#로맨스', '#음악', '#감동적인', '#드라마', '#청춘', '#피아노', '#명작'],
                    genres: '로맨스·음악·드라마',
                    medium: 'TVA',
                    age: '15',
                    rating: '4.9',
                    rankBadge: '최고 감동 음악 로맨스'
                },
                {
                    image: 'tokikake.png',
                    title: '시간을 달리는 소녀',
                    synopsis: '평범한 여고생 \'마코토\'는 어느 날 우연한 사고로 시간을 뛰어넘는 능력인 \'타임리프\'를 얻게 됩니다. 처음에는 일상의 작은 실수들을 되돌리는 데 사용하지만, 타임리프에는 반드시 대가가 따른다는 것을 깨닫게 됩니다. 절친한 친구 \'치아키\'와의 관계, 그리고 그 속에 숨겨진 비밀이 밝혀지며 가슴 시린 청춘 로맨스가 펼쳐집니다. 세월이 지나도 변치 않는 감동으로 수많은 팬들의 사랑을 받는 로맨스 명작 애니 영화입니다.',
                    tags: ['#로맨스', '#SF', '#청춘', '#타임리프', '#감동적인', '#드라마', '#명작'],
                    genres: '로맨스·SF·청춘',
                    medium: '극장판',
                    age: '12',
                    rating: '4.9',
                    rankBadge: '로맨스 애니 영화 명작'
                },
                {
                    image: 'kimitodoke.png',
                    title: '너에게 닿기를',
                    synopsis: '귀신같은 외모 탓에 친구 사귀기가 어려운 고등학생 \'사와코\'. 반의 인기남 \'카제하야\'만이 그녀에게 밝게 말을 걸어주고, 사와코는 그를 동경하기 시작합니다. 카제하야 역시 순수한 사와코에게 특별한 감정을 느끼지만, 두 사람은 서로의 마음을 몰라 엇갈리기만 합니다. 오해와 순수한 마음이 부딪히는 과정이 너무나 사랑스러운, 순정 로맨스의 정석 같은 작품입니다.',
                    tags: ['#로맨스', '#순정', '#청춘', '#학원물', '#성장물', '#달달함', '#힐링물'],
                    genres: '로맨스·순정·청춘',
                    medium: 'TVA',
                    age: '12',
                    rating: '4.8',
                    rankBadge: '순정 로맨스의 정석'
                },
                {
                    image: 'aonohako.png',
                    title: '푸른 상자',
                    synopsis: '배드민턴부 소속의 소년 \'타이가\'는 같은 학교 농구부의 에이스이자 꿈에서 만난 소녀 \'치나츠\'와 이루어질 수 없는 상황에서 점점 가까워집니다. 두 사람이 우연히 같은 집에서 함께 생활하게 되며 매일 가까이에서 서로를 느끼게 됩니다. 설레는 감정을 감추면서도 진심을 향해 나아가는 두 사람의 청춘이 풋풋하고 아름답게 그려지는 최신 인기 로맨스입니다.',
                    tags: ['#로맨스', '#스포츠', '#청춘', '#학원물', '#동거', '#달달함', '#성장물'],
                    genres: '로맨스·청춘·스포츠',
                    medium: 'TVA',
                    age: '12',
                    rating: '4.8',
                    rankBadge: '최신 인기 청춘 로맨스'
                }
            ]
        },
        'default': {
            hasInfo: false,
            items: [
                { image: 'work1.png' },
                { image: 'work2.png' },
                { image: 'hero.png' }
            ]
        }
    };

    let currentImageIndex = 0;
    let activeStoneData = stoneData['default'];

    // Local states for wishlist and rating stars
    const userRatings = {};
    const userFavorites = {};

    const updateGallery = () => {
        const activeItem = activeStoneData.items[currentImageIndex];
        galleryImg.src = activeItem.image;
        // 접근성: 현재 작품명을 alt 텍스트로 설정 (HTML 태그 제거)
        galleryImg.alt = activeItem.title
            ? activeItem.title.replace(/<[^>]*>/g, '') + ' 포스터 이미지'
            : '애니메이션 갤러리 이미지';
        pageInfo.textContent = `${currentImageIndex + 1} / ${activeStoneData.items.length}`;

        // 🚀 성능 최적화: 이전/다음 사진을 뒤에서 몰래 미리 불러오기 (Preload)
        if (activeStoneData.items.length > 1) {
            const nextIdx = (currentImageIndex + 1) % activeStoneData.items.length;
            const prevIdx = (currentImageIndex - 1 + activeStoneData.items.length) % activeStoneData.items.length;
            const preloadNext = new Image(); preloadNext.src = activeStoneData.items[nextIdx].image;
            const preloadPrev = new Image(); preloadPrev.src = activeStoneData.items[prevIdx].image;
        }

        if (activeStoneData.hasInfo) {
            // Update layout wrapper classes
            galleryContentWrapper.classList.remove('no-info');
            galleryContentWrapper.classList.add('has-info');

            // Populate badge and meta info
            sidebarBadge.textContent = activeItem.rankBadge;
            infoBadge.textContent = activeItem.rankBadge;

            sidebarGenreMedium.textContent = `${activeItem.genres} | ${activeItem.medium}`;
            infoGenreMedium.textContent = `${activeItem.genres} | ${activeItem.medium}`;

            sidebarRatingVal.textContent = activeItem.rating;
            infoRatingVal.textContent = activeItem.rating;

            // Age rating badge mapping
            const age = activeItem.age;
            sidebarAgeBadge.textContent = age;
            infoAgeBadge.textContent = age;
            
            sidebarAgeBadge.className = 'meta-age';
            infoAgeBadge.className = 'meta-age';
            
            if (age === 'All' || age === '전체') {
                sidebarAgeBadge.classList.add('age-all');
                infoAgeBadge.classList.add('age-all');
            } else if (age === '12') {
                sidebarAgeBadge.classList.add('age-12');
                infoAgeBadge.classList.add('age-12');
            } else if (age === '15') {
                sidebarAgeBadge.classList.add('age-15');
                infoAgeBadge.classList.add('age-15');
            } else if (age === '19') {
                sidebarAgeBadge.classList.add('age-19');
                infoAgeBadge.classList.add('age-19');
            }

            // Sync user favorite (wishlist) state
            if (userFavorites[activeItem.title] === undefined) {
                userFavorites[activeItem.title] = localStorage.getItem(`fav_${activeItem.title}`) === 'true';
            }
            const isFav = userFavorites[activeItem.title];
            if (isFav) {
                sidebarFavBtn.classList.add('active');
                sidebarFavBtn.innerHTML = '<span class="heart-icon">♥</span> 찜완료';
            } else {
                sidebarFavBtn.classList.remove('active');
                sidebarFavBtn.innerHTML = '<span class="heart-icon">♡</span> 찜하기';
            }

            // Sync user rating stars state
            if (userRatings[activeItem.title] === undefined) {
                const storedVal = localStorage.getItem(`rating_${activeItem.title}`);
                userRatings[activeItem.title] = storedVal ? parseInt(storedVal) : 0;
            }
            const userRating = userRatings[activeItem.title];
            const stars = sidebarStars.querySelectorAll('.star');
            stars.forEach((star, idx) => {
                if (idx < userRating) {
                    star.classList.add('active');
                } else {
                    star.classList.remove('active');
                }
            });

            // Populate sidebar title (innerHTML to support <br> line breaks)
            sidebarTitle.innerHTML = activeItem.title;

            // Truncate synopsis and append button inline
            const maxChars = 110;
            if (activeItem.synopsis.length > maxChars) {
                sidebarSynopsis.textContent = activeItem.synopsis.slice(0, maxChars) + '...';
                moreBtn.style.display = 'inline';
            } else {
                sidebarSynopsis.textContent = activeItem.synopsis;
                moreBtn.style.display = 'none';
            }

            // Populate sidebar tags
            sidebarTags.innerHTML = '';
            activeItem.tags.forEach(tag => {
                const span = document.createElement('span');
                span.className = 'info-tag';
                span.textContent = tag;
                sidebarTags.appendChild(span);
            });

            // Pre-populate modal overlay content in case "...더 보기" is clicked
            infoTitle.innerHTML = activeItem.title;
            infoSynopsis.textContent = activeItem.synopsis;
            infoTagsContainer.innerHTML = '';
            activeItem.tags.forEach(tag => {
                const span = document.createElement('span');
                span.className = 'info-tag';
                span.textContent = tag;
                infoTagsContainer.appendChild(span);
            });
        } else {
            galleryContentWrapper.classList.remove('has-info');
            galleryContentWrapper.classList.add('no-info');
        }

        console.log('Gallery updated to image:', currentImageIndex);
    };

    // Use event delegation for better reliability
    document.addEventListener('click', (e) => {
        const stone = e.target.closest('.stone');
        if (stone) {
            // Board stone → open bulletin board
            if (stone.classList.contains('board-stone')) {
                openBoard();
                return;
            }

            // Link stone → open external link
            if (stone.classList.contains('link-stone')) {
                const link = stone.querySelector('a.stone-link');
                if (link) {
                    window.open(link.href, '_blank', 'noopener,noreferrer');
                }
                return;
            }

            // Info stone → do nothing on click
            if (stone.classList.contains('info-stone')) {
                return;
            }

            console.log('Stone clicked:', stone.id || 'unnamed stone');
            const stoneId = stone.id || 'default';
            activeStoneData = stoneData[stoneId] || stoneData['default'];
            currentImageIndex = 0;

            // Show/Hide Prev/Next buttons based on number of items
            if (activeStoneData.items.length <= 1) {
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
            } else {
                prevBtn.style.display = 'block';
                nextBtn.style.display = 'block';
            }

            galleryOverlay.classList.add('active');
            document.body.classList.add('gallery-active'); // Track gallery state
            updateGallery();
            cursor.style.scale = '1'; // Reset cursor
        }
    });

    backBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        galleryOverlay.classList.remove('active');
        document.body.classList.remove('gallery-active'); // Clear gallery state
        console.log('Gallery closed');
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + activeStoneData.items.length) % activeStoneData.items.length;
        updateGallery();
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % activeStoneData.items.length;
        updateGallery();
    });

    // ── 키보드 접근성: 방향키 탐색 + ESC 닫기 ────────────────
    document.addEventListener('keydown', (e) => {
        // 텍스트 입력 중에는 무시
        const tag = document.activeElement.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;

        const galleryOpen = galleryOverlay.classList.contains('active');
        const boardOpen   = boardOverlay.classList.contains('active');
        const infoOpen    = infoOverlay.classList.contains('active');

        if (e.key === 'Escape') {
            // 우선순위: 정보 모달 → 갤러리 → 게시판
            if (infoOpen) {
                infoOverlay.classList.remove('active');
            } else if (galleryOpen) {
                galleryOverlay.classList.remove('active');
                document.body.classList.remove('gallery-active');
            } else if (boardOpen) {
                boardOverlay.classList.remove('active');
                document.body.classList.remove('gallery-active');
            }
            return;
        }

        if (galleryOpen && !infoOpen) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                currentImageIndex = (currentImageIndex - 1 + activeStoneData.items.length) % activeStoneData.items.length;
                updateGallery();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                currentImageIndex = (currentImageIndex + 1) % activeStoneData.items.length;
                updateGallery();
            }
        }
    });

    // Info Modal Event Listeners
    moreBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        infoOverlay.classList.add('active');
        console.log('Info modal opened via sidebar moreBtn');
    });

    infoCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        infoOverlay.classList.remove('active');
        console.log('Info modal closed');
    });

    // Close info modal when clicking outside the card
    infoOverlay.addEventListener('click', (e) => {
        if (e.target === infoOverlay) {
            infoOverlay.classList.remove('active');
        }
    });

    // Favorite ("찜하기") click handler
    sidebarFavBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const activeItem = activeStoneData.items[currentImageIndex];
        if (!activeItem) return;

        const isFav = !userFavorites[activeItem.title];
        userFavorites[activeItem.title] = isFav;
        localStorage.setItem(`fav_${activeItem.title}`, isFav);

        // Update UI
        if (isFav) {
            sidebarFavBtn.classList.add('active');
            sidebarFavBtn.innerHTML = '<span class="heart-icon">♥</span> 찜완료';
        } else {
            sidebarFavBtn.classList.remove('active');
            sidebarFavBtn.innerHTML = '<span class="heart-icon">♡</span> 찜하기';
        }
    });

    // Star Rating Click & Hover handlers
    sidebarStars.addEventListener('click', (e) => {
        e.stopPropagation();
        const star = e.target.closest('.star');
        if (!star) return;

        const value = parseInt(star.getAttribute('data-value'));
        const activeItem = activeStoneData.items[currentImageIndex];
        if (!activeItem) return;

        userRatings[activeItem.title] = value;
        localStorage.setItem(`rating_${activeItem.title}`, value);

        // Update UI
        const stars = sidebarStars.querySelectorAll('.star');
        stars.forEach((s, idx) => {
            if (idx < value) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    });

    sidebarStars.addEventListener('mouseover', (e) => {
        const star = e.target.closest('.star');
        if (!star) return;
        const value = parseInt(star.getAttribute('data-value'));
        const stars = sidebarStars.querySelectorAll('.star');
        stars.forEach((s, idx) => {
            if (idx < value) {
                s.classList.add('hover');
            } else {
                s.classList.remove('hover');
            }
        });
    });

    sidebarStars.addEventListener('mouseout', (e) => {
        const stars = sidebarStars.querySelectorAll('.star');
        stars.forEach(s => s.classList.remove('hover'));
    });

    // Hover interactions for cursor scaling using event delegation
    document.addEventListener('mouseover', (e) => {
        const target = e.target.closest('.stone, .gallery-btn, #info-close-btn, #more-btn, #sidebar-fav-btn, .star');
        if (target) {
            cursor.style.scale = '1.5';
            console.log('Hovering over:', target.id || target.className);
        }
    });

    document.addEventListener('mouseout', (e) => {
        const target = e.target.closest('.stone, .gallery-btn, #info-close-btn, #more-btn, #sidebar-fav-btn, .star');
        if (target) {
            cursor.style.scale = '1';
        }
    });

    // ── Board (자유게시판) Logic ──────────────────────────────
    const boardOverlay  = document.getElementById('board-overlay');
    const boardBackBtn  = document.getElementById('board-back-btn');
    const writeBtn      = document.getElementById('write-btn');
    const submitPostBtn = document.getElementById('submit-post-btn');
    const cancelWriteBtn= document.getElementById('cancel-write-btn');
    const backToListBtn = document.getElementById('back-to-list-btn');
    const deletePostBtn = document.getElementById('delete-post-btn');

    let currentPostId = null;
    let currentPosts = []; // Store posts in memory

    function openBoard() {
        boardOverlay.classList.add('active');
        document.body.classList.add('gallery-active');
        showListView();
    }
    function closeBoard() {
        boardOverlay.classList.remove('active');
        document.body.classList.remove('gallery-active');
    }

    function setView(viewId) {
        ['board-list-view','board-write-view','board-detail-view'].forEach(id => {
            document.getElementById(id).classList.remove('active');
        });
        document.getElementById(viewId).classList.add('active');
    }

    async function showListView() {
        setView('board-list-view');
        await renderPostList();
    }
    function showWriteView() {
        setView('board-write-view');
        document.getElementById('post-title-input').value   = '';
        document.getElementById('post-author-input').value  = '';
        document.getElementById('post-content-input').value = '';
    }
    function showDetailView(postId) {
        const post = currentPosts.find(p => p.id === postId);
        if (!post) return;
        currentPostId = postId;
        setView('board-detail-view');
        document.getElementById('detail-title').textContent   = post.title;
        document.getElementById('detail-author').textContent  = '✍️ ' + post.author;
        document.getElementById('detail-date').textContent    = '📅 ' + post.date;
        document.getElementById('detail-content').textContent = post.content;
    }

    async function renderPostList() {
        const listEl   = document.getElementById('post-list');
        const emptyEl  = document.getElementById('post-empty');
        listEl.innerHTML = '<div style="text-align: center; padding: 40px; color: rgba(255,255,255,0.6);">데이터를 불러오는 중입니다...</div>';
        
        try {
            const querySnapshot = await db.collection("posts").orderBy("createdAt", "desc").get();
            
            currentPosts = [];
            querySnapshot.forEach((doc) => {
                currentPosts.push({ id: doc.id, ...doc.data() });
            });

            listEl.innerHTML = '';
            if (currentPosts.length === 0) { 
                emptyEl.style.display = 'block'; 
                return; 
            }
            emptyEl.style.display = 'none';
            
            currentPosts.forEach((post, idx) => {
                const item = document.createElement('div');
                item.className = 'post-item';
                item.innerHTML = `
                    <span class="post-num">${currentPosts.length - idx}</span>
                    <span class="post-title-text">${post.title}</span>
                    <span class="post-author-cell">${post.author}</span>
                    <span class="post-date-cell">${post.date}</span>`;
                item.addEventListener('click', (e) => { e.stopPropagation(); showDetailView(post.id); });
                listEl.appendChild(item);
            });
        } catch (error) {
            console.error("Error fetching posts:", error);
            listEl.innerHTML = '<div style="text-align: center; padding: 40px; color: rgba(255,100,100,0.8);">데이터를 불러오는 데 실패했습니다.</div>';
        }
    }

    // Board event listeners
    boardBackBtn.addEventListener('click',  (e) => { e.stopPropagation(); closeBoard(); });
    writeBtn.addEventListener('click',      (e) => { e.stopPropagation(); showWriteView(); });
    cancelWriteBtn.addEventListener('click',(e) => { e.stopPropagation(); showListView(); });
    backToListBtn.addEventListener('click', (e) => { e.stopPropagation(); showListView(); });

    submitPostBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const title   = document.getElementById('post-title-input').value.trim();
        const author  = document.getElementById('post-author-input').value.trim() || '익명';
        const content = document.getElementById('post-content-input').value.trim();
        if (!title || !content) { alert('제목과 내용을 입력해주세요.'); return; }
        
        submitPostBtn.disabled = true;
        submitPostBtn.textContent = '등록 중...';
        
        try {
            await db.collection("posts").add({
                title,
                author,
                content,
                date: new Date().toLocaleDateString('ko-KR'),
                createdAt: Date.now()
            });
            await showListView();
        } catch (error) {
            console.error("Error adding post:", error);
            alert("글 등록에 실패했습니다.");
        } finally {
            submitPostBtn.disabled = false;
            submitPostBtn.textContent = '등록하기';
        }
    });

    deletePostBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (!confirm('이 게시글을 삭제하시겠습니까?')) return;
        
        deletePostBtn.disabled = true;
        deletePostBtn.textContent = '삭제 중...';
        
        try {
            await db.collection("posts").doc(currentPostId).delete();
            await showListView();
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("글 삭제에 실패했습니다.");
        } finally {
            deletePostBtn.disabled = false;
            deletePostBtn.textContent = '🗑️ 삭제';
        }
    });

    // ── TOP Button Logic ──
    const topBtn = document.getElementById('top-btn');
    if (topBtn) {
        window.addEventListener('scroll', () => {
            // Show button when scrolled down 200px
            if (window.scrollY > 200) {
                topBtn.classList.add('visible');
            } else {
                topBtn.classList.remove('visible');
            }
        });

        topBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});


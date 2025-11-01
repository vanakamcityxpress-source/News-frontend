import NewsImg from "../assets/news1.jpg";
import TamilNaduImg from "../assets/news/news1.avif";
import PoliticsImg from "../assets/news/news2.webp";
import WorldImg from "../assets/news/news3.webp";
import HealthImg from "../assets/news/news4.jpg";
import SportsImg from "../assets/news/news5.webp";
import EconImg from "../assets/news/news6.webp";
import EducationImg from "../assets/news/news7.jpg";
import GreenCityImg from "../assets/news/news1.avif";

export interface Article {
  videoUrl: any;
  id: string;
  slug: string;
  image: string;
  category: string;
  title: string;
  description: string;
  categoryColor: string;
  author: string;
  date: string;
  content: {
    paragraphs: string[];
    quote?: string;
    images?: string[];
  };
  tags: string[];
}

export const articles: Article[] = [
  {
    id: "1",
    slug: "chennai-rain-updates",
    image: TamilNaduImg,
    category: "தமிழ்நாடு",
    title: "சென்னையில் கனமழை: பல்வேறு இடங்களில் நீர்மட்டம் உயர்வு",
    description: "சென்னையில் நேற்று இரவு பெய்த கனமழையால் சாலைகளில் தண்ணீர் தேங்கி உள்ளது.",
    categoryColor: "blue",
    author: "சிட்டி எக்ஸ்பிரஸ் நிருபர்",
    date: "அக்டோபர் 18, 2025",
    content: {
      paragraphs: [
        "சென்னையில் நேற்று இரவு தொடங்கிய கனமழை காரணமாக பல இடங்களில் நீர் தேக்கம் ஏற்பட்டுள்ளது.",
        "நகராட்சி ஊழியர்கள் தண்ணீர் வடிகால் பணிகளில் ஈடுபட்டு வருகின்றனர்.",
        "மழை மேலும் தொடரும் வாய்ப்பு இருப்பதாக வானிலை மையம் அறிவித்துள்ளது.",
      ],
      quote: "சென்னையர்கள் கவனமாக இருக்குமாறு அதிகாரிகள் வேண்டுகோள் விடுத்துள்ளனர்.",
      images: [TamilNaduImg],
    },
    tags: ["சென்னை", "மழை", "தமிழ்நாடு"],
    videoUrl: undefined
  },
  {
    id: "2",
    slug: "india-election-news",
    image: PoliticsImg,
    category: "அரசியல்",
    title: "அடுத்த பொதுத்தேர்தல் அறிவிப்பு விரைவில்",
    description: "தேர்தல் ஆணையம் அடுத்த பொதுத்தேர்தல் குறித்து ஆலோசனை நடத்துகிறது.",
    categoryColor: "red",
    author: "சிட்டி எக்ஸ்பிரஸ் அரசியல் நிருபர்",
    date: "அக்டோபர் 18, 2025",
    content: {
      paragraphs: [
        "தேர்தல் ஆணையம் அடுத்த பொதுத்தேர்தலுக்கான அட்டவணையை விரைவில் அறிவிக்கவுள்ளது.",
        "மாநில அளவிலான ஆய்வுகள் முடிந்துள்ளன என்று அதிகாரிகள் தெரிவித்தனர்.",
      ],
      quote: "நியாயமான மற்றும் வெளிப்படையான தேர்தலை உறுதி செய்வோம்.",
      images: [PoliticsImg],
    },
    tags: ["தேர்தல்", "அரசியல்", "இந்தியா"],
    videoUrl: undefined
  },
  {
    id: "3",
    slug: "world-peace-conference",
    image: WorldImg,
    category: "உலகம்",
    title: "உலக அமைதி மாநாடு ஜெனீவாவில் துவங்கியது",
    description: "உலக நாடுகள் பங்கேற்கும் அமைதி மாநாடு இன்று ஜெனீவாவில் துவங்கியது.",
    categoryColor: "blue",
    author: "சிட்டி எக்ஸ்பிரஸ் சர்வதேச நிருபர்",
    date: "அக்டோபர் 18, 2025",
    content: {
      paragraphs: [
        "உலக நாடுகளின் தலைவர்கள் மற்றும் பிரதிநிதிகள் கலந்து கொண்டுள்ளனர்.",
        "மாநாட்டில் உலக அமைதி, பொருளாதார ஒத்துழைப்பு உள்ளிட்டவை குறித்து விவாதம் நடைபெறுகிறது.",
      ],
      quote: "உலக அமைதி அனைவருக்கும் தேவையானது.",
      images: [WorldImg],
    },
    tags: ["உலகம்", "அமைதி", "சர்வதேசம்"],
    videoUrl: undefined
  },
  {
    id: "4",
    slug: "health-awareness-camp",
    image: HealthImg,
    category: "ஆரோக்கியம்",
    title: "ஆரோக்கிய விழிப்புணர்வு முகாம் தொடங்கியது",
    description: "சுகாதாரத்துறை சார்பில் ஆரோக்கிய முகாம் இன்று தொடங்கியது.",
    categoryColor: "green",
    author: "சிட்டி எக்ஸ்பிரஸ் ஆரோக்கிய நிருபர்",
    date: "அக்டோபர் 18, 2025",
    content: {
      paragraphs: [
        "சுகாதாரத்துறை சார்பில் அனைத்து மாவட்டங்களிலும் ஆரோக்கிய முகாம் தொடங்கப்பட்டது.",
        "மக்களுக்கு இலவச சிகிச்சை மற்றும் மருத்துவ ஆலோசனை வழங்கப்படுகிறது.",
      ],
      quote: "ஆரோக்கியமான மக்கள் தான் ஆரோக்கியமான நாடு.",
      images: [HealthImg],
    },
    tags: ["ஆரோக்கியம்", "மருத்துவம்", "விழிப்புணர்வு"],
    videoUrl: undefined
  },
  {
    id: "5",
    slug: "sports-victory-match",
    image: SportsImg,
    category: "விளையாட்டு",
    title: "இந்திய அணி வெற்றி: ரசிகர்கள் உற்சாகம்",
    description: "இந்திய அணி இன்று நடந்த போட்டியில் வெற்றி பெற்றது.",
    categoryColor: "orange",
    author: "சிட்டி எக்ஸ்பிரஸ் விளையாட்டு நிருபர்",
    date: "அக்டோபர் 18, 2025",
    content: {
      paragraphs: [
        "இந்திய அணி இன்று பிரமாண்டமாக வெற்றி பெற்று ரசிகர்களை மகிழ்ச்சியடையச் செய்தது.",
        "முக்கிய வீரர்கள் தங்கள் சிறந்த ஆட்டத்தால் அணிக்கு வெற்றியை வழங்கினர்.",
      ],
      quote: "விளையாட்டில் ஒற்றுமையும் முயற்சியும் முக்கியம்.",
      images: [SportsImg],
    },
    tags: ["விளையாட்டு", "இந்தியா", "போட்டி"],
    videoUrl: undefined
  },
  {
    id: "6",
    slug: "economy-growth-report",
    image: EconImg,
    category: "பொருளாதாரம்",
    title: "இந்திய பொருளாதாரம் 7.5% வளர்ச்சி அடைந்தது",
    description: "பொருளாதார வல்லுநர்கள் புதிய வளர்ச்சியை பாராட்டுகின்றனர்.",
    categoryColor: "blue",
    author: "சிட்டி எக்ஸ்பிரஸ் பொருளாதார நிருபர்",
    date: "அக்டோபர் 18, 2025",
    content: {
      paragraphs: [
        "இந்திய பொருளாதாரம் கடந்த ஆண்டு 7.5% வளர்ச்சி கண்டுள்ளது.",
        "விவசாயம், தொழில் மற்றும் சேவை துறைகள் சிறப்பாக செயல்பட்டுள்ளன.",
      ],
      quote: "வளர்ச்சி தொடர்ந்தால் புதிய வேலைவாய்ப்புகள் உருவாகும்.",
      images: [EconImg],
    },
    tags: ["பொருளாதாரம்", "வளர்ச்சி", "இந்தியா"],
    videoUrl: undefined
  },
  {
    id: "7",
    slug: "education-digital-learning",
    image: EducationImg,
    category: "கல்வி",
    title: "மாணவர்களுக்கு டிஜிட்டல் கல்வி திட்டம் அறிமுகம்",
    description: "பள்ளி மாணவர்களுக்கு டிஜிட்டல் கல்வி வளங்கள் வழங்கப்படும்.",
    categoryColor: "red",
    author: "சிட்டி எக்ஸ்பிரஸ் கல்வி நிருபர்",
    date: "அக்டோபர் 18, 2025",
    content: {
      paragraphs: [
        "மாணவர்களுக்கு டிஜிட்டல் கல்வி வழங்கும் புதிய திட்டம் அறிமுகம் செய்யப்பட்டுள்ளது.",
        "இது மூலம் ஆன்லைன் வகுப்புகள், பாடக்குறிப்புகள் மற்றும் தன்னிலை மதிப்பீடு கிடைக்கும்.",
      ],
      quote: "டிஜிட்டல் கல்வி மாணவர்களின் கற்றல் அனுபவத்தை மேம்படுத்தும்.",
      images: [EducationImg],
    },
    tags: ["கல்வி", "டிஜிட்டல்", "மாணவர்கள்"],
    videoUrl: undefined
  },
  {
    id: "8",
    slug: "environment-clean-city",
    image: GreenCityImg,
    category: "சுற்றுச்சூழல்",
    title: "சுத்தமான நகரம் திட்டம் துவக்கம்",
    description: "சுற்றுச்சூழல் பாதுகாப்புக்காக புதிய திட்டம் தொடங்கப்பட்டது.",
    categoryColor: "green",
    author: "சிட்டி எக்ஸ்பிரஸ் நிருபர்",
    date: "அக்டோபர் 18, 2025",
    content: {
      paragraphs: [
        "நகரங்களில் சுத்தம் மற்றும் மரநடுதல் பணிகள் நடைபெறுகின்றன.",
        "சுற்றுச்சூழல் பாதுகாப்பு குறித்து விழிப்புணர்வு நிகழ்ச்சிகள் நடத்தப்படுகின்றன.",
      ],
      quote: "சுற்றுச்சூழலை பாதுகாப்பதே நம் கடமை.",
      images: [GreenCityImg],
    },
    tags: ["சுற்றுச்சூழல்", "நகர்", "பசுமை"],
    videoUrl: undefined
  },
  {
    id: "9",
    slug: "india-sports-championship",
    image: SportsImg,
    category: "விளையாட்டு",
    title: "இந்திய அணியின் வீரர்கள் வெற்றி பெற்றனர்",
    description: "சாம்பியன்ஷிப் போட்டியில் இந்திய அணியினர் பிரமாண்ட வெற்றி பெற்றனர்.",
    categoryColor: "red",
    author: "சிட்டி எக்ஸ்பிரஸ் விளையாட்டு நிருபர்",
    date: "அக்டோபர் 18, 2025",
    content: {
      paragraphs: [
        "இன்று நடைபெற்ற சாம்பியன்ஷிப் போட்டியில் இந்திய அணியினர் முதன்மை வெற்றியை பதிவு செய்தனர்.",
        "ரசிகர்கள் உற்சாகத்தில் திளைத்தனர், போட்டி மிகவும் திடுக்கிடும் தருணங்களை கொடுத்தது.",
      ],
      quote: "இந்த வெற்றி இந்திய விளையாட்டின் பெருமை.",
      images: [SportsImg],
    },
    tags: ["விளையாட்டு", "இந்தியா", "போட்டி"],
    videoUrl: undefined
  },
  {
    id: "10",
    slug: "chennai-economic-growth",
    image: EconImg,
    category: "பொருளாதாரம்",
    title: "பொது பொருளாதார வளர்ச்சி நகரத்தில் வேகமடைகிறது",
    description: "பங்குச் சந்தை உயர்வுடன் தொழில் வளர்ச்சி புதிய நிலையை அடைந்துள்ளது.",
    categoryColor: "blue",
    author: "சிட்டி எக்ஸ்பிரஸ் பொருளாதார நிருபர்",
    date: "அக்டோபர் 18, 2025",
    content: {
      paragraphs: [
        "சென்னை பங்குச் சந்தை இன்று உயர்வை கண்டது. தொழிற்சாலை மற்றும் சிறிய வணிகங்கள் வளர்ச்சியை அனுபவித்தன.",
        "புதிய முதலீட்டுகள் நகரத்தின் பொருளாதார முன்னேற்றத்தை உறுதி செய்யும் என்று நிபுணர்கள் கூறுகின்றனர்.",
      ],
      quote: "பொருளாதார வளர்ச்சி மக்களின் வாழ்க்கைத் தரத்தை உயர்த்துகிறது.",
      images: [EconImg],
    },
    tags: ["பொருளாதாரம்", "முதலீடு", "நகர் வளர்ச்சி"],
    videoUrl: undefined
  },
  {
    id: "11",
    slug: "new-education-scheme",
    image: EducationImg,
    category: "கல்வி",
    title: "மத்திய அரசு புதிய கல்வி திட்டம் அறிவித்தது",
    description: "மாணவர்களுக்கு தரமான கல்வி மற்றும் வளங்கள் வழங்கும் புதிய திட்டம்.",
    categoryColor: "red",
    author: "சிட்டி எக்ஸ்பிரஸ் நிருபர்",
    date: "அக்டோபர் 18, 2025",
    content: {
      paragraphs: [
        "மத்திய அரசு மாணவர்களுக்கு உதவும் புதிய கல்வி திட்டத்தை இன்று அறிவித்துள்ளது.",
        "இந்த திட்டத்தின் மூலம் பள்ளி மாணவர்கள் நேர்த்தியான கல்வி, கல்வி வளங்கள் மற்றும் ஆதரவான சூழலைப் பெறுவர்.",
        "ஆசிரியர்கள் பயிற்சிகள் மற்றும் பாடத்திட்ட மேம்பாடுகள் மூலம் மாணவர்களின் திறன்களை வளர்க்க உதவும்.",
      ],
      quote: "கல்வி ஒவ்வொரு குழந்தைக்கும் அடிப்படை உரிமை.",
      images: [EducationImg],
    },
    tags: ["கல்வி", "அரசு திட்டம்", "மாணவர்கள்"],
    videoUrl: undefined
  },
  {
    id: "12",
    slug: "green-city-initiative",
    image: GreenCityImg,
    category: "சுற்றுச்சூழல்",
    title: "சுற்றுச்சூழல் பாதுகாப்பு: பசுமை நகரம் திட்டம் தொடங்கியது",
    description: "பசுமை நகரம் திட்டம் மூலம் நகரம் சுத்தமாகவும் ஆரோக்கியமாகவும் மாறும்.",
    categoryColor: "blue",
    author: "சிட்டி எக்ஸ்பிரஸ் நிருபர்",
    date: "அக்டோபர் 18, 2025",
    content: {
      paragraphs: [
        "நகரத்தில் பசுமை நகரம் திட்டம் இன்று செயல்படுத்தப்பட்டது. இதன் மூலம் பொதுமக்களுக்கு தண்ணீர், காற்று மற்றும் நில வளங்கள் பாதுகாப்பாக இருக்கும்.",
        "மரங்கள் நடும் பணிகள், பூங்கா பராமரிப்பு மற்றும் சுற்றுச்சூழல் விழிப்புணர்வு நிகழ்ச்சிகள் நடைபெறுகின்றன.",
      ],
      quote: "பசுமை நகரம் திட்டம் — ஆரோக்கியமான எதிர்காலத்தின் அடித்தளம்.",
      images: [GreenCityImg],
    },
    tags: ["சுற்றுச்சூழல்", "நகர்", "பசுமை"],
    videoUrl: undefined
  },
];

export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find((article) => article.slug === slug);
};

export const getRelatedArticles = (
  currentArticleId: string,
  category: string,
  limit: number = 3
): Article[] => {
  const sameCategory = articles.filter(
    (article) => article.id !== currentArticleId && article.category === category
  );

  if (sameCategory.length === 0) {
    return articles.filter((article) => article.id !== currentArticleId).slice(0, limit);
  }

  return sameCategory.slice(0, limit);
};

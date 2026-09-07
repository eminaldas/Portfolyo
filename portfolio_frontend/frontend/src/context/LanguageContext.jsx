import React, { createContext, useState, useContext } from 'react';

const translations = {
  en: {
    nav: {
      works: "Works",
      tech: "Tech",
      about: "About",
      career: "Career",
      contact: "Contact",
      resume: "Resume",
      skills: "Skills",
    },

    
    hero: {
      location: "Istanbul, Turkey",
      titleTop: "MUHAMMED",
      titleBottom: "EMİN ALDAŞ",
      description: "A Full-Stack Engineer building AI-powered systems in production and scalable web applications.",
      github: "View GitHub",
      connect: "Let's Connect",
      codeProfile: {
        role: "Full-Stack Software Engineer",
        status: "Open to Work",
        comment: "Let's build something exceptional"
      }
    },
    now: {
      label: 'Currently',
      buildingLabel: 'Building',
      buildingValue: 'Semantic Retrieval Engine — hybrid vector + graph RAG',
      learningLabel: 'Learning',
      learningValue: 'React Native, mobile UX & performance',
      seekingLabel: 'Seeking',
      seekingValue: 'Junior Full-Stack / AI Engineering role',
    },
    manifesto: {
      label: '— Vision',
      lines: [
        { text: 'IT Audit to AI —',          muted: false, serif: false },
        { text: 'Crafted, Not Built.',       muted: true,  serif: true  },
        { text: 'clean code,',              muted: false, serif: false },
        { text: 'Build. Ship. Repeat.',     muted: true,  serif: true  },
        { text: 'production systems,',      muted: false, serif: false },
        { text: 'AI-Driven, Human-Coded.',  muted: true,  serif: true  },
        { text: 'purposeful engineering.',  muted: false, serif: false },
        { text: 'Systems That Scale.',      muted: true,  serif: true  },
      ],
    },
    bento: {
      eduLabel: "Education",
      eduTitle: "Software Engineering",
      eduDesc: "Graduated in Software Engineering from Beykoz University, having built analytical thinking and problem-solving skills.",
      workLabel: "Work Experience",
      workRole: "IT AUDIT ASSISTANT",
      interestLabel: "Current interests",
      techLabel: "Core Technologies",
      techTitle: "Full-Stack Flow",
    },
    about: {
      developerRole: "DEVELOPER",
      mission: "Writing clean, efficient code",
      vibe: "curious · solution-focused",
      learning: "Currently learning and building side projects",
      title1: "Passionate about software and ",
      title2: "solving problems.",
      desc1: "As a software engineer, I love exploring new technologies and building projects ranging from NLP-powered fake news detection systems to hybrid graph/vector RAG engines.",
      desc2: "During my roles at Aras Kargo, I have contributed to developing full-stack web applications to help digitize internal processes. I focus on writing maintainable and clean code using Python, React, and PostgreSQL.",
      technicalArsenal: "Technical Arsenal",
    },
    career: {
      label: "My Journey",
      title1: "EXPERIENCE",
      role1: "IT Audit Assistant",
      desc1: "Contributed to AuditFlow & LawChatBot projects, digitizing internal audit findings and legal processes using a React and FastAPI-based full-stack architecture. Worked on a rule-based legal assistant chatbot and implemented responsive interfaces for teams.",
      role2: "IT Assistant",
      desc2: "Worked on the Tracky Project, participating in Backend development (Flask) for a web platform tracking branch inventory and request management. Developed RESTful APIs and optimized MongoDB database schemas.",
      role3: "Core Team — Social Media & Design Lead",
      org3: "GDG Beykoz (formerly GDSC)",
      desc3: "Led the Social Media & Design team at Google Developer Student Clubs Beykoz University. Produced event visuals and content for Instagram, X, and LinkedIn. Handled video editing, presentation design, and event organization. Participated in DevFest '23 and DevFest '24.",
    },
    skills: {
      title: 'Skills',
      label: 'Technologies I work with',
    },
    works: {
      label: "My Work",
      title: "PROJECTS",
      desc: "A selection of my recent personal and academic projects.",
      view: "VIEW",
      p0Title: "Semantic Retrieval Engine — Hybrid Graph RAG",
      p0Desc:  "Built from scratch without LangChain or CrewAI: semantically chunks technical documents, stores concepts in both a vector store (Qdrant) and a knowledge graph (Neo4j), and resolves contradictions between document versions through a multi-agent thesis/antithesis/judge self-correction loop.",
      p1Title: "NeHaber — Fake News Detection",
      p1Desc:  "Fake news detection with BERTurk + TF-IDF hybrid model, Celery/Redis async NLP pipeline, pgvector semantic search. Live at nehaber.dev. Paper accepted and presented at ICAIRA 2026, Istanbul.",
      p1Achievement: "Presented at ICAIRA 2026",
      p1Paper: "Read Paper",
      p1Details: [
        { label: "Conference",  value: "ICAIRA 2026, Istanbul — paper accepted & presented" },
        { label: "Paper",       value: "“nehaber.dev: A BERT-Based Feature-Level Hybrid Platform for Turkish Fake News Detection” — M. E. Aldaş, İ. Garip (Beykoz University)" },
        { label: "Result",      value: "87.27% accuracy, 0.8724 Macro-F1 (5-fold stratified CV, n=3,764)" },
        { label: "Architecture", value: "FastAPI + Celery + Redis async pipeline" },
        { label: "NLP",         value: "BERTurk + TF-IDF hybrid ensemble model" },
        { label: "Database",    value: "PostgreSQL + pgvector semantic search" },
        { label: "Deploy",      value: "Docker Compose, live in production" },
      ],
      p2Title: "Beavask — Task Manager",
      p2Desc:  "Angular frontend architecture for a task & workflow management system. Nominated for award at the university engineering exhibition.",
      award:   "Award Nominee",
    },
    contact: {
      label: "Let's Connect",
      title1: "Let's build ",
      title2: "something great.",
      desc: "Currently open for full-time roles and freelance opportunities.",
      formName: "Full Name",
      formEmail: "Email Address",
      formMessage: "Message",
      formPlaceholderName: "John Doe",
      formPlaceholderMsg: "Hi Emin, I would like to talk about...",
      sendBtn: "Send Message",
      getInTouch: "Get in Touch",
      aroundWeb: "Around the Web",
      availability: "Available for freelance & full-time roles"
    },
    footer: {
      madeWith: "Built with precision."
    }
  },
  tr: {
    nav: {
      works: "Projeler",
      tech: "Yetenekler",
      about: "Hakkımda",
      career: "Deneyim",
      contact: "İletişim",
      resume: "Özgeçmiş",
      skills: "Yetenekler",
    },
    hero: {
      location: "İstanbul, Türkiye",
      titleTop: "MUHAMMED",
      titleBottom: "EMİN ALDAŞ",
      description: "Üretimde çalışan yapay zeka sistemleri ve ölçeklenebilir web uygulamaları geliştiren Full-Stack Mühendis.",
      github: "GitHub'ı İncele",
      connect: "İletişime Geç",
      codeProfile: {
        role: "Full-Stack Yazılım Mühendisi",
        status: "Yeni Fırsatlara Açık",
        comment: "Birlikte harika işler çıkaralım"
      }
    },
    now: {
      label: 'Şu An',
      buildingLabel: 'Yapıyor',
      buildingValue: 'Semantic Retrieval Engine — hibrit vektör + graf RAG',
      learningLabel: 'Öğreniyor',
      learningValue: 'React Native, mobil UX ve performans',
      seekingLabel: 'Arıyor',
      seekingValue: 'Junior Full-Stack / YZ Mühendisliği pozisyonu',
    },
    manifesto: {
      label: '— Vizyon',
      lines: [
        { text: 'IT Denetiminden Yapay Zekaya —', muted: false, serif: false },
        { text: 'Ustalıkla Yazılmış.',            muted: true,  serif: true  },
        { text: 'temiz kod,',                     muted: false, serif: false },
        { text: 'Yap. Gönder. Tekrarla.',         muted: true,  serif: true  },
        { text: 'üretimde çalışan sistemler,',    muted: false, serif: false },
        { text: 'YZ Destekli, İnsan Kodlaması.',  muted: true,  serif: true  },
        { text: 'her kod bir karar.',              muted: false, serif: false },
        { text: 'Ölçeklenen Sistemler.',           muted: true,  serif: true  },
      ],
    },
    bento: {
      eduLabel: "Eğitim",
      eduTitle: "Yazılım Mühendisliği",
      eduDesc: "Beykoz Üniversitesi Yazılım Mühendisliği'nden mezun oldu, analitik yaklaşım ve problem çözme becerilerini bu süreçte geliştirdi.",
      workLabel: "İş Deneyimi",
      workRole: "BT DENETİM ASİSTANI",
      interestLabel: "Güncel İlgi Alanları",
      techLabel: "Temel Teknolojiler",
      techTitle: "Full-Stack Akışı",
    },
    about: {
      developerRole: "GELİŞTİRİCİ",
      mission: "Temiz ve verimli kod yazmak",
      vibe: "meraklı · çözüm odaklı",
      learning: "Sürekli öğreniyor ve yeni projeler geliştiriyorum",
      title1: "Yazılım geliştirmeye ve ",
      title2: "problem çözmeye tutkuluyum.",
      desc1: "Bir yazılım mühendisi olarak, yeni teknolojileri deneyimlemeyi ve NLP algoritmaları ile sahte haber tespitlerinden hibrit graf/vektör RAG motorlarına uzanan projeler üretmeyi seviyorum.",
      desc2: "Aras Kargo'daki görevlerim süresince, kurum süreçlerini dijitalleştiren full-stack uygulamaların geliştirilmesine katkıda bulundum. Python, React ve PostgreSQL gibi teknolojilerle temiz kod üretmeyi benimsiyorum.",
      technicalArsenal: "Teknoloji Cephaneliği",
    },
    career: {
      label: "Kariyer Yolculuğum",
      title1: "DENEYİM",
      role1: "BT Denetim Asistanı",
      desc1: "İç denetim bulgularını ve yasal süreçleri React / FastAPI mimarisiyle dijitalleştiren AuditFlow & LawChatBot projelerinde aktif rol aldım. Kural tabanlı bir asistan sohbet botu kodladım ve ilgili kullanıcılara akıcı arayüzler tasarladım.",
      role2: "BT Asistanı",
      desc2: "Tracky projesi çatısı altında şube envanterini ve personel taleplerini takip eden platformun arka yüzünde (Flask) görev aldım. RESTful mimarisinde servisler yazdım ve MongoDB üzerinden yapılandırmalar sağladım.",
      role3: "Core Team — Sosyal Medya & Tasarım Lideri",
      org3: "GDG Beykoz (önceki adıyla GDSC)",
      desc3: "Google Developer Student Clubs Beykoz Üniversitesi'nde Sosyal Medya ve Tasarım Ekibini yönettim. Instagram, X ve LinkedIn için etkinlik görselleri ve içerikler ürettim. Video düzenleme, sunum tasarımı ve etkinlik organizasyonunda aktif rol aldım. DevFest '23 ve DevFest '24'e katıldım.",
    },
    skills: {
      title: 'Yetenekler',
      label: 'Kullandığım teknolojiler',
    },
    works: {
      label: "Çalışmalarım",
      title: "PROJELER",
      desc: "Yakın zamandaki kişisel ve akademik projelerimden bir seçki.",
      view: "İNCELE",
      p0Title: "Semantic Retrieval Engine — Hibrit Graf RAG",
      p0Desc:  "LangChain veya CrewAI kullanmadan sıfırdan yazıldı: teknik dokümanları anlamsal olarak parçalara ayırır, kavramları hem vektör (Qdrant) hem de bilgi grafiği (Neo4j) olarak saklar; dokümanlar arası çelişkileri tez/antitez/hakem çok-ajanlı öz-düzeltme döngüsüyle çözer.",
      p1Title: "NeHaber — Sahte Haber Tespiti",
      p1Desc:  "BERTurk + TF-IDF hibrit modeli, Celery/Redis async NLP pipeline ve pgvector semantik arama. nehaber.dev'de canlı. Bildiri ICAIRA 2026'da (İstanbul) kabul edildi ve sunuldu.",
      p1Achievement: "ICAIRA 2026'da Sunuldu",
      p1Paper: "Bildiriyi Oku",
      p1Details: [
        { label: "Konferans", value: "ICAIRA 2026, İstanbul — bildiri kabul edildi ve sunuldu" },
        { label: "Bildiri",   value: "“nehaber.dev: A BERT-Based Feature-Level Hybrid Platform for Turkish Fake News Detection” — M. E. Aldaş, İ. Garip (Beykoz Üniversitesi)" },
        { label: "Sonuç",     value: "%87.27 doğruluk, 0.8724 Macro-F1 (5-fold stratified CV, n=3.764)" },
        { label: "Mimari",    value: "FastAPI + Celery + Redis async pipeline" },
        { label: "NLP",       value: "BERTurk + TF-IDF hibrit ensemble model" },
        { label: "Veritabanı", value: "PostgreSQL + pgvector semantic search" },
        { label: "Deploy",    value: "Docker Compose, production'da canlı" },
      ],
      p2Title: "Beavask — Görev Yöneticisi",
      p2Desc:  "Angular ile task yönetim sistemi frontend mimarisi. Üniversite mühendislik sergisinde ödüle aday gösterildi.",
      award:   "Ödül Adayı",
    },
    contact: {
      label: "Bağlantı Kuralım",
      title1: "Birlikte yeni bir şey ",
      title2: "inşa edelim.",
      desc: "Tam zamanlı pozisyonlar ve freelance fırsatlarına açığım.",
      formName: "Ad Soyad",
      formEmail: "E-posta Adresi",
      formMessage: "Mesajınız",
      formPlaceholderName: "Ahmet Yılmaz",
      formPlaceholderMsg: "Merhaba Emin, seninle şu proje hakkında görüşmek isterim...",
      sendBtn: "Mesaj Gönder",
      getInTouch: "İletişime Geç",
      aroundWeb: "Sosyal Ağlar",
      availability: "Freelance ve tam zamanlı projeler için uygun"
    },
    footer: {
      madeWith: ""
    }
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'tr' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, t: translations[language], toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

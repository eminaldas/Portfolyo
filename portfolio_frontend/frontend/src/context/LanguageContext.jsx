import React, { createContext, useState, useContext } from 'react';

const translations = {
  en: {
    nav: {
      works: "Works",
      tech: "Tech",
      about: "About",
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
      eduDesc: "Studying Software Engineering at Beykoz University (GPA: 3.08/4.00), building analytical thinking and problem-solving skills.",
      workLabel: "Work Experience",
      workRole: "IT AUDIT ASSISTANT",
      interestLabel: "Current interests",
      techLabel: "Core Technologies",
      techTitle: "Full-Stack Flow",
    },
    about: {
      developerRole: "DEVELOPER",
      mission: "Writing clean, efficient code",
      vibe: "Curious & Problem-Solver",
      learning: "Currently learning and building side projects",
      title1: "Passionate about software and ",
      title2: "solving problems.",
      desc1: "As a software engineering student, I love exploring new technologies and building projects ranging from NLP-powered fake news detection systems to functional task management platforms.",
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
      p1Title: "NeHaber — Fake News Detection",
      p1Desc:  "Fake news detection with BERTurk + TF-IDF hybrid model, Celery/Redis async NLP pipeline, pgvector semantic search. Live at nehaber.dev.",
      p2Title: "Beavask — Task Manager",
      p2Desc:  "Angular frontend architecture for a task & workflow management system. Nominated for award at the university engineering exhibition.",
      award:   "Award Nominee",
    },
    contact: {
      label: "Let's Connect",
      title1: "Let's build ",
      title2: "together.",
      desc: "I am currently open for full-time junior tech roles, part-time jobs, and freelance web-development opportunities.",
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
    manifesto: {
      label: '— Vizyon',
      lines: [
        { text: 'IT Denetiminden Yapay Zekaya —', muted: false, serif: false },
        { text: 'İnşa Değil, Zanaatkarlık.',     muted: true,  serif: true  },
        { text: 'temiz kod,',                     muted: false, serif: false },
        { text: 'Yap. Gönder. Tekrarla.',         muted: true,  serif: true  },
        { text: 'üretimde çalışan sistemler,',    muted: false, serif: false },
        { text: 'YZ Destekli, İnsan Kodlaması.',  muted: true,  serif: true  },
        { text: 'amaçlı mühendislik.',            muted: false, serif: false },
        { text: 'Büyüyen Sistemler.',             muted: true,  serif: true  },
      ],
    },
    bento: {
      eduLabel: "Eğitim",
      eduTitle: "Yazılım Mühendisliği",
      eduDesc: "Beykoz Üniversitesi'nde Yazılım Mühendisliği okuyor (Ort. 3.08/4.00), analitik yaklaşım ve problem çözme becerilerimi geliştiriyorum.",
      workLabel: "İş Deneyimi",
      workRole: "BT DENETİM ASİSTANI",
      interestLabel: "Güncel İlgi Alanları",
      techLabel: "Temel Teknolojiler",
      techTitle: "Full-Stack Akışı",
    },
    about: {
      developerRole: "GELİŞTİRİCİ",
      mission: "Temiz ve verimli kod yazmak",
      vibe: "Meraklı & Problem Çözücü",
      learning: "Sürekli öğreniyor ve yeni projeler geliştiriyorum",
      title1: "Yazılım geliştirmeye ve ",
      title2: "problem çözmeye tutkuluyum.",
      desc1: "Bir yazılım mühendisliği öğrencisi olarak, yeni teknolojileri deneyimlemeyi ve NLP algoritmaları ile sahte haber tespitlerinden görev yönetim sistemlerine uzanan projeler üretmeyi seviyorum.",
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
      p1Title: "NeHaber — Sahte Haber Tespiti",
      p1Desc:  "BERTurk + TF-IDF hibrit modeli, Celery/Redis async NLP pipeline ve pgvector semantik arama. nehaber.dev'de canlı.",
      p2Title: "Beavask — Görev Yöneticisi",
      p2Desc:  "Angular ile task yönetim sistemi frontend mimarisi. Üniversite mühendislik sergisinde ödüle aday gösterildi.",
      award:   "Ödül Adayı",
    },
    contact: {
      label: "Bağlantı Kuralım",
      title1: "Gel beraber ",
      title2: "çalışalım.",
      desc: "Şu anda tam zamanlı junior pozisyonlar, yarı zamanlı roller ve bağımsız geliştirici (freelance) seçeneklerine açığım.",
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
  const [language, setLanguage] = useState('tr'); // Default TR as portfolio is mostly requested in TR by the user, but we can set EN

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

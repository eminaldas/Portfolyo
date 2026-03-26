import React, { createContext, useState, useContext } from 'react';

const translations = {
  en: {
    nav: {
      works: "Works",
      tech: "Tech",
      about: "About",
      contact: "Contact",
      resume: "Resume"
    },
    hero: {
      location: "Istanbul, Turkey",
      titleTop: "MUHAMMED",
      titleBottom: "EMİN ALDAŞ",
      description: "A passionate Full-Stack Developer building scalable and modern web applications.",
      github: "View GitHub",
      connect: "Let's Connect",
      codeProfile: {
        role: "Full-Stack Software Engineer",
        status: "Open to Work",
        comment: "Let's build something exceptional"
      }
    },
    bento: {
      eduLabel: "Education",
      eduTitle: "Software Eng.",
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
    works: {
      label: "My Work",
      title: "SELECTED PROJECTS",
      desc: "A selection of my recent personal and academic projects.",
      view: "VIEW",
      p1Desc: "Fake news detection using Python, FastAPI, Docker, and BERTurk/TF-IDF models.",
      p2Desc: "Responsive frontend utilizing Angular and robust API integrations.",
    },
    contact: {
      label: "Let's Connect",
      title1: "Got a project ",
      title2: "in mind?",
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
      resume: "Özgeçmiş"
    },
    hero: {
      location: "İstanbul, Türkiye",
      titleTop: "MUHAMMED",
      titleBottom: "EMİN ALDAŞ",
      description: "Ölçeklenebilir ve modern web uygulamaları geliştiren bir Full-Stack Geliştiricisi.",
      github: "GitHub'ı İncele",
      connect: "İletişime Geç",
      codeProfile: {
        role: "Full-Stack Yazılım Mühendisi",
        status: "Yeni Fırsatlara Açık",
        comment: "Birlikte harika işler çıkaralım"
      }
    },
    bento: {
      eduLabel: "Eğitim",
      eduTitle: "Yazılım Müh.",
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
    works: {
      label: "Çalışmalarım",
      title: "SEÇKİN PROJELER",
      desc: "Yakın zamandaki kişisel ve akademik projelerimden bir seçki.",
      view: "İNCELE",
      p1Desc: "Python, FastAPI, Docker ve BERTurk/TF-IDF modelleri entegre edilerek geliştirilen sahte haber tespit sistemi.",
      p2Desc: "Angular tabanlı duyarlı arayüz tasarımı (UI/UX) ve güçlü servis entegrasyonlarına sahip bir görev dağılım projesi.",
    },
    contact: {
      label: "Bağlantı Kuralım",
      title1: "Aklında bir proje ",
      title2: "mi var?",
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

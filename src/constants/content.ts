export interface ServiceItem {
  slug: string;
  title: string;
  arabicTitle: string;
  description: string;
  arabicDescription: string;
  benefits: string[];
  arabicBenefits: string[];
  applications: string[];
  arabicApplications: string[];
  image: string;
  galleryImages: string[];
  faqs: { q: string; a: string; qAr: string; aAr: string }[];
}

export interface ContentData {
  meta: {
    title: string;
    description: string;
  };
  preloader: string;
  nav: {
    about: string;
    services: string;
    founders: string;
    cta: string;
    logoText: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  about: {
    eyebrow: string;
    title1: string;
    titleAccent: string;
    title2: string;
    desc: string;
    arabicText: string;
    stats: {
      number: string;
      suffix: string;
      label: string;
      desc: string;
    }[];
  };
  methodology: {
    eyebrow: string;
    title1: string;
    titleAccent: string;
    title2: string;
    items: {
      num: string;
      title: string;
      desc: string;
    }[];
  };
  founders: {
    eyebrow: string;
    title1: string;
    titleAccent: string;
    title2: string;
    list: {
      name: string;
      role: string;
      bio: string;
      arabicBio: string;
      image: string;
    }[];
  };
  contact: {
    eyebrow: string;
    title1: string;
    titleAccent: string;
    title2: string;
    desc: string;
    arabicText: string;
    phone: string;
    email: string;
    location: string;
    cr?: string;
    form: {
      title: string;
      name: string;
      email: string;
      phone: string;
      projectType: string;
      projectOptions: string[];
      message: string;
      submit: string;
      privacy: string;
      whatsappCta: string;
    };
  };
  footer: {
    established: string;
    copy: string;
    cr?: string;
  };
}

export const localizationContent: Record<'en' | 'ar', ContentData> = {
  en: {
    meta: {
      title: "Light Tower Illumination | GCC's Premier LED Facade Specialists",
      description: "Light Tower Illumination — 26 years of world-class LED facade solutions across the GCC. Trusted by governments and private enterprises in Oman and beyond."
    },
    preloader: "LIGHT TOWER",
    nav: {
      about: "About",
      services: "Services",
      founders: "Founders",
      cta: "Get a Quote",
      logoText: "LIGHT TOWER"
    },
    hero: {
      title: "ILLUMINATING FACADES.\nLANDMARKS. ROYAL EVENTS.",
      subtitle: "Delivering Happiness, Charm & Satisfaction For Over 26 Years Across The GCC.",
      cta: "EXPLORE OUR SOLUTIONS"
    },
    about: {
      eyebrow: "ABOUT US",
      title1: "ILLUMINATING SPACES.",
      titleAccent: "INSPIRING",
      title2: "EXPERIENCES.",
      desc: "For over 26 years, Light Tower has been at the forefront of the architectural lighting industry in the Sultanate of Oman and the GCC. We do not just light up structures; we breathe life, emotion, and prestige into architectural masterworks. Our expertise spans monumental building facades, government installations, festive city landmarks, royal weddings, and immersive events. By combining German-engineered LED technologies with local cultural sensitivity, we construct lighting experiences that inspire, transform, and stand as testaments to excellence.",
      arabicText: "لأكثر من 26 عاماً، كانت لايت تاور في طليعة صناعة الإضاءة المعمارية في سلطنة عُمان والخليج.",
      stats: [
        { number: "26", suffix: "+", label: "YEARS", desc: "Of Experience" },
        { number: "450", suffix: "+", label: "PROJECTS", desc: "Successfully Delivered" },
        { number: "100", suffix: "+", label: "CLIENTS", desc: "And Long-Term Partners" },
        { number: "OMAN & GCC", suffix: "", label: "PRESENCE", desc: "Extensive Regional Footprint" }
      ]
    },
    methodology: {
      eyebrow: "OUR METHODOLOGY",
      title1: "Three things we",
      titleAccent: "never compromise",
      title2: "on.",
      items: [
        {
          num: "[01]",
          title: "Engineering Precision",
          desc: "Every diode is calibrated. Our master engineers integrate lighting architectures that respect the original design, ensuring flawless execution from blueprint to switch-on."
        },
        {
          num: "[02]",
          title: "Material Excellence",
          desc: "Sourced globally, engineered for the Gulf. Components guaranteed to withstand environmental extremes while maintaining absolute chromatic fidelity."
        },
        {
          num: "[03]",
          title: "Executional Certainty",
          desc: "Proven across GCC governments. Two and a half decades of delivering perfection on time, cementing our reputation as the absolute gold standard in illumination."
        }
      ]
    },
    founders: {
      eyebrow: "FOUNDERS",
      title1: "The visionaries",
      titleAccent: "behind",
      title2: "our success.",
      list: [
        {
          name: "OTHMAN BIN SAID SAIF AL MASOUDI",
          role: "CO-FOUNDER & CHAIRMAN",
          bio: "Driving the strategic vision and key partnerships for Light Tower across the Sultanate of Oman and the wider GCC region. Under his leadership, the company has successfully delivered iconic sovereign and architectural lighting landmarks, cementing its status as the regional gold standard in high-end illumination.",
          arabicBio: "عثمان بن سعيد بن سيف المسعودي | المؤسس المشارك ورئيس مجلس الإدارة",
          image: "/images/othman.webp"
        },
        {
          name: "SHEEFER. H. SAIT",
          role: "CO-FOUNDER & MANAGING DIRECTOR",
          bio: "Pioneering engineering excellence, project execution, and technical innovation at Light Tower. With an unyielding focus on quality and material durability, he manages complex, large-scale structural illumination projects, ensuring flawless execution from blueprint to breathtaking switch-on.",
          arabicBio: "شيفير ح. سايت | المؤسس المشارك والمدير التنفيذي",
          image: "/images/sheefer.webp"
        }
      ]
    },
    contact: {
      eyebrow: "GET IN TOUCH",
      title1: "LET'S",
      titleAccent: "ILLUMINATE",
      title2: "YOUR NEXT PROJECT.",
      desc: "Have a vision? Let us bring it to life. Our team of expert engineers and designers are ready to transform your architectural dreams into luminous reality.",
      arabicText: "لديك رؤية؟ دعنا نحولها إلى واقع مضيء.",
      phone: "+968 98184233, +968 90153350",
      email: "ltillumination06@gmail.com",
      location: "Po. Box. No.125, 316 Postal Code, Mussannah, Al Maabela, Sultanate of Oman",
      cr: "CR No: 1281868",
      form: {
        title: "SEND US A MESSAGE",
        name: "Your Name",
        email: "Your Email",
        phone: "Phone Number",
        projectType: "Project Type",
        projectOptions: [
          "Architectural Lighting",
          "Facade Lighting",
          "Festive Lighting",
          "Commercial Installation",
          "Event Lighting",
          "Other"
        ],
        message: "Tell us about your project",
        submit: "SEND MESSAGE",
        privacy: "Your information is safe with us. We respect your privacy.",
        whatsappCta: "CHAT WITH US ON WHATSAPP"
      }
    },
    footer: {
      established: "EST. 1998 · SULTANATE OF OMAN",
      copy: "© 2026 Light Tower Illumination. Crafted with precision. All Rights Reserved.",
      cr: "CR No: 1281868"
    }
  },
  ar: {
    meta: {
      title: "لايت تاور للإضاءة | خبراء واجهات الـ LED الرواد في الخليج",
      description: "لايت تاور للإضاءة — 26 عاماً من حلول واجهات LED عالمية المستوى في جميع أنحاء الخليج. موثوق بنا من قبل الحكومات والمؤسسات الخاصة."
    },
    preloader: "لايت تاور",
    nav: {
      about: "من نحن",
      services: "خدماتنا",
      founders: "المؤسسون",
      cta: "احصل على عرض سعر",
      logoText: "لايت تاور"
    },
    hero: {
      title: "إضاءة الواجهات.\nالمعالم. المناسبات الملكية.",
      subtitle: "نقدم السعادة والسحر والرضا لأكثر من 26 عاماً في جميع أنحاء الخليج.",
      cta: "اكتشف حلولنا الإبداعية"
    },
    about: {
      eyebrow: "من نحن",
      title1: "إنارة المساحات.",
      titleAccent: "إلهام",
      title2: "التجارب.",
      desc: "لأكثر من 26 عاماً، كانت لايت تاور في طليعة صناعة الإضاءة المعمارية في سلطنة عُمان ودول مجلس التعاون الخليجي. نحن لا نضيء الهياكل فحسب، بل نبث الحياة والمشاعر والهيبة في الروائع المعمارية. تشمل خبرتنا واجهات المباني الضخمة، والتركيبات الحكومية، ومعالم المدن الاحتفالية، وحفلات الزفاف الملكية، والفعاليات الغامرة. من خلال دمج تقنيات LED الألمانية المتطورة مع الحساسية الثقافية المحلية، نصنع تجارب إضاءة تلهم وتحول وتعد بمثابة شهادات على التميز.",
      arabicText: "لأكثر من 26 عاماً، كانت لايت تاور في طليعة صناعة الإضاءة المعمارية في سلطنة عُمان والخليج.",
      stats: [
        { number: "26", suffix: "+", label: "عاماً", desc: "من الخبرة الإقليمية" },
        { number: "450", suffix: "+", label: "مشروع", desc: "تم تسليمها بنجاح تام" },
        { number: "100", suffix: "+", label: "عميل", desc: "وشركاء على المدى الطويل" },
        { number: "عُمان والخليج", suffix: "", label: "حضور شامل", desc: "تأثير وحضور إقليمي واسع" }
      ]
    },
    methodology: {
      eyebrow: "منهجيتنا",
      title1: "ثلاثة أشياء لا",
      titleAccent: "نساوم عليها",
      title2: "أبداً.",
      items: [
        {
          num: "[01]",
          title: "الدقة الهندسية",
          desc: "يتم معايرة كل صمام ثنائي (diode). يدمج مهندسونا المحترفون هياكل الإضاءة التي تحترم التصميم الأصلي، مما يضمن التنفيذ الخالي من العيوب من المخطط إلى التشغيل."
        },
        {
          num: "[02]",
          title: "جودة المواد الفائقة",
          desc: "مصادر عالمية، وهندسة مخصصة للخليج العربي. مكونات مضمونة لتحمل الظروف البيئية القاسية مع الحفاظ الكامل على دقة درجات الألوان وقوة السطوع."
        },
        {
          num: "[03]",
          title: "يقين التنفيذ والالتزام",
          desc: "خبرة مثبتة لدى حكومات مجلس التعاون الخليجي. عقدان ونصف من تقديم الكمال في الوقت المحدد، مما يعزز سمعتنا كمعيار ذهبي مطلق في عالم الإضاءة."
        }
      ]
    },
    founders: {
      eyebrow: "المؤسسون",
      title1: "الرؤاة المبدعون",
      titleAccent: "خلف",
      title2: "مسيرة نجاحنا.",
      list: [
        {
          name: "عثمان بن سعيد بن سيف المسعودي",
          role: "المؤسس المشارك ورئيس مجلس الإدارة",
          bio: "يقود الرؤية الاستراتيجية والشراكات الرئيسية لـ لايت تاور في جميع أنحاء سلطنة عُمان ودول مجلس التعاون الخليجي. تحت قيادته، نجحت الشركة في تسليم معالم إضاءة سيادية ومعمارية بارزة، مما رسخ مكانتها كمعيار ذهبي إقليمي للإضاءة الراقية.",
          arabicBio: "عثمان بن سعيد بن سيف المسعودي | المؤسس المشارك ورئيس مجلس الإدارة",
          image: "/images/othman.webp"
        },
        {
          name: "شيفير ح. سايت",
          role: "المؤسس المشارك والمدير التنفيذي",
          bio: "ريادة التميز الهندسي، وإدارة المشاريع، والابتكار التقني في لايت تاور. مع تركيز لا يلين على الجودة ومتانة المواد، يدير مشاريع الإضاءة الإنشائية المعقدة واسعة النطاق، مما يضمن التنفيذ المثالي من الفكرة الأولية إلى التشغيل المبهر.",
          arabicBio: "شيفير ح. سايت | المؤسس المشارك والمدير التنفيذي",
          image: "/images/sheefer.webp"
        }
      ]
    },
    contact: {
      eyebrow: "تواصل معنا",
      title1: "دعنا",
      titleAccent: "نضيء",
      title2: "مشروعك القادم.",
      desc: "هل لديك رؤية؟ دعنا نحولها إلى واقع مضيء. طاقم المهندسين والمصممين الخبراء لدينا مستعدون لتحويل أحلامك المعمارية إلى روائع مضيئة نابضة بالحياة.",
      arabicText: "لديك رؤية؟ دعنا نحولها إلى واقع مضيء.",
      phone: "+968 98184233, +968 90153350",
      email: "ltillumination06@gmail.com",
      location: "ص.ب 125، الرمز البريدي 316، المصنعة، المعبيلة، سلطنة عُمان",
      cr: "رقم السجل التجاري: 1281868",
      form: {
        title: "أرسل لنا رسالة",
        name: "الاسم الكريم",
        email: "البريد الإلكتروني",
        phone: "رقم الهاتف",
        projectType: "نوع المشروع",
        projectOptions: [
          "إضاءة معمارية",
          "إضاءة واجهات",
          "إضاءة مناسبات واحتفالات",
          "تركيبات تجارية",
          "إضاءة فعاليات",
          "أخرى"
        ],
        message: "أخبرنا بالتفاصيل حول مشروعك الإبداعي",
        submit: "إرسال الرسالة",
        privacy: "معلوماتك في أمان تام معنا. نحن نحترم خصوصيتك المطلقة.",
        whatsappCta: "تحدث معنا عبر الواتساب مباشرة"
      }
    },
    footer: {
      established: "تأسست عام 1998 · سلطنة عُمان",
      copy: "© 2026 لايت تاور للإضاءة. صُنعت بدقة متناهية. جميع الحقوق محفوظة.",
      cr: "رقم السجل التجاري: 1281868"
    }
  }
};

export const servicesData: ServiceItem[] = [
  {
    slug: "commercial-buildings",
    title: "Commercial Buildings",
    arabicTitle: "مباني تجارية",
    description: "Elevate your corporate architecture into majestic night landmarks. We design custom exterior structures, linear wall washers, and dynamic lighting systems that boost structural lines and make offices and headquarters stand out with prestigious identity.",
    arabicDescription: "الارتقاء بالعمارة المؤسسية لتصبح معالم ليلية مهيبة. نحن نصمم هياكل خارجية مخصصة ومصابيح خطية وأنظمة إضاءة ديناميكية تبرز خطوط الهيكل وتجعل المكاتب والمقار الرئيسية تبرز بهوية مرموقة.",
    benefits: [
      "Elite accent lighting with precise beam optics",
      "Individually controlled structural LED fixtures",
      "Compliant with international architectural standards",
      "Highly optimized energy profiles with smart integration"
    ],
    arabicBenefits: [
      "إضاءة مميزة بلمسة نخبوية مع عدسات شعاعية دقيقة",
      "تركيبات إضاءة LED مبرمجة ومتحكم بها بشكل فردي",
      "متوافقة مع أرقى المعايير الهندسية والمعمارية العالمية",
      "معدل استهلاك طاقة محسن بالكامل متكامل مع الأنظمة الذكية"
    ],
    applications: [
      "Corporate headquarters and financial structures",
      "Prestige high-rise commercial structures",
      "Bespoke architectural offices and civic landmarks"
    ],
    arabicApplications: [
      "المقار الرئيسية الفاخرة للشركات والمراكز المالية",
      "الأبراج والمباني الإنشائية التجارية الشاهقة المرموقة",
      "المكاتب الهندسية المتميزة والمعالم المدنية البارزة"
    ],
    image: "/images/Service Sections/commercial buildings.png",
    galleryImages: [
      "image (3).png",
      "image (5).png",
      "image (6).png",
      "image (9).png",
      "image (23).png",
      "image (31).png",
      "image (34).png",
      "image (45).png",
      "image (65).png"
    ],
    faqs: [
      {
        q: "How do you install lighting without damaging corporate glass facades?",
        a: "Our engineering team designs custom structural mounting brackets that integrate securely into the building facade without drilling or causing structural envelope damage.",
        qAr: "كيف يتم تركيب الإضاءة دون الإضرار بالواجهات الزجاجية للمباني؟",
        aAr: "يصمم فريقنا الهندسي دعامات وحوامل هيكلية مخصصة تندمج بأمان في الواجهة دون التسبب في أي ثقب أو إضرار بغلاف المبنى."
      }
    ]
  },
  {
    slug: "festive-markets",
    title: "Festive Markets",
    arabicTitle: "الأسواق الاحتفالية",
    description: "Creating magical lighting landscapes for streetscapes, shopping bazaars, and traditional outdoor souqs. We construct warm, highly inviting atmospheric decorations and light structures that enhance public participation and enrich retail foot traffic.",
    arabicDescription: "خلق مناظر ضوئية ساحرة للشوارع، البازارات، والأسواق التقليدية المفتوحة. نحن نقوم بتشييد زينات ومجسمات ضوئية دافئة وجذابة تثري تفاعل الزوار وتزيد من الإقبال التجاري بشكل استثنائي.",
    benefits: [
      "Safe, certified low-voltage decorative LED systems",
      "High weather protection rating (IP67) for outdoor areas",
      "Rapid deployment framework and swift installation mechanisms",
      "Energy-saving fixtures supporting sustainable municipal goals"
    ],
    arabicBenefits: [
      "أنظمة إضاءة LED تزيينية آمنة بجهد منخفض ومعتمدة تماماً",
      "معيار حماية متطور (IP67) لمقاومة العوامل الجوية المفتوحة",
      "هيكل تشغيل سريع التثبيت والفك دون إعاقة الأنشطة",
      "تركيبات موفرة للطاقة تدعم أهداف البلديات المستدامة"
    ],
    applications: [
      "Municipal pedestrian streets and open souqs",
      "Festive holiday markets and seasonal setups",
      "Public parks and cultural heritage avenues"
    ],
    arabicApplications: [
      "شوارع المشاة البلدية والأسواق المفتوحة النابضة بالحياة",
      "البازارات والمناطق الاحتفالية والتركيبات الموسمية",
      "الحدائق العامة والساحات الثقافية والتراثية الكبرى"
    ],
    image: "/images/Service Sections/festive markets.png",
    galleryImages: [
      "image (2).png",
      "image (7).png",
      "image (11).png",
      "image (16).png",
      "image (17).png",
      "image (22).png",
      "image (30).png",
      "image (62).png"
    ],
    faqs: [
      {
        q: "Are the festive market lights safe for public interaction?",
        a: "Yes, all installations utilize low-voltage (12V/24V) technology and IP67 double-insulated connections to ensure complete safety for families and children.",
        qAr: "هل إضاءة الأسواق الاحتفالية آمنة لتفاعل المشاة والجمهور؟",
        aAr: "نعم، تعتمد جميع التركيبات على أنظمة جهد منخفض جداً (12/24 فولت) مع موصلات IP67 معزولة بالكامل لضمان الأمان المطلق للعائلات والأطفال."
      }
    ]
  },
  {
    slug: "outlet-stores",
    title: "Outlet Stores",
    arabicTitle: "متاجر الأوتلت",
    description: "Design bespoke retail environments that draw eyes and invite exploration. We craft high-fidelity showrooms, premier boutique illumination, and accent configurations calibrated to project absolute luxury and elevate brand value.",
    arabicDescription: "تصميم بيئات تجزئة فاخرة ومخصصة تجذب الأنظار وتدعو للاستكشاف. نحن نصمم إضاءات صالات العرض الراقية والمتاجر النخبوية المصممة بعناية لتعكس الرقي المطلق وتزيد قيمة العلامة التجارية.",
    benefits: [
      "High color rendering index (CRI 90+) presenting luxury goods perfectly",
      "Subtle glassmorphic accent integrations",
      "Glare-free linear LEDs focused precisely on retail assets",
      "Automated scene scheduling drives optimized daily schedules"
    ],
    arabicBenefits: [
      "مؤشر تجسيد ألوان فائق (CRI 90+) يبرز جمالية وجودة المعروضات الفاخرة",
      "تكاملات إضاءة مميزة ومخفية تضفي لمسة عصرية ناعمة",
      "مصابيح خطية مانعة للتوهج موجهة بدقة نحو زوايا العرض المهمة",
      "جدولة آلية ذكية للمشاهد الضوئية تدعم فترات التشغيل اليومية"
    ],
    applications: [
      "Premium fashion boutiques and luxury outlets",
      "Automobile showrooms and premier lifestyle retail complexes",
      "Designer department stores and brand flagships"
    ],
    arabicApplications: [
      "متاجر الأزياء الراقية ومنافذ التجزئة (Outlets) الفاخرة",
      "صالات عرض السيارات الفخمة والمجمعات التجارية الراقية",
      "متاجر المصممين المرموقة والفروع الرئيسية للعلامات العالمية"
    ],
    image: "/images/Service Sections/outlet stores.png",
    galleryImages: [
      "image (18).png",
      "image (19).png",
      "image (27).png",
      "image (32).png",
      "image (33).png",
      "image (38).png",
      "image (40).png",
      "image (49).png"
    ],
    faqs: [
      {
        q: "Do you integrate your retail lighting with smart store systems?",
        a: "Yes, our luxury retail systems seamlessly connect with standard smart lighting protocols like DALI, Crestron, and KNX.",
        qAr: "هل يمكن ربط إضاءة المتاجر بأنظمة التحكم الذكي بالمحل؟",
        aAr: "نعم، تتوافق أنظمة إضاءة التجزئة الفاخرة لدينا تماماً مع بروتوكولات التحكم العالمية مثل DALI و Crestron و KNX."
      }
    ]
  },
  {
    slug: "ramadan-calligraphy",
    title: "Ramadan & Calligraphy",
    arabicTitle: "رمضان والخط العربي",
    description: "Crafting spiritual wonder using high-end custom calligraphic metal motifs and Islamic architectural patterns. We structuralize grand three-dimensional luminous installations, glowing crescent displays, and Arabic script murals that enrich holy seasons.",
    arabicDescription: "صياغة أجواء روحانية ساحرة باستخدام مجسمات معدنية مزخرفة بالخط العربي وموتيفات معمارية إسلامية راقية. نحن نشيد تركيبات ضوئية مجسمة وهلالية مضيئة ونقوش كتابية تثري المواسم المباركة.",
    benefits: [
      "Bespoke artistic calligraphic structural designs in steel framework",
      "Vibrant high-durability LED motifs with custom dynamic effects",
      "Warm atmospheric temperatures complementing traditional architecture",
      "Low-consumption configurations engineered for continuous night operations"
    ],
    arabicBenefits: [
      "تصاميم هيكلية فنية مخصصة للخط العربي بهيكل معدني معزز",
      "مجسمات LED حيوية متينة ومقاومة للعوامل الجوية مع سمات حركية",
      "درجات حرارة ضوئية دافئة ومتكاملة مع الطراز المعماري التقليدي",
      "استهلاك طاقة منخفض للغاية مصمم للتشغيل الليلي المتواصل للشهر الفضيل"
    ],
    applications: [
      "Ramadan and Eid city-wide major landmark setups",
      "Sovereign gathering plazas and municipal palaces",
      "VIP hospitality destinations and premium lifestyle avenues"
    ],
    arabicApplications: [
      "تجهيزات الشهر الفضيل وعيد الفطر على مستوى المعالم الرئيسية بالمدينة",
      "الساحات السيادية وقصور ومقار البلديات والجهات الرسمية",
      "الوجهات الفندقية الراقية وممرات ومناطق الترفيه الفاخرة"
    ],
    image: "/images/Service Sections/ramdan, caligraphy.png",
    galleryImages: [
      "image (15).png",
      "image (35).png",
      "image (44).png",
      "image (46).png",
      "image (47).png",
      "image (48).png",
      "image (50).png",
      "image (63).png"
    ],
    faqs: [
      {
        q: "Are the calligraphy motifs custom-designed for each client?",
        a: "Yes, our calligraphy scripts and Islamic geometric motifs are fully custom-designed by master artists to match your project's architectural theme.",
        qAr: "هل يتم تصميم مجسمات الخط العربي بشكل مخصص لكل عميل؟",
        aAr: "نعم، يتم رسم وتصميم نصوص الخط العربي والزخارف الهندسية الإسلامية بالكامل بواسطة فنانين محترفين لتناسب الطابع المعماري لمشروعكم."
      }
    ]
  },
  {
    slug: "shopping-centers",
    title: "Shopping Centers",
    arabicTitle: "المراكز التجارية",
    description: "Elevate shopping centers and luxury mega-malls into active visual destinations. We deploy massive facade media walls, color-washing projectors, and discrete structural LEDs that turn buildings into magnificent landmarks visible across coordinates.",
    arabicDescription: "تحويل مراكز التسوق الكبرى والمولات الفاخرة إلى وجهات بصرية نابضة بالحياة. نحن ننشر شاشات واجهات عملاقة، كشافات غمر الألوان، ومصابيح LED مدمجة تجعل المباني معالم بارزة تُرى من مسافات بعيدة.",
    benefits: [
      "Full-scale media pixel control enabling video-mapped facade walls",
      "Optically focused glare-free wall wash configurations",
      "Centrally scheduled dynamic themes managed via cloud system",
      "Highly durable thermal engineering maximizes lifecycle longevity"
    ],
    arabicBenefits: [
      "تحكم كامل ببكسلات واجهات الميديا لعرض عروض فيديو ورسومات ضخمة",
      "كشافات غمر جدران مانعة للوهج وموجهة ضوئياً بدقة فائقة",
      "أنظمة تحكم سحابية مركزية لجدولة السمات والعروض الضوئية بسهولة",
      "تصميم حراري متين يضمن تبديد الحرارة بكفاءة لإطالة عمر التركيبات"
    ],
    applications: [
      "Mega shopping malls and high-end lifestyle complexes",
      "Commercial entertainment zones and atrium spaces",
      "Luxury retail facade masterplans and flagship districts"
    ],
    arabicApplications: [
      "مراكز التسوق الضخمة والمجمعات التجارية والترفيهية الفاخرة",
      "المناطق الترفيهية والساحات والبهو الداخلي الواسع للمجمعات",
      "المخططات الرئيسية للواجهات التجارية ومناطق الفروع العالمية"
    ],
    image: "/images/Service Sections/shopping center.png",
    galleryImages: [
      "image (4).png",
      "image (20).png",
      "image (26).png",
      "image (42).png",
      "image (43).png",
      "image (53).png",
      "image (54).png",
      "image (61).png"
    ],
    faqs: [
      {
        q: "What is a Media Facade, and can it display full-motion video?",
        a: "Yes, a Media Facade uses architectural-grade LED pixel nodes directly integrated onto the glass or stone building exterior, allowing it to act as a high-resolution screen capable of rendering video, patterns, and dynamic scripts.",
        qAr: "ما هي واجهة الميديا وهل يمكنها عرض مقاطع الفيديو بالكامل؟",
        aAr: "نعم، تستخدم واجهة الميديا بكسلات LED معمارية مدمجة مباشرة على الواجهات الزجاجية أو الحجرية للمبنى، مما يتيح له العمل كشاشة عملاقة لعرض الفيديوهات والأنماط التفاعلية."
      }
    ]
  },
  {
    slug: "towns-cities",
    title: "Towns & Cities",
    arabicTitle: "البلدات والمدن",
    description: "Designing monumental architectural streetscapes, public square lighting, and civic masterplans for government institutions. We deploy majestic low-consumption city-wide decorations that celebrate national days and sovereign festivals.",
    arabicDescription: "تصميم شوارع معمارية مهيبة، إضاءة الساحات العامة، والمخططات المدنية للمؤسسات الحكومية. نحن ننشر تجهيزات زينة بلدية راقية وموفرة للطاقة تحتفي بالأعياد الوطنية والمهرجانات السيادية.",
    benefits: [
      "Large-scale municipal structures engineered for public safety",
      "Tested structural integrity resisting wind and dust loads",
      "Highly certified low-voltage systems protecting open areas",
      "Sovereign design aesthetics tailored to local cultural narratives"
    ],
    arabicBenefits: [
      "مجسمات بلدية واسعة النطاق مصممة بأعلى معايير السلامة العامة للمشاة",
      "متانة هيكلية مجربة ومقاومة تماماً لضغوط الرياح الشديدة وعواصف الغبار",
      "أنظمة جهد منخفض معتمدة وعالية الأمان لحماية الساحات والحدائق المفتوحة",
      "جماليات تصميم سيادية فاخرة تعكس الهوية البصرية والثقافية المحلية"
    ],
    applications: [
      "Government civic buildings and municipal palaces",
      "Public parks, prominent pedestrian bridges, and avenues",
      "National Day configurations and city-wide festive routes"
    ],
    arabicApplications: [
      "المباني الحكومية المدنية وقصور ومقار البلديات والجهات الرسمية",
      "الحدائق العامة وجسور المشاة البارزة والطرق الحضرية الرئيسية",
      "تجهيزات العيد الوطني والمخططات التزيينية الشاملة للمحافظات"
    ],
    image: "/images/Service Sections/towns and cities.png",
    galleryImages: [
      "image (1).png",
      "image (8).png",
      "image (21).png",
      "image (24).png",
      "image (28).png",
      "image (29).png",
      "image (52).png",
      "image (64).png"
    ],
    faqs: [
      {
        q: "Do you coordinate municipal installations directly with governmental authorities?",
        a: "Yes, we have 26 years of continuous experience coordinating closely with civic councils and GCC government entities to deliver sovereign-grade municipal light designs on schedule.",
        qAr: "هل يتم التنسيق لتركيبات البلديات مع الجهات الحكومية الرسمية؟",
        aAr: "نعم، لدينا خبرة متواصلة تزيد عن 26 عاماً في التنسيق الوثيق مع مجالس البلديات والجهات الحكومية في عمان والخليج لتقديم أرقى المشاريع."
      }
    ]
  },
  {
    slug: "weddings-ceremonies",
    title: "Weddings & Ceremonies",
    arabicTitle: "الأعراس والاحتفالات",
    description: "Crafting ultimate romantic wonder and luxury atmospheres for grand ceremonies, royal weddings, and VIP galas. We design custom luminous drapery, immersive light tunnels, and elegant ambient elements that transform celebrations into timeless experiences.",
    arabicDescription: "صياغة أجواء رومانسية ساحرة وفائقة الفخامة للمراسم الكبرى، حفلات الزفاف الملكية، ومناسبات النخبة. نحن نصمم ستائر ضوئية مخصصة، أنفاقاً ضوئية غامرة، وعناصر محيطة أنيقة تحول المناسبات إلى تجارب خالدة.",
    benefits: [
      "Bespoke immersive light tunnels and 3D glowing installations",
      "Atmospheric temperature configurations projecting absolute romance",
      "Safe, quick-install systems configured for high-end luxury tents",
      "Precise digital control systems scheduling dynamic ambient cues"
    ],
    arabicBenefits: [
      "أنفاق ضوئية غامرة ومجسمات ضوئية ثلاثية الأبعاد مخصصة ومبهرة",
      "درجات ألوان دافئة وناعمة مهيأة لتعكس الفخامة والرومانسية المطلقة",
      "أنظمة آمنة وسريعة التثبيت مصممة خصيصاً للقاعات والخيام الفاخرة",
      "لوحات تحكم رقمية دقيقة لبرمجة المشاهد والمؤثرات الضوئية الديناميكية"
    ],
    applications: [
      "Royal wedding halls and luxury private estates",
      "Grand VIP garden galas and high-society banquets",
      "Immersive indoor and outdoor destination celebrations"
    ],
    arabicApplications: [
      "قاعات الأفراح الملكية والقصور والمنشآت الخاصة الفخمة",
      "حفلات الحدائق الفاخرة لكبار الشخصيات ومآدب المجتمع المخملي",
      "المناسبات والاحتفالات المفتوحة والمغلقة في الوجهات المرموقة"
    ],
    image: "/images/Service Sections/wedding and ceremony.png",
    galleryImages: [
      "image (10).png",
      "image (12).png",
      "image (13).png",
      "image (14).png",
      "image (25).png",
      "image (37).png",
      "image (56).png",
      "image (59).png"
    ],
    faqs: [
      {
        q: "Can you provide fully custom light tunnels for outdoor royal weddings?",
        a: "Yes, our structures and engineering designers specialize in custom-fabricating majestic 3D light tunnels and overhead luminous canopies designed to meet your specific venue dimensions.",
        qAr: "هل يمكنكم توفير أنفاق ضوئية مخصصة بالكامل لأفراح الهواء الطلق الملكية؟",
        aAr: "نعم، يتخصص مصممو الهندسة والهياكل لدينا في تفصيل وتصنيع أنفاق ضوئية ثلاثية الأبعاد مهيبة ومظلات مضيئة معلقة تناسب أبعاد القاعة الخاصة بكم."
      }
    ]
  },
  {
    slug: "event-lighting",
    title: "Event Lighting",
    arabicTitle: "إضاءة الفعاليات",
    description: "Configure dynamic, world-class environmental illumination for prestige summits, luxury product launches, grand conferences, and VIP galas. We deploy advanced moving head spots, pixel arrays, and smart theatrical lights driving premium brand impact.",
    arabicDescription: "تهيئة حلول إضاءة بيئية ديناميكية عالمية المستوى للقمم المرموقة، إطلاق المنتجات الفاخرة، المؤتمرات الكبرى، وحفلات كبار الشخصيات. نحن ننشر أحدث أجهزة عرض الإضاءة والتحكم التفاعلي لدعم قوة وتأثير علامتكم التجارية.",
    benefits: [
      "High-speed precision robotic moving head projectors",
      "Immersive pixel integrations mapped directly with stage elements",
      "Redundant backup systems ensuring 100% operation certainty",
      "Immersive pre-event 3D software simulations (previz) for client preview"
    ],
    arabicBenefits: [
      "كشافات آلية متحركة (Robotic Moving Heads) فائقة السرعة والدقة والقدرة",
      "تكاملات بكسل غامرة مبرمجة ومتزامنة بالكامل مع عناصر المسرح الأساسية",
      "أنظمة تشغيل ونقل طاقة احتياطية تضمن يقين واستمرارية العمل بنسبة 100%",
      "برامج محاكاة ثلاثية الأبعاد تفاعلية تتيح للعميل رؤية وتجربة العرض مسبقاً"
    ],
    applications: [
      "Grand outdoor national celebrations and festivals",
      "VIP corporate galas, premier real estate and luxury car launches",
      "International summits, mega exhibitions, and elite fashion weeks"
    ],
    arabicApplications: [
      "المهرجانات والاحتفالات الوطنية الكبرى والمهرجانات المفتوحة",
      "حفلات الشركات الراقية وإطلاق المنتجات والسيارات الفاخرة",
      "القمم الدولية رفيعة المستوى والمعارض التفاعلية وأسابيع الموضة الراقية"
    ],
    image: "/images/Service Sections/Event in general.png",
    galleryImages: [
      "image (36).png",
      "image (39).png",
      "image (41).png",
      "image (51).png",
      "image (55).png",
      "image (57).png",
      "image (58).png",
      "image (60).png"
    ],
    faqs: [
      {
        q: "Do you offer dynamic previews of the event programming beforehand?",
        a: "Yes, our designers utilize state-of-the-art 3D lighting software to generate full visual pre-visualizations representing the exact timings, colors, and patterns prior to site deployment.",
        qAr: "هل تقدمون معاينة ديناميكية للعرض والبرمجة قبل بدء الفعالية؟",
        aAr: "نعم، يستخدم مصممونا برامج محاكاة ضوئية ثلاثية الأبعاد متطورة لإنشاء عرض مرئي مسبق يظهر دقة المؤثرات والأوقات والألوان قبل بدء التركيب الفعلي."
      }
    ]
  }
];

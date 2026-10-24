export type CategoryId = "skin" | "harmony" | "lips" | "rejuvenation" | "consultation";

export type Treatment = {
  slug: string;
  name: string;
  category: CategoryId;
  summary: string;
  overview: string;
  seeks: string[];
  procedure: string;
  consultation: string;
  aftercare: string;
  faqs: { q: string; a: string }[];
  /** Demonstration figure in GBP. Null means the fee is discussed privately. */
  priceFrom: number | null;
  duration: string;
  downtime: string;
  image: string;
  imageAlt: string;
  related: string[];
};

export type UniverseCategory = {
  id: CategoryId;
  name: string;
  short: string;
  description: string;
  treatments: string[];
};

const img = (id: string, width = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=75`;

export const categories: UniverseCategory[] = [
  {
    id: "skin",
    name: "Skin Universe",
    short: "Texture, clarity and daily radiance.",
    description:
      "Treatments that respect the skin barrier and work with light, texture and time — never against them.",
    treatments: ["skin-boosters", "dermaplaning", "chemical-peels"],
  },
  {
    id: "harmony",
    name: "Facial Harmony",
    short: "Proportion, profile and balance.",
    description:
      "A quieter way to consider feature balance. Nothing is agreed before a private conversation about suitability and risk.",
    treatments: ["facial-balancing", "liquid-rhinoplasty"],
  },
  {
    id: "lips",
    name: "Lip Aesthetics",
    short: "Shape, considered in profile and portrait.",
    description:
      "Lip work, when it is appropriate at all, is planned around your natural proportion rather than a template.",
    treatments: ["lip-enhancement"],
  },
  {
    id: "rejuvenation",
    name: "Skin Rejuvenation",
    short: "Renewal with a measured hand.",
    description:
      "Peels, needling and light — chosen around the recovery time you can actually live with.",
    treatments: ["microneedling", "chemical-peels", "led-light-therapy"],
  },
  {
    id: "consultation",
    name: "Wellness & Consultation",
    short: "Begin before you decide.",
    description:
      "A considered conversation about skin, goals and what not to do. No treatment is assumed.",
    treatments: ["skin-consultation"],
  },
];

export const treatments: Treatment[] = [
  {
    slug: "lip-enhancement",
    name: "Lip Enhancement",
    category: "lips",
    summary:
      "A consultation-led conversation about lip shape, balance and whether treatment is appropriate at all.",
    overview:
      "Lip enhancement at Aesthetics Universe is presented here as a fictional studio offering. In a real consultation, proportion is studied in motion and at rest — the cupid’s bow, the profile, and how the lips sit with the nose and chin. Prescription-only medicines are not advertised on this website. Product choice, dose and the decision to proceed happen only in private, after risks are explained. Results vary and are never guaranteed.",
    seeks: [
      "A shape that still looks like you, in photographs and in person",
      "Balance between the upper and lower lip",
      "Definition that does not rely on a trend",
    ],
    procedure:
      "A typical appointment begins with photographs and a discussion of what you do not want. If treatment is agreed, it is carried out with topical comfort measures where suitable, and reviewed before you leave. This page cannot tell you whether you are a candidate.",
    consultation:
      "Bring reference photographs only if they help you describe a feeling — not a face you want copied. Your practitioner should ask about cold sores, dental work, pregnancy and previous treatments, and should be willing to decline.",
    aftercare:
      "General guidance often includes avoiding strenuous heat, alcohol and pressure on the area for a short period, and contacting the clinic if something feels wrong. Swelling is common and not a result. Written aftercare would be given in person.",
    faqs: [
      {
        q: "Will my lips look larger straight away?",
        a: "Swelling can disguise the settled appearance. A real clinic would review you once the area has calmed, rather than judge the result on the day.",
      },
      {
        q: "Can you promise symmetry?",
        a: "No. Faces are not symmetrical, and no treatment can guarantee a particular outcome.",
      },
    ],
    priceFrom: 220,
    duration: "About 45 minutes",
    downtime: "Often a few days of swelling",
    image: img("1586495777744-4413f21062fa"),
    imageAlt: "A single lipstick on pale stone, styled as an editorial still life.",
    related: ["facial-balancing", "skin-consultation", "dermaplaning"],
  },
  {
    slug: "liquid-rhinoplasty",
    name: "Liquid Rhinoplasty",
    category: "harmony",
    summary:
      "A profile-balancing consultation. Not a substitute for surgery, and not a promise of a new nose.",
    overview:
      "Liquid rhinoplasty is a non-surgical conversation about small profile adjustments. This demonstration page does not advertise prescription-only medicines or name products. It is not suitable for everyone, it does not replace rhinoplasty surgery, and it carries risks that must be explained by a qualified practitioner — including vascular complications. Aesthetics Universe is a fictional brand and does not provide this treatment.",
    seeks: [
      "A smoother profile in certain lights",
      "A way to understand options before considering surgery",
      "An honest view of what cannot be changed",
    ],
    procedure:
      "Consultation comes first, often with photographs from several angles. If a practitioner later agrees treatment is appropriate, it is done conservatively and reviewed. This website cannot assess your anatomy.",
    consultation:
      "Expect questions about breathing, previous injury, surgery and what you hope will change. A careful practitioner will explain alternatives, including doing nothing.",
    aftercare:
      "Pressure, glasses and strenuous exercise are often avoided for a short time. You should be given a direct contact if you notice colour change, pain or mottling. Seek urgent medical care for worrying symptoms.",
    faqs: [
      {
        q: "Is this the same as a surgical rhinoplasty?",
        a: "No. Non-surgical profile work cannot reduce bone or cartilage and is temporary where temporary products are used. It is a different decision.",
      },
      {
        q: "Are results guaranteed?",
        a: "No. Photography, swelling and expectation all affect what you see afterwards.",
      },
    ],
    priceFrom: null,
    duration: "Consultation first",
    downtime: "Varies — explained in clinic",
    image: img("1531746020798-e6953c6e8e04"),
    imageAlt: "Editorial portrait of a woman in soft side light, used as atmosphere rather than a result.",
    related: ["facial-balancing", "skin-consultation", "lip-enhancement"],
  },
  {
    slug: "facial-balancing",
    name: "Facial Balancing",
    category: "harmony",
    summary:
      "A whole-face reading of proportion, so one feature is never treated as if it lived alone.",
    overview:
      "Facial balancing is a planning appointment as much as a treatment. The chin, lips, cheeks and jaw are considered together so a change in one place does not unsettle another. Any later treatment is optional, individual and not guaranteed. This page is educational demonstration copy, not a recommendation.",
    seeks: [
      "A plan that starts with the whole face",
      "Clarity about which area, if any, is worth discussing",
      "A refusal to chase a single trend",
    ],
    procedure:
      "The visit is mostly looking, measuring by eye and talking. Photographs help you and the practitioner see the same thing. Treatment, if any, may be staged over more than one visit.",
    consultation:
      "You should leave knowing what was suggested, what was declined and why. No package should be required on the day.",
    aftercare:
      "Depends entirely on what, if anything, was carried out. Written notes should match what was discussed aloud.",
    faqs: [
      {
        q: "Do I have to treat several areas?",
        a: "No. Balancing is a way of looking. The outcome of the conversation may be a single small change, or none.",
      },
      {
        q: "Will I look like someone else?",
        a: "That is not the intention. The work, when there is work, should still read as your face.",
      },
    ],
    priceFrom: 300,
    duration: "60–75 minutes",
    downtime: "Depends on what is agreed",
    image: img("1487412947147-5cebf100ffc2"),
    imageAlt: "Close beauty portrait with natural makeup and soft window light.",
    related: ["lip-enhancement", "liquid-rhinoplasty", "skin-consultation"],
  },
  {
    slug: "skin-boosters",
    name: "Skin Boosters",
    category: "skin",
    summary: "Hydration-focused skin treatments for glow and comfort, planned around your barrier.",
    overview:
      "Skin boosters are a family of treatments aimed at how skin feels and reflects light — not at freezing expression or rebuilding a face. Suitability depends on your skin, your calendar and your health. This description is general. It is not a diagnosis and it does not promise smoother, younger or ‘glass’ skin.",
    seeks: [
      "Skin that feels more comfortable through the day",
      "A lit-from-within quality in natural light",
      "A plan that can sit alongside simple skincare",
    ],
    procedure:
      "After cleansing and, where appropriate, numbing, a series of small placements or a device-assisted method may be used. The exact method would be agreed before anything begins.",
    consultation:
      "Your current routine, active ingredients and any history of cold sores, keloid scarring or immune conditions should be discussed. Bring a list of what you already use.",
    aftercare:
      "Mineral SPF, gentle cleansing and a pause on strong acids or retinoids are common advice for a few days. Makeup timing is individual.",
    faqs: [
      {
        q: "Is this a facial?",
        a: "It can feel like one, but it is a clinical treatment with its own risks and recovery. A facial and a skin booster are not interchangeable.",
      },
      {
        q: "How many sessions?",
        a: "Courses vary. A responsible plan names a review point rather than selling an open-ended package.",
      },
    ],
    priceFrom: 180,
    duration: "About 45 minutes",
    downtime: "Possible small marks for a day or two",
    image: img("1632345031435-8727f6897d53"),
    imageAlt: "A glass dropper bottle of serum against a soft neutral background.",
    related: ["led-light-therapy", "chemical-peels", "skin-consultation"],
  },
  {
    slug: "microneedling",
    name: "Microneedling",
    category: "rejuvenation",
    summary: "Controlled micro-channels to support the skin’s own repair — with real downtime, plainly described.",
    overview:
      "Microneedling uses a device of fine needles at a depth chosen for you. People often explore it for texture and tone. It will not suit active acne, some pigment conditions or anyone unable to pause certain skincare. Redness is expected. This is not a promise of scar removal.",
    seeks: [
      "Texture that makeup sits on unevenly",
      "A treatment that works with the skin’s own repair",
      "A clear account of social downtime before you book",
    ],
    procedure:
      "Skin is cleansed and usually numbed. The device is passed in a methodical pattern. A calming product may be applied afterwards. Depth is a clinical decision, not a menu upgrade.",
    consultation:
      "Mention isotretinoin history, pigmentation, herpes simplex and any tendency to keloid scars. If now is the wrong month, a good clinic will say so.",
    aftercare:
      "Expect heat and redness. Avoid heat, sweat, makeup and active ingredients until advised. SPF is essential. Worsening pain, pustules or pigment changes should be reported.",
    faqs: [
      {
        q: "Can I go back to work the same day?",
        a: "Some people do; many prefer not to. Plan using the downtime you were actually told, not a best case.",
      },
      {
        q: "Will it remove scars?",
        a: "Texture can look softer for some people over a course. Removal is the wrong word, and nothing is guaranteed.",
      },
    ],
    priceFrom: 160,
    duration: "60 minutes",
    downtime: "Redness often 24–72 hours",
    image: img("1616683693504-3ea7e9ad6fec"),
    imageAlt: "Close portrait of skin with a soft sheen, photographed in daylight.",
    related: ["chemical-peels", "led-light-therapy", "skin-boosters"],
  },
  {
    slug: "dermaplaning",
    name: "Dermaplaning",
    category: "skin",
    summary: "A precise exfoliation of vellus hair and dead skin, for a smoother canvas — temporarily.",
    overview:
      "Dermaplaning uses a sterile blade at a shallow angle to lift dull surface cells and fine vellus hair. Makeup can sit more evenly afterwards. Hair does not grow back darker; that is a myth. It is not appropriate over active acne, broken skin or some recent treatments. The effect is temporary.",
    seeks: [
      "A smoother surface for an event or a reset",
      "Less catching of light on dry, dull skin",
      "A treatment with modest downtime",
    ],
    procedure:
      "Skin is cleansed and held taut while the blade is stroked in short passes. It is often paired with a calming mask. It should not feel like a deep scrape.",
    consultation:
      "Tell the practitioner about retinoids, recent peels, cold sores and anything raised or inflamed. Those areas are avoided or the appointment is deferred.",
    aftercare:
      "Skin can feel freshly polished and slightly sensitive. SPF, bland moisturiser and a pause on scrubs are usual for a few days.",
    faqs: [
      {
        q: "Will the hair grow back thicker?",
        a: "No. Vellus hair is cut, not altered at the root. It returns with a blunt tip, which can feel more noticeable for a short time.",
      },
      {
        q: "How long does the smoothness last?",
        a: "Often a few weeks. Skin continues to shed, so this is maintenance, not a permanent change.",
      },
    ],
    priceFrom: 70,
    duration: "40 minutes",
    downtime: "Little for most people",
    image: img("1596755389378-c31d21fd1273"),
    imageAlt: "A woman applying a cream at a dressing table in soft morning light.",
    related: ["chemical-peels", "skin-consultation", "led-light-therapy"],
  },
  {
    slug: "chemical-peels",
    name: "Chemical Peels",
    category: "rejuvenation",
    summary: "A measured resurfacing, from a lunchtime refresh to a peel that needs a quieter week.",
    overview:
      "Chemical peels use acids at a strength chosen for your skin, not for a photograph. Superficial peels may cause tightness and light flaking. Deeper peels need more preparation and more recovery, and they are not casual. Pigment risk is real, especially in deeper skin tones, and must be discussed before anyone agrees.",
    seeks: [
      "Dullness that skincare alone has not shifted",
      "A texture reset with a named recovery window",
      "Guidance on what to stop using beforehand",
    ],
    procedure:
      "Skin is prepared, the solution is applied for a controlled time, and it is neutralised or left according to the peel. Sensation ranges from tingling to stronger heat. You should know which, before the day.",
    consultation:
      "Skin tone, pigment history, medicines and the next fortnight of your diary all matter. A peel timed before a wedding without recovery room is a poor plan.",
    aftercare:
      "SPF, no picking, and a simple routine. Flaking is not a reason to add more acids. Report swelling, crusting or pigment that worries you.",
    faqs: [
      {
        q: "Will I peel dramatically?",
        a: "Not always. Many superficial peels flake lightly or not at all. Visible peeling is not proof that a treatment ‘worked’.",
      },
      {
        q: "Can every skin tone be peeled the same way?",
        a: "No. Pigment risk changes the choice of acid, strength and whether a peel should happen at all.",
      },
    ],
    priceFrom: 95,
    duration: "30–50 minutes",
    downtime: "From none to several days, by depth",
    image: img("1556228720-195a672e8a03"),
    imageAlt: "Open jars of cream and a pale towel, arranged as a skincare still life.",
    related: ["microneedling", "dermaplaning", "skin-boosters"],
  },
  {
    slug: "led-light-therapy",
    name: "LED Light Therapy",
    category: "rejuvenation",
    summary: "A calm, non-invasive light session used for recovery, clarity and a moment of quiet.",
    overview:
      "LED uses specific wavelengths of light close to the skin. It is often chosen alongside other treatments or on its own when you want something gentle. Evidence varies by device and concern. It is not a cure for acne, rosacea or ageing, and some medicines and conditions make light unsuitable. Eye protection is not optional.",
    seeks: [
      "A low-downtime appointment",
      "Support around a more active treatment",
      "Time in a quiet room without a hard sell",
    ],
    procedure:
      "Skin is clean and dry. Protective eyewear is fitted. You rest under the panel for a set time. There is warmth and light, not a burning intention.",
    consultation:
      "Mention photosensitising medicines, epilepsy, migraine triggered by light, and pregnancy. These change whether LED is offered.",
    aftercare:
      "Most people return to the day immediately. Continue SPF. Do not treat a reaction to another procedure with extra sessions unless you have been advised to.",
    faqs: [
      {
        q: "Is one session enough?",
        a: "LED is usually discussed as a course. A single visit can feel pleasant without counting as a result.",
      },
      {
        q: "Can I wear makeup afterwards?",
        a: "Often yes, because the skin has not been broken. Your own clinician’s advice overrides a general note.",
      },
    ],
    priceFrom: 65,
    duration: "30 minutes",
    downtime: "Usually none",
    image: img("1616391182219-e080b4d1043a"),
    imageAlt: "A treatment room with linen, soft light and a calm clinical stillness.",
    related: ["skin-boosters", "microneedling", "skin-consultation"],
  },
  {
    slug: "skin-consultation",
    name: "Personalised Skin Consultation",
    category: "consultation",
    summary: "An unhurried hour to understand your skin before anyone suggests a treatment.",
    overview:
      "The consultation is the point of Aesthetics Universe, not a formality before a booking. You leave with a written sense of what matters, what can wait, and which treatments are a poor fit. It is not a diagnosis of skin disease. Medical symptoms belong with a doctor. This studio, and this practitioner list, are fictional.",
    seeks: [
      "A second opinion before committing to treatment elsewhere",
      "A routine that is shorter, not longer",
      "Language you can repeat back without a glossary",
    ],
    procedure:
      "We look at skin in good light, talk through your week, your products and your patience for downtime, and agree whether any treatment is even relevant. No procedure is performed unless you have chosen one after that conversation.",
    consultation:
      "This is the consultation. Come as you are, ideally without a new product started the night before. Photographs may be taken for your notes and deleted on request in a real clinic; here, nothing is stored.",
    aftercare:
      "You should receive a short plan: what to keep, what to stop, and when a review would be useful. If the plan is ‘nothing for now’, that is a complete outcome.",
    faqs: [
      {
        q: "Is the consultation a sales appointment?",
        a: "It should not be. In this demonstration, the diary exists to show the interface — not to sell you a course.",
      },
      {
        q: "Will you tell me what treatment I need?",
        a: "No website can. A consultation can offer options and reasons to decline. It cannot diagnose you online.",
      },
    ],
    priceFrom: 0,
    duration: "50 minutes",
    downtime: "None",
    image: img("1629909613654-28e377c37b09"),
    imageAlt: "A bright, minimal treatment room with a chair and pale walls.",
    related: ["dermaplaning", "skin-boosters", "chemical-peels"],
  },
];

export const categoryLabel: Record<CategoryId, string> = {
  skin: "Skin Universe",
  harmony: "Facial Harmony",
  lips: "Lip Aesthetics",
  rejuvenation: "Skin Rejuvenation",
  consultation: "Consultation",
};

export function getTreatment(slug: string) {
  return treatments.find((item) => item.slug === slug);
}

export function treatmentsIn(ids: string[]) {
  return ids
    .map((id) => getTreatment(id))
    .filter((item): item is Treatment => Boolean(item));
}

export function formatPrice(price: number | null) {
  if (price === null) return "Fee discussed in consultation";
  if (price === 0) return "Demonstration: complimentary conversation";
  return `Demonstration from £${price}`;
}

export const homeFaqs = [
  {
    q: "Is Aesthetics Universe a real clinic?",
    a: "No. This is a fictional demonstration brand for a portfolio website. Nothing here is medical advice, and no appointment can be booked.",
  },
  {
    q: "Do you advertise prescription medicines?",
    a: "No. Prescription-only medicines are not named or offered to the public on this site. In a real clinic those conversations happen privately, with a qualified prescriber.",
  },
  {
    q: "Are the prices real?",
    a: "They are illustrative figures in pounds sterling, marked as demonstration prices, so the interface can be judged. They are not a quote.",
  },
  {
    q: "Can the treatment finder tell me what I need?",
    a: "It can only point you towards descriptions that match a general interest. It does not diagnose, and it does not decide suitability.",
  },
  {
    q: "Where is the studio?",
    a: "The Mayfair address is a placeholder. Please do not travel to it. The telephone number is a drama reservation, not a working clinic line.",
  },
  {
    q: "Will my details be stored if I use the form?",
    a: "No. The form and the diary check your entries in the browser and then discard them. Nothing is sent to a server.",
  },
];

export const testimonials = [
  {
    quote:
      "I arrived ready to be talked into something. The hour did the opposite. We spent most of it deciding what my face did not need.",
    name: "Clara H.",
    place: "London",
  },
  {
    quote:
      "The room is quiet in the way good hotels are quiet. I understood the downtime before I understood the treatment, which is the correct order.",
    name: "Amira S.",
    place: "Richmond",
  },
  {
    quote:
      "I have sat through three consultations elsewhere that were really price lists. This one was a conversation about proportion. I left with a plan to wait.",
    name: "Helen P.",
    place: "Hampshire",
  },
  {
    quote:
      "They photographed me in daylight and then showed me the photographs. I had never been invited to look that honestly, or that kindly.",
    name: "Jonah E.",
    place: "Hackney",
  },
];

export const journey = [
  {
    n: "01",
    title: "Discover",
    copy: "Wander the treatment universe or the short finder. Both are maps, not diagnoses. They exist so you can arrive at a conversation with better questions.",
  },
  {
    n: "02",
    title: "Consult",
    copy: "An unhurried appointment in good light. Health, downtime, taste and the option of doing nothing are all part of the same discussion.",
  },
  {
    n: "03",
    title: "Personalise",
    copy: "If something is appropriate, it is planned around your features and your month — staged, declined or delayed. A trend is not a plan.",
  },
  {
    n: "04",
    title: "Experience",
    copy: "Treatment, if you choose it, is quiet and explained as it happens. Aftercare is written in plain English, with a person to contact.",
  },
];

export const principles = [
  {
    n: "01",
    title: "Proportion before product",
    copy: "The face is read as a whole. A treatment that flatters a photograph and unsettles the person is not a success.",
  },
  {
    n: "02",
    title: "Language you can repeat",
    copy: "If you cannot explain the plan to a friend on the way home, it was not explained well enough.",
  },
  {
    n: "03",
    title: "Downtime, said early",
    copy: "Redness, swelling and social calendar are part of consent. They are not a footnote after you have paid.",
  },
  {
    n: "04",
    title: "Permission to wait",
    copy: "The most precise recommendation is sometimes a season of good skincare and nothing else.",
  },
];

export type GalleryCategory = "All" | "Studio" | "Complexion" | "Portrait" | "Ritual";

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  category: Exclude<GalleryCategory, "All">;
  tall: boolean;
};

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    src: img("1600334129128-685c5582fd35", 1200),
    alt: "Warm spa interior with stone, timber and filtered daylight.",
    category: "Studio",
    tall: true,
  },
  {
    id: "g2",
    src: img("1616683693504-3ea7e9ad6fec", 1200),
    alt: "Editorial close-up of skin in natural light.",
    category: "Complexion",
    tall: false,
  },
  {
    id: "g3",
    src: img("1524504388940-b1c1722653e1", 1200),
    alt: "Fashion portrait of a woman standing in soft shade.",
    category: "Portrait",
    tall: true,
  },
  {
    id: "g4",
    src: img("1519415387722-a1c3bbef716c", 1200),
    alt: "Candles and ceramic vessels arranged for a treatment ritual.",
    category: "Ritual",
    tall: false,
  },
  {
    id: "g5",
    src: img("1570172619644-dfd03ed5d881", 1200),
    alt: "A person resting during a facial in a bright treatment room.",
    category: "Studio",
    tall: false,
  },
  {
    id: "g6",
    src: img("1556228720-195a672e8a03", 1200),
    alt: "Skincare creams in glass and stone, photographed from above.",
    category: "Ritual",
    tall: true,
  },
  {
    id: "g7",
    src: img("1488426862026-3ee34a7d66df", 1200),
    alt: "Portrait of a woman with wind in her hair, outdoors.",
    category: "Portrait",
    tall: false,
  },
  {
    id: "g8",
    src: img("1540555700478-4be289fbecef", 1200),
    alt: "Stacked spa stones beside water, in warm light.",
    category: "Ritual",
    tall: false,
  },
  {
    id: "g9",
    src: img("1560750588-73207b1ef5b8", 1200),
    alt: "A woman relaxing in a robe in a pale spa corridor.",
    category: "Studio",
    tall: true,
  },
  {
    id: "g10",
    src: img("1598440947619-2c35fc9aa908", 1200),
    alt: "Amber skincare bottles on a linen surface.",
    category: "Complexion",
    tall: false,
  },
  {
    id: "g11",
    src: img("1512290923902-8a9f81dc236c", 1200),
    alt: "Natural-light portrait with bare skin and a calm expression.",
    category: "Portrait",
    tall: true,
  },
  {
    id: "g12",
    src: img("1522335789203-aabd1fc54bc9", 1200),
    alt: "Makeup brushes and powder in a muted palette.",
    category: "Complexion",
    tall: false,
  },
];

export const comparisonImage = {
  src: img("1534528741775-53994a69daeb", 1800),
  alt: "Portrait used only as an illustrative colour-grade comparison, not a treatment result.",
};

export const team = [
  {
    name: "Amelia Voss",
    role: "Studio lead — fictional profile",
    bio: "A demonstration portrait. In a real clinic you would meet a named practitioner and verify their registration yourself. No medical qualification is claimed here.",
    image: img("1534528741775-53994a69daeb", 900),
    imageAlt: "Fictional team portrait of a woman smiling softly toward the camera.",
  },
  {
    name: "Leila Moreau",
    role: "Skin specialist — fictional profile",
    bio: "Written as a placeholder for the person who would talk you out of the wrong peel. The biography is invented. The standard — verify credentials — is not.",
    image: img("1488426862026-3ee34a7d66df", 900),
    imageAlt: "Fictional team portrait of a woman outdoors.",
  },
  {
    name: "Noah Ellery",
    role: "Consultation host — fictional profile",
    bio: "The host of the first conversation: diary, daylight, and the right to leave with no treatment booked. Not a clinician in this demonstration.",
    image: img("1524504388940-b1c1722653e1", 900),
    imageAlt: "Fictional team portrait, full length, in quiet fashion lighting.",
  },
];

export const finderInterests = [
  {
    id: "texture",
    label: "Skin texture",
    hint: "Smoothness, tone and the way light sits on the surface.",
    treatments: ["microneedling", "chemical-peels", "dermaplaning"],
  },
  {
    id: "hydration",
    label: "Hydration",
    hint: "Comfort, glow and skin that feels tight by evening.",
    treatments: ["skin-boosters", "led-light-therapy", "skin-consultation"],
  },
  {
    id: "contour",
    label: "Facial contouring",
    hint: "Balance through the profile and the features as a set.",
    treatments: ["facial-balancing", "liquid-rhinoplasty"],
  },
  {
    id: "lips",
    label: "Lip aesthetics",
    hint: "Shape and definition, considered rather than enlarged by default.",
    treatments: ["lip-enhancement"],
  },
  {
    id: "skincare",
    label: "General skincare",
    hint: "A place to begin when you do not yet want a named treatment.",
    treatments: ["skin-consultation", "dermaplaning", "chemical-peels"],
  },
] as const;

export const starPositions = [
  { x: 14, y: 68 },
  { x: 32, y: 30 },
  { x: 52, y: 58 },
  { x: 70, y: 24 },
  { x: 88, y: 62 },
];

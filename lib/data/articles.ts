// Static article data based on Article model structure
export interface Article {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  status: 'ongoing' | 'completed';
  location: string;
  projectValue?: string;
  images?: string[];
  featuredImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export const staticArticles: Article[] = [
  {
    _id: "1",
    title: "Civil Works for WTG Foundation - Khavda Renewable Park",
    slug: "civil-works-wtg-foundation-khavda-renewable-park",
    description: "Execution of civil foundation works for wind turbine generators at Khavda Renewable Energy Park.",
    content: "Odhav Enterprise Ltd successfully executed comprehensive civil foundation works for wind turbine generators at the Khavda Renewable Energy Park. The project involved detailed site preparation, excavation, reinforcement, and concrete work for multiple WTG foundations.",
    status: "ongoing",
    location: "Khavda, Kutch, Gujarat",
    projectValue: "Not specified",
    images: [
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800",
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800"
    ],
    featuredImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200",
    metaTitle: "WTG Foundation Works at Khavda Renewable Park - Adani Project",
    metaDescription: "Comprehensive civil foundation works for wind turbine generators at Khavda Renewable Energy Park by Odhav Enterprise Ltd.",
    keywords: ["WTG Foundation", "Adani", "Khavda", "Renewable Energy", "Wind Power"],
    published: true,
    publishedAt: "2024-01-20T10:00:00Z",
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z"
  },
  {
    _id: "2",
    title: "External & Internal Road Development - Khavda Renewable Energy Park",
    slug: "external-internal-road-development-khavda-renewable-energy-park",
    description: "Development of approach roads, external/internal connectivity roads within the renewable park.",
    content: "The road development project at Khavda Renewable Energy Park involved construction of extensive road networks to ensure seamless connectivity across the park. This included both external approach roads and internal pathways connecting various project sites.",
    status: "ongoing",
    location: "Khavda, Kutch, Gujarat",
    projectValue: "Not specified",
    images: [
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800"
    ],
    featuredImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200",
    metaTitle: "Road Development at Khavda Renewable Energy Park - Adani",
    metaDescription: "Comprehensive road infrastructure development for Khavda Renewable Energy Park including external and internal connectivity.",
    keywords: ["Road Development", "Adani", "Khavda", "Infrastructure", "Renewable Energy"],
    published: true,
    publishedAt: "2024-01-22T10:00:00Z",
    createdAt: "2024-01-22T10:00:00Z",
    updatedAt: "2024-01-22T10:00:00Z"
  },
  {
    _id: "3",
    title: "WTG Installation & Erection - Continuum Dalauda Site",
    slug: "wtg-installation-erection-continuum-dalauda-site",
    description: "Complete installation, mechanical erection, alignment, and commissioning of GE wind turbines at Continuum Dalauda Wind Farm.",
    content: "Odhav Enterprise Ltd completed the full-scale installation and erection of GE wind turbines at Continuum's Dalauda wind farm in Madhya Pradesh. The project encompassed comprehensive mechanical erection, precise alignment, and successful commissioning of multiple wind turbine generators.",
    status: "completed",
    location: "Dalauda, Madhya Pradesh",
    projectValue: "₹1,78,79,000.00",
    images: [
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800",
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800",
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800"
    ],
    featuredImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200",
    metaTitle: "GE Wind Turbine Installation at Continuum Dalauda - Completed Project",
    metaDescription: "Successful completion of GE wind turbine installation and commissioning at Continuum Dalauda Wind Farm by Odhav Enterprise Ltd.",
    keywords: ["WTG Installation", "GE", "Continuum", "Dalauda", "Wind Energy", "Completed Project"],
    published: true,
    publishedAt: "2024-01-18T10:00:00Z",
    createdAt: "2024-01-18T10:00:00Z",
    updatedAt: "2024-01-18T10:00:00Z"
  },
  {
    _id: "4",
    title: "33 KV Transmission Line Construction - Bhuvad Site",
    slug: "33-kv-transmission-line-construction-bhuvad-site",
    description: "Construction of 33 KV transmission line with liaisoning for 45 km and construction of DP Yard for 10 WTGs at Bhuvad Site 300 MW.",
    content: "The transmission line project at Bhuvad site involved construction of a 45-kilometer 33 KV transmission line along with comprehensive liaisoning work. Additionally, the project included development of a Distribution Point (DP) Yard to support 10 wind turbine generators.",
    status: "completed",
    location: "Bhuvad, Bhuj, Gujarat",
    projectValue: "Not specified",
    images: [],
    featuredImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200",
    metaTitle: "33 KV Transmission Line at Bhuvad - Siemens Gamesa Project",
    metaDescription: "45 km 33 KV transmission line construction and DP Yard development for 10 WTGs at Bhuvad 300 MW site.",
    keywords: ["Transmission Line", "Siemens Gamesa", "Bhuvad", "33 KV", "Power Infrastructure"],
    published: true,
    publishedAt: "2024-01-16T10:00:00Z",
    createdAt: "2024-01-16T10:00:00Z",
    updatedAt: "2024-01-16T10:00:00Z"
  },
  {
    _id: "5",
    title: "Solar Panel Installation - Rajasthan Solar Park",
    slug: "solar-panel-installation-rajasthan-solar-park",
    description: "Large-scale solar panel installation and grid integration for Rajasthan Solar Energy Park.",
    content: "Comprehensive solar panel installation project covering 500 acres with advanced grid integration systems. The project includes mounting structures, panel installation, and complete electrical infrastructure.",
    status: "ongoing",
    location: "Jodhpur, Rajasthan",
    projectValue: "₹5,00,00,000.00",
    images: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800"
    ],
    featuredImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200",
    metaTitle: "Solar Panel Installation at Rajasthan Solar Park",
    metaDescription: "Large-scale solar panel installation and grid integration project in Rajasthan by Odhav Enterprise Ltd.",
    keywords: ["Solar Energy", "Rajasthan", "Solar Panels", "Renewable Energy", "Grid Integration"],
    published: true,
    publishedAt: "2024-02-01T10:00:00Z",
    createdAt: "2024-02-01T10:00:00Z",
    updatedAt: "2024-02-01T10:00:00Z"
  },
  {
    _id: "6",
    title: "Wind Farm Infrastructure Development - Tamil Nadu",
    slug: "wind-farm-infrastructure-development-tamil-nadu",
    description: "Complete infrastructure development for 200 MW wind farm including access roads, substation, and control facilities.",
    content: "Comprehensive infrastructure development project for a 200 MW wind farm in Tamil Nadu. The project includes construction of access roads, substation facilities, control rooms, and all supporting infrastructure.",
    status: "completed",
    location: "Coimbatore, Tamil Nadu",
    projectValue: "₹8,50,00,000.00",
    images: [
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800"
    ],
    featuredImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200",
    metaTitle: "Wind Farm Infrastructure Development in Tamil Nadu",
    metaDescription: "Complete infrastructure development for 200 MW wind farm in Tamil Nadu including roads, substation, and control facilities.",
    keywords: ["Wind Farm", "Tamil Nadu", "Infrastructure", "Substation", "Renewable Energy"],
    published: true,
    publishedAt: "2024-01-15T10:00:00Z",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    _id: "7",
    title: "Hydroelectric Power Plant Construction - Himachal Pradesh",
    slug: "hydroelectric-power-plant-construction-himachal-pradesh",
    description: "Construction of 50 MW hydroelectric power plant with dam, penstock, and powerhouse facilities.",
    content: "Major hydroelectric power plant construction project in Himachal Pradesh. The project includes dam construction, penstock installation, powerhouse development, and complete electrical systems.",
    status: "ongoing",
    location: "Shimla, Himachal Pradesh",
    projectValue: "₹12,00,00,000.00",
    images: [
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800"
    ],
    featuredImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200",
    metaTitle: "Hydroelectric Power Plant Construction in Himachal Pradesh",
    metaDescription: "Construction of 50 MW hydroelectric power plant with complete infrastructure in Himachal Pradesh.",
    keywords: ["Hydroelectric", "Himachal Pradesh", "Power Plant", "Dam Construction", "Renewable Energy"],
    published: true,
    publishedAt: "2024-02-05T10:00:00Z",
    createdAt: "2024-02-05T10:00:00Z",
    updatedAt: "2024-02-05T10:00:00Z"
  },
  {
    _id: "8",
    title: "Biomass Power Plant Setup - Maharashtra",
    slug: "biomass-power-plant-setup-maharashtra",
    description: "Complete setup and commissioning of 25 MW biomass power plant with fuel handling systems.",
    content: "End-to-end biomass power plant setup in Maharashtra including boiler installation, turbine setup, fuel handling systems, and complete plant commissioning.",
    status: "completed",
    location: "Pune, Maharashtra",
    projectValue: "₹4,50,00,000.00",
    images: [
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800"
    ],
    featuredImage: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200",
    metaTitle: "Biomass Power Plant Setup in Maharashtra",
    metaDescription: "Complete setup and commissioning of 25 MW biomass power plant with fuel handling systems in Maharashtra.",
    keywords: ["Biomass", "Maharashtra", "Power Plant", "Renewable Energy", "Bioenergy"],
    published: true,
    publishedAt: "2024-01-10T10:00:00Z",
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z"
  },
  {
    _id: "9",
    title: "Geothermal Exploration Project - Ladakh",
    slug: "geothermal-exploration-project-ladakh",
    description: "Geothermal exploration and drilling operations for potential 10 MW geothermal power generation.",
    content: "Pioneering geothermal exploration project in Ladakh involving deep drilling operations, resource assessment, and feasibility studies for geothermal power generation.",
    status: "ongoing",
    location: "Leh, Ladakh",
    projectValue: "₹3,00,00,000.00",
    images: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800"
    ],
    featuredImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200",
    metaTitle: "Geothermal Exploration Project in Ladakh",
    metaDescription: "Geothermal exploration and drilling operations for potential 10 MW geothermal power generation in Ladakh.",
    keywords: ["Geothermal", "Ladakh", "Exploration", "Renewable Energy", "Drilling"],
    published: true,
    publishedAt: "2024-02-10T10:00:00Z",
    createdAt: "2024-02-10T10:00:00Z",
    updatedAt: "2024-02-10T10:00:00Z"
  },
  {
    _id: "10",
    title: "Tidal Energy Research Facility - Gujarat Coast",
    slug: "tidal-energy-research-facility-gujarat-coast",
    description: "Construction of research and testing facility for tidal energy generation systems.",
    content: "State-of-the-art research facility for tidal energy systems including testing infrastructure, data collection systems, and prototype installation facilities.",
    status: "completed",
    location: "Dwarka, Gujarat",
    projectValue: "₹2,50,00,000.00",
    images: [
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800"
    ],
    featuredImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200",
    metaTitle: "Tidal Energy Research Facility on Gujarat Coast",
    metaDescription: "Construction of research and testing facility for tidal energy generation systems in Gujarat.",
    keywords: ["Tidal Energy", "Gujarat", "Research Facility", "Renewable Energy", "Marine Energy"],
    published: true,
    publishedAt: "2024-01-05T10:00:00Z",
    createdAt: "2024-01-05T10:00:00Z",
    updatedAt: "2024-01-05T10:00:00Z"
  }
];

// Get featured articles (first 3)
export const getFeaturedArticles = (): Article[] => {
  return staticArticles.slice(0, 3);
};

// Get all published articles
export const getAllArticles = (): Article[] => {
  return staticArticles.filter(article => article.published);
};

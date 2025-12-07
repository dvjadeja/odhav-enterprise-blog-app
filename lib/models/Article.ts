import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  slug: string;
  description: string;
  content: string;
  clients: Types.ObjectId[]; // Array of Client references (can be single or multiple)
  projectTypes: Types.ObjectId[]; // Array of ProjectType references
  status: 'ongoing' | 'completed';
  location: string;
  projectValue?: string;
  images?: string[]; // S3 URLs
  featuredImage?: string; // S3 URL
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema: Schema<IArticle> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    clients: {
      type: [Schema.Types.ObjectId],
      ref: 'Client',
      required: [true, 'At least one client is required'],
      validate: {
        validator: function (v: Types.ObjectId[]) {
          return Array.isArray(v) && v.length > 0;
        },
        message: 'At least one client must be selected',
      },
    },
    projectTypes: {
      type: [Schema.Types.ObjectId],
      ref: 'ProjectType',
      required: [true, 'At least one project type is required'],
      validate: {
        validator: function (v: Types.ObjectId[]) {
          return Array.isArray(v) && v.length > 0;
        },
        message: 'At least one project type must be selected',
      },
    },
    status: {
      type: String,
      enum: ['ongoing', 'completed'],
      required: [true, 'Status is required'],
      index: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    projectValue: {
      type: String,
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    featuredImage: {
      type: String,
      trim: true,
    },
    metaTitle: {
      type: String,
      trim: true,
      maxlength: [60, 'Meta title should not exceed 60 characters'],
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [160, 'Meta description should not exceed 160 characters'],
    },
    keywords: {
      type: [String],
      default: [],
    },
    published: {
      type: Boolean,
      default: false,
      index: true,
    },
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better search performance
ArticleSchema.index({ clients: 1, status: 1 });
ArticleSchema.index({ projectTypes: 1 });
ArticleSchema.index({ slug: 1 });
ArticleSchema.index({ published: 1, publishedAt: -1 });
ArticleSchema.index({ title: 'text', description: 'text', content: 'text' });

// Ensure slug is generated from title if not provided
ArticleSchema.pre('save', async function () {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  if (this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
});

const Article: Model<IArticle> =
  mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

export default Article;

/*
 * Sample Article Data:
 * 
 * {
 *   _id: ObjectId("507f1f77bcf86cd799439021"),
 *   title: "Civil Works for WTG Foundation - Khavda Renewable Park",
 *   slug: "civil-works-wtg-foundation-khavda-renewable-park",
 *   description: "Execution of civil foundation works for wind turbine generators at Khavda Renewable Energy Park.",
 *   content: "Odhav Enterprise Ltd successfully executed comprehensive civil foundation works for wind turbine generators at the Khavda Renewable Energy Park. The project involved detailed site preparation, excavation, reinforcement, and concrete work for multiple WTG foundations. Our team ensured strict adherence to quality standards and safety protocols throughout the execution phase...",
 *   clients: [
 *     ObjectId("507f1f77bcf86cd799439031") // Adani
 *   ],
 *   projectTypes: [
 *     ObjectId("507f1f77bcf86cd799439011"), // WTG Foundation
 *     ObjectId("507f1f77bcf86cd799439014")  // Crane Pad Development
 *   ],
 *   status: "ongoing",
 *   location: "Khavda, Kutch, Gujarat",
 *   projectValue: "Not specified",
 *   images: [
 *     "https://s3.amazonaws.com/bucket/project1-image1.jpg",
 *     "https://s3.amazonaws.com/bucket/project1-image2.jpg"
 *   ],
 *   featuredImage: "https://s3.amazonaws.com/bucket/project1-featured.jpg",
 *   metaTitle: "WTG Foundation Works at Khavda Renewable Park - Adani Project",
 *   metaDescription: "Comprehensive civil foundation works for wind turbine generators at Khavda Renewable Energy Park by Odhav Enterprise Ltd.",
 *   keywords: ["WTG Foundation", "Adani", "Khavda", "Renewable Energy", "Wind Power"],
 *   published: true,
 *   publishedAt: ISODate("2024-01-20T10:00:00Z"),
 *   createdAt: ISODate("2024-01-20T10:00:00Z"),
 *   updatedAt: ISODate("2024-01-20T10:00:00Z")
 * }
 * 
 * {
 *   _id: ObjectId("507f1f77bcf86cd799439022"),
 *   title: "External & Internal Road Development - Khavda Renewable Energy Park",
 *   slug: "external-internal-road-development-khavda-renewable-energy-park",
 *   description: "Development of approach roads, external/internal connectivity roads within the renewable park.",
 *   content: "The road development project at Khavda Renewable Energy Park involved construction of extensive road networks to ensure seamless connectivity across the park. This included both external approach roads and internal pathways connecting various project sites. The infrastructure development was crucial for supporting heavy machinery movement and ensuring efficient project operations...",
 *   clients: [
 *     ObjectId("507f1f77bcf86cd799439031") // Adani
 *   ],
 *   projectTypes: [
 *     ObjectId("507f1f77bcf86cd799439012") // Road Development
 *   ],
 *   status: "ongoing",
 *   location: "Khavda, Kutch, Gujarat",
 *   projectValue: "Not specified",
 *   images: [
 *     "https://s3.amazonaws.com/bucket/road-project-image1.jpg"
 *   ],
 *   featuredImage: "https://s3.amazonaws.com/bucket/road-project-featured.jpg",
 *   metaTitle: "Road Development at Khavda Renewable Energy Park - Adani",
 *   metaDescription: "Comprehensive road infrastructure development for Khavda Renewable Energy Park including external and internal connectivity.",
 *   keywords: ["Road Development", "Adani", "Khavda", "Infrastructure", "Renewable Energy"],
 *   published: true,
 *   publishedAt: ISODate("2024-01-22T10:00:00Z"),
 *   createdAt: ISODate("2024-01-22T10:00:00Z"),
 *   updatedAt: ISODate("2024-01-22T10:00:00Z")
 * }
 * 
 * {
 *   _id: ObjectId("507f1f77bcf86cd799439023"),
 *   title: "WTG Installation & Erection - Continuum Dalauda Site",
 *   slug: "wtg-installation-erection-continuum-dalauda-site",
 *   description: "Complete installation, mechanical erection, alignment, and commissioning of GE wind turbines at Continuum Dalauda Wind Farm.",
 *   content: "Odhav Enterprise Ltd completed the full-scale installation and erection of GE wind turbines at Continuum's Dalauda wind farm in Madhya Pradesh. The project encompassed comprehensive mechanical erection, precise alignment, and successful commissioning of multiple wind turbine generators. Our experienced team ensured optimal performance and safety standards throughout the installation process...",
 *   clients: [
 *     ObjectId("507f1f77bcf86cd799439034"), // GE India Industrial Pvt. Ltd.
 *     ObjectId("507f1f77bcf86cd799439037")  // Continuum
 *   ],
 *   projectTypes: [
 *     ObjectId("507f1f77bcf86cd799439013") // Installation/Erection
 *   ],
 *   status: "completed",
 *   location: "Dalauda, Madhya Pradesh",
 *   projectValue: "₹1,78,79,000.00",
 *   images: [
 *     "https://s3.amazonaws.com/bucket/ge-installation-1.jpg",
 *     "https://s3.amazonaws.com/bucket/ge-installation-2.jpg",
 *     "https://s3.amazonaws.com/bucket/ge-installation-3.jpg"
 *   ],
 *   featuredImage: "https://s3.amazonaws.com/bucket/ge-installation-featured.jpg",
 *   metaTitle: "GE Wind Turbine Installation at Continuum Dalauda - Completed Project",
 *   metaDescription: "Successful completion of GE wind turbine installation and commissioning at Continuum Dalauda Wind Farm by Odhav Enterprise Ltd.",
 *   keywords: ["WTG Installation", "GE", "Continuum", "Dalauda", "Wind Energy", "Completed Project"],
 *   published: true,
 *   publishedAt: ISODate("2024-01-18T10:00:00Z"),
 *   createdAt: ISODate("2024-01-18T10:00:00Z"),
 *   updatedAt: ISODate("2024-01-18T10:00:00Z")
 * }
 * 
 * {
 *   _id: ObjectId("507f1f77bcf86cd799439024"),
 *   title: "33 KV Transmission Line Construction - Bhuvad Site",
 *   slug: "33-kv-transmission-line-construction-bhuvad-site",
 *   description: "Construction of 33 KV transmission line with liaisoning for 45 km and construction of DP Yard for 10 WTGs at Bhuvad Site 300 MW.",
 *   content: "The transmission line project at Bhuvad site involved construction of a 45-kilometer 33 KV transmission line along with comprehensive liaisoning work. Additionally, the project included development of a Distribution Point (DP) Yard to support 10 wind turbine generators. This critical infrastructure component ensures efficient power evacuation from the wind farm...",
 *   clients: [
 *     ObjectId("507f1f77bcf86cd799439035") // Siemens Gamesa
 *   ],
 *   projectTypes: [
 *     ObjectId("507f1f77bcf86cd799439015") // Transmission Line Works
 *   ],
 *   status: "completed",
 *   location: "Bhuvad, Bhuj, Gujarat",
 *   projectValue: "Not specified",
 *   images: [],
 *   featuredImage: "https://s3.amazonaws.com/bucket/transmission-line-featured.jpg",
 *   metaTitle: "33 KV Transmission Line at Bhuvad - Siemens Gamesa Project",
 *   metaDescription: "45 km 33 KV transmission line construction and DP Yard development for 10 WTGs at Bhuvad 300 MW site.",
 *   keywords: ["Transmission Line", "Siemens Gamesa", "Bhuvad", "33 KV", "Power Infrastructure"],
 *   published: true,
 *   publishedAt: ISODate("2024-01-16T10:00:00Z"),
 *   createdAt: ISODate("2024-01-16T10:00:00Z"),
 *   updatedAt: ISODate("2024-01-16T10:00:00Z")
 * }
 */

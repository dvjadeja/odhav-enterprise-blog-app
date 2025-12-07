import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IClient extends Document {
  name: string;
  slug: string;
  description?: string;
  logo?: string; // S3 URL or path to logo
  website?: string;
  isActive: boolean;
  displayOrder: number; // This will be used to sort the clients in the UI
  createdAt: Date;
  updatedAt: Date;
}

const ClientSchema: Schema<IClient> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Client name is required'],
      unique: true,
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
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
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    logo: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
      match: [
        /^https?:\/\/.+/,
        'Website must be a valid URL starting with http:// or https://',
      ],
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes
ClientSchema.index({ slug: 1 });
ClientSchema.index({ isActive: 1, displayOrder: 1 });

// Auto-generate slug from name if not provided
ClientSchema.pre('save', async function () {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
});

const Client: Model<IClient> =
  mongoose.models.Client || mongoose.model<IClient>('Client', ClientSchema);

export default Client;

/*
 * Sample Client Data:
 * 
 * {
 *   _id: ObjectId("507f1f77bcf86cd799439031"),
 *   name: "Adani",
 *   slug: "adani",
 *   description: "Adani Group - Leading renewable energy infrastructure company",
 *   logo: "https://s3.amazonaws.com/bucket/clients/adani-logo.png",
 *   website: "https://www.adani.com",
 *   isActive: true,
 *   displayOrder: 1,
 *   createdAt: ISODate("2024-01-15T10:00:00Z"),
 *   updatedAt: ISODate("2024-01-15T10:00:00Z")
 * }
 * 
 * {
 *   _id: ObjectId("507f1f77bcf86cd799439032"),
 *   name: "JSW",
 *   slug: "jsw",
 *   description: "JSW Group - Diversified business conglomerate with renewable energy focus",
 *   logo: "https://s3.amazonaws.com/bucket/clients/jsw-logo.png",
 *   website: "https://www.jsw.in",
 *   isActive: true,
 *   displayOrder: 2,
 *   createdAt: ISODate("2024-01-15T10:00:00Z"),
 *   updatedAt: ISODate("2024-01-15T10:00:00Z")
 * }
 * 
 * {
 *   _id: ObjectId("507f1f77bcf86cd799439033"),
 *   name: "Suzlon",
 *   slug: "suzlon",
 *   description: "Suzlon Global Services Ltd - Wind energy solutions provider",
 *   logo: "https://s3.amazonaws.com/bucket/clients/suzlon-logo.png",
 *   website: "https://www.suzlon.com",
 *   isActive: true,
 *   displayOrder: 3,
 *   createdAt: ISODate("2024-01-15T10:00:00Z"),
 *   updatedAt: ISODate("2024-01-15T10:00:00Z")
 * }
 * 
 * {
 *   _id: ObjectId("507f1f77bcf86cd799439034"),
 *   name: "GE India Industrial Pvt. Ltd.",
 *   slug: "ge-india-industrial-pvt-ltd",
 *   description: "GE India - Global leader in wind turbine technology and renewable energy solutions",
 *   logo: "https://s3.amazonaws.com/bucket/clients/ge-logo.png",
 *   website: "https://www.ge.com/in",
 *   isActive: true,
 *   displayOrder: 4,
 *   createdAt: ISODate("2024-01-15T10:00:00Z"),
 *   updatedAt: ISODate("2024-01-15T10:00:00Z")
 * }
 * 
 * {
 *   _id: ObjectId("507f1f77bcf86cd799439035"),
 *   name: "Siemens Gamesa",
 *   slug: "siemens-gamesa",
 *   description: "Siemens Gamesa Renewable Energy - Leading wind power solutions provider",
 *   logo: "https://s3.amazonaws.com/bucket/clients/siemens-gamesa-logo.png",
 *   website: "https://www.siemensgamesa.com",
 *   isActive: true,
 *   displayOrder: 5,
 *   createdAt: ISODate("2024-01-15T10:00:00Z"),
 *   updatedAt: ISODate("2024-01-15T10:00:00Z")
 * }
 * 
 * {
 *   _id: ObjectId("507f1f77bcf86cd799439036"),
 *   name: "Sembcorp",
 *   slug: "sembcorp",
 *   description: "Sembcorp Industries - Sustainable solutions and renewable energy developer",
 *   logo: "https://s3.amazonaws.com/bucket/clients/sembcorp-logo.png",
 *   website: "https://www.sembcorp.com",
 *   isActive: true,
 *   displayOrder: 6,
 *   createdAt: ISODate("2024-01-15T10:00:00Z"),
 *   updatedAt: ISODate("2024-01-15T10:00:00Z")
 * }
 * 
 * {
 *   _id: ObjectId("507f1f77bcf86cd799439037"),
 *   name: "Continuum",
 *   slug: "continuum",
 *   description: "Continuum Green Energy - Renewable energy project developer",
 *   logo: "https://s3.amazonaws.com/bucket/clients/continuum-logo.png",
 *   website: "https://www.continuumgreen.com",
 *   isActive: true,
 *   displayOrder: 7,
 *   createdAt: ISODate("2024-01-15T10:00:00Z"),
 *   updatedAt: ISODate("2024-01-15T10:00:00Z")
 * }
 * 
 * {
 *   _id: ObjectId("507f1f77bcf86cd799439038"),
 *   name: "TATA Power",
 *   slug: "tata-power",
 *   description: "TATA Power - India's largest integrated power company with renewable energy focus",
 *   logo: "https://s3.amazonaws.com/bucket/clients/tata-power-logo.png",
 *   website: "https://www.tatapower.com",
 *   isActive: true,
 *   displayOrder: 8,
 *   createdAt: ISODate("2024-01-15T10:00:00Z"),
 *   updatedAt: ISODate("2024-01-15T10:00:00Z")
 * }
 * 
 * {
 *   _id: ObjectId("507f1f77bcf86cd799439039"),
 *   name: "Sangreen Future Renewables Pvt. Ltd.",
 *   slug: "sangreen-future-renewables-pvt-ltd",
 *   description: "Sangreen Future Renewables - Renewable energy project developer",
 *   logo: "https://s3.amazonaws.com/bucket/clients/sangreen-logo.png",
 *   website: null,
 *   isActive: true,
 *   displayOrder: 9,
 *   createdAt: ISODate("2024-01-15T10:00:00Z"),
 *   updatedAt: ISODate("2024-01-15T10:00:00Z")
 * }
 */


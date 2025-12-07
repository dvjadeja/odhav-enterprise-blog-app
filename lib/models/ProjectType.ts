import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProjectType extends Document {
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectTypeSchema: Schema<IProjectType> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Project type name is required'],
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
ProjectTypeSchema.index({ slug: 1 });
ProjectTypeSchema.index({ isActive: 1, displayOrder: 1 });

// Auto-generate slug from name if not provided
ProjectTypeSchema.pre('save', async function () {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
});

const ProjectType: Model<IProjectType> =
  mongoose.models.ProjectType ||
  mongoose.model<IProjectType>('ProjectType', ProjectTypeSchema);

export default ProjectType;

/*
 * Sample ProjectType Data:
 * 
 * {
 *   _id: ObjectId("507f1f77bcf86cd799439011"),
 *   name: "WTG Foundation",
 *   slug: "wtg-foundation",
 *   description: "Wind Turbine Generator foundation construction and civil works",
 *   isActive: true,
 *   displayOrder: 1,
 *   createdAt: ISODate("2024-01-15T10:00:00Z"),
 *   updatedAt: ISODate("2024-01-15T10:00:00Z")
 * }
 * 
 * {
 *   _id: ObjectId("507f1f77bcf86cd799439012"),
 *   name: "Road Development",
 *   slug: "road-development",
 *   description: "Internal and external road construction, access pathways, and infrastructure",
 *   isActive: true,
 *   displayOrder: 2,
 *   createdAt: ISODate("2024-01-15T10:00:00Z"),
 *   updatedAt: ISODate("2024-01-15T10:00:00Z")
 * }
 * 
 * {
 *   _id: ObjectId("507f1f77bcf86cd799439013"),
 *   name: "Installation/Erection",
 *   slug: "installation-erection",
 *   description: "WTG installation, erection, and mechanical assembly works",
 *   isActive: true,
 *   displayOrder: 3,
 *   createdAt: ISODate("2024-01-15T10:00:00Z"),
 *   updatedAt: ISODate("2024-01-15T10:00:00Z")
 * }
 * 
 * {
 *   _id: ObjectId("507f1f77bcf86cd799439014"),
 *   name: "Crane Pad Development",
 *   slug: "crane-pad-development",
 *   description: "Construction of crane pads and unloading areas for turbine installation",
 *   isActive: true,
 *   displayOrder: 4,
 *   createdAt: ISODate("2024-01-15T10:00:00Z"),
 *   updatedAt: ISODate("2024-01-15T10:00:00Z")
 * }
 * 
 * {
 *   _id: ObjectId("507f1f77bcf86cd799439015"),
 *   name: "Transmission Line Works",
 *   slug: "transmission-line-works",
 *   description: "33kV/66kV transmission line installation and commissioning",
 *   isActive: true,
 *   displayOrder: 5,
 *   createdAt: ISODate("2024-01-15T10:00:00Z"),
 *   updatedAt: ISODate("2024-01-15T10:00:00Z")
 * }
 * 
 * {
 *   _id: ObjectId("507f1f77bcf86cd799439016"),
 *   name: "AC/DC BOS Works",
 *   slug: "ac-dc-bos-works",
 *   description: "Balance of System works including AC and DC electrical infrastructure",
 *   isActive: true,
 *   displayOrder: 6,
 *   createdAt: ISODate("2024-01-15T10:00:00Z"),
 *   updatedAt: ISODate("2024-01-15T10:00:00Z")
 * }
 * 
 * {
 *   _id: ObjectId("507f1f77bcf86cd799439017"),
 *   name: "Solar MMS & Module Installation",
 *   slug: "solar-mms-module-installation",
 *   description: "Solar module mounting structure (MMS), tracker installation, and module mounting",
 *   isActive: true,
 *   displayOrder: 7,
 *   createdAt: ISODate("2024-01-15T10:00:00Z"),
 *   updatedAt: ISODate("2024-01-15T10:00:00Z")
 * }
 */

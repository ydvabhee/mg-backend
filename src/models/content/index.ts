import { model, Document, Schema } from "mongoose";  
import { IContent } from "./content.dto";

const ContentSchema: Schema = new Schema<IContent>({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  theme: {
    type: Schema.Types.ObjectId,
    ref: "Theme",
    required: true,
  },
  description: {
    type: String,
    default: "",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export const Content = model<IContent & Document>("Content", ContentSchema);
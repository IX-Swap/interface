export interface Document {
  _id: string
  title: string
  type: string
  user: string
  originalFileName: string
  url?: string
  createdAt: string
  updatedAt: string
}

export interface DocumentGuide {
  title: string
  label: string
  type: string
};

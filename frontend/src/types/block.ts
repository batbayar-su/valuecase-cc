export type BlockBody = {
  id?: string;
  title: string;
  subtitle: string;
  index: number;
  body?: string;
  imageId?: number;
};

export const INITIAL_BLOCK = {
  title: "",
  subtitle: "",
  index: 0,
  body: "",
  imageId: 0,
};

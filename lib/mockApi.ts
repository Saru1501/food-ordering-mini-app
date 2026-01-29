// lib/mockApi.ts
import dummyData from "./data";

// Make fake IDs like Appwrite uses ($id)
const withId = <T extends object>(arr: T[], prefix: string) =>
  arr.map((item, i) => ({ $id: `${prefix}_${i + 1}`, ...item }));

const categories = withId(dummyData.categories, "cat");
const menu = withId(dummyData.menu, "menu");

export const getCategories = async () => {
  return categories;
};

type GetMenuParams = {
  category?: string;
  query?: string;
  limit?: number;
};

export const getMenu = async ({ category, query, limit = 999 }: GetMenuParams) => {
  let filtered = [...menu];

  if (category) {
    filtered = filtered.filter((m: any) => m.category_name === category);
  }

  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter((m: any) => m.name.toLowerCase().includes(q));
  }

  return filtered.slice(0, limit);
};

export interface Tool {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export async function getTools(): Promise<Tool[]> {
  return [
    { id: "1", name: "مطرقة", description: "أداة للطرق" },
    { id: "2", name: "مفك براغي", description: "لف البراغي" },
  ];
}
import { getTools } from "@/lib/tools";

export default async function Page({ params }: { params: { locale: string } }) {
  const q = params?.q;

  let toolsList = await getTools();

  if (q) {
    const queryStr = q.trim().toLowerCase();
    toolsList = toolsList.filter(t =>
      t.name_ar.includes(queryStr) ||
      t.name.toLowerCase().includes(queryStr)
    );
  }

  return (
    <div>
      {/* باقي الصفحة */}
    </div>
  );
}

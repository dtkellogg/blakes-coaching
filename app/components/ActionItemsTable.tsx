export default async function ActionItemsTable() {
  const getActionItems = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/actionItems", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch Action Items");
      }

      return res.json();
    } catch (error) {
      console.log("Error loading Action Items: ", error);
    }
  };

  const { actionItems } = await getActionItems()

  return (
    <table className="table-auto border-separate border-spacing-0.5 border border-slate-500">
      <caption className="caption-bottom">
        Table 1: All Action Items sorted by deadline.
      </caption>
      <thead>
        <tr>
          <th className="border border-slate-600">Title</th>
          <th className="border border-slate-600">Deadline</th>
          <th className="border border-slate-600">Description</th>
        </tr>
      </thead>
      <tbody>
        {actionItems && actionItems.map((actionItem: any, i: number) => (
          <tr key={i}>
            <td className="border border-slate-700">{actionItem.title}</td>
            <td className="border border-slate-700">{new Date(`${actionItem.deadline}`).toDateString()}</td>
            <td className="border border-slate-700">{actionItem.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

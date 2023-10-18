export default async function ActionItemsList() {

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
    <div>
      {actionItems && actionItems.map((actionItem: any, i: number) => (
        <div key={i} className="grid grid-cols-3 justify-center">
          <span>{actionItem.title}</span>
          <span>{new Date(`${actionItem.date}`).toDateString()}</span>
          <span>{actionItem.description}</span>
        </div>
      ))}
    </div>
  )
}

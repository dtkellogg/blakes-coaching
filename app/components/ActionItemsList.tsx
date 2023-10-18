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

  // const getActionItems = async () => {
  //   const res = await fetch('api/actionItems', {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json'}
  //   })
  //   return res.json()
  // }

  // useEffect(() => {
  //   const actionItems = getActionItems().then(x => { return x.actionItems })
  //   console.log(actionItems)
  // }, [])

  const { actionItems } = await getActionItems()

  return (
    <div>
      {actionItems && actionItems.map((actionItem: any, i) => (
        <div key={i} className="flex justify-between">
          <span>{actionItem.title}</span>
          <span>{actionItem.date}</span>
          <span>{actionItem.description}</span>
        </div>
      ))}
    </div>
  )
}

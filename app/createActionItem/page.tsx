import Link from "next/link";
import CreateActionItemForm from '../components/CreateActionItemForm';

export default function CreateActionItem() {
  return (
    <main className="">
      <h1 className="header-primary">Create Action Item</h1>

      <CreateActionItemForm />
    </main>
  )
}
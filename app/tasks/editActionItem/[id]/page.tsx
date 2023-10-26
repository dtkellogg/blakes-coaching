import EditActionItemForm from '@/app/components/forms/EditActionItemForm';

export default function EditActionItem() {
  return (
    <main className="flex flex-col items-center justify-center w-[30rem] pb-4 mb-auto mx-auto">
      <h1 className="header-primary">Edit Action Item</h1>
      <EditActionItemForm />
    </main>
  )
}
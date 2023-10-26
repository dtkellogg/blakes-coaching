import CreateActionItemForm from '@/app/components/forms/CreateActionItemForm';

export default function CreateActionItem() {
  return (
    <main className="flex flex-col items-center justify-center w-[30rem] pb-4 mb-auto mx-auto">
      <h1 className="header-primary">Create Action Item</h1>
      <CreateActionItemForm />
    </main>
  )
}
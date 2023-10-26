import EditMilestoneForm from '@/app/components/forms/EditMilestoneForm';

export default function EditMilestone() {
  return (
    <main className="flex flex-col items-center justify-center w-[30rem] pb-4 mb-auto mx-auto">
      <h1 className="header-primary">Edit Milestone</h1>
      <EditMilestoneForm />
    </main>
  )
}
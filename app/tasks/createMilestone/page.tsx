import CreateMilestoneForm from '@/app/components/forms/CreateMilestoneForm';

export default function CreateMilestone() {
  return (
    <main className="flex flex-col items-center justify-center w-[30rem] pb-4 mb-auto mx-auto">
      <h1 className="header-primary">Create Milestone</h1>
      <CreateMilestoneForm />
    </main>
  )
}
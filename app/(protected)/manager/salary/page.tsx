import SectionTitle from "@/components/blocks/headers/SectionTitle"
import SalaryContent from "@/components/section/SalaryContent"

const page = () => {
  return (
    <div>
      <SectionTitle title="Employee payment" description="Manager can see the employee payment" />
      <SalaryContent />
    </div>
  )
}

export default page

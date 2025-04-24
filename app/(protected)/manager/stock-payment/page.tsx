import SectionTitle from "@/components/blocks/headers/SectionTitle"
import SalaryContent from "@/components/section/SalaryContent"

const page = () => {
  return (
    <div>
      <SectionTitle title="Stock payment" description="manager can see stock repayment" />
      <SalaryContent />
    </div>
  )
}

export default page

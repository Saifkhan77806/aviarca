
interface salaryProps{
    name: string
    email: string
    position: string
    salaryLeft: number
    salaryPaid: number
}

const SalaryData = ({name, email, position, salaryLeft, salaryPaid}: salaryProps) => {
  return (
    <div className="border border-gray-400 rounded-md p-2 flex items-center gap-2">
        {/* profile image */}
        <div className="w-10 h-10 bg-black rounded-full"></div>

        <div className="text-xs">
            <p>{name}</p>
            <p>{email}</p>
            <p>{position}</p>
            <p>Salary paid:- <span className="px-2 py-1 bg-green-300 rounded-md">{salaryLeft}</span> / salary left:- <span className="px-2 py-1 bg-red-300 rounded-md">{salaryPaid}</span></p>
        </div>
    </div>
  )
}

export default SalaryData
interface NoticeDataProps {
    date: string;
    subject: string;
    description: string;
    role: "EMPLOYEE" |  "MANAGER"
}


const NoticeData = ({date, subject, description, role}:NoticeDataProps) => {
  return (
    <div className="border p-2 border-gray-400 rounded-md">
        <p>{subject}</p>
        <p>{description}</p>

        <div>
            <div className={`p-2 w-fit ${role == "EMPLOYEE" ? "bg-green-400" : "bg-red-400"}   opacity-40 rounded-md`}>{role == "EMPLOYEE" ? "Employee" : "Manager"}</div>
        </div>
      </div>
  )
}

export default NoticeData
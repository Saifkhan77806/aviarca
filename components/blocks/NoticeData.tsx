interface NoticeDataProps {
    date: string;
    subject: string;
    description: string;
    role: "OWNER" |  "MANAGER"
    key: number
}


const NoticeData = ({date, subject, description, role, key}:NoticeDataProps) => {
  return (
    <div key={key} className="border p-2 border-gray-400 rounded-md">
        <p>{subject}</p>
        <p>{description}</p>

        <div>
            <div className={`p-2 w-fit ${role == "OWNER" ? "bg-green-400" : "bg-red-400"}   opacity-40 rounded-md`}>{role == "OWNER" ? "Employee" : "Manager"}</div>
        </div>
      </div>
  )
}

export default NoticeData
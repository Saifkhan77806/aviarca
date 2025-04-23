import { Button } from "../ui/button";

interface VerifyAttDataProps {
    name: string;
    email: string;
    profile?: string;
    id?: string

}

const VerifyAttData = ({name, email, profile, id}: VerifyAttDataProps) => {
    return (
        <div className='border border-gray-400 rounded-md p-2 flex items-center gap-2'>
            <div className='w-10 h-10 rounded-full bg-black'></div>

            <div className="flex w-full justify-between items-center text-sm">
                <div>

                <p>
                {name}
                </p>
                <p className="text-gray-700">
                    {email}
                </p>
                </div>

                <Button className="cursor-pointer">Verfiy</Button>
            </div>


        </div>
    )
}

export default VerifyAttData
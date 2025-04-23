
import { Input } from '../ui/input'
import SectionTitle from './headers/SectionTitle'

interface ResportCardProps {
    title: string
    description: string
    children: React.ReactNode
}

const ReportCard = ({ title, description, children }: ResportCardProps) => {
    return (
        <div>
            <div>
                <SectionTitle title={title} description={description} />
            </div>

            {/* content */}
            {children}
            
        </div>
    )
}

export default ReportCard
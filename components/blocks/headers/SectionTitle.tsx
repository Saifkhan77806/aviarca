import React from 'react'

interface SectionTitleProps{
    title: string;
    description: string
}

const SectionTitle = ({title, description}: SectionTitleProps) => {
    return (
        <>
            <h1 className="text-3xl font-bold my-2">{title}</h1>
            <p className="text-gray-600 my-2">
                {description}
            </p>
        </>
    )
}

export default SectionTitle
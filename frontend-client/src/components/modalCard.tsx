import type { ReactNode } from "react"

type ModalCardProps = {
    children: ReactNode
}

const ModalCard = ({children} : ModalCardProps) => {

    return(
        <div>
            <div className="border border-blue-500 bg-blue-200 w-[800px] !p-5 flex justify-center rounded-lg shadow-sm">
            {children}
            </div>
        </div>
    )
    
}

export default ModalCard

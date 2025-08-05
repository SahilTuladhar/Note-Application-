import type { ReactNode } from "react"

type ModalCardProps = {
    children: ReactNode
}

const ModalCard = ({children} : ModalCardProps) => {

    return(
        <div>
            <div className="flex flex-col border-2 border-blue-200 bg-[#E5F2FB] w-[600px] h-[475px] !p-6  justify-center items-center gap-10 rounded-lg shadow-sm">
            {children}
            </div>
        </div>
    )
    
}

export default ModalCard

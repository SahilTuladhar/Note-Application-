import type { ReactNode } from "react"

type ModalCardProps = {
    children: ReactNode,
    className? : string
}

const ModalCard = ({children , className} : ModalCardProps) => {

    return(
        <div>
            <div className={`flex flex-col
             border-2 border-blue-200 bg-[#E5F2FB] w-[600px] h-[475px] !p-10 
             justify-center items-center gap-10 rounded-lg shadow-sm 
             ${className
               ? className
              :"" }`} >
            {children}
            </div>
        </div>
    )
    
}

export default ModalCard

type FormCardProps = {
  is_completed: boolean,
  title : string,
  content : string,
  category : "Personal" | "Work" | "Todo",
  createdAt: string
}

const FormCard = ({is_completed , title , content , category , createdAt} : FormCardProps) => {
  return (
    <div className="flex flex-col !py-4 border-b-3 border-blue-200 gap-2">
      <div className=" w-full !pb-1 flex flex-row justify-between items-center">
        <p className = {`text-body-sm border !py-1 !px-4 rounded-xl flex justify-center shadow-sm
          ${category === "Work" 
            ? "bg-amber-200 border-orange-300"
            : `${category === "Personal" 
              ? "bg-blue-300 border-blue-400"
              : "border-green-600 bg-primary-mint-darker"}`
             }
          `}> {category}</p>
        <div 
        className={`border-2  w-10 h-10 rounded-md
          ${is_completed ? "border-green-700 bg-accent-green" : "border-gray-500 bg-gray-50"}`
          }/>
      </div>

      <p className="w-[90%] text-wrap text-body-lg ">{title}</p>
    </div>
  );
};

export default FormCard;

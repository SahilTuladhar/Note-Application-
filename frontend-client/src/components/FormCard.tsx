type FormCardProps = {
  is_completed: boolean
}

const FormCard = ({is_completed} : FormCardProps) => {
  return (
    <div className="flex flex-col !pb-4 border-b-3 border-blue-200 gap-2">
      <div className=" w-full !pb-1 flex flex-row justify-between items-center">
        <p className="text-body-sm border !py-1 !px-3 rounded-xl  border-green-600 bg-accent-green"> Daily</p>
        <div 
        className={`border-2  w-10 h-10 rounded-md
          ${is_completed ? "border-green-700 bg-accent-green" : "border-gray-500 bg-gray-50"}`
          }/>
      </div>

      <p className="w-[90%] text-wrap text-body-lg ">Make your Bed</p>
    </div>
  );
};

export default FormCard;

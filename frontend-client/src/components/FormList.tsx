import FormCard from "./FormCard";
import ModalCard from "./modalCard";
import { Button } from "@/components/ui/button";


const FormList = () => {
  return (
    <ModalCard className="!w-[900px] !min-h-[700px] !max-h-[700px] !justify-start">
      <div className="w-full flex flex-col !gap-6">
        <div className="flex flex-row justify-between items-center +!pb-4 border-b-2 border-blue-200">
          <p className="font-sans text-body-lg">Hi, Sahil</p>
           <Button 
           className="btn-primary !p-2"
           >
            Log Out
           </Button>
        </div>
        <div>
          <FormCard />
        </div>
      </div>
    </ModalCard>
  );
};

export default FormList;

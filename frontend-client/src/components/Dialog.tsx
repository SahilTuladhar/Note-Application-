import ModalCard from "./modalCard";
import { Button } from "@/components/ui/button";
import { useDeleteNote } from "@/hooks/apiHooks";
import { DialogClose } from "@/components/ui/dialog"; 
type DialogBoxProps = {
  note_id: number;
   onClose: () => void;
};


const DialogBox = ( {note_id , onClose} : DialogBoxProps) => {
 
    const {mutate} = useDeleteNote()

  const onDeleteHandler = (note_id : number) => {
      mutate({note_id})
      onClose()
  };

  return (
    <ModalCard>
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-3">
          <p className="text-heading-xs font-thin">Delete Note?</p>
          <p className="text-body-xs italic opacity-60 tracking-wide ">
            Note: This action will permanently delete your note
          </p>
        </div>
        <div className="flex flex-row w-full justify-center gap-2">
          <Button onClick={() => onDeleteHandler(note_id)} className="btn-primary w-26">
            Delete
          </Button>
          <DialogClose asChild>
             <Button className="btn-secondary w-26">Cancel</Button>
          </DialogClose>
          
         
        </div>
      </div>
    </ModalCard>
  );
};

export default DialogBox;

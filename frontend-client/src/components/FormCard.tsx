import { useCompleteNote, useIncompletNote } from "@/hooks/apiHooks";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import DialogBox from "./Dialog";
import { useState } from "react";
import NoteForm from "./NoteForm";
import NoteDetails from "./NoteDetails";

export type Category = "Personal" | "Work" | "Todo";

type FormCardProps = {
  is_completed: boolean;
  title: string;
  content: string;
  categories: Category[];
  createdAt: string;
  note_id: number;
  selected_category: string

};

const FormCard = ({
  is_completed,
  title,
  content,
  categories,
  createdAt,
  note_id,
  selected_category
}: FormCardProps) => {
  const { mutate: completeMutate } = useCompleteNote(selected_category);
  const { mutate: incompleteMutate } = useIncompletNote(selected_category);

  const onCompleteHandler = ( event: React.MouseEvent<HTMLElement> , note_id: number, is_completed: boolean) => {
    
    event.stopPropagation();

    if (!is_completed) {
      completeMutate({ note_id });
    } else {
      incompleteMutate({ note_id });
    }
  };

  const NoteFormInitialData = {
    title: title,
    content: content,
    category: categories,
  };

  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);


  return (
    // <div className="flex flex-col !py-4 border-b-3 border-blue-200 gap-2">
    //   <div className=" w-full !pb-1 flex flex-row justify-between items-center">
    //     <p
    //       className={`text-body-sm border !py-1 !px-4 rounded-xl flex justify-center shadow-sm
    //       ${
    //         category === "Work"
    //           ? "bg-amber-200 border-orange-300"
    //           : `${
    //               category === "Personal"
    //                 ? "bg-blue-300 border-blue-400"
    //                 : "border-green-600 bg-primary-mint-darker"
    //             }`
    //       }
    //       `}
    //     >
    //       {" "}
    //       {category}
    //     </p>

    //     <Dialog open={open} onOpenChange={setOpen}>
    //       <DialogTrigger asChild>
    //         <DeleteRoundedIcon className="text-secondary-teal-dark" />
    //       </DialogTrigger>
    //       <DialogContent>
    //         <DialogBox note_id={note_id}  onClose={() => setOpen(false)}  />
    //       </DialogContent>
    //     </Dialog>

    //     <div
    //       onClick={() => onCompleteHandler(note_id, is_completed)}
    //       className={`border-2  w-10 h-10 rounded-md
    //       ${
    //         is_completed
    //           ? "border-green-700 bg-accent-green"
    //           : "border-gray-500 bg-gray-50"
    //       }`}
    //     />
    //   </div>

    //   <p className="w-[90%] text-wrap text-body-lg ">{title}</p>
    // </div>

    <div className="relative flex flex-col w-84 bg-yellow-200 h-40 !p-3 rounded-sm shadow-xl">
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex flex-col gap-2 justify-center">
            <div className="flex flex-row items-center justify-between max-w-full gap-4">
              <p className=" w-60 text-body-xl truncate !font-normal">
                {title}
              </p>
              <div
                onClick={(event) => onCompleteHandler(event, note_id, is_completed )}
                className={`border-2  w-8 h-8 rounded-md hover:cursor-pointer
          ${
            is_completed
              ? "border-green-700 bg-accent-green"
              : "border-gray-500 bg-gray-50"
          }`}
              />
            </div>
            <p className="font-sans w-full text-body-md truncate !font-thin ">
              {content}
            </p>
          </div>
        </DialogTrigger>
        <DialogContent className="!w-[1200px] !h-[400px]">
          <NoteDetails title={title} content={content} categories={categories} />
        </DialogContent>
      </Dialog>

      <div className="absolute flex flex-row gap-2 items-center justify-around top-[73%]">
        {
          categories.map((category) => (

            <p
          className={`text-body-sm border !py-1 !px-4 rounded-xl flex justify-center shadow-sm
          ${
            category === "Work"
              ? "bg-red-300 border-red-400"
              : `${
                  category === "Personal"
                    ? "bg-blue-300 border-blue-400"
                    : "border-green-600 bg-primary-mint-darker"
                }`
          }
          `}
        >
          {" "}
          {category}
        </p>

          ))
        }
        

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <DeleteRoundedIcon className="text-secondary-teal-dark" />
          </DialogTrigger>
          <DialogContent>
            <DialogBox note_id={note_id} onClose={() => setOpen(false)} />
          </DialogContent>
        </Dialog>

        <Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
          <DialogTrigger asChild>
            <div className="border  border-yellow-400 w-9 h-9 rounded-full bg-yellow-300 flex items-center justify-center hover:-translate-y-1 hover:shadow-md transition-all ease-in-out duration-300">
              <EditRoundedIcon fontSize="small" />
            </div>
          </DialogTrigger>
          <DialogContent>
            <NoteForm
              intialData={NoteFormInitialData}
              note_id={note_id}
              source="update-note"
              onClose={() => setUpdateOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default FormCard;

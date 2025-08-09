import { useGetRecords, useLogout } from "@/hooks/apiHooks";
import FormCard from "./FormCard";
import ModalCard from "./modalCard";
import { Button } from "@/components/ui/button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import type {
  GetUserResponse,
  GetUserResponseType,
} from "@/services/apiServices";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import NoteForm from "./NoteForm";
import { useEffect } from "react";
import { toast } from "sonner";
import { data } from "react-router-dom";

// type FormListProps = {
//   userData: GetUserResponseType;
// };

const FormList = () => {
  const { mutate } = useLogout();

  const onUserLogout = () => {
    mutate();
  };

  const { data, isLoading, isError, isSuccess, error } = useGetRecords();

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message);
    }
  }, [isError, error]);

  const notesCount = data?.data.notes.length ?? 0;

  return (
    <ModalCard className="relative !w-[900px] !h-[700px] !min-h-[700px] !max-h-[700px] !justify-start">
      <div className="w-full !h-full flex flex-col !gap-3 ">
        <div className="flex flex-row justify-between items-center !pb-1 ">
          <p className="font-sans text-heading-xs !font-normal">
            Welcome back, {data?.data.username}
          </p>
          <Button className="btn-primary !p-2" onClick={onUserLogout}>
            Log Out
          </Button>
        </div>

        <p className="text-heading-xs !font-normal border-b-2 border-blue-300 !pb-3">
          Notes
        </p>

        {isLoading && <div>Featching Your Data...</div>}

        {notesCount > 0 && !isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 overflow-y-auto ">
            {data?.data.notes.map((note) => (
              <FormCard
                key={note.note_id}
                is_completed={note.is_completed === 0 ? false : true}
                title={note.title}
                content={note.content}
                category={note.category}
                createdAt={note.created_at}
                note_id={note.note_id}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            Create a note to get started.
          </div>
        )}

        {/* Creating Dialog for Note Form */}

        <Dialog>
          <DialogTrigger asChild>
            <Button className="hover:cursor-pointer absolute top-[95%] left-[45.5%] btn-primary !bg-accent-green w-16 h-16 !p-3 rounded-full">
              <AddRoundedIcon />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <NoteForm />
          </DialogContent>
        </Dialog>
      </div>
    </ModalCard>
  );
};

export default FormList;

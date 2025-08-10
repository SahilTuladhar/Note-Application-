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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { data } from "react-router-dom";
import { fa } from "zod/v4/locales";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// type FormListProps = {
//   userData: GetUserResponseType;
// };

const FormList = () => {
  const { mutate } = useLogout();

  const onUserLogout = () => {
    mutate();
  };

  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data, isLoading, isError, refetch, error } =
    useGetRecords(selectedCategory);

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message);
    }
  }, [isError, error]);

  const notesCount = data?.data.notes.length ?? 0;

  const [open, setOpen] = useState(false);

  const filters = ["All", "Work", "Personal", "Todo"];

  const handleSelect = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    refetch();
  }, [selectedCategory]);


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

        <div className="flex flex-row !gap-3 justify-between">
          <p className="text-heading-xs !font-normal">Notes</p>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className="btn-secondary w-45">{selectedCategory}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-50 gap-2 !p-4 bg-blue-200 !w-45 flex flex-col items-center justify-center">
              {filters.map((cat) => (
                <DropdownMenuItem
                  key={cat}
                  onClick={() => handleSelect(cat)}
                  className={`border-blue-300 border-b-2 !p-1 !w-full flex items-center justify-center hover:border-b-blue-400 transition-all ease-in-out duration-200
              ${selectedCategory === cat ? "font-bold text-blue-700" : ""}
            `}
                >
                  {cat}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isLoading && <div>Featching Your Data...</div>}

        {notesCount > 0 && !isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 overflow-y-auto ">
            {data?.data.notes.map((note) => (
              <FormCard
                key={note.note_id}
                is_completed={note.is_completed === 0 ? false : true}
                title={note.title}
                content={note.content}
                categories={note.categories}
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

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="hover:cursor-pointer absolute top-[95%] left-[45.5%] btn-primary !bg-accent-green w-16 h-16 !p-3 rounded-full">
              <AddRoundedIcon />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <NoteForm onClose={() => setOpen(false)} source="create-note" />
          </DialogContent>
        </Dialog>
      </div>
    </ModalCard>
  );
};

export default FormList;

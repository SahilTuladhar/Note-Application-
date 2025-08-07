import { useLogout } from "@/hooks/apiHooks";
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

type FormListProps = {
  userData?: GetUserResponseType;
};

const FormList = ({ userData }: FormListProps) => {
  const { mutate } = useLogout();

  const onUserLogout = () => {
    mutate();
  };

  return (
    <ModalCard className="relative !w-[900px] !h-[700px] !min-h-[700px] !max-h-[700px] !justify-start">
      <div className="w-full !h-full flex flex-col !gap-6 ">
        <div className="flex flex-row justify-between items-center !pb-1 ">
          <p className="font-sans text-heading-xs !font-normal">
            Welcome back, {userData?.username}
          </p>
          <Button className="btn-primary !p-2" onClick={onUserLogout}>
            Log Out
          </Button>
        </div>

        <p className="text-heading-xs !font-normal">Notes</p>

        <div className="flex flex-col gap-10">
          <FormCard is_completed={true} />

          <FormCard is_completed={false} />
        </div>

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

import ModalCard from "./modalCard";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NoteFormSchema, type NoteFormInputs } from "@/schemas/authSchema";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import TextField from "@mui/material/TextField";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateNote } from "@/hooks/apiHooks";

const NoteForm = () => {
  // const [value, setValue] = useState<string>("Personal");

  const {mutate} = useCreateNote()

  const form = useForm<NoteFormInputs>({
    resolver: zodResolver(NoteFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
      category: undefined,
    },
  });

  const onSubmit = (noteData: NoteFormInputs) => {
    console.log("FORM SUBMIT", noteData);

    mutate({
      title: noteData.title,
      content: noteData.content ?? "",
      category: noteData.category,
    })

    form.reset();
  };

  return (
    <ModalCard>
      <DialogHeader>
        <p className="text-heading-sm !font-normal">
          <span className="text-green-600 font-bold">Note</span>Form
        </p>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            const firstError = Object.values(errors)[0];

            if (firstError?.message) {
              toast.error(firstError.message.toString());
            }
          })}
          className=" flex flex-col justify-center !p-2 !w-full gap-5"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    className="!border-0 !border-b-4 border-blue-200 !rounded-none !p-2 focus:border-b-2 focus:border-primary focus:outline-none"
                    type="text"
                    placeholder="title"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormControl
                className="!w-full">
                  <ShadcnSelect
                    value={field.value}
                    onValueChange={field.onChange} 
                  >
                    <SelectTrigger
                    className="w-full">
                      <SelectValue 

                      placeholder="Select a Category" />
                    </SelectTrigger>
                    <SelectContent
                    className="border border-green-500 !w-full">
                      <SelectItem className = "!p-2" value="Personal">Personal</SelectItem>
                      <SelectItem className = "!p-2" value="Work">Work</SelectItem>
                      <SelectItem className = "!p-2" value="Todo">Todo</SelectItem>
                    </SelectContent>
                  </ShadcnSelect>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <TextField
                    variant="outlined"
                    multiline
                    rows={6}
                    fullWidth
                    label="Description"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <DialogFooter className="flex !flex-col !jusitfy-center">
            <DialogClose>
              <Button type="submit" className="btn-primary text-body-sm w-60">
                Create Note
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </ModalCard>
  );
};

export default NoteForm;

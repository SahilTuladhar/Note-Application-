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
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

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
import { useCreateNote, useUpdateNote } from "@/hooks/apiHooks";
import { includes } from "zod";

import { Check } from "lucide-react"; // or your preferred icon lib

type NoteFormProps = {
  intialData?: NoteFormInputs;
  source: "create-note" | "update-note";
  note_id?: number;
  onClose: () => void;
};

const NoteForm = ({ intialData, source, note_id, onClose }: NoteFormProps) => {
  // const [value, setValue] = useState<string>("Personal");

  console.log("Form submitted with note_id:", note_id); // Add this too

  const { mutate: CreateMutate } = useCreateNote();
  const { mutate: UpdateMutate } = useUpdateNote();

  const form = useForm<NoteFormInputs>({
    resolver: zodResolver(NoteFormSchema),
    mode: "onChange",
    defaultValues: intialData ?? {
      title: "",
      content: "",
      category: undefined,
    },
  });

  const onSubmit = (noteData: NoteFormInputs) => {
    if (source === "create-note") {
      CreateMutate({
        title: noteData.title,
        content: noteData.content ?? "",
        categories: noteData.category,
      });
    } else {
      console.log("NOTEID", note_id);

      if (!note_id) {
        toast.error("Note ID is required for updating");
        return;
      }

      UpdateMutate({
        note_id: note_id,
        title: noteData.title,
        content: noteData.content ?? "",
        categories: noteData.category,
      });
    }

    onClose();
    form.reset();
  };

  const categories = ["Personal", "Work", "Todo"] as const;

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
          {/* <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormControl className="!w-full">
                  <ShadcnSelect
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="!p-2 w-full">
                      <SelectValue className="!p-2" placeholder="Select a Category" />
                    </SelectTrigger>
                    <SelectContent className="border border-green-500 !w-full">
                      <SelectItem className="!p-2" value="Personal">
                        Personal
                      </SelectItem>
                      <SelectItem className="!p-2" value="Work">
                        Work
                      </SelectItem>
                      <SelectItem className="!p-2" value="Todo">
                        Todo
                      </SelectItem>
                    </SelectContent>
                  </ShadcnSelect>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="w-full btn-secondary justify-start px-4 py-2 text-left"
                        aria-haspopup="listbox"
                        aria-expanded={field.value?.length > 0}
                        aria-label="Select categories"
                      >
                        {field.value?.length
                          ? field.value.map(String).join(", ")
                          : "Select categories"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      sideOffset={4}
                      className="w-full min-w-[200px] max-w-[320px] p-1 rounded-md border border-gray-200 shadow-md bg-white"
                    >
                      {categories.map((category) => {
                        const checked = field.value?.includes(category);
                        return (
                          <DropdownMenuCheckboxItem
                            key={category}
                            checked={checked}
                            onCheckedChange={(checked) => {
                              const updated = checked
                                ? [...(field.value || []), category]
                                : field.value?.filter((c) => c !== category);
                              field.onChange(updated);
                            }}
                            className="flex justify-between items-center w-full px-3 py-2 rounded-md cursor-pointer select-none
                    data-[state=checked]:bg-blue-100
                    data-[highlighted]:bg-blue-50
                    hover:bg-blue-50
                    focus:outline-none"
                          >
                            <span className="text-sm font-medium text-gray-900">
                              {category}
                            </span>
                          </DropdownMenuCheckboxItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormControl>
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
          <DialogFooter className="flex !flex-col !jusitfy-center !items-center">
            <Button type="submit" className="btn-primary text-body-sm w-60">
              {source === "create-note" ? "Create Note" : "Update Note"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </ModalCard>
  );
};

export default NoteForm;

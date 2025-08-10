import type { Category } from "./FormCard";

type NoteDetailsProps = {
  title: string;
  content: string;
  categories: Category[];
};

const NoteDetails = ({ title, content, categories }: NoteDetailsProps) => {
  return (
    <div className="w-full h-full !p-4 gap-5 flex flex-col bg-yellow-200 rounded-lg font-sans">
      <p className="text-heading-xs w-full text-wrap">{title}</p>
      <p className="w-full h-56 max-h-56">{content}</p>
      {categories.map((category) => (
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
      ))}
    </div>
  );
};

export default NoteDetails;

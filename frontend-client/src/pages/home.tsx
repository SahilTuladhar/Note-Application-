import ModalCard from "@/components/modalCard";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import { Image } from "@/components/ui/image";
import FormList from "@/components/FormList";

const HomePage = () => {
  return (
    <div className="border border-green-500 h-screen w-screen flex">
      <div
        className="w-[70%] flex justify-center items-center
          font-sans"
      >
        <ModalCard className="!relative !h-[750px] !w-80">
          <div className="absolute top-0 left-8 flex items-center text-heading-sm !font-normal">
            <p className="whitespace-nowrap">
              <span className="text-green-600">Leap</span>Notes
            </p>
            <img
              src="/note.png"
              alt="Note Pad"
              className="w-36 h-36 object-cover rounded-md"
            />
          </div>
          <div
            className="flex flex-col w-[95%] h-[350px] gap-5
         "
          >
            <div className="flex items-center text-body-lg border-b-3 border-blue-200 !p-3 gap-2">
              <HomeOutlinedIcon />
              <p>Home</p>
            </div>

            <div className="flex items-center text-body-lg border-b-4 border-blue-200 !p-3 gap-2">
              <FormatListBulletedRoundedIcon />
              <p>My Lists</p>
            </div>
          </div>
        </ModalCard>
      </div>

      <div
        className="border border-blue-500 w-full font-sans flex items-center justify-center
        "
      >
        <FormList />
      </div>
    </div>
  );
};

export default HomePage;

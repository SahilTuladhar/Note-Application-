import ModalCard from "@/components/modalCard";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import { Image } from "@/components/ui/image";

const HomePage = () => {
  return (
    <div className="border border-green-500 h-screen w-screen flex">
      <div
        className="w-[70%] flex justify-center items-center
            border border-red-500 font-sans"
      >
        <ModalCard className="!relative !h-[750px] !w-80">
          <div className="absolute top-0 left-8 flex items-center text-heading-sm !font-normal">
            <p className="whitespace-nowrap">NotePad</p>
            <img
              src="/note.png"
              alt="Note Pad"
              className="w-36 h-36 object-cover rounded-md"
            />
          </div>
          <div
            className="flex flex-col w-[95%] h-[350px]
          border border-green-500 "
          >
            <div className="flex text-body-lg">
              <HomeOutlinedIcon />
              <p>Home</p>
            </div>

            <div className="flex">
              <FormatListBulletedRoundedIcon />
              <p>My Lists</p>
            </div>
          </div>

          <div className="border border-red-500 w-[95%]"></div>
        </ModalCard>
      </div>

      <div
        className=" w-full flex justify-center
            border border-blue-500"
      >
        right container
      </div>
    </div>
  );
};

export default HomePage;

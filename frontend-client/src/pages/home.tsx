import ModalCard from "@/components/modalCard";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import FormList from "@/components/FormList";
import { useGetRecords } from "@/hooks/apiHooks";
import { toast } from "sonner";
import { useEffect } from "react";

const HomePage = () => {


  const {data , isLoading , isError, isSuccess , error} = useGetRecords()

  useEffect(() => {

    if(isError && error){
      toast.error(error.message)
    }
  } , [isError , error])
  
  return (
    <div className="border border-green-500 h-screen w-screen flex flex-row justify-center items-center gap-20">
      <div
        className=" flex justify-center items-center
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
        className="font-sans flex items-center justify-center
        "
      >
        {
          !isLoading
          ? <FormList userData={data?.data} /> 
          : <p>Fetching Data...</p>
        }
      </div>


    </div>

    
    
  );
};

export default HomePage;

import ModalCard from "../components/modalCard"

const LoginPage = () => {
  
    return(
        <div
        className=" w-screen h-screen flex items-center justify-center
          border border-green-500"
      >
        <ModalCard>
          <div 
          className="flex flex-col gap-4">

            <h1 className="text-body-xl font-inter">Login Page</h1>
              <button
              className="btn-primary"
              >
                LOG IN
              </button>
          </div>
        </ModalCard>
      </div>
    )
}

export default LoginPage
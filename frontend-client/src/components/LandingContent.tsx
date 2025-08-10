import ModalCard from "./modalCard";
import { Button } from "@/components/ui/button";

const LandingPageContent = () => {
  return (
    <ModalCard className="relative !w-[900px] !h-[700px] !min-h-[700px] !max-h-[700px] flex flex-col items-center justify-center overflow-hidden">

      <div className="relative z-10 w-full h-full flex flex-col gap-8 items-center px-10 py-8">
        <p className="text-heading-lg !font-normal tracking-wide animate-fadeIn">
          <span className="text-green-600 !font-bold">Leap</span>Notes
        </p>

        <p className="text-gray-700 !p-4 text-lg leading-relaxed text-center rounded-xl shadow-md bg-[#ecf6ff] border animate-fadeIn delay-100">
          This assignment project involved building a note-taking application
          with core functionality for <span className="font-semibold text-green-700">creating</span>,{" "}
          <span className="font-semibold text-green-700">editing</span>,{" "}
          <span className="font-semibold text-green-700">deleting</span>, and{" "}
          <span className="font-semibold text-green-700">viewing</span> notes,
          as well as viewing a single note in detail.
          <br />
          <br />
          Each note can have <span className="italic">multiple categories</span>, and users can filter notes
          by category for better organization. The application includes a secure
          authentication system with signup and login, implementing authorization
          to protect specific pages and APIs.
          <br />
          <br />
          From an engineering perspective, the focus was on delivering a clean,
          responsive UI, enforcing validations on both frontend and backend, handling
          errors gracefully, and maintaining a well-structured RESTful backend with
          secure authentication and normalized database design.
        </p>

        <a href="/home-page">
          <Button className="btn-primary w-54">
            Get Started
          </Button>
        </a>
      </div>
    </ModalCard>
  );
};

export default LandingPageContent;

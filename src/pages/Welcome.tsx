import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";

export default function WelcomePage() {
    const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 h-screen items-center justify-center">
      <h1 className="text-5xl font-bold">Welcome!</h1>
        <div className="flex gap-2">
            <Button onClick={()=>navigate("/auth/sign-in")}>Login</Button>
            <Button onClick={()=>navigate("/auth/sign-up")} variant="outline">Register</Button>
        </div>
    </div>
  );
}

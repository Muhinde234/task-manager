import {Card, CardContent, CardHeader} from "@/components/ui/card";
import LoginForm from "@/components/login-form";

export default function Login() {
  return(
      <div className="min-h-screen flex items-center justify-center">
          <Card className="min-w-[460px]">
              <CardHeader>

              </CardHeader>
              <CardContent>
                  <LoginForm/>
              </CardContent>
          </Card>
      </div>
  )
}
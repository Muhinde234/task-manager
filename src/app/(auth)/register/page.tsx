import {Card, CardContent, CardHeader} from "@/components/ui/card";
import RegisterForm from "@/components/register-form";

export default function Register() {
    return(
        <div className="min-h-screen flex items-center justify-center">
            <Card className="min-w-[460px]">
                <CardHeader>

                </CardHeader>
                <CardContent>
                    <RegisterForm />
                </CardContent>
            </Card>
        </div>
    )
}
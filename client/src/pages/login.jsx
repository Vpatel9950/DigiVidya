import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import { useLoginUserMutation, useRegisterUserMutation } from '@/features/api/authApi';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [signupInput, setSignupInput] = useState({ name: "", email: "", password: "" });
    const [loginInput, setLoginInput] = useState({ email: "", password: "" });
    
    const [registerUser, { data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerIsSuccess }] = useRegisterUserMutation();
    const [loginUser, { data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSuccess }] = useLoginUserMutation();

    const navigate=useNavigate();

    const changeInputHandler = (e, type) => {
        const { name, value } = e.target;
        if (type === "signup") {
            setSignupInput({ ...signupInput, [name]: value });
        } else {
            setLoginInput({ ...loginInput, [name]: value });
        }
    };

    const handleRegistration = async (type) => {
        const inputData = type === "signup" ? signupInput : loginInput;
        const action = type === "signup" ? registerUser : loginUser;
        
        // try {
        //     const result = await action(inputData).unwrap();
        //     toast.success(result.message || `${type} successful.`);
        // } catch (err) {
        //     toast.error(err?.data?.message || `${type} failed.`);
        // }
        await action(inputData);
    };

    // Handle Registration Success/Error
useEffect(() => {
    if (registerIsSuccess && registerData) {
        toast.success(registerData.message || "Signup successful.");
    }
    if (registerError) {
        toast.error(registerError?.data?.message || "Signup Failed");
    }
}, [registerIsSuccess, registerData, registerError]);

// Handle Login Success/Error
useEffect(() => {
    if (loginIsSuccess && loginData) {
        toast.success(loginData.message || "Login successful.");
        navigate("/")
    }
    if (loginError) {
        toast.error(loginError?.data?.message || "Login Failed");
    }
}, [loginIsSuccess, loginData, loginError]);

    return (
        <div className="flex items-center w-full justify-center mt-20">
            <Tabs defaultValue="signup" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                    <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Signup</CardTitle>
                            <CardDescription>Create a new account and click signup when you're done.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input type="text" id="name" name="name" value={signupInput.name} onChange={(e) => changeInputHandler(e, "signup")} placeholder="e.g., Patel" required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" name="email" value={signupInput.email} onChange={(e) => changeInputHandler(e, "signup")} placeholder="e.g., patel@gmail.com" required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password" value={signupInput.password} onChange={(e) => changeInputHandler(e, "signup")} placeholder="e.g., xyz" required />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button disabled={registerIsLoading} onClick={() => handleRegistration("signup")}>
                                {registerIsLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait</>) : "Signup"}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>Login with your email and password.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="login-email">Email</Label>
                                <Input type="email" id="login-email" name="email" value={loginInput.email} onChange={(e) => changeInputHandler(e, "login")} placeholder="e.g., patel@gmail.com" required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="login-password">Password</Label>
                                <Input type="password" id="login-password" name="password" value={loginInput.password} onChange={(e) => changeInputHandler(e, "login")} placeholder="e.g., xyz" required />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button disabled={loginIsLoading} onClick={() => handleRegistration("login")}>
                                {loginIsLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait</>) : "Login"}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Login;

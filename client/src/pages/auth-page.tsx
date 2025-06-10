import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserSchema, type LoginUser } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import { useLocation } from "wouter";

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { loginMutation } = useAuth();
  const [, setLocation] = useLocation();

  const form = useForm<LoginUser>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginUser) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        setLocation("/");
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--ice-white)] via-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.3
      }}></div>
      
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bold-red)]/5 to-[var(--matte-black)]/5 rounded-lg"></div>
        
        <CardHeader className="text-center space-y-4 relative">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[var(--bold-red)] to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          
          <div>
            <CardTitle className="text-2xl font-bold text-[var(--matte-black)] mb-2">
              ورود به پنل مدیریت
            </CardTitle>
            <CardDescription className="text-gray-600">
              تک پوش خاص - سیستم مدیریت محتوا
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 relative">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--matte-black)] font-medium">
                      نام کاربری
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="نام کاربری خود را وارد کنید"
                        className="h-12 border-2 border-gray-200 focus:border-[var(--bold-red)] transition-colors"
                        disabled={loginMutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--matte-black)] font-medium">
                      رمز عبور
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="رمز عبور خود را وارد کنید"
                          className="h-12 border-2 border-gray-200 focus:border-[var(--bold-red)] transition-colors pr-12"
                          disabled={loginMutation.isPending}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={loginMutation.isPending}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4 text-gray-500" />
                          ) : (
                            <Eye className="w-4 h-4 text-gray-500" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-[var(--bold-red)] to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    در حال ورود...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    ورود به پنل
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="text-center">
            <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg border">
              <p className="font-medium text-[var(--matte-black)] mb-1">
                اطلاعات ورود پیش‌فرض:
              </p>
              <p>نام کاربری: <span className="font-mono bg-white px-2 py-1 rounded">admin</span></p>
              <p>رمز عبور: <span className="font-mono bg-white px-2 py-1 rounded">admin123</span></p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
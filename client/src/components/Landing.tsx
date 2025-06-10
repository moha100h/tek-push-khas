import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[var(--off-white)]">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6 text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-[var(--bold-red)] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">ت</span>
            </div>
            <h1 className="text-2xl font-bold text-[var(--matte-black)] mb-2">تک پوش خاص</h1>
            <p className="text-gray-600">یک از یک</p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              برای دسترسی به پنل مدیریت وارد شوید
            </p>
            <Button 
              onClick={handleLogin}
              className="w-full bg-[var(--bold-red)] hover:bg-red-700 text-white"
            >
              ورود با Replit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

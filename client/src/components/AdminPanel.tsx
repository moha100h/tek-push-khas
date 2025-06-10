import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { 
  BrandSettings, 
  TshirtImage, 
  SocialLink, 
  CopyrightSettings,
  AboutContent,
  InsertBrandSettings,
  InsertCopyrightSettings,
  InsertAboutContent
} from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Upload, Trash2, LogOut } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface AdminPanelProps {
  onClose: () => void;
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const { toast } = useToast();
  const [brandForm, setBrandForm] = useState<InsertBrandSettings>({
    name: "",
    slogan: "",
  });
  const [copyrightForm, setCopyrightForm] = useState<InsertCopyrightSettings>({
    text: "",
  });
  const [aboutForm, setAboutForm] = useState<InsertAboutContent>({
    title: "",
    subtitle: "",
    philosophyTitle: "",
    philosophyText1: "",
    philosophyText2: "",
    contactTitle: "",
    contactEmail: "",
    contactPhone: "",
    contactAddress: "",
  });
  const [socialForm, setSocialForm] = useState({
    instagram: "",
    telegram: "",
    tiktok: "",
    youtube: "",
  });

  // Queries
  const { data: brandSettings } = useQuery<BrandSettings>({
    queryKey: ["/api/brand-settings"],
  });

  const { data: adminImages = [] } = useQuery<TshirtImage[]>({
    queryKey: ["/api/admin/tshirt-images"],
  });

  const { data: socialLinks = [] } = useQuery<SocialLink[]>({
    queryKey: ["/api/social-links"],
  });

  const { data: copyrightSettings } = useQuery<CopyrightSettings>({
    queryKey: ["/api/copyright-settings"],
  });

  const { data: aboutContent } = useQuery<AboutContent>({
    queryKey: ["/api/about-content"],
  });

  // Update forms when data changes
  useEffect(() => {
    if (brandSettings) {
      setBrandForm({
        name: brandSettings.name,
        slogan: brandSettings.slogan,
      });
    }
  }, [brandSettings]);

  useEffect(() => {
    if (socialLinks) {
      const socialMap = socialLinks.reduce((acc: any, link: any) => {
        acc[link.platform] = link.url;
        return acc;
      }, {});
      setSocialForm({ ...socialForm, ...socialMap });
    }
  }, [socialLinks]);

  useEffect(() => {
    if (copyrightSettings) {
      setCopyrightForm({ text: copyrightSettings.text });
    }
  }, [copyrightSettings]);

  useEffect(() => {
    if (aboutContent) {
      setAboutForm({
        title: aboutContent.title,
        subtitle: aboutContent.subtitle,
        philosophyTitle: aboutContent.philosophyTitle,
        philosophyText1: aboutContent.philosophyText1,
        philosophyText2: aboutContent.philosophyText2,
        contactTitle: aboutContent.contactTitle,
        contactEmail: aboutContent.contactEmail,
        contactPhone: aboutContent.contactPhone,
        contactAddress: aboutContent.contactAddress,
      });
    }
  }, [aboutContent]);

  // Mutations
  const updateBrandMutation = useMutation({
    mutationFn: async (data: InsertBrandSettings) => {
      return await apiRequest("PUT", "/api/admin/brand-settings", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/brand-settings"] });
      toast({ title: "تنظیمات برند با موفقیت به‌روزرسانی شد" });
    },
    onError: () => {
      toast({ 
        title: "خطا در به‌روزرسانی تنظیمات برند", 
        variant: "destructive" 
      });
    },
  });

  const uploadLogoMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("logo", file);
      return await fetch("/api/admin/upload-logo", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/brand-settings"] });
      toast({ title: "لوگو با موفقیت آپلود شد" });
    },
    onError: () => {
      toast({ 
        title: "خطا در آپلود لوگو", 
        variant: "destructive" 
      });
    },
  });

  const uploadImagesMutation = useMutation({
    mutationFn: async (files: FileList) => {
      const formData = new FormData();
      Array.from(files).forEach(file => {
        formData.append("images", file);
      });
      return await fetch("/api/admin/upload-tshirt-images", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/tshirt-images"] });
      queryClient.invalidateQueries({ queryKey: ["/api/tshirt-images"] });
      toast({ title: "تصاویر با موفقیت آپلود شدند" });
    },
    onError: () => {
      toast({ 
        title: "خطا در آپلود تصاویر", 
        variant: "destructive" 
      });
    },
  });

  const deleteImageMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest("DELETE", `/api/admin/tshirt-images/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/tshirt-images"] });
      queryClient.invalidateQueries({ queryKey: ["/api/tshirt-images"] });
      toast({ title: "تصویر با موفقیت حذف شد" });
    },
    onError: () => {
      toast({ 
        title: "خطا در حذف تصویر", 
        variant: "destructive" 
      });
    },
  });

  const updateSocialMutation = useMutation({
    mutationFn: async (data: typeof socialForm) => {
      const socialArray = Object.entries(data)
        .filter(([, url]) => url.trim())
        .map(([platform, url]) => ({
          platform,
          url: url.trim(),
          isActive: true,
        }));
      return await apiRequest("PUT", "/api/admin/social-links", socialArray);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/social-links"] });
      toast({ title: "لینک‌های شبکه‌های اجتماعی به‌روزرسانی شدند" });
    },
    onError: () => {
      toast({ 
        title: "خطا در به‌روزرسانی لینک‌ها", 
        variant: "destructive" 
      });
    },
  });

  const updateCopyrightMutation = useMutation({
    mutationFn: async (data: InsertCopyrightSettings) => {
      return await apiRequest("PUT", "/api/admin/copyright-settings", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/copyright-settings"] });
      toast({ title: "تنظیمات کپی‌رایت به‌روزرسانی شد" });
    },
    onError: () => {
      toast({ 
        title: "خطا در به‌روزرسانی کپی‌رایت", 
        variant: "destructive" 
      });
    },
  });

  const updateAboutMutation = useMutation({
    mutationFn: async (data: InsertAboutContent) => {
      return await apiRequest("PUT", "/api/admin/about-content", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/about-content"] });
      toast({ title: "محتوای درباره ما به‌روزرسانی شد" });
    },
    onError: () => {
      toast({ 
        title: "خطا در به‌روزرسانی محتوای درباره ما", 
        variant: "destructive" 
      });
    },
  });

  const handleBrandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBrandMutation.mutate(brandForm);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadLogoMutation.mutate(file);
    }
  };

  const handleImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      uploadImagesMutation.mutate(files);
    }
  };

  const handleSocialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSocialMutation.mutate(socialForm);
  };

  const handleCopyrightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCopyrightMutation.mutate(copyrightForm);
  };

  const handleAboutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAboutMutation.mutate(aboutForm);
  };

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto admin-scroll">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span className="text-2xl font-bold text-[var(--matte-black)]">پنل مدیریت</span>
            <div className="flex items-center space-x-reverse space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4 ml-2" />
                خروج
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Brand Settings */}
          <Card>
            <CardHeader>
              <CardTitle>تنظیمات برند</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleBrandSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="brandName">نام برند</Label>
                  <Input
                    id="brandName"
                    value={brandForm.name}
                    onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })}
                    className="focus:ring-[var(--bold-red)] focus:border-[var(--bold-red)]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="brandSlogan">شعار</Label>
                  <Input
                    id="brandSlogan"
                    value={brandForm.slogan}
                    onChange={(e) => setBrandForm({ ...brandForm, slogan: e.target.value })}
                    className="focus:ring-[var(--bold-red)] focus:border-[var(--bold-red)]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="logoUpload">آپلود لوگو</Label>
                  <Input
                    id="logoUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="focus:ring-[var(--bold-red)] focus:border-[var(--bold-red)]"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={updateBrandMutation.isPending}
                  className="w-full bg-[var(--bold-red)] hover:bg-red-700 text-white"
                >
                  {updateBrandMutation.isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Image Management */}
          <Card>
            <CardHeader>
              <CardTitle>مدیریت تصاویر اسلاید</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="imageUpload">افزودن تصاویر جدید</Label>
                <Input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImagesUpload}
                  className="focus:ring-[var(--bold-red)] focus:border-[var(--bold-red)]"
                />
              </div>
              
              <div>
                <Label>تصاویر فعلی</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {adminImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.imageUrl}
                        alt={image.alt}
                        className="w-full h-20 object-cover rounded"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteImageMutation.mutate(image.id)}
                        className="absolute top-1 right-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media Settings */}
          <Card>
            <CardHeader>
              <CardTitle>شبکه‌های اجتماعی</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSocialSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="instagram">اینستاگرام</Label>
                  <Input
                    id="instagram"
                    type="url"
                    placeholder="https://instagram.com/..."
                    value={socialForm.instagram}
                    onChange={(e) => setSocialForm({ ...socialForm, instagram: e.target.value })}
                    className="focus:ring-[var(--bold-red)] focus:border-[var(--bold-red)]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="telegram">تلگرام</Label>
                  <Input
                    id="telegram"
                    type="url"
                    placeholder="https://t.me/..."
                    value={socialForm.telegram}
                    onChange={(e) => setSocialForm({ ...socialForm, telegram: e.target.value })}
                    className="focus:ring-[var(--bold-red)] focus:border-[var(--bold-red)]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="tiktok">تیک تاک</Label>
                  <Input
                    id="tiktok"
                    type="url"
                    placeholder="https://tiktok.com/..."
                    value={socialForm.tiktok}
                    onChange={(e) => setSocialForm({ ...socialForm, tiktok: e.target.value })}
                    className="focus:ring-[var(--bold-red)] focus:border-[var(--bold-red)]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="youtube">یوتیوب</Label>
                  <Input
                    id="youtube"
                    type="url"
                    placeholder="https://youtube.com/..."
                    value={socialForm.youtube}
                    onChange={(e) => setSocialForm({ ...socialForm, youtube: e.target.value })}
                    className="focus:ring-[var(--bold-red)] focus:border-[var(--bold-red)]"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={updateSocialMutation.isPending}
                  className="w-full bg-[var(--bold-red)] hover:bg-red-700 text-white"
                >
                  {updateSocialMutation.isPending ? "در حال ذخیره..." : "ذخیره لینک‌ها"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Copyright Settings */}
          <Card>
            <CardHeader>
              <CardTitle>تنظیمات کپی‌رایت</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCopyrightSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="copyrightText">متن کپی‌رایت</Label>
                  <Textarea
                    id="copyrightText"
                    rows={3}
                    placeholder="© ۱۴۰۳ تک پوش خاص. تمامی حقوق محفوظ است."
                    value={copyrightForm.text}
                    onChange={(e) => setCopyrightForm({ text: e.target.value })}
                    className="focus:ring-[var(--bold-red)] focus:border-[var(--bold-red)]"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={updateCopyrightMutation.isPending}
                  className="w-full bg-[var(--bold-red)] hover:bg-red-700 text-white"
                >
                  {updateCopyrightMutation.isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* About Content Settings */}
          <Card>
            <CardHeader>
              <CardTitle>محتوای درباره ما</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAboutSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="aboutTitle">عنوان اصلی</Label>
                    <Input
                      id="aboutTitle"
                      placeholder="درباره تک پوش خاص"
                      value={aboutForm.title}
                      onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
                      className="focus:ring-[var(--bold-red)] focus:border-[var(--bold-red)]"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="aboutSubtitle">زیرعنوان</Label>
                    <Input
                      id="aboutSubtitle"
                      placeholder="ما برندی هستیم که در خلق پوشاک منحصر به فرد تخصص داریم"
                      value={aboutForm.subtitle}
                      onChange={(e) => setAboutForm({ ...aboutForm, subtitle: e.target.value })}
                      className="focus:ring-[var(--bold-red)] focus:border-[var(--bold-red)]"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="philosophyTitle">عنوان فلسفه</Label>
                  <Input
                    id="philosophyTitle"
                    placeholder="فلسفه ما"
                    value={aboutForm.philosophyTitle}
                    onChange={(e) => setAboutForm({ ...aboutForm, philosophyTitle: e.target.value })}
                    className="focus:ring-[var(--bold-red)] focus:border-[var(--bold-red)]"
                  />
                </div>

                <div>
                  <Label htmlFor="philosophyText1">متن فلسفه - بخش اول</Label>
                  <Textarea
                    id="philosophyText1"
                    rows={3}
                    placeholder="در تک پوش خاص، ما معتقدیم که هر فرد منحصر به فرد است..."
                    value={aboutForm.philosophyText1}
                    onChange={(e) => setAboutForm({ ...aboutForm, philosophyText1: e.target.value })}
                    className="focus:ring-[var(--bold-red)] focus:border-[var(--bold-red)]"
                  />
                </div>

                <div>
                  <Label htmlFor="philosophyText2">متن فلسفه - بخش دوم</Label>
                  <Textarea
                    id="philosophyText2"
                    rows={3}
                    placeholder="شعار ما یک از یک نشان‌دهنده تعهد ما به ارائه محصولاتی است..."
                    value={aboutForm.philosophyText2}
                    onChange={(e) => setAboutForm({ ...aboutForm, philosophyText2: e.target.value })}
                    className="focus:ring-[var(--bold-red)] focus:border-[var(--bold-red)]"
                  />
                </div>

                <div>
                  <Label htmlFor="contactTitle">عنوان تماس</Label>
                  <Input
                    id="contactTitle"
                    placeholder="تماس با ما"
                    value={aboutForm.contactTitle}
                    onChange={(e) => setAboutForm({ ...aboutForm, contactTitle: e.target.value })}
                    className="focus:ring-[var(--bold-red)] focus:border-[var(--bold-red)]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="contactEmail">ایمیل</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="info@tekpooshkhaas.com"
                      value={aboutForm.contactEmail}
                      onChange={(e) => setAboutForm({ ...aboutForm, contactEmail: e.target.value })}
                      className="focus:ring-[var(--bold-red)] focus:border-[var(--bold-red)]"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contactPhone">تلفن</Label>
                    <Input
                      id="contactPhone"
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      value={aboutForm.contactPhone}
                      onChange={(e) => setAboutForm({ ...aboutForm, contactPhone: e.target.value })}
                      className="focus:ring-[var(--bold-red)] focus:border-[var(--bold-red)]"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contactAddress">آدرس</Label>
                    <Input
                      id="contactAddress"
                      placeholder="تهران، ایران"
                      value={aboutForm.contactAddress}
                      onChange={(e) => setAboutForm({ ...aboutForm, contactAddress: e.target.value })}
                      className="focus:ring-[var(--bold-red)] focus:border-[var(--bold-red)]"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={updateAboutMutation.isPending}
                  className="w-full bg-[var(--bold-red)] hover:bg-red-700 text-white"
                >
                  {updateAboutMutation.isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

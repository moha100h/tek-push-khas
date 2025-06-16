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
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  X, 
  Upload, 
  Trash2, 
  LogOut, 
  Settings, 
  Image as ImageIcon, 
  Share2, 
  Copyright, 
  Info,
  Phone,
  Mail,
  MapPin,
  Edit3,
  Save,
  Palette,
  Type,
  Eye,
  EyeOff
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface AdminPanelProps {
  onClose: () => void;
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const { toast } = useToast();
  const { logoutMutation } = useAuth();
  const [editingImage, setEditingImage] = useState<TshirtImage | null>(null);
  
  // Form states
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

  // Data queries
  const { data: brandSettings } = useQuery<BrandSettings>({
    queryKey: ["/api/brand-settings"],
  });

  const { data: copyrightSettings } = useQuery<CopyrightSettings>({
    queryKey: ["/api/copyright-settings"],
  });

  const { data: aboutContent } = useQuery<AboutContent>({
    queryKey: ["/api/about-content"],
  });

  const { data: socialLinks } = useQuery<SocialLink[]>({
    queryKey: ["/api/social-links"],
  });

  const { data: tshirtImages } = useQuery<TshirtImage[]>({
    queryKey: ["/api/tshirt-images"],
  });

  // Mutations
  const updateBrandMutation = useMutation({
    mutationFn: async (data: InsertBrandSettings) => {
      const res = await apiRequest("PUT", "/api/brand-settings", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/brand-settings"] });
      toast({
        title: "✓ تنظیمات برند بروزرسانی شد",
        description: "تغییرات با موفقیت ذخیره شد",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "خطا در بروزرسانی",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("image", file);
      const res = await apiRequest("POST", "/api/upload-image", formData);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tshirt-images"] });
      toast({
        title: "✓ تصویر آپلود شد",
        description: "تصویر جدید با موفقیت اضافه شد",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "خطا در آپلود",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const bulkUploadMutation = useMutation({
    mutationFn: async (files: FileList) => {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("images", file);
      });
      const res = await apiRequest("POST", "/api/upload-images", formData);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tshirt-images"] });
      toast({
        title: "✓ تصاویر آپلود شدند",
        description: "همه تصاویر با موفقیت اضافه شدند",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "خطا در آپلود دسته‌ای",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateCopyrightMutation = useMutation({
    mutationFn: async (data: InsertCopyrightSettings) => {
      const res = await apiRequest("PUT", "/api/copyright-settings", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/copyright-settings"] });
      toast({
        title: "✓ تنظیمات کپی‌رایت بروزرسانی شد",
        description: "تغییرات با موفقیت ذخیره شد",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "خطا در بروزرسانی",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateAboutMutation = useMutation({
    mutationFn: async (data: InsertAboutContent) => {
      const res = await apiRequest("PUT", "/api/about-content", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/about-content"] });
      toast({
        title: "✓ محتوای درباره ما بروزرسانی شد",
        description: "تغییرات با موفقیت ذخیره شد",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "خطا در بروزرسانی",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Initialize forms with existing data
  useEffect(() => {
    if (brandSettings) {
      setBrandForm({
        name: brandSettings.name || "",
        slogan: brandSettings.slogan || "",
      });
    }
  }, [brandSettings]);

  useEffect(() => {
    if (copyrightSettings) {
      setCopyrightForm({
        text: copyrightSettings.text || "",
      });
    }
  }, [copyrightSettings]);

  useEffect(() => {
    if (aboutContent) {
      setAboutForm({
        title: aboutContent.title || "",
        subtitle: aboutContent.subtitle || "",
        philosophyTitle: aboutContent.philosophyTitle || "",
        philosophyText1: aboutContent.philosophyText1 || "",
        philosophyText2: aboutContent.philosophyText2 || "",
        contactTitle: aboutContent.contactTitle || "",
        contactEmail: aboutContent.contactEmail || "",
        contactPhone: aboutContent.contactPhone || "",
        contactAddress: aboutContent.contactAddress || "",
      });
    }
  }, [aboutContent]);

  useEffect(() => {
    if (socialLinks) {
      const links = socialLinks.reduce((acc, link) => {
        acc[link.platform] = link.url;
        return acc;
      }, {} as Record<string, string>);
      
      setSocialForm({
        instagram: links.instagram || "",
        telegram: links.telegram || "",
        tiktok: links.tiktok || "",
        youtube: links.youtube || "",
      });
    }
  }, [socialLinks]);

  const handleEditImage = (image: TshirtImage) => {
    setEditingImage(image);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadImageMutation.mutate(file);
    }
  };

  const handleBulkUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      bulkUploadMutation.mutate(files);
    }
  };

  const handleLogout = () => {
    logoutMutation.mutate();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
      <div className="flex items-center justify-center p-4 min-h-screen">
        <div className="bg-[var(--ice-white)] rounded-2xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden border border-[var(--medium-gray)]">
          
          {/* Modern Header */}
          <div className="flex items-center justify-between p-6 border-b-2 border-[var(--primary-red)]/30 bg-gradient-to-r from-[var(--ice-white)] to-[var(--soft-gray)]">
            <div className="flex items-center space-x-reverse space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-red)] to-[var(--dark-red)] rounded-xl flex items-center justify-center shadow-lg">
                <Settings className="text-white w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold red-text">پنل مدیریت جامع</h2>
                <p className="text-[var(--text-gray)] text-sm">مدیریت کامل محتوای وب‌سایت</p>
              </div>
            </div>
            <div className="flex items-center space-x-reverse space-x-3">
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="flex items-center space-x-reverse space-x-2 border-[var(--primary-red)] text-[var(--primary-red)] hover:bg-[var(--primary-red)] hover:text-white"
              >
                <LogOut className="w-4 h-4" />
                <span>خروج</span>
              </Button>
              <Button 
                variant="ghost" 
                onClick={onClose} 
                className="p-3 hover:bg-[var(--light-gray)] rounded-xl transition-colors"
              >
                <X className="h-6 w-6 text-[var(--text-gray)]" />
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="h-[calc(95vh-100px)]">
            <Tabs defaultValue="brand" className="h-full">
              
              {/* Professional Tab Navigation */}
              <div className="border-b border-[var(--light-gray)] bg-[var(--soft-gray)]/50">
                <TabsList className="w-full h-16 bg-transparent justify-start p-0 space-x-reverse space-x-2">
                  <TabsTrigger 
                    value="brand" 
                    className="flex items-center space-x-reverse space-x-2 px-6 py-3 data-[state=active]:bg-[var(--primary-red)] data-[state=active]:text-white data-[state=active]:shadow-lg"
                  >
                    <Palette className="w-4 h-4" />
                    <span>برند و هویت</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="images" 
                    className="flex items-center space-x-reverse space-x-2 px-6 py-3 data-[state=active]:bg-[var(--primary-red)] data-[state=active]:text-white data-[state=active]:shadow-lg"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>گالری تصاویر</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="about" 
                    className="flex items-center space-x-reverse space-x-2 px-6 py-3 data-[state=active]:bg-[var(--primary-red)] data-[state=active]:text-white data-[state=active]:shadow-lg"
                  >
                    <Info className="w-4 h-4" />
                    <span>درباره ما</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="social" 
                    className="flex items-center space-x-reverse space-x-2 px-6 py-3 data-[state=active]:bg-[var(--primary-red)] data-[state=active]:text-white data-[state=active]:shadow-lg"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>شبکه‌های اجتماعی</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="copyright" 
                    className="flex items-center space-x-reverse space-x-2 px-6 py-3 data-[state=active]:bg-[var(--primary-red)] data-[state=active]:text-white data-[state=active]:shadow-lg"
                  >
                    <Copyright className="w-4 h-4" />
                    <span>کپی‌رایت</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <ScrollArea className="h-[calc(100%-64px)]">
                
                {/* Brand Settings Tab */}
                <TabsContent value="brand" className="p-6 space-y-6">
                  <Card className="border-[var(--light-gray)] shadow-sm">
                    <CardHeader className="bg-gradient-to-r from-[var(--soft-gray)] to-[var(--ice-white)] border-b border-[var(--light-gray)]">
                      <CardTitle className="flex items-center space-x-reverse space-x-3 text-[var(--text-black)]">
                        <Palette className="w-5 h-5 text-[var(--primary-red)]" />
                        <span>تنظیمات برند و هویت بصری</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="brand-name" className="text-[var(--text-black)] font-medium">نام برند</Label>
                          <Input
                            id="brand-name"
                            value={brandForm.name}
                            onChange={(e) => setBrandForm(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="نام برند خود را وارد کنید"
                            className="border-[var(--light-gray)] focus:border-[var(--primary-red)]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="brand-slogan" className="text-[var(--text-black)] font-medium">شعار برند</Label>
                          <Input
                            id="brand-slogan"
                            value={brandForm.slogan}
                            onChange={(e) => setBrandForm(prev => ({ ...prev, slogan: e.target.value }))}
                            placeholder="شعار یا توضیح کوتاه برند"
                            className="border-[var(--light-gray)] focus:border-[var(--primary-red)]"
                          />
                        </div>
                      </div>
                      <Button 
                        onClick={() => updateBrandMutation.mutate(brandForm)}
                        disabled={updateBrandMutation.isPending}
                        className="w-full bg-[var(--primary-red)] hover:bg-[var(--dark-red)] text-white py-3"
                      >
                        <Save className="w-4 h-4 ml-2" />
                        {updateBrandMutation.isPending ? "در حال ذخیره..." : "ذخیره تنظیمات برند"}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Images Gallery Tab */}
                <TabsContent value="images" className="p-6 space-y-6">
                  <Card className="border-[var(--light-gray)] shadow-sm">
                    <CardHeader className="bg-gradient-to-r from-[var(--soft-gray)] to-[var(--ice-white)] border-b border-[var(--light-gray)]">
                      <CardTitle className="flex items-center space-x-reverse space-x-3 text-[var(--text-black)]">
                        <ImageIcon className="w-5 h-5 text-[var(--primary-red)]" />
                        <span>مدیریت گالری تصاویر</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="single-upload" className="text-[var(--text-black)] font-medium">آپلود تصویر تکی</Label>
                          <div className="mt-2">
                            <input
                              id="single-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                            <Button
                              onClick={() => document.getElementById('single-upload')?.click()}
                              variant="outline"
                              className="w-full border-[var(--primary-red)] text-[var(--primary-red)] hover:bg-[var(--primary-red)] hover:text-white"
                              disabled={uploadImageMutation.isPending}
                            >
                              <Upload className="w-4 h-4 ml-2" />
                              {uploadImageMutation.isPending ? "در حال آپلود..." : "انتخاب تصویر"}
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="bulk-upload" className="text-[var(--text-black)] font-medium">آپلود دسته‌ای</Label>
                          <div className="mt-2">
                            <input
                              id="bulk-upload"
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleBulkUpload}
                              className="hidden"
                            />
                            <Button
                              onClick={() => document.getElementById('bulk-upload')?.click()}
                              variant="outline"
                              className="w-full border-[var(--primary-red)] text-[var(--primary-red)] hover:bg-[var(--primary-red)] hover:text-white"
                              disabled={bulkUploadMutation.isPending}
                            >
                              <Upload className="w-4 h-4 ml-2" />
                              {bulkUploadMutation.isPending ? "در حال آپلود..." : "آپلود چندین تصویر"}
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Current Images Display */}
                      {tshirtImages && tshirtImages.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-[var(--text-black)] mb-4">تصاویر موجود</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {tshirtImages.map((image) => (
                              <div key={image.id} className="relative group">
                                <img
                                  src={image.imageUrl}
                                  alt={image.title || "تصویر محصول"}
                                  className="w-full h-32 object-cover rounded-lg border border-[var(--light-gray)]"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                  <Button
                                    onClick={() => handleEditImage(image)}
                                    size="sm"
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    <Edit3 className="w-3 h-3 ml-1" />
                                    ویرایش
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* About Content Tab */}
                <TabsContent value="about" className="p-6 space-y-6">
                  <Card className="border-[var(--light-gray)] shadow-sm">
                    <CardHeader className="bg-gradient-to-r from-[var(--soft-gray)] to-[var(--ice-white)] border-b border-[var(--light-gray)]">
                      <CardTitle className="flex items-center space-x-reverse space-x-3 text-[var(--text-black)]">
                        <Info className="w-5 h-5 text-[var(--primary-red)]" />
                        <span>محتوای صفحه درباره ما</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      
                      {/* Main Content */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="about-title" className="text-[var(--text-black)] font-medium">عنوان اصلی</Label>
                          <Input
                            id="about-title"
                            value={aboutForm.title}
                            onChange={(e) => setAboutForm(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="عنوان صفحه درباره ما"
                            className="border-[var(--light-gray)] focus:border-[var(--primary-red)]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="about-subtitle" className="text-[var(--text-black)] font-medium">زیرعنوان</Label>
                          <Input
                            id="about-subtitle"
                            value={aboutForm.subtitle}
                            onChange={(e) => setAboutForm(prev => ({ ...prev, subtitle: e.target.value }))}
                            placeholder="توضیح کوتاه"
                            className="border-[var(--light-gray)] focus:border-[var(--primary-red)]"
                          />
                        </div>
                      </div>

                      {/* Philosophy Section */}
                      <Separator className="my-6" />
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-[var(--text-black)] flex items-center">
                          <Type className="w-4 h-4 ml-2 text-[var(--primary-red)]" />
                          بخش فلسفه و رویکرد
                        </h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="philosophy-title" className="text-[var(--text-black)] font-medium">عنوان فلسفه</Label>
                            <Input
                              id="philosophy-title"
                              value={aboutForm.philosophyTitle}
                              onChange={(e) => setAboutForm(prev => ({ ...prev, philosophyTitle: e.target.value }))}
                              placeholder="عنوان بخش فلسفه برند"
                              className="border-[var(--light-gray)] focus:border-[var(--primary-red)]"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="philosophy-text1" className="text-[var(--text-black)] font-medium">متن فلسفه - بخش اول</Label>
                              <Textarea
                                id="philosophy-text1"
                                value={aboutForm.philosophyText1}
                                onChange={(e) => setAboutForm(prev => ({ ...prev, philosophyText1: e.target.value }))}
                                placeholder="متن توضیحی فلسفه برند..."
                                rows={4}
                                className="border-[var(--light-gray)] focus:border-[var(--primary-red)]"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="philosophy-text2" className="text-[var(--text-black)] font-medium">متن فلسفه - بخش دوم</Label>
                              <Textarea
                                id="philosophy-text2"
                                value={aboutForm.philosophyText2}
                                onChange={(e) => setAboutForm(prev => ({ ...prev, philosophyText2: e.target.value }))}
                                placeholder="ادامه متن فلسفه برند..."
                                rows={4}
                                className="border-[var(--light-gray)] focus:border-[var(--primary-red)]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Contact Information Section */}
                      <Separator className="my-6" />
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-[var(--text-black)] flex items-center">
                          <Phone className="w-4 h-4 ml-2 text-[var(--primary-red)]" />
                          اطلاعات تماس
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="contact-title" className="text-[var(--text-black)] font-medium">عنوان بخش تماس</Label>
                              <Input
                                id="contact-title"
                                value={aboutForm.contactTitle}
                                onChange={(e) => setAboutForm(prev => ({ ...prev, contactTitle: e.target.value }))}
                                placeholder="عنوان بخش اطلاعات تماس"
                                className="border-[var(--light-gray)] focus:border-[var(--primary-red)]"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="contact-email" className="text-[var(--text-black)] font-medium flex items-center">
                                <Mail className="w-4 h-4 ml-1" />
                                ایمیل تماس
                              </Label>
                              <Input
                                id="contact-email"
                                type="email"
                                value={aboutForm.contactEmail}
                                onChange={(e) => setAboutForm(prev => ({ ...prev, contactEmail: e.target.value }))}
                                placeholder="email@example.com"
                                className="border-[var(--light-gray)] focus:border-[var(--primary-red)]"
                              />
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="contact-phone" className="text-[var(--text-black)] font-medium flex items-center">
                                <Phone className="w-4 h-4 ml-1" />
                                شماره تماس
                              </Label>
                              <Input
                                id="contact-phone"
                                value={aboutForm.contactPhone}
                                onChange={(e) => setAboutForm(prev => ({ ...prev, contactPhone: e.target.value }))}
                                placeholder="شماره تلفن یا موبایل"
                                className="border-[var(--light-gray)] focus:border-[var(--primary-red)]"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="contact-address" className="text-[var(--text-black)] font-medium flex items-center">
                                <MapPin className="w-4 h-4 ml-1" />
                                آدرس
                              </Label>
                              <Textarea
                                id="contact-address"
                                value={aboutForm.contactAddress}
                                onChange={(e) => setAboutForm(prev => ({ ...prev, contactAddress: e.target.value }))}
                                placeholder="آدرس کامل محل کسب و کار"
                                rows={3}
                                className="border-[var(--light-gray)] focus:border-[var(--primary-red)]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button 
                        onClick={() => updateAboutMutation.mutate(aboutForm)}
                        disabled={updateAboutMutation.isPending}
                        className="w-full bg-[var(--primary-red)] hover:bg-[var(--dark-red)] text-white py-3"
                      >
                        <Save className="w-4 h-4 ml-2" />
                        {updateAboutMutation.isPending ? "در حال ذخیره..." : "ذخیره محتوای درباره ما"}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Social Networks Tab */}
                <TabsContent value="social" className="p-6 space-y-6">
                  <Card className="border-[var(--light-gray)] shadow-sm">
                    <CardHeader className="bg-gradient-to-r from-[var(--soft-gray)] to-[var(--ice-white)] border-b border-[var(--light-gray)]">
                      <CardTitle className="flex items-center space-x-reverse space-x-3 text-[var(--text-black)]">
                        <Share2 className="w-5 h-5 text-[var(--primary-red)]" />
                        <span>لینک‌های شبکه‌های اجتماعی</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="instagram" className="text-[var(--text-black)] font-medium">اینستاگرام</Label>
                          <Input
                            id="instagram"
                            value={socialForm.instagram}
                            onChange={(e) => setSocialForm(prev => ({ ...prev, instagram: e.target.value }))}
                            placeholder="https://instagram.com/username"
                            className="border-[var(--light-gray)] focus:border-[var(--primary-red)]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telegram" className="text-[var(--text-black)] font-medium">تلگرام</Label>
                          <Input
                            id="telegram"
                            value={socialForm.telegram}
                            onChange={(e) => setSocialForm(prev => ({ ...prev, telegram: e.target.value }))}
                            placeholder="https://t.me/username"
                            className="border-[var(--light-gray)] focus:border-[var(--primary-red)]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tiktok" className="text-[var(--text-black)] font-medium">تیک‌تاک</Label>
                          <Input
                            id="tiktok"
                            value={socialForm.tiktok}
                            onChange={(e) => setSocialForm(prev => ({ ...prev, tiktok: e.target.value }))}
                            placeholder="https://tiktok.com/@username"
                            className="border-[var(--light-gray)] focus:border-[var(--primary-red)]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="youtube" className="text-[var(--text-black)] font-medium">یوتیوب</Label>
                          <Input
                            id="youtube"
                            value={socialForm.youtube}
                            onChange={(e) => setSocialForm(prev => ({ ...prev, youtube: e.target.value }))}
                            placeholder="https://youtube.com/@username"
                            className="border-[var(--light-gray)] focus:border-[var(--primary-red)]"
                          />
                        </div>
                      </div>
                      <Button 
                        onClick={() => {
                          // Handle social links update
                          const socialData = Object.entries(socialForm)
                            .filter(([_, url]) => url.trim() !== "")
                            .map(([platform, url]) => ({ platform, url }));
                          // Add mutation for social links
                        }}
                        className="w-full bg-[var(--primary-red)] hover:bg-[var(--dark-red)] text-white py-3"
                      >
                        <Save className="w-4 h-4 ml-2" />
                        ذخیره لینک‌های اجتماعی
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Copyright Tab */}
                <TabsContent value="copyright" className="p-6 space-y-6">
                  <Card className="border-[var(--light-gray)] shadow-sm">
                    <CardHeader className="bg-gradient-to-r from-[var(--soft-gray)] to-[var(--ice-white)] border-b border-[var(--light-gray)]">
                      <CardTitle className="flex items-center space-x-reverse space-x-3 text-[var(--text-black)]">
                        <Copyright className="w-5 h-5 text-[var(--primary-red)]" />
                        <span>تنظیمات کپی‌رایت</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="copyright-text" className="text-[var(--text-black)] font-medium">متن کپی‌رایت</Label>
                        <Textarea
                          id="copyright-text"
                          value={copyrightForm.text}
                          onChange={(e) => setCopyrightForm(prev => ({ ...prev, text: e.target.value }))}
                          placeholder="© 2024 نام برند شما. تمام حقوق محفوظ است."
                          rows={3}
                          className="border-[var(--light-gray)] focus:border-[var(--primary-red)]"
                        />
                      </div>
                      <Button 
                        onClick={() => updateCopyrightMutation.mutate(copyrightForm)}
                        disabled={updateCopyrightMutation.isPending}
                        className="w-full bg-[var(--primary-red)] hover:bg-[var(--dark-red)] text-white py-3"
                      >
                        <Save className="w-4 h-4 ml-2" />
                        {updateCopyrightMutation.isPending ? "در حال ذخیره..." : "ذخیره تنظیمات کپی‌رایت"}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

              </ScrollArea>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Image Edit Dialog */}
      {editingImage && (
        <Dialog open={!!editingImage} onOpenChange={() => setEditingImage(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>ویرایش اطلاعات تصویر</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <img
                src={editingImage.imageUrl}
                alt={editingImage.title || "تصویر محصول"}
                className="w-full h-48 object-cover rounded-lg"
              />
              {/* Add edit form fields here */}
              <Button onClick={() => setEditingImage(null)}>بستن</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
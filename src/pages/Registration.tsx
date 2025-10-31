import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import simonWechatQR from "@/assets/simon-wechat-qr.jpg";

const Registration = () => {
  const [showForm, setShowForm] = useState(false);
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <section className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Registration
            </h1>
            <p className="text-xl text-muted-foreground">
              Sign up for our research publication support services
            </p>
          </section>

          <Card className="border-2 border-primary/20">
            <CardHeader className="bg-gradient-primary text-primary-foreground">
              <CardTitle className="text-2xl">Service Registration Form</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Complete the form below to register for one-on-one consultation
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <Label htmlFor="form-toggle" className="text-base font-medium">
                  {showForm ? "Hide Form" : "Show Registration Form"}
                </Label>
                <Switch
                  id="form-toggle"
                  checked={showForm}
                  onCheckedChange={setShowForm}
                />
              </div>
              
              {showForm ? (
                <div className="w-full" style={{ height: '800px' }}>
                  <iframe
                    src="https://forms.office.com/pages/responsepage.aspx?id=IKmc7T5UBUOaZNYjlxbvu9wqq_BmZ7NEi6jig-YKo1FUQTVHWjZWQ0kxVUdPSDhVUDA1WEsyVzEyRy4u&route=shorturl"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    className="rounded-lg border border-primary/20"
                    title="Registration Form"
                  />
                </div>
              ) : (
                <div className="bg-muted/30 border-2 border-dashed border-primary/30 rounded-lg p-12 text-center">
                  <p className="text-lg text-muted-foreground font-medium">
                    Toggle the switch above to view and complete the registration form
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20">
            <CardHeader className="bg-gradient-primary text-primary-foreground">
              <CardTitle>Join Our WeChat Research Community</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 space-y-4">
                  <p className="text-lg font-medium">
                    Connect with fellow research students in our WeChat group!
                  </p>
                  <p className="text-muted-foreground">
                    We have an active WeChat community for research students where you can:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Stay updated on upcoming workshops and events</li>
                    <li>Share resources and research tips</li>
                    <li>Network with other graduate students</li>
                    <li>Get quick answers to your questions</li>
                  </ul>
                  <p className="text-lg font-semibold pt-4">
                    Interested? Connect with Dr. Simon Wang via WeChat →
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <img 
                    src={simonWechatQR} 
                    alt="Simon Wang WeChat QR Code - Scan to connect" 
                    className="w-64 h-auto rounded-lg border-2 border-primary/20 shadow-lg"
                  />
                  <p className="text-center text-sm text-muted-foreground mt-2">
                    Scan QR code to add Dr. Simon Wang
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What to Expect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">After Registration:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>You will receive a confirmation email within 2 business days</li>
                  <li>Our team will contact you to schedule your first consultation</li>
                  <li>Prepare any materials you'd like to discuss (manuscripts, outlines, etc.)</li>
                  <li>Consultations can be conducted in-person or online</li>
                </ul>
              </div>
              
              <div className="space-y-2 pt-4">
                <h3 className="font-semibold text-lg">Service Details:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Up to 8 hours of one-on-one consultation per student</li>
                  <li>Flexible scheduling to accommodate your research timeline</li>
                  <li>Personalized guidance tailored to your discipline</li>
                  <li>Support available throughout the academic year</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-gradient-header text-primary-foreground py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="opacity-90">
            © {new Date().getFullYear()} Language Centre, Hong Kong Baptist University
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Registration;

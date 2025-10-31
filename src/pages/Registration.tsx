import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const Registration = () => {
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
              <div className="bg-muted/30 border-2 border-dashed border-primary/30 rounded-lg p-12 text-center">
                <p className="text-xl text-muted-foreground font-medium">
                  Registration Form
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  [Form will be embedded here]
                </p>
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

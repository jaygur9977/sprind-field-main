import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Phone, Calendar, Lock, Loader2, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import TopBar from '@/components/TopBar';
import BackgroundEffects from '@/components/BackgroundEffects';
import TagInput from '@/components/TagInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const Register: React.FC = () => {
  const { t } = useLanguage();
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    mobile: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [allergies, setAllergies] = useState<string[]>([]);
  const [problems, setProblems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [registeredId, setRegisteredId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.age || !formData.mobile || !formData.username || !formData.password) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await register({
        name: formData.name,
        age: parseInt(formData.age),
        mobile: formData.mobile,
        allergies,
        problems,
        username: formData.username,
        password: formData.password,
      });
      
      if (result.success && result.patientId) {
        setRegisteredId(result.patientId);
        toast({
          title: t('registrationSuccess'),
          description: `Your Patient ID: ${result.patientId}`,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Registration failed. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Success screen
  if (registeredId) {
    return (
      <div className="min-h-screen relative">
        <BackgroundEffects />
        <TopBar />
        
        <main className="container mx-auto px-4 pt-32 pb-12 flex items-center justify-center min-h-screen">
          <div className="w-full max-w-md animate-fade-in text-center">
            <div className="glass-card space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-accent/20 flex items-center justify-center neon-glow-green">
                <CheckCircle className="w-10 h-10 text-accent" />
              </div>
              
              <h1 className="font-display text-3xl font-bold text-foreground">
                {t('registrationSuccess')}
              </h1>
              
              <div className="space-y-2">
                <p className="text-muted-foreground">Your unique Patient ID is:</p>
                <div className="patient-badge inline-block text-xl">
                  {registeredId}
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Please save this ID. You'll need it for future reference.
              </p>
              
              <Button
                onClick={() => navigate('/dashboard')}
                className="w-full btn-glow bg-gradient-to-r from-primary to-secondary h-12 text-lg font-semibold"
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <BackgroundEffects />
      <TopBar />
      
      <main className="container mx-auto px-4 pt-32 pb-12 flex items-center justify-center">
        <div className="w-full max-w-2xl animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">
              <span className="text-primary neon-text-cyan">{t('createAccount')}</span>
            </h1>
            <p className="text-muted-foreground">Join SpringField Patient Portal</p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="glass-card space-y-6">
            {/* Name & Age Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground/80">
                  {t('name')} *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t('enterName')}
                    className="pl-10 input-glow bg-background/50"
                  />
                </div>
              </div>

              {/* Age */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground/80">
                  {t('age')} *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="number"
                    min="1"
                    max="150"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder={t('enterAge')}
                    className="pl-10 input-glow bg-background/50"
                  />
                </div>
              </div>
            </div>

            {/* Mobile */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground/80">
                {t('mobileNumber')} *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder={t('enterMobile')}
                  className="pl-10 input-glow bg-background/50"
                />
              </div>
            </div>

            {/* Allergies */}
            <TagInput
              tags={allergies}
              setTags={setAllergies}
              label={t('allergies')}
              placeholder={t('addAllergy')}
            />

            {/* Health Problems */}
            <TagInput
              tags={problems}
              setTags={setProblems}
              label={t('healthProblems')}
              placeholder={t('addProblem')}
            />

            {/* Username */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground/80">
                {t('username')} *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder={t('enterUsername')}
                  className="pl-10 input-glow bg-background/50"
                />
              </div>
            </div>

            {/* Password & Confirm Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground/80">
                  {t('password')} *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder={t('enterPassword')}
                    className="pl-10 input-glow bg-background/50"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground/80">
                  {t('confirmPassword')} *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder={t('confirmPassword')}
                    className="pl-10 input-glow bg-background/50"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full btn-glow bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground h-12 text-lg font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Creating Account...
                </>
              ) : (
                t('register')
              )}
            </Button>

            {/* Login Link */}
            <p className="text-center text-sm text-muted-foreground">
              {t('alreadyHaveAccount')}{' '}
              <Link
                to="/login"
                className="text-primary hover:text-primary/80 font-medium transition-colors story-link"
              >
                {t('login')}
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Register;

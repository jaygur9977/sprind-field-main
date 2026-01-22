import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Patient {
  patientId: string;
  name: string;
  age: number;
  mobile: string;
  allergies: string[];
  problems: string[];
  username: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  patient: Patient | null;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<{ success: boolean; patientId?: string }>;
  logout: () => void;
}

interface RegisterData {
  name: string;
  age: number;
  mobile: string;
  allergies: string[];
  problems: string[];
  username: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Generate unique 12-character patient ID
const generatePatientId = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Mock API base URL - replace with your actual backend URL
const API_BASE_URL = 'http://localhost:5000/api';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing token on mount
    const storedToken = localStorage.getItem('token');
    const storedPatient = localStorage.getItem('patient');
    
    if (storedToken && storedPatient) {
      setToken(storedToken);
      setPatient(JSON.parse(storedPatient));
      setIsAuthenticated(true);
    }
  }, []);

  const register = async (data: RegisterData): Promise<{ success: boolean; patientId?: string }> => {
    try {
      // Try to call actual backend
      const response = await fetch(`${API_BASE_URL}/patient/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        return { success: true, patientId: result.patientId };
      }
      
      throw new Error('API not available');
    } catch (error) {
      // Fallback to mock registration for demo
      console.log('Using mock registration (backend not connected)');
      
      const patientId = generatePatientId();
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      const newPatient: Patient = {
        patientId,
        name: data.name,
        age: data.age,
        mobile: data.mobile,
        allergies: data.allergies,
        problems: data.problems,
        username: data.username,
      };

      // Store in localStorage for demo
      const patients = JSON.parse(localStorage.getItem('patients') || '[]');
      patients.push({ ...newPatient, password: data.password });
      localStorage.setItem('patients', JSON.stringify(patients));

      setToken(mockToken);
      setPatient(newPatient);
      setIsAuthenticated(true);
      localStorage.setItem('token', mockToken);
      localStorage.setItem('patient', JSON.stringify(newPatient));

      return { success: true, patientId };
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Try to call actual backend
      const response = await fetch(`${API_BASE_URL}/patient/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const result = await response.json();
        setToken(result.token);
        setPatient(result.patient);
        setIsAuthenticated(true);
        localStorage.setItem('token', result.token);
        localStorage.setItem('patient', JSON.stringify(result.patient));
        return true;
      }

      throw new Error('API not available');
    } catch (error) {
      // Fallback to mock login for demo
      console.log('Using mock login (backend not connected)');
      
      const patients = JSON.parse(localStorage.getItem('patients') || '[]');
      const found = patients.find((p: any) => p.username === username && p.password === password);

      if (found) {
        const mockToken = 'mock-jwt-token-' + Date.now();
        const { password: _, ...patientData } = found;
        
        setToken(mockToken);
        setPatient(patientData);
        setIsAuthenticated(true);
        localStorage.setItem('token', mockToken);
        localStorage.setItem('patient', JSON.stringify(patientData));
        return true;
      }

      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setPatient(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('patient');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, patient, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

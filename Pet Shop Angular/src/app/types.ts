export interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  petName: string;
  petType: "Cachorro" | "Gato";
  petSize: "Pequeno" | "Médio" | "Grande";
  service: "Banho" | "Tosa" | "Banho e Tosa";
  date: string;
  time: string;
  notes?: string;
  status: "Pendente" | "Confirmado" | "Concluído";
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

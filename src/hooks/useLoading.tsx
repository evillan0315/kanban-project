import { DefaultUser, Session } from "next-auth";
import { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextType {
  loading: boolean;
  messages: string[];
  setLoading: (state: boolean) => void;
  addMessage: (msg: string) => void;
  clearMessages: () => void;
  session: Session;
  addUserSession: (user: DefaultUser)=>void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ hasSession, children }: { hasSession: Session, children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [session, setSession] = useState<Session>(hasSession);
  const addMessage = (msg: string) => {
    setMessages((prev) => [...prev, msg]);
  };
  const addUserSession = (user: DefaultUser) => {
    if(session){
      if(user){
        user.session = session;
      }
      setSession(session);
    }
    
  };
  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <LoadingContext.Provider
      value={{ loading, messages, setLoading, addMessage, clearMessages,  session, addUserSession }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

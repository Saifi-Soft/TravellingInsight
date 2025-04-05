import { toast as sonnerToast } from "sonner";

// Re-export the toast function
export { sonnerToast as toast };

export type Toast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
};

export function useToast() {
  // For compatibility with both toast libraries
  return {
    toast: sonnerToast,
    toasts: [] as Toast[] // Empty array for compatibility with ui/toaster
  };
}
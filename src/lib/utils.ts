import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string, with Tailwind CSS optimizations
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Gets the URL for an image, handling both relative and absolute paths
 */
export function getImageUrl(path: string | undefined): string {
  if (!path) return "/placeholder.svg";
  
  // If it's already a full URL, return it
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  
  // If it's a photo ID from Unsplash, format it as a full URL
  if (path.startsWith("photo-")) {
    return `https://images.unsplash.com/${path}?auto=format&fit=crop&w=800&q=80`;
  }
  
  // If it's a path that starts with a slash, it's relative to the server
  if (path.startsWith("/")) {
    // Return the path with the API base URL
    return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${path}`;
  }
  
  // Otherwise, it's just a path to use as-is
  return path;
}

/**
 * Format a date to a readable string
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Truncate text to a specific length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

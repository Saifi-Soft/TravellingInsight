import React, { ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardDetailProps {
  title?: ReactNode;
  description?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function CardDetail({
  title,
  description,
  content,
  footer,
  className,
}: CardDetailProps) {
  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      {content && <CardContent>{content}</CardContent>}
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}

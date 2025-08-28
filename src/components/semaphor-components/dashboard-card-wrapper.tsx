import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';

interface DashboardCardWrapperProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showWrapper?: boolean;
  className?: string;
}

export function DashboardCardWrapper({ 
  children, 
  title, 
  subtitle, 
  showWrapper = false,
  className = ''
}: DashboardCardWrapperProps) {
  if (!showWrapper) {
    return <>{children}</>;
  }

  return (
    <Card className={`w-full ${className}`}>
      {title && (
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {subtitle && (
            <CardDescription className="text-sm text-muted-foreground">
              {subtitle}
            </CardDescription>
          )}
        </CardHeader>
      )}
      <CardContent className={title ? '' : 'p-6'}>
        {children}
      </CardContent>
    </Card>
  );
}
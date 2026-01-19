import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard = ({ title, value, subtitle, icon: Icon, trend }: StatCardProps) => {
  return (
    <Card className="bg-card border-border/50 shadow-card hover:border-primary/50 transition-colors duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </CardTitle>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground font-display mb-1">{value}</div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
        
        {trend && (
          <div className={cn(
            "flex items-center text-sm mt-3",
            trend.isPositive ? "text-green-400" : "text-red-400"
          )}>
            {trend.isPositive ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            {trend.value}% this month
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
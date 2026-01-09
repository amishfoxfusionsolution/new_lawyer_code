import React from 'react';
import { AdminUser } from '@/hooks/useAdminUsers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Briefcase, Mail, MapPin, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface LawyerTableProps {
  lawyers: AdminUser[];
  isLoading: boolean;
}

const LawyerTable: React.FC<LawyerTableProps> = ({ lawyers, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="bg-card border-gold/20 animate-pulse">
        <CardHeader><div className="h-6 w-1/4 bg-muted rounded"></div></CardHeader>
        <CardContent className="space-y-4">
          <div className="h-10 w-full bg-muted rounded"></div>
          <div className="h-10 w-full bg-muted rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-gold/20 shadow-card">
      <CardHeader>
        <CardTitle className="text-xl font-display text-foreground flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary" /> Lawyer Records ({lawyers.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-noir-medium hover:bg-noir-medium">
                <TableHead className="w-[200px] text-primary">Lawyer</TableHead>
                <TableHead className="text-primary">Contact Phone</TableHead>
                <TableHead className="text-primary">Practice Areas</TableHead>
                <TableHead className="text-primary">Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lawyers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                    No lawyer records found.
                  </TableCell>
                </TableRow>
              ) : (
                lawyers.map((lawyer) => (
                  <TableRow key={lawyer.id} className="hover:bg-noir-light/50 transition-colors">
                    <TableCell className="font-medium">
                      {lawyer.full_name || 'Profile Incomplete'}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <Mail className="w-3 h-3" />
                        {lawyer.email}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3 text-muted-foreground" />
                        {lawyer.phone || 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell>
                      {lawyer.practice_areas && lawyer.practice_areas.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {lawyer.practice_areas.slice(0, 2).map((area, index) => (
                            <Badge key={index} variant="secondary" className="bg-secondary/50 text-xs">
                              {area}
                            </Badge>
                          ))}
                          {lawyer.practice_areas.length > 2 && (
                            <Badge variant="secondary" className="bg-secondary/50 text-xs">
                              +{lawyer.practice_areas.length - 2} more
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs">Not specified</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {lawyer.city || 'N/A'}, {lawyer.state || 'N/A'}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LawyerTable;
import { AdminUser } from '@/hooks/useAdminUsers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User, Mail, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface UserTableProps {
  clients: AdminUser[];
  isLoading: boolean;
}

const UserTable = ({ clients, isLoading }: UserTableProps) => {
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
          <User className="w-5 h-5 text-primary" /> Client Records ({clients.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-noir-medium hover:bg-noir-medium">
                <TableHead className="w-[200px] text-primary">Name</TableHead>
                <TableHead className="text-primary">Contact</TableHead>
                <TableHead className="text-primary">Role</TableHead>
                <TableHead className="text-primary">Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                    No client records found.
                  </TableCell>
                </TableRow>
              ) : (
                clients.map((client) => (
                  <TableRow key={client.id} className="hover:bg-noir-light/50 transition-colors">
                    <TableCell className="font-medium">
                      {client.full_name || 'Anonymous Client'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        {client.email}
                      </div>
                      {client.phone && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Phone className="w-3 h-3" />
                          {client.phone}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-primary text-primary bg-primary/10 uppercase">
                        {client.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(client.created_at).toLocaleDateString()}
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

export default UserTable;
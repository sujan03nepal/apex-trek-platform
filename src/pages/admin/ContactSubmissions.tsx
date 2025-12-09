import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useContactSubmissions } from "@/hooks/useContactSubmissions";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, Eye, Trash2, Loader2, Mail, 
  Phone, Calendar, CheckCircle, Circle
} from "lucide-react";

export default function ContactSubmissions() {
  const { submissions, loading, markAsRead, deleteSubmission } = useContactSubmissions();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<typeof submissions[0] | null>(null);

  const filteredSubmissions = submissions.filter(s =>
    s.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.subject?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleView = async (submission: typeof submissions[0]) => {
    setSelectedSubmission(submission);
    if (!submission.is_read) {
      await markAsRead(submission.id);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    const { error } = await deleteSubmission(id);
    if (error) {
      toast({ title: "Error", description: error, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Message deleted!" });
      setSelectedSubmission(null);
    }
  };

  const unreadCount = submissions.filter(s => !s.is_read).length;

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
            Contact Messages
            {unreadCount > 0 && (
              <Badge className="ml-3 bg-accent text-accent-foreground">{unreadCount} new</Badge>
            )}
          </h1>
          <p className="text-muted-foreground">View and manage contact form submissions</p>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground w-8"></th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">From</th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Subject</th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Date</th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-muted-foreground">
                    <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No messages found</p>
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((submission) => (
                  <tr 
                    key={submission.id} 
                    className={`border-t border-border hover:bg-muted/30 transition-colors cursor-pointer ${
                      !submission.is_read ? 'bg-accent/5' : ''
                    }`}
                    onClick={() => handleView(submission)}
                  >
                    <td className="py-4 px-4">
                      {submission.is_read ? (
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Circle className="h-4 w-4 text-accent fill-accent" />
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className={`font-medium ${!submission.is_read ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {submission.full_name}
                        </p>
                        <p className="text-xs text-muted-foreground">{submission.email}</p>
                      </div>
                    </td>
                    <td className={`py-4 px-4 ${!submission.is_read ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                      {submission.subject || 'No subject'}
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">
                      {submission.created_at ? new Date(submission.created_at).toLocaleDateString() : '-'}
                    </td>
                    <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleView(submission)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(submission.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Message Detail Modal */}
        {selectedSubmission && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-2xl border border-border shadow-strong max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-serif text-xl font-bold text-foreground">Message Details</h2>
                <Button variant="ghost" size="icon" onClick={() => setSelectedSubmission(null)}>×</Button>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">From</p>
                    <p className="font-medium text-foreground">{selectedSubmission.full_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Date</p>
                    <p className="font-medium text-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {selectedSubmission.created_at ? new Date(selectedSubmission.created_at).toLocaleString() : '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <a href={`mailto:${selectedSubmission.email}`} className="font-medium text-accent hover:underline flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {selectedSubmission.email}
                    </a>
                  </div>
                  {selectedSubmission.phone && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Phone</p>
                      <a href={`tel:${selectedSubmission.phone}`} className="font-medium text-accent hover:underline flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {selectedSubmission.phone}
                      </a>
                    </div>
                  )}
                </div>

                {selectedSubmission.subject && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Subject</p>
                    <p className="font-medium text-foreground">{selectedSubmission.subject}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Message</p>
                  <div className="bg-muted/50 rounded-lg p-4 text-foreground whitespace-pre-wrap">
                    {selectedSubmission.message}
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-border">
                  <Button variant="gold" asChild>
                    <a href={`mailto:${selectedSubmission.email}?subject=Re: ${selectedSubmission.subject || 'Your inquiry'}`}>
                      <Mail className="h-4 w-4 mr-2" />
                      Reply via Email
                    </a>
                  </Button>
                  <Button variant="outline" onClick={() => handleDelete(selectedSubmission.id)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

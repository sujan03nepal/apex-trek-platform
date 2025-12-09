import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBookings } from "@/hooks/useBookings";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, Eye, Trash2, Loader2, Calendar, 
  Users, MapPin, Mail, Phone, Filter
} from "lucide-react";

export default function AdminBookings() {
  const { bookings, loading, updateBooking, deleteBooking } = useBookings();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [selectedBooking, setSelectedBooking] = useState<typeof bookings[0] | null>(null);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || booking.booking_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id: string, status: string) => {
    const { error } = await updateBooking(id, { booking_status: status });
    if (error) {
      toast({ title: "Error", description: error, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Booking status updated!" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    const { error } = await deleteBooking(id);
    if (error) {
      toast({ title: "Error", description: error, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Booking deleted!" });
      setSelectedBooking(null);
    }
  };

  const statusColors: Record<string, string> = {
    pending: "bg-accent/20 text-accent",
    confirmed: "bg-forest/20 text-forest",
    cancelled: "bg-destructive/20 text-destructive",
    completed: "bg-sapphire/20 text-sapphire",
  };

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
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Bookings</h1>
          <p className="text-muted-foreground">Manage customer trek bookings</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Bookings Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left py-4 px-4 font-medium text-muted-foreground">Customer</th>
                  <th className="text-left py-4 px-4 font-medium text-muted-foreground">Trek</th>
                  <th className="text-left py-4 px-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-4 px-4 font-medium text-muted-foreground">Travelers</th>
                  <th className="text-left py-4 px-4 font-medium text-muted-foreground">Total</th>
                  <th className="text-left py-4 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-4 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-muted-foreground">
                      No bookings found
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-foreground">
                            {booking.first_name} {booking.last_name}
                          </p>
                          <p className="text-xs text-muted-foreground">{booking.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        {booking.trek_id?.substring(0, 8)}...
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        {new Date(booking.departure_date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        {booking.travelers_count}
                      </td>
                      <td className="py-4 px-4 font-medium text-foreground">
                        ${booking.total_price}
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={statusColors[booking.booking_status || 'pending']}>
                          {booking.booking_status || 'pending'}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedBooking(booking)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(booking.id)}
                          >
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
        </div>

        {/* Booking Detail Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-2xl border border-border shadow-strong max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-serif text-xl font-bold text-foreground">Booking Details</h2>
                <Button variant="ghost" size="icon" onClick={() => setSelectedBooking(null)}>
                  ×
                </Button>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Customer Info</h3>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2 text-foreground">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {selectedBooking.first_name} {selectedBooking.last_name}
                      </p>
                      <p className="flex items-center gap-2 text-foreground">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {selectedBooking.email}
                      </p>
                      <p className="flex items-center gap-2 text-foreground">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {selectedBooking.phone}
                      </p>
                      {selectedBooking.country && (
                        <p className="flex items-center gap-2 text-foreground">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {selectedBooking.country}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Trip Details</h3>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2 text-foreground">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(selectedBooking.departure_date).toLocaleDateString()}
                      </p>
                      <p className="text-foreground">
                        <strong>Travelers:</strong> {selectedBooking.travelers_count}
                      </p>
                      <p className="text-foreground">
                        <strong>Total:</strong> ${selectedBooking.total_price}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedBooking.special_requests && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Special Requests</h3>
                    <p className="text-foreground bg-muted/50 p-3 rounded-lg">
                      {selectedBooking.special_requests}
                    </p>
                  </div>
                )}

                {selectedBooking.dietary_requirements && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Dietary Requirements</h3>
                    <p className="text-foreground bg-muted/50 p-3 rounded-lg">
                      {selectedBooking.dietary_requirements}
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Update Status</h3>
                  <select
                    value={selectedBooking.booking_status || 'pending'}
                    onChange={(e) => {
                      handleStatusChange(selectedBooking.id, e.target.value);
                      setSelectedBooking({ ...selectedBooking, booking_status: e.target.value });
                    }}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

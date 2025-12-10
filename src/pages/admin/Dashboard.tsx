import { Link } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { useTreks } from "@/hooks/useTreks";
import { useBookings } from "@/hooks/useBookings";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useContactSubmissions } from "@/hooks/useContactSubmissions";
import {
  MapPin, BookOpen, Users, TrendingUp, ArrowRight,
  Mail, Calendar, Loader2
} from "lucide-react";

export default function AdminDashboard() {
  const { treks, loading: treksLoading } = useTreks();
  const { bookings, loading: bookingsLoading } = useBookings();
  const { posts, loading: postsLoading } = useBlogPosts();
  const { submissions, loading: submissionsLoading } = useContactSubmissions();

  const loading = treksLoading || bookingsLoading || postsLoading || submissionsLoading;

  const stats = [
    {
      label: "Total Treks",
      value: treks.length.toString(),
      icon: MapPin,
      color: "text-accent",
      bgColor: "bg-accent/10",
      link: "/admin/treks",
    },
    {
      label: "Blog Posts",
      value: posts.length.toString(),
      icon: BookOpen,
      color: "text-forest",
      bgColor: "bg-forest/10",
      link: "/admin/blog",
    },
    {
      label: "Bookings",
      value: bookings.length.toString(),
      icon: Users,
      color: "text-sunset",
      bgColor: "bg-sunset/10",
      link: "/admin/bookings",
    },
    {
      label: "Messages",
      value: submissions.filter(s => !s.is_read).length.toString(),
      icon: Mail,
      color: "text-sapphire",
      bgColor: "bg-sapphire/10",
      link: "/admin/contacts",
    },
  ];

  const recentBookings = bookings.slice(0, 5);

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
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your website.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              to={stat.link}
              className="bg-card rounded-xl border border-border p-6 hover:border-accent/30 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                  <p className="font-serif text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl font-bold text-foreground">Recent Bookings</h2>
                <Link to="/admin/bookings" className="text-accent hover:text-accent/80 text-sm font-medium transition-colors">
                  View All →
                </Link>
              </div>

              {recentBookings.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No bookings yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Customer</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                          <td className="py-3 px-4 text-foreground">
                            {booking.first_name} {booking.last_name}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {new Date(booking.departure_date).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                              booking.booking_status === "confirmed"
                                ? "bg-forest/20 text-forest"
                                : booking.booking_status === "cancelled"
                                ? "bg-destructive/20 text-destructive"
                                : "bg-accent/20 text-accent"
                            }`}>
                              {booking.booking_status || 'pending'}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-medium text-foreground">${booking.total_price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <h2 className="font-serif text-xl font-bold text-foreground">Quick Actions</h2>

              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/admin/treks">
                  Add New Trek
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </Link>
              </Button>

              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/admin/blog">
                  Write Blog Post
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </Link>
              </Button>

              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/admin/media">
                  Upload Media
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </Link>
              </Button>

              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/admin/settings">
                  Website Settings
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </Link>
              </Button>

              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/admin/contacts">
                  View Messages
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

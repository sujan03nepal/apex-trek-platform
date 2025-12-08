import { Link } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  BookOpen,
  Users,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const stats = [
  {
    label: "Total Treks",
    value: "18",
    icon: MapPin,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    label: "Blog Posts",
    value: "24",
    icon: BookOpen,
    color: "text-forest",
    bgColor: "bg-forest/10",
  },
  {
    label: "Bookings",
    value: "156",
    icon: Users,
    color: "text-sunset",
    bgColor: "bg-sunset/10",
  },
  {
    label: "Total Revenue",
    value: "$45,230",
    icon: TrendingUp,
    color: "text-sapphire",
    bgColor: "bg-sapphire/10",
  },
];

const recentBookings = [
  {
    id: "TREK-001",
    name: "John Doe",
    trek: "Everest Base Camp",
    date: "2024-04-15",
    status: "confirmed",
  },
  {
    id: "TREK-002",
    name: "Jane Smith",
    trek: "Annapurna Circuit",
    date: "2024-05-20",
    status: "pending",
  },
  {
    id: "TREK-003",
    name: "Michael Brown",
    trek: "Langtang Valley",
    date: "2024-06-10",
    status: "confirmed",
  },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your website.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-xl border border-border p-6 hover:border-accent/30 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {stat.label}
                  </p>
                  <p className="font-serif text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl font-bold text-foreground">
                  Recent Bookings
                </h2>
                <Link
                  to="/admin/bookings"
                  className="text-accent hover:text-accent/80 text-sm font-medium transition-colors"
                >
                  View All →
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        ID
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Name
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Trek
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4 font-mono text-accent text-xs">
                          {booking.id}
                        </td>
                        <td className="py-3 px-4 text-foreground">
                          {booking.name}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {booking.trek}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {new Date(booking.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded-full ${
                              booking.status === "confirmed"
                                ? "bg-forest/20 text-forest"
                                : "bg-accent/20 text-accent"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <h2 className="font-serif text-xl font-bold text-foreground">
                Quick Actions
              </h2>

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

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-3">
                  Need help? Check the documentation or contact support.
                </p>
                <Button variant="gold" size="sm" className="w-full">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

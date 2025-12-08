import { useState } from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, Plus, Search, Filter } from "lucide-react";
import { treks } from "@/data/treks";

export default function TrekManager() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTreks, setSelectedTreks] = useState<string[]>([]);

  const filteredTreks = treks.filter(trek =>
    trek.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trek.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = () => {
    if (selectedTreks.length === filteredTreks.length) {
      setSelectedTreks([]);
    } else {
      setSelectedTreks(filteredTreks.map(t => t.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedTreks(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
              Trek Management
            </h1>
            <p className="text-muted-foreground">
              Manage your trek packages, pricing, and details
            </p>
          </div>
          <Button asChild variant="gold">
            <Link to="/admin/treks/new">
              <Plus className="h-4 w-4 mr-2" />
              New Trek
            </Link>
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search treks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left py-4 px-6">
                    <input
                      type="checkbox"
                      checked={selectedTreks.length === filteredTreks.length && filteredTreks.length > 0}
                      onChange={handleSelectAll}
                      className="rounded"
                    />
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">
                    Trek Name
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">
                    Region
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">
                    Price
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">
                    Duration
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">
                    Status
                  </th>
                  <th className="text-right py-4 px-6 font-semibold text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTreks.map((trek) => (
                  <tr
                    key={trek.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <input
                        type="checkbox"
                        checked={selectedTreks.includes(trek.id)}
                        onChange={() => toggleSelect(trek.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-foreground">{trek.name}</p>
                      <p className="text-xs text-muted-foreground">ID: {trek.id}</p>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant="outline">{trek.region}</Badge>
                    </td>
                    <td className="py-4 px-6 font-semibold text-foreground">
                      ${trek.price}
                    </td>
                    <td className="py-4 px-6 text-muted-foreground">
                      {trek.duration}
                    </td>
                    <td className="py-4 px-6">
                      <Badge
                        className={
                          trek.featured
                            ? "bg-accent/20 text-accent border-0"
                            : "bg-muted text-muted-foreground border-0"
                        }
                      >
                        {trek.featured ? "Featured" : "Active"}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/admin/treks/${trek.id}`}>
                          <Edit2 className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTreks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No treks found</p>
              <Button asChild variant="gold">
                <Link to="/admin/treks/new">Create Your First Trek</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-card rounded-xl border border-border p-6">
          <p className="text-sm text-muted-foreground">
            Total: <span className="font-semibold text-foreground">{filteredTreks.length}</span> treks
            {selectedTreks.length > 0 && (
              <span className="ml-4">
                Selected: <span className="font-semibold text-accent">{selectedTreks.length}</span>
              </span>
            )}
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}

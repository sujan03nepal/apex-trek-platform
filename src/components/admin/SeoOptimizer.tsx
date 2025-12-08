import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Copy,
  Check,
  AlertCircle,
  TrendingUp,
  Target,
  LinkIcon,
} from "lucide-react";
import { optimizeForSEO, SEOOptimizationOutput } from "@/services/aiSeoEngine";

interface SeoOptimizerProps {
  title: string;
  content: string;
  contentType: "trek" | "blog" | "page";
  region?: string;
  onApply?: (suggestions: SEOOptimizationOutput) => void;
}

export function SeoOptimizer({
  title,
  content,
  contentType,
  region,
  onApply,
}: SeoOptimizerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<SEOOptimizationOutput | null>(
    null
  );
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleOptimize = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await optimizeForSEO({
        title,
        content,
        contentType,
        region,
      });

      setSuggestions(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate suggestions"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (!suggestions) {
    return (
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="h-5 w-5 text-accent" />
          <h3 className="font-semibold text-foreground">AI SEO Optimization</h3>
        </div>

        <p className="text-muted-foreground mb-4">
          Generate SEO recommendations using AI to optimize your content for
          search engines.
        </p>

        <Button
          onClick={handleOptimize}
          disabled={!title || !content || isLoading}
          variant="gold"
        >
          {isLoading ? "Optimizing..." : "Generate SEO Suggestions"}
        </Button>

        {error && (
          <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex gap-2">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-accent/10 border border-accent/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg text-foreground">
            SEO Suggestions
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSuggestions(null);
              setError(null);
            }}
          >
            Clear
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          ✓ AI-optimized suggestions are ready. Copy and apply them below.
        </p>
      </div>

      {/* Readability Score */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="h-5 w-5 text-accent" />
          <h4 className="font-semibold text-foreground">Content Quality</h4>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Readability Score
              </span>
              <span className="font-bold text-accent">
                {suggestions.readabilityScore}%
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all"
                style={{ width: `${suggestions.readabilityScore}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Meta Tags Section */}
      <div className="space-y-4">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-accent" />
          Meta Tags
        </h4>

        <div className="bg-card rounded-xl border border-border p-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Meta Title {suggestions.metaTitle.length}/60
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={suggestions.metaTitle}
              readOnly
              className="flex-1 px-3 py-2 rounded-lg border border-border bg-muted text-foreground text-sm"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(suggestions.metaTitle, "title")}
            >
              {copiedField === "title" ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Meta Description {suggestions.metaDescription.length}/160
          </label>
          <div className="flex gap-2">
            <textarea
              value={suggestions.metaDescription}
              readOnly
              rows={2}
              className="flex-1 px-3 py-2 rounded-lg border border-border bg-muted text-foreground text-sm resize-none"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                copyToClipboard(suggestions.metaDescription, "description")
              }
            >
              {copiedField === "description" ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Keywords Section */}
      <div className="space-y-4">
        <h4 className="font-semibold text-foreground">Keywords</h4>

        <div className="bg-card rounded-xl border border-border p-6">
          <label className="block text-sm font-medium text-foreground mb-3">
            Primary Keywords
          </label>
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestions.keywords.map((keyword) => (
              <Badge key={keyword} className="bg-accent text-accent-foreground">
                {keyword}
              </Badge>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(suggestions.keywords.join(", "), "keywords")}
          >
            Copy All
          </Button>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <label className="block text-sm font-medium text-foreground mb-3">
            Long-Tail Keywords
          </label>
          <div className="space-y-2">
            {suggestions.longTailKeywords.map((keyword) => (
              <div
                key={keyword}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span>•</span>
                <span>{keyword}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Improvements */}
      <div className="space-y-4">
        <h4 className="font-semibold text-foreground">Content Improvements</h4>

        <div className="bg-card rounded-xl border border-border p-6">
          <ul className="space-y-3">
            {suggestions.contentImprovements.map((improvement, index) => (
              <li key={index} className="flex gap-3 text-sm">
                <span className="text-accent font-bold">{index + 1}.</span>
                <span className="text-foreground">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Missing Sections */}
      {suggestions.missingSections.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">
            Suggested Additions
          </h4>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
            <ul className="space-y-2">
              {suggestions.missingSections.map((section, index) => (
                <li key={index} className="flex gap-2 text-sm text-yellow-700">
                  <span>→</span>
                  <span>{section}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Internal Links */}
      <div className="space-y-4">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <LinkIcon className="h-5 w-5 text-accent" />
          Internal Links
        </h4>

        <div className="bg-card rounded-xl border border-border p-6">
          <ul className="space-y-2">
            {suggestions.internalLinkSuggestions.map((link, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="text-accent">→</span>
                <span>{link}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        <h4 className="font-semibold text-foreground">
          Final Recommendations
        </h4>

        <div className="bg-card rounded-xl border border-border p-6">
          <ol className="space-y-3">
            {suggestions.recommendations.map((recommendation, index) => (
              <li key={index} className="flex gap-3">
                <span className="font-bold text-accent flex-shrink-0">
                  {index + 1}.
                </span>
                <span className="text-foreground">{recommendation}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Apply Button */}
      <Button
        onClick={() => onApply?.(suggestions)}
        variant="gold"
        size="lg"
        className="w-full"
      >
        Apply Suggestions
      </Button>
    </div>
  );
}

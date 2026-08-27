import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, ScoreRing, ProgressBar, Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui'
import { Search, AlertTriangle, CheckCircle, Info, ExternalLink, RefreshCw, Download, Globe } from 'lucide-react'

const PAGES = [
  { url: '/', name: 'Homepage', score: 94 },
  { url: '/pricing', name: 'Pricing', score: 87 },
  { url: '/features', name: 'Features', score: 82 },
  { url: '/blog', name: 'Blog', score: 76 },
  { url: '/contact', name: 'Contact', score: 91 },
]

const ISSUES = [
  { type: 'error', category: 'Critical', message: 'Missing meta description on /blog', page: '/blog', impact: 'High' },
  { type: 'error', category: 'Critical', message: 'Image alt tags missing on 3 images', page: '/features', impact: 'High' },
  { type: 'warning', category: 'Warning', message: 'Title tag too long on /pricing (78 chars)', page: '/pricing', impact: 'Medium' },
  { type: 'warning', category: 'Warning', message: 'Low text-to-HTML ratio on /contact', page: '/contact', impact: 'Medium' },
  { type: 'info', category: 'Suggestion', message: 'Add structured data markup to pricing page', page: '/pricing', impact: 'Low' },
  { type: 'info', category: 'Suggestion', message: 'Consider adding FAQ schema to features page', page: '/features', impact: 'Low' },
  { type: 'info', category: 'Suggestion', image: 'Optimize image compression on homepage', page: '/', impact: 'Low' },
]

const CRAWL_MAP = [
  { url: '/', status: 200, links: 12, depth: 0 },
  { url: '/pricing', status: 200, links: 5, depth: 1 },
  { url: '/features', status: 200, links: 8, depth: 1 },
  { url: '/blog', status: 200, links: 15, depth: 1 },
  { url: '/blog/first-post', status: 200, links: 3, depth: 2 },
  { url: '/contact', status: 200, links: 4, depth: 1 },
  { url: '/api/health', status: 200, links: 0, depth: 2 },
  { url: '/404-test', status: 404, links: 0, depth: 2 },
]

const AI_RECOMMENDATIONS = [
  {
    title: 'Add meta descriptions to all pages',
    description: 'Pages without meta descriptions lose ~5% CTR. Add unique, compelling descriptions under 160 characters.',
    priority: 'high',
    affected: ['/blog'],
  },
  {
    title: 'Implement structured data',
    description: 'Adding JSON-LD structured data for Product and FAQ schemas can increase rich snippet eligibility by 40%.',
    priority: 'medium',
    affected: ['/pricing', '/features'],
  },
  {
    title: 'Optimize Core Web Vitals',
    description: 'LCP is 3.2s (target: <2.5s). Consider lazy-loading below-fold images and preloading critical assets.',
    priority: 'high',
    affected: ['/'],
  },
]

export default function SeoAudit() {
  const [selectedPage, setSelectedPage] = useState('/')
  const overallScore = Math.round(PAGES.reduce((a, p) => a + p.score, 0) / PAGES.length)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            <Globe className="w-4 h-4 mr-1" />
            chatbotpro.com
          </Button>
          <Button variant="ghost" size="sm">
            <RefreshCw className="w-4 h-4 mr-1" />
            Re-scan
          </Button>
        </div>
        <Button variant="secondary" size="sm">
          <Download className="w-4 h-4 mr-1" />
          Export Report
        </Button>
      </div>

      {/* Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-1 flex items-center justify-center py-6">
          <ScoreRing value={overallScore} size={120} strokeWidth={10} color={overallScore >= 90 ? 'success' : overallScore >= 70 ? 'warning' : 'danger'} label="Overall Score" />
        </Card>
        <Card>
          <div className="space-y-3">
            <p className="text-caption font-semibold text-neutral-400">Page Scores</p>
            {PAGES.map((page) => (
              <div key={page.url} className="flex items-center gap-3">
                <span className="text-body-sm text-neutral-300 flex-1 truncate">{page.name}</span>
                <Badge variant={page.score >= 90 ? 'success' : page.score >= 70 ? 'warning' : 'danger'} size="sm">
                  {page.score}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="space-y-3">
            <p className="text-caption font-semibold text-neutral-400">Issues Found</p>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-critical-500" />
              <span className="text-body-sm text-neutral-300 flex-1">Critical Errors</span>
              <Badge variant="danger" size="sm">2</Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning-500" />
              <span className="text-body-sm text-neutral-300 flex-1">Warnings</span>
              <Badge variant="warning" size="sm">2</Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary-400" />
              <span className="text-body-sm text-neutral-300 flex-1">Suggestions</span>
              <Badge variant="primary" size="sm">3</Badge>
            </div>
          </div>
        </Card>
        <Card>
          <div className="space-y-3">
            <p className="text-caption font-semibold text-neutral-400">Performance</p>
            <ProgressBar value={92} color="success" label="Speed Index" showValue />
            <ProgressBar value={78} color="warning" label="LCP" showValue />
            <ProgressBar value={95} color="success" label="CLS" showValue />
          </div>
        </Card>
      </div>

      <Tabs defaultValue="issues">
        <TabsList>
          <TabsTrigger value="issues">
            <AlertTriangle className="w-4 h-4 mr-1.5" />
            Issues
          </TabsTrigger>
          <TabsTrigger value="crawl">
            <Globe className="w-4 h-4 mr-1.5" />
            Crawl Map
          </TabsTrigger>
          <TabsTrigger value="ai">
            <Info className="w-4 h-4 mr-1.5" />
            AI Recommendations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="issues">
          <Card>
            <div className="space-y-2">
              {ISSUES.map((issue, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-neutral-800/20 border border-neutral-800/30 hover:border-neutral-700/50 transition-colors">
                  {issue.type === 'error' ? (
                    <AlertTriangle className="w-4 h-4 text-critical-500 mt-0.5 shrink-0" />
                  ) : issue.type === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-warning-500 mt-0.5 shrink-0" />
                  ) : (
                    <Info className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-body-sm text-neutral-200">{issue.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-caption text-neutral-500 font-mono">{issue.page}</span>
                      <Badge variant={issue.type === 'error' ? 'danger' : issue.type === 'warning' ? 'warning' : 'default'} size="sm">
                        {issue.impact}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="crawl">
          <Card>
            <CardHeader>
              <CardTitle>Crawl Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {CRAWL_MAP.map((page, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-800/30 transition-colors">
                    <div style={{ paddingLeft: `${page.depth * 24}px` }} className="flex items-center gap-2">
                      {page.depth > 0 && <span className="text-neutral-600">└─</span>}
                      <span className="text-body-sm font-mono text-primary-400">{page.url}</span>
                    </div>
                    <Badge variant={page.status === 200 ? 'success' : 'danger'} size="sm">{page.status}</Badge>
                    <span className="text-caption text-neutral-500">{page.links} links</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai">
          <div className="space-y-4">
            {AI_RECOMMENDATIONS.map((rec, i) => (
              <Card key={i}>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    rec.priority === 'high' ? 'bg-critical-500/10' : 'bg-warning-500/10'
                  }`}>
                    <Info className={`w-5 h-5 ${rec.priority === 'high' ? 'text-critical-500' : 'text-warning-500'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-body font-semibold text-neutral-200">{rec.title}</h4>
                      <Badge variant={rec.priority === 'high' ? 'danger' : 'warning'} size="sm">
                        {rec.priority}
                      </Badge>
                    </div>
                    <p className="text-body-sm text-neutral-400 mb-2">{rec.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-caption text-neutral-500">Affects:</span>
                      {rec.affected.map((url) => (
                        <Badge key={url} variant="default" size="sm">{url}</Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Apply Fix
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Card, CardHeader, CardTitle, Tabs, TabsList, TabsTrigger, TabsContent, Textarea } from '../../components/ui'
import { fadeLeft, fadeRight, staggerContainer, staggerItem, springGentle } from '../../lib/motion'
import { Send, Copy, Download, RefreshCw, Eye, Code, Smartphone, Monitor, Tablet } from 'lucide-react'

const TEMPLATE_PROMPTS = [
  'Create a modern pricing page with 3 tiers',
  'Build a hero section with gradient background',
  'Design a testimonial carousel section',
  'Generate a contact form with validation',
  'Create a feature comparison table',
  'Build an FAQ accordion section',
]

const PREVIEW_DEVICES = [
  { id: 'desktop', icon: Monitor, label: 'Desktop' },
  { id: 'tablet', icon: Tablet, label: 'Tablet' },
  { id: 'mobile', icon: Smartphone, label: 'Mobile' },
]

export default function UiGenerator() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [previewDevice, setPreviewDevice] = useState('desktop')
  const [viewMode, setViewMode] = useState('preview')

  const handleGenerate = () => {
    if (!prompt.trim()) return
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col xl:flex-row gap-6 h-[calc(100vh-8rem)]"
    >
      {/* Left Panel - Prompt Engineering */}
      <motion.div
        variants={fadeLeft}
        initial="hidden"
        animate="visible"
        className="xl:w-[420px] shrink-0 flex flex-col"
      >
        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Prompt Engineering</CardTitle>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon-sm">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <div className="flex-1 flex flex-col gap-4">
            {/* Quick Templates */}
            <div>
              <p className="text-caption text-neutral-500 mb-2 font-medium">Quick Templates</p>
              <div className="flex flex-wrap gap-1.5">
                {TEMPLATE_PROMPTS.map((t, i) => (
                  <motion.button
                    key={t}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ scale: 1.03, borderColor: 'rgba(99, 102, 241, 0.3)' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setPrompt(t)}
                    className="px-2.5 py-1 text-micro rounded-md bg-neutral-800/50 border border-neutral-700/30 text-neutral-400 hover:text-neutral-200 transition-colors"
                  >
                    {t.length > 35 ? t.slice(0, 35) + '...' : t}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Prompt Input */}
            <div className="flex-1 flex flex-col">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the UI you want to create...&#10;&#10;Example: A modern SaaS pricing page with three tiers, gradient cards, and a toggle for monthly/annual pricing."
                className="flex-1 min-h-[200px] resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="flex-1"
              >
                {isGenerating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <RefreshCw className="w-4 h-4" />
                    </motion.div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Generate
                  </>
                )}
              </Button>
              <Button variant="secondary" size="icon">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Right Panel - Canvas Preview */}
      <motion.div
        variants={fadeRight}
        initial="hidden"
        animate="visible"
        className="flex-1 flex flex-col min-w-0"
      >
        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Tabs value={viewMode} onValueChange={setViewMode}>
                  <TabsList>
                    <TabsTrigger value="preview">
                      <Eye className="w-4 h-4 mr-1.5" />
                      Preview
                    </TabsTrigger>
                    <TabsTrigger value="code">
                      <Code className="w-4 h-4 mr-1.5" />
                      Code
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="flex items-center gap-1 p-1 rounded-lg bg-neutral-800/50 border border-neutral-700/30">
                {PREVIEW_DEVICES.map((device) => {
                  const Icon = device.icon
                  return (
                    <motion.button
                      key={device.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setPreviewDevice(device.id)}
                      className={`relative p-1.5 rounded-md transition-colors ${
                        previewDevice === device.id
                          ? 'text-primary-400'
                          : 'text-neutral-500 hover:text-neutral-300'
                      }`}
                      title={device.label}
                    >
                      {previewDevice === device.id && (
                        <motion.div
                          layoutId="device-active"
                          className="absolute inset-0 bg-primary-500/15 rounded-md"
                          transition={springGentle}
                        />
                      )}
                      <Icon className="w-4 h-4 relative z-10" />
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </CardHeader>

          <motion.div
            className="flex-1 rounded-xl border border-neutral-800/50 bg-neutral-900/30 overflow-hidden"
            layout
            transition={springGentle}
          >
            <AnimatePresence mode="wait">
              {viewMode === 'preview' ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`h-full mx-auto transition-all duration-500 ${
                    previewDevice === 'desktop' ? 'w-full' :
                    previewDevice === 'tablet' ? 'w-[768px]' :
                    'w-[375px]'
                  }`}
                >
                  <div className="h-full flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center space-y-4"
                    >
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border border-primary-500/20 flex items-center justify-center"
                      >
                        <Eye className="w-10 h-10 text-primary-400/50" />
                      </motion.div>
                      <div>
                        <p className="text-body font-semibold text-neutral-300">Canvas Preview</p>
                        <p className="text-body-sm text-neutral-500 mt-1">
                          Enter a prompt and click Generate to see your UI here
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="code"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-6 font-mono text-body-sm text-neutral-400 h-full overflow-auto"
                >
                  <pre className="text-primary-400/60">
{`<!-- Generated code will appear here -->
<div class="pricing-section">
  <h2>Choose Your Plan</h2>
  <!-- ... -->
</div>`}
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  )
}

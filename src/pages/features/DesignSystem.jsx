import { useState } from 'react'
import { Button, Card, CardHeader, CardTitle, CardContent, Badge, Tabs, TabsList, TabsTrigger, TabsContent, ColorPicker, Select } from '../../components/ui'
import { designTokens, stylePresets } from '../../lib/design-tokens'
import { Check, Copy, Download, Palette, Type, Box, Layers } from 'lucide-react'

const FONT_SIZES = [
  { label: 'Display', value: '4.5rem', sample: 'Aa' },
  { label: 'H1', value: '3rem', sample: 'Aa' },
  { label: 'H2', value: '2rem', sample: 'Aa' },
  { label: 'H3', value: '1.5rem', sample: 'Aa' },
  { label: 'H4', value: '1.25rem', sample: 'Aa' },
  { label: 'Body LG', value: '1.125rem', sample: 'Aa' },
  { label: 'Body', value: '1rem', sample: 'Aa' },
  { label: 'Body SM', value: '0.875rem', sample: 'Aa' },
  { label: 'Caption', value: '0.75rem', sample: 'Aa' },
  { label: 'Micro', value: '0.625rem', sample: 'Aa' },
]

const SPACING_SCALE = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24]

export default function DesignSystem() {
  const [activePreset, setActivePreset] = useState('modern')
  const [primaryColor, setPrimaryColor] = useState('#6366f1')
  const [secondaryColor, setSecondaryColor] = useState('#14b8a6')

  const currentPreset = stylePresets[activePreset]

  return (
    <div className="space-y-6 animate-fade-in">
      <Tabs defaultValue="colors">
        <TabsList>
          <TabsTrigger value="colors">
            <Palette className="w-4 h-4 mr-1.5" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="typography">
            <Type className="w-4 h-4 mr-1.5" />
            Typography
          </TabsTrigger>
          <TabsTrigger value="spacing">
            <Box className="w-4 h-4 mr-1.5" />
            Spacing & Radius
          </TabsTrigger>
          <TabsTrigger value="presets">
            <Layers className="w-4 h-4 mr-1.5" />
            Style Presets
          </TabsTrigger>
        </TabsList>

        {/* Colors Tab */}
        <TabsContent value="colors">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Primary Colors</CardTitle>
                  <Button variant="ghost" size="sm">
                    <Copy className="w-3.5 h-3.5 mr-1" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ColorPicker
                    label="Primary"
                    value={primaryColor}
                    onChange={setPrimaryColor}
                  />
                  <ColorPicker
                    label="Secondary"
                    value={secondaryColor}
                    onChange={setSecondaryColor}
                  />

                  <div className="mt-6">
                    <p className="text-caption font-semibold text-neutral-400 uppercase tracking-wider mb-3">Primary Palette</p>
                    <div className="flex gap-1.5">
                      {Object.entries(designTokens.colors.primary).map(([key, value]) => (
                        <div key={key} className="flex-1 text-center">
                          <div
                            className="h-10 rounded-lg mb-1 border border-neutral-700/30"
                            style={{ background: value }}
                          />
                          <span className="text-micro text-neutral-500">{key}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-caption font-semibold text-neutral-400 uppercase tracking-wider mb-3">Secondary Palette</p>
                    <div className="flex gap-1.5">
                      {Object.entries(designTokens.colors.secondary).map(([key, value]) => (
                        <div key={key} className="flex-1 text-center">
                          <div
                            className="h-10 rounded-lg mb-1 border border-neutral-700/30"
                            style={{ background: value }}
                          />
                          <span className="text-micro text-neutral-500">{key}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Neutral Scale</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-1">
                    {Object.entries(designTokens.colors.neutral).map(([key, value]) => (
                      <div key={key} className="flex-1 text-center">
                        <div
                          className="h-12 rounded-lg mb-1 border border-neutral-700/30"
                          style={{ background: value }}
                        />
                        <span className="text-micro text-neutral-500">{key}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Semantic Colors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {['success', 'warning', 'critical'].map((type) => (
                      <div key={type}>
                        <p className="text-caption font-semibold text-neutral-400 uppercase tracking-wider mb-2">{type}</p>
                        <div className="space-y-1.5">
                          {Object.entries(designTokens.colors[type]).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-md" style={{ background: value }} />
                              <span className="text-caption text-neutral-400">{key}: {value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contrast Checker (WCAG 2.1 AA)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { bg: '#020617', fg: '#f1f5f9', ratio: '15.8:1', label: 'Neutral 100 on Neutral 950' },
                      { bg: '#020617', fg: '#94a3b8', ratio: '7.2:1', label: 'Neutral 400 on Neutral 950' },
                      { bg: '#6366f1', fg: '#ffffff', ratio: '4.6:1', label: 'White on Primary 500' },
                    ].map((combo, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-neutral-800/30">
                        <div className="flex gap-1">
                          <div className="w-10 h-6 rounded" style={{ background: combo.bg }} />
                          <div className="w-10 h-6 rounded flex items-center justify-center text-micro font-bold" style={{ background: combo.bg, color: combo.fg }}>Aa</div>
                        </div>
                        <div className="flex-1">
                          <p className="text-caption text-neutral-300">{combo.label}</p>
                        </div>
                        <Badge variant={parseFloat(combo.ratio) >= 4.5 ? 'success' : 'danger'} size="sm">
                          {combo.ratio}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Typography Tab */}
        <TabsContent value="typography">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Type Scale</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {FONT_SIZES.map((size) => (
                    <div key={size.label} className="flex items-center gap-4 py-2 border-b border-neutral-800/30 last:border-0">
                      <span className="text-caption text-neutral-500 w-20 shrink-0">{size.label}</span>
                      <span className="text-neutral-700 w-16 shrink-0 font-mono text-caption">{size.value}</span>
                      <span className="text-neutral-200 truncate" style={{ fontSize: size.value }}>
                        The quick brown fox
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Font Family</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <p className="text-caption font-semibold text-neutral-400 uppercase tracking-wider mb-2">Sans-Serif</p>
                    <p className="text-h2 text-neutral-100" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Inter
                    </p>
                    <p className="text-body-sm text-neutral-400 mt-1">
                     ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                     abcdefghijklmnopqrstuvwxyz<br />
                      0123456789 !@#$%^&*()
                    </p>
                  </div>
                  <div>
                    <p className="text-caption font-semibold text-neutral-400 uppercase tracking-wider mb-2">Monospace</p>
                    <p className="text-h2 text-neutral-100 font-mono">
                      JetBrains Mono
                    </p>
                    <p className="text-body-sm text-neutral-400 mt-1 font-mono">
                      ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                      0123456789 !@#$%^&*()
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-800/30 border border-neutral-700/30">
                    <p className="text-caption font-semibold text-neutral-400 mb-2">Font Weights</p>
                    <div className="space-y-2">
                      {[
                        { weight: 400, name: 'Regular' },
                        { weight: 500, name: 'Medium' },
                        { weight: 600, name: 'Semibold' },
                        { weight: 700, name: 'Bold' },
                        { weight: 800, name: 'Extrabold' },
                      ].map((w) => (
                        <div key={w.weight} className="flex items-center justify-between">
                          <span style={{ fontWeight: w.weight }} className="text-body text-neutral-200">Aa Bb Cc</span>
                          <span className="text-caption text-neutral-500">{w.name} ({w.weight})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Spacing Tab */}
        <TabsContent value="spacing">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Spacing Scale</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {SPACING_SCALE.map((s) => (
                    <div key={s} className="flex items-center gap-3">
                      <span className="text-caption text-neutral-500 w-8 font-mono">{s}</span>
                      <span className="text-caption text-neutral-400 w-12 font-mono">{s * 4}px</span>
                      <div
                        className="h-4 rounded bg-primary-500/30 border border-primary-500/20"
                        style={{ width: `${Math.min(s * 16, 400)}px` }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Border Radius</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(designTokens.borderRadius).map(([name, value]) => (
                    <div key={name} className="text-center">
                      <div
                        className="w-16 h-16 mx-auto mb-2 bg-primary-500/20 border border-primary-500/30"
                        style={{ borderRadius: value }}
                      />
                      <p className="text-caption font-medium text-neutral-300">{name}</p>
                      <p className="text-micro text-neutral-500">{value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Presets Tab */}
        <TabsContent value="presets">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Object.entries(stylePresets).map(([key, preset]) => (
              <Card
                key={key}
                hover
                glow={activePreset === key}
                className={`cursor-pointer ${activePreset === key ? 'border-primary-500/50' : ''}`}
                onClick={() => setActivePreset(key)}
              >
                <div className="flex items-start justify-between mb-3">
                  <Badge variant={activePreset === key ? 'primary' : 'default'} size="sm">
                    {preset.name}
                  </Badge>
                  {activePreset === key && (
                    <Check className="w-4 h-4 text-primary-400" />
                  )}
                </div>

                <div
                  className="h-24 rounded-lg mb-3 border border-neutral-700/30"
                  style={{ background: preset.tokens.gradient, borderRadius: preset.tokens.borderRadius }}
                />

                <p className="text-caption text-neutral-400">{preset.description}</p>

                <div className="flex gap-2 mt-3">
                  <span className="text-micro text-neutral-500">Radius: {preset.tokens.borderRadius}</span>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

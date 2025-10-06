import { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Switch } from '@/components/ui/switch.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { MapPin, Building, ListTodo, Package, Plus, Minus, X, Settings, TrendingUp, Download, Upload, Trash2, ExternalLink, AlertTriangle, Heart } from 'lucide-react'
import { allLocations } from './data/locations.js'
import { structures, structureCategories, pccLevels, formatMaterialName } from './data/structures.js'
import { ResourceCalculator } from './utils/resourceCalculator.js'
import './App.css'
import { ToastProvider } from "./ToastProvider";
import { AddStructureButton } from "./AddStructureButton";


console.log('Import check - allLocations:', allLocations?.length, 'items')

function App() {
  const [activeTab, setActiveTab] = useState('buildqueue')
  const [buildQueue, setBuildQueue] = useState([])
  const [userLocations, setUserLocations] = useState([])
  const [structureFilters, setStructureFilters] = useState({
    category: 'All',
    pccLevel: 'All'
  })
  const [importData, setImportData] = useState('')

  // Initialize user locations with default data
  useEffect(() => {
    const savedData = localStorage.getItem('chiral-cartographer-data')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setUserLocations(parsed.userLocations || [])
        setBuildQueue(parsed.buildQueue || [])
        return
      } catch (error) {
        console.error('Failed to load saved data:', error)
      }
    }

    // Default initialization
    const initialLocations = allLocations.map(location => ({
      ...location,
      unlocked: location.id === 'ciudad-nudo-del-norte' || location.id === 'mine-north-of-f1',
      active: true,
      connectionLevel: location.type === 'mine' ? undefined : 1,
      upgraded: location.type === 'mine' ? false : undefined,
      availableMaterials: location.defaultMaterials ? { ...location.defaultMaterials } : {}
    }))
    setUserLocations(initialLocations)
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    const dataToSave = {
      userLocations,
      buildQueue,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('chiral-cartographer-data', JSON.stringify(dataToSave))
  }, [userLocations, buildQueue])

  // Resource calculator instance
  const resourceCalculator = useMemo(() => new ResourceCalculator(userLocations), [userLocations])

  // Update calculator when locations change
  useEffect(() => {
    resourceCalculator.updateLocations(userLocations)
  }, [userLocations, resourceCalculator])

  // Filtered structures
  const filteredStructures = useMemo(() => {
    return structures.filter(structure => {
      const categoryMatch = structureFilters.category === 'All' || structure.category === structureFilters.category
      const pccMatch = structureFilters.pccLevel === 'All' || 
        (structureFilters.pccLevel === 'PCC Level 1' && structure.pccLevel === 1) ||
        (structureFilters.pccLevel === 'PCC Level 2' && structure.pccLevel === 2) ||
        structure.pccLevel === structureFilters.pccLevel
      return categoryMatch && pccMatch
    })
  }, [structureFilters])

  // Calculate total materials needed
  const totalMaterials = useMemo(() => {
    return buildQueue.reduce((total, item) => {
      Object.keys(item.customRequirements).forEach(material => {
        total[material] = (total[material] || 0) + item.customRequirements[material]
      })
      return total
    }, {})
  }, [buildQueue])

  // Generate sourcing recommendations
  const sourcingRecommendations = useMemo(() => {
    if (Object.keys(totalMaterials).length === 0) return null
    return resourceCalculator.generateSourcingRecommendations(totalMaterials)
  }, [totalMaterials, resourceCalculator])

  // Build queue management
  const addToBuildQueue = (structure) => {
    const newItem = {
      id: Date.now(),
      structureId: structure.id,
      structureName: structure.name,
      customRequirements: { ...structure.averageRequirements },
      priority: buildQueue.length + 1
    }
    setBuildQueue([...buildQueue, newItem])
  }

  const removeFromBuildQueue = (itemId) => {
    setBuildQueue(buildQueue.filter(item => item.id !== itemId))
  }

  const updateMaterialRequirement = (itemId, material, value) => {
    setBuildQueue(buildQueue.map(item => 
      item.id === itemId 
        ? { ...item, customRequirements: { ...item.customRequirements, [material]: Math.max(0, value) }}
        : item
    ))
  }

  // Location management
  const updateLocationProperty = (locationId, property, value) => {
    setUserLocations(locations => locations.map(location =>
      location.id === locationId ? { ...location, [property]: value } : location
    ))
  }

  const updateLocationMaterial = (locationId, material, value) => {
    setUserLocations(locations => locations.map(location =>
      location.id === locationId 
        ? { 
            ...location, 
            availableMaterials: { 
              ...location.availableMaterials, 
              [material]: Math.max(0, value) 
            }
          }
        : location
    ))
  }

  // Data management functions
  const exportData = () => {
    const dataToExport = {
      userLocations,
      buildQueue,
      timestamp: new Date().toISOString(),
      version: '1.0'
    }
    const jsonString = JSON.stringify(dataToExport, null, 2)
    const blob = new Blob([jsonString], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'tcc-data-backup.txt.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const importDataFromFile = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result)
        if (!imported.userLocations && !imported.buildQueue) {
          alert('Invalid backup file format. Please check the file and try again.')
          return
        }
        if (imported.userLocations) setUserLocations(imported.userLocations)
        if (imported.buildQueue) setBuildQueue(imported.buildQueue)
        alert('Data imported successfully!')
        // Clear the file input
        event.target.value = ''
      } catch (error) {
        alert('Failed to import data. Please check the file format and try again.')
        event.target.value = ''
      }
    }
    reader.readAsText(file)
  }

  const importDataFromText = () => {
    if (!importData.trim()) {
      alert('Please paste backup data before importing.')
      return
    }
    
    try {
      const imported = JSON.parse(importData)
      if (!imported.userLocations && !imported.buildQueue) {
        alert('Invalid backup data format. Please check the JSON and try again.')
        return
      }
      if (imported.userLocations) setUserLocations(imported.userLocations)
      if (imported.buildQueue) setBuildQueue(imported.buildQueue)
      setImportData('')
      alert('Data imported successfully!')
    } catch (error) {
      alert('Failed to import data. Please check the JSON format and try again.')
    }
  }

  const clearAllData = () => {
    if (window.confirm('This will permanently delete all your build queue items, facility progress, and settings. Are you sure?')) {
      setBuildQueue([])
      const resetLocations = allLocations.map(location => ({
        ...location,
        unlocked: location.id === 'ciudad-nudo-del-norte' || location.id === 'mine-north-of-f1',
        active: true,
        connectionLevel: location.type === 'mine' ? undefined : 1,
        upgraded: location.type === 'mine' ? false : undefined,
        availableMaterials: location.defaultMaterials ? { ...location.defaultMaterials } : {}
      }))
      setUserLocations(resetLocations)
      localStorage.removeItem('chiral-cartographer-data')
      alert('All data has been cleared.')
    }
  }

  // Render functions
  const renderBuildQueueTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold text-accent mb-4">Build Queue</h2>
          <div className="space-y-3">
            {buildQueue.length === 0 ? (
              <Card className="p-6 text-center text-muted-foreground">
                <Building className="mx-auto mb-4 h-12 w-12" />
                <p>No structures in build queue</p>
                <p className="text-sm mt-2">Add structures from the Structures tab</p>
              </Card>
            ) : (
              buildQueue.map(item => (
                <Card key={item.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{item.structureName}</h3>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => removeFromBuildQueue(item.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {Object.entries(item.customRequirements).map(([material, amount]) => 
                      amount > 0 && (
                        <div key={material} className="flex items-center justify-between">
                          <span className="text-sm">{formatMaterialName(material)}:</span>
                          
                          <div className="flex items-center gap-1">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateMaterialRequirement(item.id, material, amount - 50)}
                              className="h-6 w-6 p-0"
                              title="-50"
                              aria-label="Decrease by 50"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>

                            <input
                              type="number"
                              inputMode="numeric"
                              min={0}
                              step={1}
                              value={amount}
                              onChange={(e) => {
                                const raw = e.target.value;

                                // 1) Ignore empty edits (don’t mutate state mid-edit)
                                if (raw === "") return;

                                // 2) Ignore non-numeric input (prevents accidental deletion)
                                const next = Number(raw);
                                if (Number.isNaN(next)) return;

                                // 3) Commit valid numbers
                                updateMaterialRequirement(
                                  item.id,
                                  material,
                                  Math.max(0, Math.floor(next))
                                );
                              }}

                              // Prevent mouse wheel changing the value
                              onWheel={(e) => e.currentTarget.blur()}

                              // Block characters browsers allow in number inputs (e/E/+/-/.)
                              onKeyDown={(e) => {
                                if (["e", "E", "+", "-", "."].includes(e.key)) e.preventDefault();
                                if (e.key === "Enter") e.currentTarget.blur();
                              }}

                              // Block pasting non-digits
                              onPaste={(e) => {
                                const txt = (e.clipboardData || window.clipboardData).getData("text");
                                if (!/^\d+$/.test(txt)) e.preventDefault();
                              }}
                              
                              // Safety net on blur: normalize whatever is there
                              onBlur={(e) => {
                                const next = parseInt(e.target.value, 10);
                                updateMaterialRequirement(
                                  item.id,
                                  material,
                                  Number.isNaN(next) ? amount : Math.max(0, next)
                                );
                              }}                              

                              className="h-6 w-20 px-2 text-center text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent"
                              aria-label={`${formatMaterialName(material)} quantity`}
                            />

                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateMaterialRequirement(item.id, material, amount + 50)}
                              className="h-6 w-6 p-0"
                              title="+50"
                              aria-label="Increase by 50"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-accent mb-4">Material Summary</h2>
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Total Materials Needed</h3>
            {Object.keys(totalMaterials).length === 0 ? (
              <p className="text-muted-foreground text-sm">No materials needed</p>
            ) : (
              <div className="space-y-2">
                {Object.entries(totalMaterials).map(([material, total]) => 
                  total > 0 && (
                    <div key={material} className="flex justify-between text-sm">
                      <span>{formatMaterialName(material)}:</span>
                      <span className="font-medium">{total}</span>
                    </div>
                  )
                )}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )

  const renderStructuresTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-accent">Structures Catalog</h2>
        <div className="flex items-center gap-4">
          <Select 
            value={structureFilters.category}
            onValueChange={(value) => setStructureFilters(prev => ({ ...prev, category: value }))}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {structureCategories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select 
            value={structureFilters.pccLevel}
            onValueChange={(value) => setStructureFilters(prev => ({ ...prev, pccLevel: value }))}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pccLevels.map(level => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStructures.map(structure => (
          <Card key={structure.id} className="structure-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{structure.name}</CardTitle>
                {/* <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => addToBuildQueue(structure)}
                  className="text-accent hover:text-accent-foreground"
                >
                  <Plus className="w-4 h-4" />
                </Button> */}
                <AddStructureButton onAdd={() => addToBuildQueue(structure)} />
              </div>
              <Badge variant="secondary">
                {typeof structure.pccLevel === 'number' ? `PCC Level ${structure.pccLevel}` : structure.pccLevel}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2" title="(Change this in the build queue.)">
                Average Material Requirements*
              </p>
              <div className="space-y-1 text-xs">
                {Object.entries(structure.averageRequirements).map(([material, amount]) => 
                  amount > 0 && (
                    <div key={material} className="flex justify-between">
                      <span>{formatMaterialName(material)}:</span>
                      <span className="font-medium">{amount}</span>
                    </div>
                  )
                )}
              </div>
              {structure.notes && (
                <p className="text-xs text-muted-foreground mt-2 italic">{structure.notes}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderLocationsTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-accent mb-4">Locations Management</h2>
        
        <Tabs defaultValue="preppers" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preppers">Preppers & Facilities</TabsTrigger>
            <TabsTrigger value="mines">Mines</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preppers" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {userLocations.filter(loc => loc.type !== 'mine').map(location => (
                <Card key={location.id} className="location-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{location.name}</CardTitle>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{location.region}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={location.type === 'Facility' ? 'default' : 'secondary'}>
                          {location.type}
                        </Badge>
                        <Switch 
                          checked={location.unlocked}
                          onCheckedChange={(checked) => updateLocationProperty(location.id, 'unlocked', checked)}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Connection Level:</Label>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map(level => (
                          <button
                            key={level}
                            type="button"
                            disabled={!location.unlocked}
                            onClick={() => updateLocationProperty(location.id, 'connectionLevel', level)}
                            className={`w-6 h-6 flex items-center justify-center text-3xl transition-all duration-200 hover:scale-125 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                              level <= (location.connectionLevel || 1) 
                                ? 'text-accent drop-shadow-sm' 
                                : 'text-muted-foreground/40 hover:text-accent/70'
                            }`}
                            title={`Connection Level ${level}`}
                          >
                            ★
                          </button>
                        ))}
                        <span className="ml-2 text-xs text-muted-foreground">
                          {location.connectionLevel || 1}/5
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Collect resources from here?</Label>
                      <Switch 
                        checked={location.active}
                        onCheckedChange={(checked) => updateLocationProperty(location.id, 'active', checked)}
                        disabled={!location.unlocked}
                      />
                    </div>

                    {/* How to display locations that are both unlocked and active */}
                    {location.unlocked && location.active && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Available Materials:</Label>
                        <div className="material-input-grid">
                          {Object.entries(location.availableMaterials || {}).map(([material, amount]) => (
                            <div key={material} className="material-input-row">
                              <Label className="material-input-label">{formatMaterialName(material)}:</Label>
                              <Input
                                type="number"
                                value={amount}
                                onChange={(e) => updateLocationMaterial(location.id, material, parseInt(e.target.value) || 0)}
                                className="material-input-field"
                                min="0"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* How to display locations that are only unlocked, but NOT active */}
                    {location.unlocked && !location.active && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Available Materials (Inactive):</Label>
                        <div className="material-input-grid">
                          {Object.entries(location.availableMaterials || {}).map(([material, amount]) => (
                            <div key={material} className="material-input-row">
                              <Label className="material-input-label text-gray-500">{formatMaterialName(material)}:</Label>
                              <Input
                                type="number"
                                value={amount}
                                className="material-input-field text-gray-500"
                                min="0"
                                disabled
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="mines" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userLocations.filter(loc => loc.type === 'mine').map(location => (
                <Card key={location.id} className="location-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{location.name}</CardTitle>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{location.region}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{formatMaterialName(location.materialType)}</Badge>
                        <Switch 
                          checked={location.unlocked}
                          onCheckedChange={(checked) => updateLocationProperty(location.id, 'unlocked', checked)}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm text-muted-foreground">
                      <p>Conversion Rate: {location.conversionRate}:1</p>
                      <p>Output: {location.materialOutput} per cycle</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Upgraded:</Label>
                      <Switch 
                        checked={location.upgraded}
                        onCheckedChange={(checked) => updateLocationProperty(location.id, 'upgraded', checked)}
                        disabled={!location.unlocked}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )

  const renderResourcesTab = () => {
    if (!sourcingRecommendations) {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-accent mb-4">Resource Optimization</h2>
          <Card className="p-6 text-center text-muted-foreground">
            <Package className="mx-auto mb-4 h-12 w-12" />
            <p>Add structures to your build queue to see resource optimization</p>
            <p className="text-sm mt-2">Sourcing recommendations will appear here</p>
          </Card>
        </div>
      )
    }

    const metrics = resourceCalculator.getEfficiencyMetrics(sourcingRecommendations)
    const collectionRoute = resourceCalculator.generateCollectionRoute(sourcingRecommendations)

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-accent mb-4">Resource Optimization</h2>
        
        {/* Efficiency Metrics */}
        <Card className="p-4">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Efficiency Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Fulfillment Rate</p>
                <p className="text-lg font-bold text-accent">{metrics.fulfillmentRate}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">From Preppers</p>
                <p className="text-lg font-bold">{metrics.fromPreppers}</p>
              </div>
              <div>
                <p className="text-muted-foreground">From Mines</p>
                <p className="text-lg font-bold">{metrics.fromMines}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Chiral Crystals Needed</p>
                <p className="text-lg font-bold text-primary">{metrics.chiralCrystalsNeeded}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Collection Route */}
        <Card className="p-4">
          <CardHeader className="pb-3">
            <CardTitle>Optimized Collection Route</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {collectionRoute.map((stop, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-secondary/20 rounded">
                  <Badge variant="outline">{index + 1}</Badge>
                  <div className="flex-1">
                    <p className="font-medium">{stop.location}</p>
                    <p className="text-sm text-muted-foreground">{stop.region}</p>
                  </div>
                  <div className="text-right text-sm">
                    {stop.type === 'mine' ? (
                      <div>
                        <p>{formatMaterialName(stop.materialType)}: {stop.amount}</p>
                        <p className="text-muted-foreground">Cost: {stop.chiralCrystalsNeeded} CC</p>
                      </div>
                    ) : (
                      <div>
                        {Object.entries(stop.materials).map(([material, amount]) => (
                          <p key={material}>{formatMaterialName(material)}: {amount}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-accent mb-4">Settings & Data Management</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Data */}
        <Card className="settings-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Download a backup of your build queue, facility progress, and settings.
            </p>
            <Button onClick={exportData} className="w-full bg-accent hover:bg-accent/80 text-accent-foreground">
              <Download className="w-4 h-4 mr-2" />
              Export Backup
            </Button>
          </CardContent>
        </Card>

        {/* Import Data */}
        <Card className="settings-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Import Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Restore your data from a previously exported backup file.
            </p>
            
            <div>
              <Label className="text-sm font-medium">Import from file:</Label>
              <Input
                type="file"
                accept=".json"
                onChange={importDataFromFile}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label className="text-sm font-medium">Or paste backup data:</Label>
              <Textarea
                placeholder="Paste your exported JSON data here..."
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                className="mt-1 min-h-[100px]"
              />
              <Button 
                onClick={importDataFromText} 
                disabled={!importData.trim()}
                className="w-full mt-2 bg-accent hover:bg-accent/80 text-accent-foreground"
              >
                <Upload className="w-4 h-4 mr-2" />
                Import Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clear All Data */}
      <Card className="settings-card danger-zone">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="w-5 h-5" />
            Clear All Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              This will permanently delete all your build queue items, facility progress, and settings. 
              Make sure to export a backup first if you want to keep your data.
            </AlertDescription>
          </Alert>
          <Button 
            onClick={clearAllData} 
            variant="destructive" 
            className="w-full"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All Data
          </Button>
        </CardContent>
      </Card>

      {/* Data Storage Information */}
      <Card className="settings-card">
        <CardHeader className="pb-3">
          <CardTitle>Data Storage Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            Your data is stored locally in your browser using Local Storage. This means:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Data persists between browser sessions</li>
            <li>Data is specific to this browser and device</li>
            <li>Clearing browser data will remove your progress</li>
            <li>Use export/import to transfer data between devices</li>
            <li>No account registration required</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )

  const renderExtraLifeTab = () => (
    <div className="space-y-6">
      <Card className="settings-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-accent flex items-center gap-2">
            <Heart className="w-6 h-6" />💙
            Join Us in Supporting Extra Life
            💙<Heart className="w-6 h-6" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-base leading-relaxed">
            We're proud to be part of Extra Life Space Coast, a team of gamers united by a common goal: helping sick and injured kids at our local Children's Miracle Network Hospital.
          </p>
          <p className="text-base leading-relaxed">
            Every dollar we raise through gaming marathons and charity streams goes directly to support life-saving treatments, research, and care for kids who need it most. Since Extra Life started in 2008, gamers around the world have raised over $100 million for children's hospitals — and together, we're continuing to make a difference right here in our community.
          </p>
        </CardContent>
      </Card>

      <Card className="settings-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-accent">
          🎮 How You Can Help
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-lg">💖</span>
            <div>
              <strong>Donate</strong> — Every contribution, big or small, helps provide critical care to children in need.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg">📣</span>
            <div>
              <strong>Spread the word</strong> — Share our team page with friends, family, or coworkers.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg">🎮</span>
            <div>
              <strong>Join the team</strong> — Love gaming and helping kids? You can sign up, join the team, and play with us too -- no matter where you live! There are teams all across the US and if you live in another country, you can support Extra Life thru one of our international children's hospitals!
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="settings-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-accent">
            👉 Ready to make an impact?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => window.open('https://www.extra-life.org/participants/BoswenMcBastok/donate', '_blank')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Heart className="w-4 h-4" />
              Donate Now!
            </Button>
            <Button 
              onClick={() => window.open('https://www.extra-life.org/index.cfm?fuseaction=register.start&eventID=559&teamID=69344&success=donordrive.team&successParameters=teamID', '_blank')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Join the Team!
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <ToastProvider>
      <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-4">
          {/* 2x2 grid:
              Row 1: Title spans both columns
              Row 2: Subtitle (left) | Badge (right) */}
          <div className="grid gap-0 md:gap-0 grid-cols-[1fr_auto] grid-rows-[auto_auto] items-center">
            {/* Title (spans both cols) */}
            <div className="col-span-2 min-w-0">
              <h1 className="inline-block text-2xl font-bold text-accent chiral-glow whitespace-nowrap">
                THE CHIRAL CARTOGRAPHER
              </h1>
            </div>

            {/* Subtitle (left, row 2) */}
            <p className="text-sm text-muted-foreground truncate">
              "Stick, Rope, Rail, and Road"
            </p>

            {/* Badge (right, row 2) */}
            <div className="justify-self-end">
              <Badge variant="outline" className="text-accent">
                Build Queue: {buildQueue.length}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto md:overflow-visible md:justify-center no-scrollbar py-2 -mx-4 px-4 scroll-px-4">
            {[
              { id: 'buildqueue', label: 'Build Queue', icon: ListTodo },
              { id: 'structures', label: 'Structures', icon: Building },
              { id: 'locations', label: 'Locations', icon: MapPin },
              { id: 'resources', label: 'Resources', icon: Package },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`nav-tab shrink-0 whitespace-nowrap
                    ${activeTab === tab.id ? 'active' : ''}`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {tab.label}
                </button>
              )
            })}
            <a
              href="https://mapgenie.io/death-stranding-2"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-tab hover:text-accent shrink-0 whitespace-nowrap"
            >
              <ExternalLink className="w-4 h-4 shrink-0" />
              Map
            </a>
            <a
              href="/faq.html"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-tab hover:text-accent shrink-0 whitespace-nowrap"
            >
              <ExternalLink className="w-4 h-4 shrink-0" />
              FAQ
            </a>            
            <button
              onClick={() => setActiveTab('extralife')}
              className={`nav-tab shrink-0 whitespace-nowrap ${activeTab === 'extralife' ? 'active' : ''}`}
            >
              <Heart className="w-4 h-4 shrink-0" />
              Extra Life
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-1">
        {activeTab === 'buildqueue' && renderBuildQueueTab()}
        {activeTab === 'structures' && renderStructuresTab()}
        {activeTab === 'locations' && renderLocationsTab()}
        {activeTab === 'resources' && renderResourcesTab()}
        {activeTab === 'settings' && renderSettingsTab()}
        {activeTab === 'extralife' && renderExtraLifeTab()}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-muted-foreground">
            © {new Date().getFullYear()} The Chiral Cartographer — Stick, Rope, Rail, & Road
          </p>
          <p className="text-center italic text-sm text-muted-foreground/70">
            A Community-Built Infrastructure Planning Tool for Death Stranding 2!
          </p>          
        </div>
      </footer>
      </div>
    </ToastProvider>
  )
}

export default App
